import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import {
  Hammer,
  ShieldCheck,
  Users,
  FileCheck,
  Zap,
  Target,
  Compass,
  Award
} from 'lucide-react';

export const StoryAndValues: React.FC = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-[#3F5E4D]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#3F5E4D]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#3F5E4D]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#3F5E4D]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#3F5E4D]" />;
      default:
        return <Award className="w-5 h-5 text-[#3F5E4D]" />;
    }
  };

  return (
    <section className="py-24 border-y border-[#E8EFEA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
        
        {/* Story Section: Onde Tudo Começou */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            {/* Size 4 (text-xs) */}
            <div className="inline-block px-4 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
              <span>Tradição & Raízes</span>
            </div>
            
            {/* Size 1 standardized (text-3xl sm:text-4xl lg:text-5xl) */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#1A1A1A] tracking-tight leading-[1.15]">
              Onde tudo começou
            </h2>
            
            {/* Size 3 (text-sm) */}
            <p className="text-[#8E9DA4] text-sm leading-relaxed font-light">
              {COMPANY_INFO.story.p1}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[36px] bg-white/80 backdrop-blur-md border border-white/60 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#DDEBF5] rounded-full filter blur-3xl opacity-25 -z-0" />
              <div className="relative z-10 space-y-5">
                {/* Size 3 (text-sm) */}
                <p className="text-[#1A1A1A] text-sm sm:text-base leading-relaxed font-light">
                  {COMPANY_INFO.story.p2}
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-wider text-[#8E9DA4]">
                  <span className="flex items-center gap-2 bg-[#F7FAF8] px-3.5 py-1.5 rounded-full border border-[#E8EFEA]">
                    <span className="w-2 h-2 rounded-full bg-[#3F5E4D]" />
                    <span className="text-[#1A1A1A]">Construção Civil</span>
                  </span>
                  <span className="flex items-center gap-2 bg-[#F7FAF8] px-3.5 py-1.5 rounded-full border border-[#E8EFEA]">
                    <span className="w-2 h-2 rounded-full bg-[#3F5E4D]" />
                    <span className="text-[#1A1A1A]">Gestão Inteligente</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Missão Card */}
          <div className="p-8 sm:p-10 rounded-[36px] bg-white/80 backdrop-blur-md border border-white/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#EAF3ED] flex items-center justify-center text-[#3F5E4D]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              {/* Size 2 (text-xl) */}
              <div className="text-xl font-light text-[#1A1A1A]">Nossa Missão</div>
              {/* Size 3 (text-sm) */}
              <p className="text-sm text-[#8E9DA4] mt-3 leading-relaxed font-light">
                {COMPANY_INFO.mission}
              </p>
            </div>
          </div>

          {/* Visão Card */}
          <div className="p-8 sm:p-10 rounded-[36px] bg-white/80 backdrop-blur-md border border-white/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#DDEBF5] flex items-center justify-center text-[#3F5E4D]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              {/* Size 2 (text-xl) */}
              <div className="text-xl font-light text-[#1A1A1A]">Nossa Visão</div>
              {/* Size 3 (text-sm) */}
              <p className="text-sm text-[#8E9DA4] mt-3 leading-relaxed font-light">
                {COMPANY_INFO.vision}
              </p>
            </div>
          </div>

        </div>

        {/* Values Bento Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            {/* Size 4 (text-xs) */}
            <div className="inline-block px-4 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
              <span>Pilares Inegociáveis</span>
            </div>
            {/* Size 1 standardized (text-3xl sm:text-4xl lg:text-5xl) */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#1A1A1A] tracking-tight leading-[1.15]">
              Nossos Valores
            </h3>
            {/* Size 3 (text-sm) */}
            <p className="text-sm text-[#8E9DA4] font-light">
              Princípios que guiam cada assembleia, relatório contábil e decisão técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.values.map((val, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`p-7 rounded-[30px] bg-white/80 backdrop-blur-md border transition-all duration-200 flex flex-col justify-between ${
                  hoveredValue === idx
                    ? 'border-[#E8EFEA] shadow-md bg-white'
                    : 'border-[#E8EFEA] shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#F7FAF8] border border-[#E8EFEA] flex items-center justify-center">
                    {getIcon(val.icon)}
                  </div>
                  {/* Size 2 (text-xl) */}
                  <h4 className="text-xl font-light text-[#1A1A1A]">
                    {val.title}
                  </h4>
                  {/* Size 3 (text-sm) */}
                  <p className="text-sm text-[#8E9DA4] leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
                
                <div className="pt-4 mt-4 border-t border-[#E8EFEA] flex items-center justify-between text-xs uppercase tracking-wider text-[#8E9DA4]">
                  <span>Pilar 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F5E4D]" />
                </div>
              </motion.div>
            ))}

            {/* Clean Minimalism summary card */}
            <div className="p-7 rounded-[30px] bg-[#1E3A2D] text-white border border-[#1E3A2D] flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white/90" />
                </div>
                {/* Size 2 (text-xl) */}
                <h4 className="text-xl font-light text-white">
                  O Padrão Vos
                </h4>
                {/* Size 3 (text-sm) */}
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  Tranquilidade para o síndico, transparência para os conselheiros e valorização para o patrimônio de cada morador.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 text-xs uppercase tracking-wider text-white/60">
                Convivência em Harmonia
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
