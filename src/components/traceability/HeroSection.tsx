// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import p1 from '@/assets/kishor/product-1.asset.json';
import p2 from '@/assets/kishor/product-2.asset.json';
import p3 from '@/assets/kishor/product-3.asset.json';
import p4 from '@/assets/kishor/product-4.asset.json';
import p5 from '@/assets/kishor/product-5.asset.json';
import p6 from '@/assets/kishor/product-6.asset.json';
import p7 from '@/assets/kishor/product-7.asset.json';

const PRODUCTS = [
  { name: 'Ecru Windowpane Camp Shirt', category: 'Short Sleeve · SS26', image: p1.url },
  { name: 'Autumn Buffalo Overshirt', category: 'Flannel · AW26', image: p2.url },
  { name: 'Cabana Stripe Resort Shirt', category: 'Linen Blend · SS26', image: p3.url },
  { name: 'Espresso Linen Camp Shirt', category: 'Pure Linen · Resort', image: p4.url },
  { name: 'Glacier Check Overshirt', category: 'Brushed Cotton · AW26', image: p5.url },
  { name: 'Highland Tartan Flannel', category: 'Yarn Dyed · AW26', image: p6.url },
  { name: 'Riviera Racing Stripe Polo', category: 'Piqué Knit · SS26', image: p7.url },
];

export default function HeroSection() {
  const [selected, setSelected] = useState(PRODUCTS[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const closeLightbox = () => {
    if (typeof window !== 'undefined' && window.history.state && window.history.state.lightbox) {
      window.history.back();
    } else {
      setLightboxOpen(false);
    }
  };
  const openLightbox = (idx) => {
    setSlideIndex(idx);
    setLightboxOpen(true);
    try { window.history.pushState({ lightbox: true }, ''); } catch {}
  };
  const nextSlide = (e) => { e?.stopPropagation(); setSlideIndex((i) => (i + 1) % PRODUCTS.length); };
  const prevSlide = (e) => { e?.stopPropagation(); setSlideIndex((i) => (i - 1 + PRODUCTS.length) % PRODUCTS.length); };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onPop = () => setLightboxOpen(false);
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('popstate', onPop);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen]);

  useEffect(() => {
    PRODUCTS.forEach((p) => { const img = new Image(); img.src = p.image; });
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen px-6 pt-24 pb-20 relative overflow-hidden"
      style={{ background: '#f5f7fb' }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Magazine masthead */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#3b6fa0]">Volume I · Traceability Dossier</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="h-px w-16 bg-[#0f1b3d]/30" />
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#0f1b3d]/70">Kishor Exports · Ranchi</p>
            <span className="h-px w-16 bg-[#0f1b3d]/30" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl italic font-normal tracking-tight text-[#0f1b3d] leading-[0.95] mt-6">
            From fibre<br />to finished garment.
          </h1>
          <p className="font-sans text-sm md:text-base text-[#0f1b3d]/70 max-w-2xl mx-auto mt-6 leading-relaxed">
            Every shirt, overshirt and polo we ship carries a documented lineage — mill, dyer, trims, packer and factory floor. Explore the full journey of our SS26 & AW26 line below.
          </p>
        </motion.div>

        {/* Magazine layout — featured product + supporting grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Featured */}
          <motion.button
            key={selected.name}
            type="button"
            onClick={() => openLightbox(PRODUCTS.indexOf(selected))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-7 relative aspect-[4/5] rounded-sm overflow-hidden bg-white shadow-xl group cursor-zoom-in"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selected.image}
                src={selected.image}
                alt={selected.name}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f1b3d]/90 via-[#0f1b3d]/40 to-transparent p-6 md:p-8 text-left">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#e8edf3]/80">Featured Piece</p>
              <p className="font-serif text-2xl md:text-4xl italic text-[#f5f7fb] leading-tight mt-2">{selected.name}</p>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#e8edf3]/70 mt-1">{selected.category}</p>
            </div>
          </motion.button>

          {/* Side stack — first 3 supporting */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
            {PRODUCTS.filter((p) => p !== selected).slice(0, 4).map((p, i) => (
              <motion.button
                key={p.name}
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="relative aspect-[4/5] rounded-sm overflow-hidden bg-white shadow-md group"
              >
                <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f1b3d]/85 to-transparent p-3 text-left">
                  <p className="font-serif text-sm md:text-base italic text-[#f5f7fb] leading-tight">{p.name}</p>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#e8edf3]/70 mt-0.5">{p.category}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Full lookbook strip */}
        <div className="mt-10 border-t border-[#0f1b3d]/15 pt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#0f1b3d]/60">The Line · SS26 / AW26</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#3b6fa0]">Tap to open lookbook</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => { setSelected(p); openLightbox(i); }}
                className={`relative aspect-[3/4] rounded-sm overflow-hidden ring-1 transition-all ${
                  selected.name === p.name ? 'ring-[#0f1b3d] ring-2' : 'ring-[#0f1b3d]/15 hover:ring-[#3b6fa0]'
                }`}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <button
            onClick={() => document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-3 bg-[#0f1b3d] text-[#f5f7fb] font-sans text-xs uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:bg-[#3b6fa0] transition-all duration-300"
          >
            Begin the Traceability Journey
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-[#0f1b3d]/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-6 right-6 z-[110] text-white/90 hover:text-white text-3xl leading-none w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30"
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative flex items-center justify-center w-full h-full">
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <AnimatePresence mode="wait">
                <motion.img
                  key={slideIndex}
                  src={PRODUCTS[slideIndex].image}
                  alt={PRODUCTS[slideIndex].name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-[88vw] max-h-[82vh] object-contain rounded-sm shadow-2xl"
                />
              </AnimatePresence>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <p className="font-serif text-lg italic text-[#f5f7fb]">{PRODUCTS[slideIndex].name}</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#e8edf3]/70 mt-1">{PRODUCTS[slideIndex].category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
