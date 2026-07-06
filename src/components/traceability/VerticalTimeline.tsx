// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp, FileText, Download } from 'lucide-react';

export default function VerticalTimeline({ suppliers }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('shakti:focus-supplier', { detail: { id: activeId } }));
  }, [activeId]);

  return (
    <section id="timeline" className="py-24 px-6 bg-[#f5f7fb] relative overflow-hidden">
      {/* Floating garment backdrop images */}
      <motion.img
        src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=70"
        alt=""
        aria-hidden
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:block absolute top-32 left-6 w-40 h-40 lg:w-52 lg:h-52 rounded-sm object-cover rotate-[-6deg] opacity-20 shadow-xl pointer-events-none"
      />
      <motion.img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=70"
        alt=""
        aria-hidden
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:block absolute top-1/2 right-6 w-44 h-44 lg:w-56 lg:h-56 rounded-sm object-cover rotate-[5deg] opacity-20 shadow-xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#3b6fa0]">Supply Chain Ledger</span>
        </motion.div>


        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#0f1b3d]/15 -translate-x-1/2" />

          <div className="space-y-3">
            {suppliers.map((supplier, i) => {
              const isOpen = activeId === supplier.id;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={supplier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8"
                >
                  {/* Left side card */}
                  <div className={isLeft ? 'flex justify-end' : ''}>
                    {isLeft && <Card supplier={supplier} isOpen={isOpen} onToggle={() => setActiveId(isOpen ? null : supplier.id)} align="right" />}
                  </div>

                  {/* Center badge */}
                  <div className="flex flex-col items-center pt-6">
                    <button
                      onClick={() => setActiveId(isOpen ? null : supplier.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg shrink-0 z-10 border transition-all ${
                        isOpen
                          ? 'bg-[#3b6fa0] text-[#f5f7fb] border-[#3b6fa0]'
                          : 'bg-[#f5f7fb] text-[#0f1b3d] border-[#0f1b3d]/25 hover:border-[#3b6fa0]'
                      }`}
                    >
                      {supplier.id}
                    </button>
                  </div>

                  {/* Right side card */}
                  <div className={!isLeft ? 'flex justify-start' : ''}>
                    {!isLeft && <Card supplier={supplier} isOpen={isOpen} onToggle={() => setActiveId(isOpen ? null : supplier.id)} align="left" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ supplier, isOpen, onToggle, align }) {
  const textAlign = align === 'right' ? 'text-right' : 'text-left';
  const itemsAlign = align === 'right' ? 'items-end' : 'items-start';

  return (
    <div
      onClick={onToggle}
      className={`w-full max-w-md bg-white hover:bg-white rounded-2xl border border-[#0f1b3d]/20 hover:border-[#3b6fa0]/50 px-6 py-5 cursor-pointer transition-all shadow-sm ${textAlign}`}
    >
      <div className={`flex flex-col ${itemsAlign}`}>
        <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#3b6fa0]">{supplier.stage_label}</p>
        <button className={`inline-flex items-center gap-1 mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f1b3d] hover:text-[#3b6fa0] ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {isOpen ? 'Hide details' : 'View details'}
        </button>

        {isOpen && (
          <>
            <p className="font-serif text-xl font-light text-[#0f1b3d] leading-tight mt-3">{supplier.name}</p>
            {supplier.address && (
              <div className={`flex items-center gap-1 mt-2 text-[#0f1b3d] ${align === 'right' ? 'flex-row-reverse' : ''}`}>
                <MapPin size={11} />
                <span className="font-sans text-xs">{supplier.address}</span>
              </div>
            )}
            {supplier.certifications?.length > 0 && (
              <div className={`flex flex-wrap gap-1 mt-3 ${align === 'right' ? 'justify-end' : ''}`}>
                {supplier.certifications.map((c) => (
                  <span key={c} className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#3b6fa0]/10 text-[#3b6fa0]">
                    {c}
                  </span>
                ))}
              </div>
            )}
            {supplier.certificate_url && (
              <a
                href={supplier.certificate_url}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`group inline-flex items-center justify-center gap-2 mt-4 px-5 py-3 rounded-xl bg-[#3b6fa0] hover:bg-[#0f1b3d] text-[#f5f7fb] font-sans text-xs uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-all ${align === 'right' ? 'self-end' : 'self-start'}`}
              >
                <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                Download Certificate
              </a>
            )}
          </>
        )}
      </div>

      {isOpen && supplier.sub_suppliers && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-[#0f1b3d]/10 space-y-3 text-left">
          {supplier.sub_suppliers.map((group, gi) => (
            <div key={gi}>
              {group.group && (
                <p className="font-sans text-xs font-semibold text-[#0f1b3d] underline mb-2">{group.group}</p>
              )}
              <div className="space-y-2">
                {group.items.map((item, ii) => (
                  <div
                    key={ii}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent('shakti:focus-supplier', { detail: { id: item.id } }));
                      const el = document.getElementById('map');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex items-start gap-3 bg-[#f5f7fb]/60 hover:bg-[#f5f7fb] hover:ring-1 hover:ring-[#3b6fa0]/40 rounded-xl p-3 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#0f1b3d] text-[#f5f7fb] flex items-center justify-center text-[10px] font-bold shrink-0">{item.id}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[9px] uppercase tracking-wider text-[#0f1b3d]/70">{item.sub_label}</p>
                      <p className="font-sans text-sm font-semibold text-[#0f1b3d]">{item.name}</p>
                      {item.description && <p className="font-sans text-xs text-[#0f1b3d] mt-0.5 leading-relaxed">{item.description}</p>}
                      <div className="flex items-center gap-1 mt-1 text-[#0f1b3d]/70">
                        <MapPin size={9} />
                        <span className="font-sans text-[10px]">{item.address}</span>
                      </div>
                      {item.certificate_url && (
                        <a
                          href={item.certificate_url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#3b6fa0] hover:bg-[#0f1b3d] text-[#f5f7fb] font-sans text-[10px] uppercase tracking-[0.2em] shadow-sm hover:shadow-md transition-all"
                        >
                          <Download size={12} />
                          Download Certificate
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {isOpen && !supplier.sub_suppliers && supplier.sustainability_description && (
        <p className="mt-4 pt-4 border-t border-[#0f1b3d]/10 font-sans text-xs text-[#0f1b3d]/85 text-left leading-relaxed">
          {supplier.sustainability_description}
        </p>
      )}
    </div>
  );
}
