import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { TabType } from '../types';
import {
  Calculator,
  Sparkles,
  ArrowRight,
  Clock,
  TrendingDown,
  Building,
  CheckCircle2,
  Sliders,
  MessageCircle
} from 'lucide-react';

interface CondoSimulatorProps {
  setActiveTab: (tab: TabType) => void;
  onOpenQuoteModal: (planId?: string) => void;
}

export const CondoSimulator: React.FC<CondoSimulatorProps> = ({
  setActiveTab,
  onOpenQuoteModal
}) => {
  const [units, setUnits] = useState(36);
  const [condoType, setCondoType] = useState<'residencial' | 'comercial'>('residencial');
  const [goal, setGoal] = useState<'gestao' | 'completo' | 'financas' | 'digital'>('gestao');

  // Recommendation engine based on inputs
  const getRecommendation = () => {
    if (goal === 'completo') {
      return {
        planId: '360',
        name: 'Vos 360',
        tagline: 'Gestão executiva total, combate ativo à inadimplência e consultoria presencial.',
        badge: 'Mais Escolhido',
        hoursSaved: '25h+ / semana',
        highlight: 'Assessoria completa + Condução presencial de assembleias + Gerente exclusivo',
        color: 'border-white/60 bg-white/90'
      };
    } else if (goal === 'gestao') {
      return {
        planId: 'pulse',
        name: 'Vos Pulse',
        tagline: 'Acompanhamento proativo com o inovador Relatório Pulse de Saúde Predial.',
        badge: 'Recomendado',
        hoursSaved: '18h / semana',
        highlight: 'Relatório Pulse PDF + Controle de prazos de manutenção e seguros + Suporte prioritário',
        color: 'border-white/60 bg-white/90'
      };
    } else if (goal === 'financas') {
      return {
        planId: 'essencial',
        name: 'Vos Essencial',
        tagline: 'Contabilidade rigorosa, conciliação e suporte básico ao síndico.',
        badge: 'Equilíbrio Orçamentário',
        hoursSaved: '12h / semana',
        highlight: 'Balancete mensal + Previsão orçamentária anual + Cobrança de atrasos',
        color: 'border-white/60 bg-white/90'
      };
    } else {
      return {
        planId: 'starter',
        name: 'Vos Starter',
        tagline: 'Autonomia com baixo custo e app completo uCondo.',
        badge: 'Autonomia & App',
        hoursSaved: '6h / semana',
        highlight: 'App para moradores + 2ª via de boletos + reservas sem papel',
        color: 'border-white/60 bg-white/90'
      };
    }
  };

  const rec = getRecommendation();

  const handleWhatsAppQuote = () => {
    const typeLabel = condoType === 'residencial' ? 'Residencial' : 'Comercial';
    const text = encodeURIComponent(
      `Olá, fiz a simulação no site da Vos Condomínios!\n` +
      `• Unidades: ${units}\n` +
      `• Tipo: Condomínio ${typeLabel}\n` +
      `• Plano Recomendado: ${rec.name}\n` +
      `Gostaria de agendar uma conversa e solicitar um orçamento personalizado!`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappClean}?text=${text}`, '_blank');
  };

  return (
    <section id="simulador" className="py-24 border-t border-[#E8EFEA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* Size 4 (text-xs) */}
          <div className="inline-block px-4 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
            <span>Simulador Interativo • VOSCONDO</span>
          </div>

          {/* Size 1 standardized (text-3xl sm:text-4xl lg:text-5xl) */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#1A1A1A] tracking-tight leading-[1.15]">
            Descubra o plano ideal para <span className="italic font-serif">o seu condomínio</span>
          </h2>

          {/* Size 3 (text-sm) */}
          <p className="text-sm text-[#8E9DA4] font-light leading-relaxed">
            Ajuste os parâmetros do seu prédio e visualize instantaneamente a recomendação com estimativa de ganho de tempo e transparência.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-[36px] bg-white/80 backdrop-blur-md border border-white/60 shadow-sm space-y-8">
            
            {/* Control 1: Units Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="units-slider" className="text-xs font-medium uppercase tracking-wider text-[#8E9DA4]">
                  Número de Unidades
                </label>
                <span className="text-sm font-light text-[#1A1A1A] bg-[#F7FAF8] px-3.5 py-1 rounded-full border border-[#E8EFEA]">
                  {units} {units === 1 ? 'unidade' : 'unidades'}
                </span>
              </div>

              <input
                id="units-slider"
                type="range"
                min="8"
                max="180"
                step="2"
                value={units}
                onChange={(e) => setUnits(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#E8EFEA] rounded-lg appearance-none cursor-pointer accent-[#1E3A2D]"
              />

              <div className="flex justify-between text-xs text-[#8E9DA4] font-light">
                <span>Pequeno (8)</span>
                <span>Médio (60)</span>
                <span>Grande porte (180+)</span>
              </div>
            </div>

            {/* Control 2: Condo Type - Only 2 models: Comercial and Residencial */}
            <div className="space-y-3">
              <label className="text-xs font-medium uppercase tracking-wider text-[#8E9DA4]">
                Tipo de Condomínio
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'residencial', label: 'Residencial' },
                  { id: 'comercial', label: 'Comercial' }
                ].map((type) => (
                  <button
                    key={type.id}
                    id={`condo-type-${type.id}`}
                    onClick={() => setCondoType(type.id as 'residencial' | 'comercial')}
                    className={`py-3 px-4 rounded-full text-xs uppercase tracking-wider transition-all text-center ${
                      condoType === type.id
                        ? 'bg-[#1E3A2D] text-white font-medium shadow-xs'
                        : 'bg-[#F7FAF8] border border-[#E8EFEA] text-[#8E9DA4] hover:bg-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Main Goal */}
            <div className="space-y-3">
              <label className="text-xs font-medium uppercase tracking-wider text-[#8E9DA4]">
                Prioridade da Gestão
              </label>

              <div className="space-y-2">
                {[
                  { id: 'gestao', label: 'Prioridade da Gestão (Saúde predial preventiva e suporte prioritário)' },
                  { id: 'completo', label: 'Assessoria completa com condução presencial' },
                  { id: 'financas', label: 'Equilíbrio orçamentário e combate a atrasos' },
                  { id: 'digital', label: 'Autonomia com app e modernização digital' }
                ].map((item) => (
                  <label
                    key={item.id}
                    id={`goal-option-${item.id}`}
                    onClick={() => setGoal(item.id as any)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      goal === item.id
                        ? 'bg-[#EAF3ED] border-white/60 text-[#1E3A2D]'
                        : 'bg-[#F7FAF8] border-[#E8EFEA] text-[#8E9DA4] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      checked={goal === item.id}
                      onChange={() => setGoal(item.id as any)}
                      className="accent-[#1E3A2D]"
                    />
                    <span className="text-sm font-light leading-snug text-[#1A1A1A]">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Results Card Column */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.div
              key={rec.planId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-[36px] bg-white/80 backdrop-blur-md border border-white/60 flex-1 flex flex-col justify-between shadow-sm transition-all duration-200"
            >
              <div className="space-y-6">
                
                {/* Result Eyebrow */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF3ED] text-xs font-semibold uppercase tracking-widest text-[#3F5E4D]">
                    <Sparkles className="w-3.5 h-3.5 text-[#3F5E4D]" />
                    {rec.badge}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-[#8E9DA4]">
                    Recomendação Vos
                  </span>
                </div>

                {/* Plan Name & Tagline */}
                <div>
                  {/* Size 2 (text-xl) */}
                  <h3 className="text-xl font-light text-[#1A1A1A] tracking-tight">
                    {rec.name}
                  </h3>
                  {/* Size 3 (text-sm) */}
                  <p className="text-sm text-[#8E9DA4] mt-1 font-light">
                    {rec.tagline}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-5 rounded-[24px] bg-[#F7FAF8] border border-[#E8EFEA] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#8E9DA4] uppercase tracking-wider font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#3F5E4D]" />
                      <span>Tempo Poupado</span>
                    </div>
                    {/* Size 2 (text-xl) */}
                    <div className="text-xl font-light text-[#1A1A1A]">
                      {rec.hoursSaved}
                    </div>
                    <div className="text-xs text-[#8E9DA4] font-light">
                      Menos estresse burocrático
                    </div>
                  </div>

                  <div className="p-5 rounded-[24px] bg-[#F7FAF8] border border-[#E8EFEA] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#8E9DA4] uppercase tracking-wider font-medium">
                      <TrendingDown className="w-3.5 h-3.5 text-[#3F5E4D]" />
                      <span>Eficiência Contábil</span>
                    </div>
                    {/* Size 2 (text-xl) */}
                    <div className="text-xl font-light text-[#1A1A1A]">
                      100% Digital
                    </div>
                    <div className="text-xs text-[#8E9DA4] font-light">
                      Boletos e prestação ao vivo
                    </div>
                  </div>
                </div>

                {/* Key Benefit */}
                <div className="p-5 rounded-[24px] bg-white border border-[#E8EFEA] flex items-start gap-3 text-sm text-[#1A1A1A] font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#3F5E4D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-normal text-[#1A1A1A]">Destaque do pacote:</span>{' '}
                    <span className="text-[#8E9DA4]">{rec.highlight}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-8 space-y-3">
                <button
                  id="simulator-whatsapp-quote"
                  onClick={handleWhatsAppQuote}
                  className="w-full bg-[#1E3A2D] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#14281E] hover:scale-[1.02] transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white/80" />
                  <span>Enviar Simulação via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-2">
                  <button
                    id="simulator-view-all-plans"
                    onClick={() => {
                      setActiveTab('planos');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 px-4 rounded-full text-xs font-medium uppercase tracking-wider text-[#1E3A2D] bg-[#F7FAF8] border border-[#E8EFEA] hover:bg-white transition-colors text-center"
                  >
                    Ver todos os planos
                  </button>

                  <button
                    id="simulator-custom-form"
                    onClick={() => onOpenQuoteModal(rec.planId)}
                    className="flex-1 py-3 px-4 rounded-full text-xs font-medium uppercase tracking-wider text-[#3F5E4D] bg-[#EAF3ED] border border-white/60 hover:bg-white transition-colors text-center"
                  >
                    Proposta formal
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
