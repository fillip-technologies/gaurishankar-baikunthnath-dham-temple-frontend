import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ─── constants ───────────────────────────────────────────────────────────────
const TEMPLE      = 'Shree Gaurishankar Baikunthdham Temple';
const TEMPLE_HI   = 'श्री गौरी शंकर बैकुंठधाम मंदिर न्यास';
const ADDRESS     = 'Khusrupur, Bihar, India';
const TRUST_LINE  = 'Registered Charitable Trust | 80G Exemption';

const BRAND  = [139, 26,  26];   // #8b1a1a
const GOLD   = [194, 130, 39];   // #c28227
const WHITE  = [255, 255, 255];
const LIGHT  = [251, 248, 243];  // warm off-white
const BORDER = [220, 210, 190];

const STATUS_COLOR = {
  successful: [22,  163, 74],    // emerald-600
  refunded:   [37,  99,  235],   // blue-600
  failed:     [220, 38,  38],    // red-600
  pending:    [217, 119, 6],     // amber-600
  created:    [120, 113, 108],   // stone-500
};

const MODULE_LABEL = {
  PoojaBooking:  'Pooja',
  RoomBooking:   'Room',
  PrasadBooking: 'Prasad',
  donation:      'Donation',
};

const fmt = (n) => `Rs. ${Number(n).toLocaleString('en-IN')}`;
const today = () => new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' });
const ts    = () => new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

// ─── derive per-module summary from rows ─────────────────────────────────────
function buildSummary(rows) {
  const modules = ['Pooja', 'Room', 'Prasad', 'Donation', 'General'];
  const map = {};
  modules.forEach((m) => { map[m] = { count: 0, total: 0, settled: 0 }; });

  rows.forEach((r) => {
    const key = MODULE_LABEL[r.refModel] || MODULE_LABEL[r.purpose] || 'General';
    if (!map[key]) map[key] = { count: 0, total: 0, settled: 0 };
    map[key].count  += 1;
    map[key].total  += r.amount;
    if (r.status === 'successful') map[key].settled += r.amount;
  });

  const result = Object.entries(map)
    .filter(([, v]) => v.count > 0)
    .map(([name, v]) => ({ name, ...v }));

  const grand = result.reduce(
    (acc, r) => ({ count: acc.count + r.count, total: acc.total + r.total, settled: acc.settled + r.settled }),
    { count: 0, total: 0, settled: 0 },
  );

  return { rows: result, grand };
}

// ─── draw page header (called on each page via didDrawPage hook) ──────────────
function drawPageHeader(doc, pageWidth) {
  // dark banner
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // gold top strip
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, pageWidth, 2.5, 'F');

  // temple name
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(TEMPLE, pageWidth / 2, 11, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(ADDRESS + '  |  ' + TRUST_LINE, pageWidth / 2, 17, { align: 'center' });

  // gold bottom strip
  doc.setFillColor(...GOLD);
  doc.rect(0, 25.5, pageWidth, 2.5, 'F');
}

// ─── draw page footer ─────────────────────────────────────────────────────────
function drawPageFooter(doc, pageWidth, pageHeight, pageNum, totalPages) {
  doc.setFillColor(...BRAND);
  doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');

  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Confidential — Superadmin only', 14, pageHeight - 4);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 14, pageHeight - 4, { align: 'right' });
  doc.text(`Generated: ${ts()}`, pageWidth / 2, pageHeight - 4, { align: 'center' });
}

// ─── main export function ─────────────────────────────────────────────────────
/**
 * @param {Array}  rows      — filtered payment row objects from PaymentHistory
 * @param {object} options
 * @param {string} options.from       — YYYY-MM-DD or ''
 * @param {string} options.to         — YYYY-MM-DD or ''
 * @param {string} options.module     — active module filter label
 * @param {string} options.status     — active status filter label
 */
