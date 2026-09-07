import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PLANS, COMPARISON_CATEGORIES } from '../data/plansData';
import { COMPANY_INFO } from '../data/companyData';
import {
  Check,
  Sparkles,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Sliders,
  Table,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PlanosViewProps {
  onOpenQuoteModal: (planId?: string) => void;
}

export const PlanosView: React.FC<PlanosViewProps> = ({ onOpenQuoteModal }) => {
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<string | null>('360');

  const handleWhatsAppForPlan = (planName: string) => {
    const text = encodeURIComponent(
      `Olá! Estava navegando nos planos da Vos Condomínios e me interessei pelo plano *${planName}*. Poderiam me passar uma proposta para o meu condomínio?`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappClean}?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 md:py-20 space-y-20">
      
      {/* Top Banner & Header */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        {/* Size 4 (text-xs) */}
        <div className="inline-block px-4 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
          <span>Planos Transparentes & Modulares</span>
        </div>

        {/* Size 1 standardized (text-3xl sm:text-4xl lg:text-5xl) */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#1A1A1A] tracking-tight leading-[1.15]">
          Conheça nossos <span className="italic font-serif">planos</span>
        </h1>

        {/* Size 3 (text-sm) */}
        <p className="text-sm text-[#8E9DA4] max-w-2xl mx-auto leading-relaxed font-light">
          Tecnologia de ponta a ponta para você. Desde a autonomia digital do aplicativo até a assessoria executiva 360° para o seu condomínio viver em harmonia.
        </p>

        {/* Highlight Banner about uCondo system from original site */}
        <div className="p-8 rounded-[32px] bg-white/70 backdrop-blur-md border border-white/60 text-center mt-6">
          <p className="text-sm text-[#8E9DA4] font-light leading-relaxed">
            &ldquo;Sabe a raiz forte e segura da nossa marca? É o sistema <span className="font-normal text-[#1A1A1A]">uCondo</span> trabalhando nos bastidores para automatizar as finanças e trazer facilidade e comunicação rápida com transparência total para seu condomínio, incluso em todos os nossos planos VOS!&rdquo;
          </p>
        </div>
      </div>

      {/* Main 4 Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const isPulse = plan.id === 'pulse';
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-[36px] p-8 flex flex-col justify-between transition-all duration-200 ${
                  isPulse
                    ? 'bg-white border-2 border-[#1E3A2D] shadow-md'
                    : 'bg-white/80 backdrop-blur-md border border-white/60 shadow-xs hover:border-[#E8EFEA]'
                }`}
              >
                {/* Popular Badge - Size 4 (text-xs) */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
                        isPulse
                          ? 'bg-[#1E3A2D] text-white shadow-xs'
                          : 'bg-[#EAF3ED] text-[#3F5E4D] border border-white/60'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-5 pt-2">
                  <div>
                    {/* Size 2 (text-xl) */}
                    <h3 className="text-xl font-light text-[#1A1A1A] tracking-tight">
                      {plan.name}
                    </h3>
                    {/* Size 4 (text-xs) */}
                    <p className="text-xs text-[#8E9DA4] font-light mt-1.5 min-h-[36px] leading-relaxed">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Level of support tag - Size 4 (text-xs) */}
                  <div className="flex items-center justify-between text-xs py-2 px-3.5 rounded-full bg-[#F7FAF8] border border-[#E8EFEA]">
                    <span className="text-[#8E9DA4] font-light uppercase tracking-wider text-xs">Suporte:</span>
                    <span className="font-medium text-[#1A1A1A]">{plan.supportLevel}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-medium uppercase tracking-widest text-[#8E9DA4]">
                      Incluso no plano:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#1A1A1A] font-light leading-snug">
                          <Check className="w-4 h-4 text-[#3F5E4D] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions & Notes */}
                <div className="pt-6 mt-6 border-t border-[#E8EFEA] space-y-3">
                  {plan.notes && (
                    <p className="text-xs text-[#8E9DA4] italic leading-tight font-light">
                      {plan.notes}
                    </p>
                  )}

                  <button
                    id={`plan-cta-${plan.id}`}
                    onClick={() => handleWhatsAppForPlan(plan.name)}
                    className={`w-full py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 ${
                      isPulse
                        ? 'bg-[#1E3A2D] text-white hover:bg-[#14281E] shadow-xs'
                        : 'bg-[#F7FAF8] text-[#1E3A2D] border border-[#E8EFEA] hover:bg-white'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#3F5E4D]" />
                    <span>Solicitar Orçamento</span>
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(plan.id)}
                    className="w-full text-center text-xs uppercase tracking-wider font-medium text-[#8E9DA4] hover:text-[#1A1A1A] transition-colors"
                  >
                    Proposta formal por formulário
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* "VOCÊ NÃO ESTÁ SOZINHO!" Banner from original site */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-[36px] bg-[#FAF4F0] border border-[#E8EFEA] space-y-5">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest">
            <span>Você não está sozinho</span>
          </div>

          {/* Size 1 (text-3xl) */}
          <h3 className="text-3xl font-light text-[#1A1A1A] tracking-tight">
            Parceria de verdade com <span className="italic font-serif">apoio técnico e humano</span>
          </h3>

          {/* Size 3 (text-sm) */}
          <p className="text-sm text-[#8E9DA4] leading-relaxed font-light">
            &ldquo;O plano Starter é só o começo! Pra quem busca uma parceria de verdade e quer uma equipe estratégica cuidando de cada detalhe técnico, conte com nossos planos de consultoria Essencial, Pulse e 360.&rdquo;
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <span className="text-xs uppercase tracking-wider font-medium text-[#1A1A1A] bg-white px-4 py-2 rounded-full border border-white/60">
              Suporte Jurídico
            </span>
            <span className="text-xs uppercase tracking-wider font-medium text-[#1A1A1A] bg-white px-4 py-2 rounded-full border border-white/60">
              Engenharia & Obras
            </span>
            <span className="text-xs uppercase tracking-wider font-medium text-[#1A1A1A] bg-white px-4 py-2 rounded-full border border-white/60">
              Combate à Inadimplência
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Comparison Table Toggle */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <button
            id="toggle-comparison-table"
            onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1E3A2D] bg-white/80 backdrop-blur-md border border-white/60 hover:bg-white transition-all shadow-xs"
          >
            <Table className="w-4 h-4 text-[#3F5E4D]" />
            <span>
              {showComparisonTable
                ? 'Ocultar Comparativo de Recursos'
                : 'Ver Matriz Comparativa Completa entre os Planos'}
            </span>
            {showComparisonTable ? (
              <ChevronUp className="w-4 h-4 text-[#1E3A2D]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#1E3A2D]" />
            )}
          </button>
        </div>

        {/* Detailed Table */}
        {showComparisonTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-x-auto rounded-[36px] bg-white/90 backdrop-blur-md border border-white/60 shadow-sm p-6 sm:p-8 space-y-6"
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E8EFEA] text-xs font-medium uppercase tracking-widest text-[#8E9DA4]">
                  <th className="py-4 px-4 w-2/5">Recurso ou Serviço</th>
                  <th className="py-4 px-3 text-center">Starter</th>
                  <th className="py-4 px-3 text-center">Essencial</th>
                  <th className="py-4 px-3 text-center">Pulse</th>
                  <th className="py-4 px-3 text-center bg-[#EAF3ED] text-[#1E3A2D] rounded-t-xl font-semibold">
                    360° ⭐
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EFEA]">
                {COMPARISON_CATEGORIES.map((cat, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr className="bg-[#F7FAF8]">
                      <td
                        colSpan={5}
                        className="py-3 px-4 font-medium text-xs uppercase tracking-widest text-[#1E3A2D]"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-white/60">
                        <td className="py-3.5 px-4 text-[#1A1A1A] font-light text-xs sm:text-sm">
                          {item.name}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {renderCellValue(item.starter)}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {renderCellValue(item.essencial)}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {renderCellValue(item.pulse)}
                        </td>
                        <td className="py-3.5 px-3 text-center bg-[#EAF3ED]/50 font-medium">
                          {renderCellValue(item.total)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* Closing Call To Action from original site */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-[36px] bg-[#1E3A2D] text-white text-center space-y-6 shadow-sm relative overflow-hidden">
          <div className="space-y-3">
            {/* Size 1 (text-3xl sm:text-4xl) */}
            <h3 className="text-3xl sm:text-4xl font-extralight tracking-tight">
              Está esperando o que ? <span className="italic font-serif">:)</span>
            </h3>
            {/* Size 3 (text-sm) */}
            <p className="text-sm text-white/80 max-w-xl mx-auto leading-relaxed font-light">
              Falar a mesma língua que os moradores nunca foi tão fácil quando a gente tem uma só Vos. Bora montar seu pacote? Plante essa semente :)
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="plan-footer-whatsapp"
              href={`https://wa.me/${COMPANY_INFO.whatsappClean}?text=Ol%C3%A1%2C%20gostaria%20de%20montar%20meu%20pacote%20personalizado%20com%20a%20Vos%20Condom%C3%ADnios`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-[#1E3A2D] hover:bg-[#EAF3ED] transition-all shadow-sm active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-[#3F5E4D]" />
              <span>Whatsapp: {COMPANY_INFO.whatsapp}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              Formulário online
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

function renderCellValue(val: boolean | string) {
  if (typeof val === 'boolean') {
    return val ? (
      <CheckCircle2 className="w-4 h-4 text-[#3F5E4D] mx-auto" />
    ) : (
      <span className="text-[#8E9DA4]">—</span>
    );
  }
  return (
    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#EAF3ED] text-[#3F5E4D]">
      {val}
    </span>
  );
}
