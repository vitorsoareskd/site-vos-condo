import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { TabType } from '../types';
import { ArrowRight, Calculator, CheckCircle2, Shield, Building2 } from 'lucide-react';
import { ParticulasBackground } from './ParticulasBackground';

interface HeroSectionProps {
  setActiveTab: (tab: TabType) => void;
  onOpenQuoteModal: (planId?: string) => void;
  onScrollToSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onOpenQuoteModal,
  onScrollToSimulator
}) => {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28 isolate">
      {/* Canvas com Partículas Flutuantes */}
      <ParticulasBackground />

      {/* Background Soft Pastel Ambient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0">
        <div className="w-96 h-96 bg-[#DDEBF5] rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute top-0 -left-10" />
        <div className="w-96 h-96 bg-[#EAF3ED] rounded-full mix-blend-multiply filter blur-3xl opacity-35 absolute bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-8">
        {/* Minimalist Pill Eyebrow - Size 4 (text-xs) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60 shadow-2xs"
        >
          <span>Administradora de Condomínios • Plataforma Inteligente</span>
        </motion.div>

        {/* Main Headline - Size 1 (text-3xl sm:text-4xl lg:text-5xl) with uniform typography */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extralight leading-[1.15] text-[#1A1A1A] tracking-tight"
        >
          Quem tem VOS,
          <br />
          não tem problemas.
        </motion.h1>

        {/* Subtitle - Size 3 (text-sm) in cinza claro with font-light */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-[#8E9DA4] leading-relaxed max-w-2xl mx-auto font-light"
        >
          {COMPANY_INFO.subtagline} Unimos o legado de quem entende de construção civil à inteligência da gestão moderna com transparência sem atritos.
        </motion.p>

        {/* Feature Checkpoints styled with subtle pills - Size 4 (text-xs) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs uppercase tracking-wider text-[#3F5E4D]"
        >
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E8EFEA] shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3F5E4D]" />
            <span className="text-[#1A1A1A]">uCondo Incluso</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E8EFEA] shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-[#3F5E4D]" />
            <span className="text-[#1A1A1A]">Transparência Real</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E8EFEA] shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-[#3F5E4D]" />
            <span className="text-[#1A1A1A]">Saúde Predial</span>
          </div>
        </motion.div>

        {/* Action Buttons - Size 4 (text-xs) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            id="hero-plans-button"
            onClick={() => {
              setActiveTab('planos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-[#1E3A2D] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#14281E] hover:scale-[1.02] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>Ver Planos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="hero-simulate-button"
            onClick={onScrollToSimulator}
            className="w-full sm:w-auto border border-[#E8EFEA] bg-white/70 backdrop-blur-xs text-[#1E3A2D] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white hover:border-[#1E3A2D] transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="w-3.5 h-3.5 text-[#3F5E4D]" />
            <span>Simulador Predial</span>
          </button>
        </motion.div>

        {/* Quick Contact Line - Size 4 (text-xs) */}
        <div className="pt-2 text-xs text-[#8E9DA4] font-light">
          Ou solicite um orçamento direto via WhatsApp:{' '}
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#1E3A2D] underline hover:text-[#14281E]"
          >
            {COMPANY_INFO.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
};
