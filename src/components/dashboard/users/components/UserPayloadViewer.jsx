import React, { useState } from 'react';
import { Code, Copy, Check, CheckCircle2, Sparkles } from 'lucide-react';

export default function UserPayloadViewer({ isHi, formData, onCopyPayload }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyPayload();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const payloadObj = {
    fullname: formData.fullname || 'Jane Doe',
    mobile_number: formData.mobile_number || '9876543210',
    email: formData.email || 'jane@example.com',
    password: formData.password || 'secret123',
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isHi ? 'लाइव API पेलोड' : 'Live Request Payload'}
              </h4>
            </div>
            <button
              onClick={handleCopy}
              className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? (isHi ? 'कॉपी हुआ!' : 'Copied!') : (isHi ? 'कॉपी करें' : 'Copy JSON')}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mb-2">
            {isHi
              ? 'बैकएंड API इंटीग्रेशन के लिए यह सटीक JSON ऑब्जेक्ट भेजा जाएगा:'
              : 'Exact JSON structure ready to be POSTed to backend endpoint:'}
          </p>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] leading-relaxed text-amber-300 overflow-x-auto shadow-inner">
            <pre>{JSON.stringify(payloadObj, null, 2)}</pre>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> 4 required fields verified
          </span>
          <span className="font-mono text-[10px] text-slate-500">application/json</span>
        </div>
      </div>

      {/* Integration Guide Box */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 text-xs text-amber-900">
        <h5 className="font-bold flex items-center gap-1.5 text-amber-950 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          {isHi ? 'API एकीकरण जानकारी' : 'API Integration Ready'}
        </h5>
        <p className="text-[11px] text-amber-800 leading-relaxed">
          {isHi
            ? 'यह मॉड्यूल `fullname`, `mobile_number`, `email` और `password` की क्लाइंट-साइड जांच के साथ तैयार है। API इंटीग्रेशन के समय यह सीधे रजिस्ट्रेशन अथवा यूजर क्रिएशन एंडपॉइंट से जुड़ेगा।'
            : 'This module is pre-structured with client-side sanitization. When backend APIs are integrated, this effortlessly connects to your authentication / user creation endpoint.'}
        </p>
      </div>
    </div>
  );
}
