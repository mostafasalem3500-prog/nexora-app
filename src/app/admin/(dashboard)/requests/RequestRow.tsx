"use client";

import { useState, useTransition } from "react";
import { updateRequestStatus, addRequestNote } from "./actions";

const STATUS_LABELS: Record<string, string> = {
  NEW: "جديد",
  IN_REVIEW: "قيد المراجعة",
  QUOTED: "تم إرسال عرض سعر",
  WON: "تم الفوز بالمشروع",
  LOST: "خسر",
};

export default function RequestRow({ req }: { req: any }) {
  const [open, setOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isPending, startTransition] = useTransition();
  const notes = (() => {
    try {
      return JSON.parse(req.notesJson || "[]");
    } catch {
      return [];
    }
  })();
  const features = (() => {
    try {
      return JSON.parse(req.featuresJson || "[]");
    } catch {
      return [];
    }
  })();

  return (
    <div className="rounded-xl border border-white/8 bg-bg-deep-2 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between p-4 text-start">
        <div>
          <div className="font-en text-xs text-brand-teal mb-1">{req.referenceNumber}</div>
          <div className="font-semibold">{req.contactName} — {req.solutionType}</div>
          <div className="text-ink-muted text-sm font-en" dir="ltr">{req.contactEmail}</div>
        </div>
        <select
          value={req.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => startTransition(() => updateRequestStatus(req.id, e.target.value))}
          disabled={isPending}
          className="bg-bg-deep border border-white/12 rounded-md px-3 py-1.5 text-sm"
        >
          {Object.entries(STATUS_LABELS).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </button>

      {open && (
        <div className="border-t border-white/8 p-4 space-y-4">
          <p className="text-ink-muted text-sm">{req.descriptionText}</p>
          <div className="flex flex-wrap gap-3 text-sm text-ink-muted">
            {req.budgetRange && <span>الميزانية: {req.budgetRange}</span>}
            {req.timeline && <span>الموعد: {req.timeline}</span>}
            {req.contactPhone && <span dir="ltr">الجوال: {req.contactPhone}</span>}
          </div>
          {features.length > 0 && (
            <div className="text-sm text-ink-muted">المزايا: {features.join("، ")}</div>
          )}

          <div>
            <h4 className="text-sm font-semibold mb-2">ملاحظات المتابعة</h4>
            <div className="space-y-2 mb-3">
              {notes.map((n: any, i: number) => (
                <div key={i} className="text-sm bg-bg-deep rounded-md p-2.5">
                  <div className="text-ink-muted text-xs mb-1">
                    {n.by} · {new Date(n.at).toLocaleString("ar")}
                  </div>
                  {n.text}
                </div>
              ))}
              {notes.length === 0 && <p className="text-ink-muted text-sm">لا توجد ملاحظات بعد.</p>}
            </div>
            <div className="flex gap-2">
              <input
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="أضف ملاحظة متابعة..."
                className="flex-1 bg-bg-deep border border-white/12 rounded-md px-3 py-2 text-sm"
              />
              <button
                onClick={() => {
                  startTransition(() => addRequestNote(req.id, noteText));
                  setNoteText("");
                }}
                disabled={!noteText.trim() || isPending}
                className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-brand-blue disabled:opacity-40"
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
