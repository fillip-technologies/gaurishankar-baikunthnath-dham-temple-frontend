import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Gift, Minus, Plus, Loader2, AlertCircle, RefreshCw, ShoppingBag, IndianRupee, ArrowRight,
} from 'lucide-react';
import { getAllPrasadApi } from '../../clientApi/allApi';

export default function PrasadCatalogue({ onProceed }) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [prasadList, setPrasadList] = useState([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState('');
  // { [prasadId]: qty }  — only one can be > 0 at a time (backend: single prasad per order)
  const [quantities, setQuantities] = useState({});

  const fetchPrasad = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res  = await getAllPrasadApi();
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setPrasadList(list);
    } catch {
      setError(isHi ? 'प्रसाद सूची लोड नहीं हो सकी।' : 'Could not load prasad catalogue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isHi]);

  useEffect(() => { fetchPrasad(); }, [fetchPrasad]);

  const setQty = (id, val) => {
    const v = Math.min(5, Math.max(0, Math.round(val * 4) / 4));
    setQuantities((prev) => {
      // Only one prasad in cart at a time — clear others when a new one is added
      const next = {};
      if (v > 0) next[id] = v;
      return next;
    });
  };

  // The single selected item (if any)
  const cartEntry = Object.entries(quantities).find(([, q]) => q > 0);
  const cartPrasad = cartEntry ? prasadList.find((p) => p._id === cartEntry[0]) : null;
  const cartQty    = cartEntry ? cartEntry[1] : 0;
  const cartTotal  = cartPrasad ? cartPrasad.pricePerKg * cartQty : 0;

  // ── Loading / error ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="w-full bg-stone-50 py-20 flex flex-col items-center gap-3 text-stone-400">
        <Loader2 className="w-7 h-7 animate-spin text-[#c28227]" />
        <span className="text-sm font-medium">{isHi ? 'प्रसाद सूची लोड हो रही है…' : 'Loading prasad catalogue…'}</span>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-stone-50 py-16 flex flex-col items-center gap-4">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-sm font-medium text-stone-600">{error}</p>
        <button onClick={fetchPrasad} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white text-sm font-bold hover:brightness-110 transition">
          <RefreshCw className="w-4 h-4" /> {isHi ? 'पुनः प्रयास करें' : 'Retry'}
        </button>
      </section>
    );
  }

  if (prasadList.length === 0) {
    return (
      <section className="w-full bg-stone-50 py-16 flex flex-col items-center gap-3 text-stone-400">
        <Gift className="w-10 h-10" />
        <p className="text-sm font-medium">{isHi ? 'अभी कोई प्रसाद उपलब्ध नहीं है।' : 'No prasad available at the moment.'}</p>
      </section>
    );
  }

  // ── Catalogue ──────────────────────────────────────────────────────────────
  return (
    <section className="w-full bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-40">

        <h2 className="text-lg font-extrabold text-stone-900 mb-6">
          {isHi ? 'उपलब्ध प्रसाद' : 'Available Prasad'}
          <span className="text-stone-400 font-normal text-sm ml-2">({prasadList.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prasadList.map((p) => {
            const qty     = quantities[p._id] || 0;
            const isInCart = qty > 0;

            return (
              <div
                key={p._id}
                className={`bg-white rounded-2xl border-2 overflow-hidden shadow-xs transition-all duration-200 ${
                  isInCart ? 'border-[#c28227] shadow-md' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Image */}
                <div className="relative h-44 bg-stone-100 overflow-hidden">
                  {p.imageUrl
                    ? <img src={p.imageUrl} alt={p.prasadName} className="w-full h-full object-cover" />
                    : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Gift className="w-12 h-12 text-stone-300" />
                      </div>
                    )
                  }
                  {isInCart && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#c28227] text-white text-[10px] font-extrabold shadow">
                      {isHi ? 'चयनित' : 'Selected'}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900">{p.prasadName}</h3>
                    {p.description && (
                      <p className="text-xs text-stone-500 mt-0.5 line-clamp-2 leading-relaxed">{p.description}</p>
                    )}
                    <p className="text-xs font-bold text-[#c28227] mt-1.5 flex items-center gap-0.5">
                      <IndianRupee className="w-3 h-3" />
                      {p.pricePerKg.toLocaleString('en-IN')} {isHi ? '/ किलो' : '/ kg'}
                    </p>
                  </div>

                  {/* Quantity stepper */}
                  {qty === 0 ? (
                    <button
                      onClick={() => setQty(p._id, 1)}
                      className="w-full py-2 rounded-xl bg-[#c28227] text-white text-xs font-extrabold hover:brightness-110 transition flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {isHi ? 'जोड़ें' : 'Add'}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => setQty(p._id, qty - 0.25)}
                          className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-base font-extrabold text-stone-900">{qty} kg</span>
                          <p className="text-[10px] text-stone-400">{isHi ? '250g के चरण' : 'steps of 250g'}</p>
                        </div>
                        <button
                          onClick={() => setQty(p._id, qty + 0.25)}
                          disabled={qty >= 5}
                          className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition disabled:opacity-40"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-700">₹ {(p.pricePerKg * qty).toLocaleString('en-IN')}</span>
                        <button
                          onClick={() => setQty(p._id, 0)}
                          className="text-red-400 hover:text-red-600 font-medium transition"
                        >
                          {isHi ? 'हटाएं' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Sticky cart bar ── */}
      {cartPrasad && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-2xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-[#c28227]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">{cartPrasad.prasadName}</p>
                <p className="text-[10px] text-stone-500">{cartQty} kg &nbsp;·&nbsp; ₹{cartPrasad.pricePerKg}/kg</p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-[10px] text-stone-400">{isHi ? 'कुल राशि' : 'Total'}</p>
                <p className="text-base font-extrabold text-emerald-700">₹ {cartTotal.toLocaleString('en-IN')}</p>
              </div>
              <button
                onClick={() => onProceed({ prasad: cartPrasad, quantity: cartQty, total: cartTotal })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c28227] text-white font-extrabold text-sm hover:brightness-110 shadow-md transition"
              >
                <span>{isHi ? 'आगे बढ़ें' : 'Proceed'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