export function generatePaymentPDF(rows, { from = '', to = '', module = 'All', status = 'All' } = {}) {
  const doc      = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW    = doc.internal.pageSize.getWidth();
  const pageH    = doc.internal.pageSize.getHeight();
  const summary  = buildSummary(rows);
  const todayStr = today();

  // ── title block ─────────────────────────────────────────────────────────────
  drawPageHeader(doc, pageW);

  let y = 34;

  doc.setTextColor(...BRAND);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('PAYMENT LEDGER', pageW / 2, y, { align: 'center' });
  y += 6;

  // date range line
  const rangeLabel = from && to
    ? `Date Range: ${from}  →  ${to}`
    : from
    ? `From: ${from}`
    : to
    ? `Up to: ${to}`
    : `All Payments (as of ${todayStr})`;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 60, 20);
  doc.text(rangeLabel, pageW / 2, y, { align: 'center' });
  y += 4.5;

  // active filters line
  doc.setFontSize(7.5);
  doc.setTextColor(120, 100, 60);
  doc.text(`Module: ${module}   |   Status: ${status}   |   Total records: ${rows.length}`, pageW / 2, y, { align: 'center' });
  y += 7;

  // ── summary table ───────────────────────────────────────────────────────────
  const summaryBody = summary.rows.map((r) => [
    r.name,
    r.count,
    fmt(r.total),
    fmt(r.settled),
    r.total > 0 ? `${Math.round((r.settled / r.total) * 100)}%` : '0%',
  ]);

  summaryBody.push([
    { content: 'GRAND TOTAL', styles: { fontStyle: 'bold', textColor: WHITE, fillColor: BRAND } },
    { content: summary.grand.count, styles: { fontStyle: 'bold', textColor: WHITE, fillColor: BRAND } },
    { content: fmt(summary.grand.total), styles: { fontStyle: 'bold', textColor: WHITE, fillColor: BRAND } },
    { content: fmt(summary.grand.settled), styles: { fontStyle: 'bold', textColor: WHITE, fillColor: BRAND } },
    { content: summary.grand.total > 0 ? `${Math.round((summary.grand.settled / summary.grand.total) * 100)}%` : '0%', styles: { fontStyle: 'bold', textColor: WHITE, fillColor: BRAND } },
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Module', 'Count', 'Total Received', 'Settled (₹)', 'Settlement %']],
    body: summaryBody,
    theme: 'grid',
    tableWidth: 160,
    margin: { left: (pageW - 160) / 2 },
    styles: { fontSize: 8, cellPadding: 2.5, halign: 'center' },
    headStyles: { fillColor: GOLD, textColor: WHITE, fontStyle: 'bold', fontSize: 8.5 },
    alternateRowStyles: { fillColor: LIGHT },
    tableLineColor: BORDER,
    tableLineWidth: 0.2,
  });

  y = doc.lastAutoTable.finalY + 8;

  // ── section divider ──────────────────────────────────────────────────────────
  doc.setFillColor(...GOLD);
  doc.rect(14, y - 1, pageW - 28, 0.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND);
  doc.text('DETAILED PAYMENT RECORDS', 14, y + 4);
  y += 8;

  // ── main payments table ──────────────────────────────────────────────────────
  if (rows.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(150, 130, 90);
    doc.text('No payment records found for the selected filters.', pageW / 2, y + 6, { align: 'center' });
  } else {
    const tableBody = rows.map((r, i) => {
      const statusColor = STATUS_COLOR[r.status] || STATUS_COLOR.created;
      return [
        i + 1,
        MODULE_LABEL[r.refModel] || MODULE_LABEL[r.purpose] || 'General',
        String(r.paymentId).slice(-14),
        r.donorName,
        r.phone,
        fmt(r.amount),
        {
          content: r.status.charAt(0).toUpperCase() + r.status.slice(1),
          styles: { textColor: statusColor, fontStyle: 'bold' },
        },
        r.date,
        r.cause || '—',
      ];
    });

    autoTable(doc, {
      startY: y,
      head: [['#', 'Module', 'Payment ID', 'Payer Name', 'Phone', 'Amount', 'Status', 'Date', 'Purpose / Cause']],
      body: tableBody,
      theme: 'striped',
      margin: { left: 14, right: 14, bottom: 14 },
      styles: { fontSize: 7.5, cellPadding: 2, overflow: 'linebreak' },
      headStyles: { fillColor: BRAND, textColor: WHITE, fontStyle: 'bold', fontSize: 8 },
      alternateRowStyles: { fillColor: LIGHT },
      columnStyles: {
        0: { halign: 'center', cellWidth: 8  },
        1: { cellWidth: 18 },
        2: { font: 'courier', fontSize: 7, cellWidth: 30 },
        3: { cellWidth: 34 },
        4: { cellWidth: 22 },
        5: { halign: 'right', fontStyle: 'bold', cellWidth: 22 },
        6: { halign: 'center', cellWidth: 18 },
        7: { halign: 'center', cellWidth: 20 },
        8: { cellWidth: 'auto' },
      },
      tableLineColor: BORDER,
      tableLineWidth: 0.15,
      // draw header + footer on every page
      didDrawPage: (data) => {
        const pageNum    = doc.internal.getCurrentPageInfo().pageNumber;
        const totalPages = doc.internal.getNumberOfPages();
        // re-draw header on pages after first (first page header already drawn)
        if (pageNum > 1) drawPageHeader(doc, pageW);
        drawPageFooter(doc, pageW, pageH, pageNum, totalPages);
      },
    });
  }

  // draw footer on first page (didDrawPage only fires for autotable pages)
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageFooter(doc, pageW, pageH, p, totalPages);
  }

  // ── save ────────────────────────────────────────────────────────────────────
  const fromPart = from || 'all';
  const toPart   = to   || todayStr.replace(/\s/g, '-');
  doc.save(`baikunthdham-payments-${fromPart}-to-${toPart}.pdf`);
}
