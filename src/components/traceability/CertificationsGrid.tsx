// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck } from 'lucide-react';

const CERTS = [
  {
    name: 'GOTS',
    fullName: 'Global Organic Textile Standard',
    description:
      'Ensures organic status of textiles from harvesting of raw materials through environmentally and socially responsible manufacturing.',
    scope: 'Raw Material → Final Product',
  },
  {
    name: 'OEKO-TEX Standard 100',
    fullName: 'Tested for Harmful Substances',
    description:
      'Every component of the product is tested for harmful substances to ensure it is safe for human health.',
    scope: 'Yarn, Fabric & Trims',
  },
  {
    name: 'Fair Trade',
    fullName: 'Fair Trade Certified',
    description:
      'Guarantees fair wages, safe working conditions, and community development for every worker in our supply chain.',
    scope: 'CMT Facility',
  },
  {
    name: 'SA8000',
    fullName: 'Social Accountability International',
    description:
      'Certification covering child labour, forced labour, health and safety, and working hours — ensuring dignified workplaces.',
    scope: 'CMT Facility',
  },
  {
    name: 'ISO 14001',
    fullName: 'Environmental Management Systems',
    description:
      'Framework for environmental management to systematically reduce impact across fabric processing and packaging facilities.',
    scope: 'Fabric Processing, Packaging',
  },
  {
    name: 'FSC',
    fullName: 'Forest Stewardship Council',
    description:
      'All packaging materials sourced from responsibly managed forests — ensuring environmental and social benefits.',
    scope: 'Packaging Only',
  },
];

export default function CertificationsGrid() {
  return (
    <section id="certifications" className="py-24 md:py-36 px-6 bg-[#f5f7fb]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#3b6fa0]">
            The Certification Vault
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#0f1b3d] mt-3">
            Verified Standards
          </h2>
          <p className="font-sans text-base text-[#0f1b3d]/50 mt-4 max-w-sm mx-auto">
            Every badge represents an independent third-party audit of our supply chain.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-[#0f1b3d]/8 p-6 hover:border-[#3b6fa0]/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#3b6fa0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#3b6fa0]/15 transition-colors">
                  <Shield size={18} className="text-[#3b6fa0]" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-[#0f1b3d]">{cert.name}</h3>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#3b6fa0]/70">{cert.scope}</p>
                </div>
              </div>
              <p className="font-sans text-sm text-[#0f1b3d]/55 leading-relaxed mb-5">
                {cert.description}
              </p>
              <button className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.15em] text-[#3b6fa0] hover:text-[#0f1b3d] transition-colors">
                <FileCheck size={13} />
                View Certificate
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
