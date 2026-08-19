import React from 'react';
import { Code, Copy } from 'lucide-react';

export default function UserJsonModal({
  isHi,
  user,
  onClose,
  onCopyPayload,
}) {
  if (!user) return null;

  const payload = {
    fullname: user.fullname,
    mobile_number: user.mobile_number,
    email: user.email,
    password: user.password,
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              {user.fullname} - API JSON
            </h4>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold transition"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-3">
          {isHi ? 'इस उपयोगकर्ता का सटीक डेटा संरचना:' : 'Exact JSON payload representation for this user:'}
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto shadow-inner">
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={() => {
              onCopyPayload(payload);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isHi ? 'पेलोड कॉपी करें' : 'Copy JSON Payload'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
