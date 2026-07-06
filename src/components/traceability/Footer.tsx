// @ts-nocheck
import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0f1b3d]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl font-light text-[#f5f7fb]">Kishor Exports</span>
          <span className="h-4 w-[1px] bg-[#f5f7fb]/20" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#f5f7fb]/40">
            Made in India
          </span>
        </div>
        <p className="font-sans text-[11px] text-[#f5f7fb]/30 tracking-wider">
          © 2026 Kishor Exports — Digital Traceability Archive
        </p>
      </div>
    </footer>
  );
}
