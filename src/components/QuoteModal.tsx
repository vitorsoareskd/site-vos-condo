import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/companyData';
import {
  X,
  Sparkles,
  MessageCircle,
  Mail,
  Building,
  User,
  Hash,
  MapPin,
  CheckCircle2,
  Star
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlanId?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedPlanId = 'pulse'
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Síndico(a)');
  const [condoName, setCondoName] = useState('');
  const [city, setCity] = useState('Curitiba');
  const [units, setUnits] = useState('32');
  const [selectedPlan, setSelectedPlan] = useState(preselectedPlanId);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (isOpen && preselectedPlanId) {
      setSelectedPlan(preselectedPlanId);
    }
  }, [isOpen, preselectedPlanId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#34D399', '#8D4F37', '#CEEBD9']
      });
    } catch {}

    const text = encodeURIComponent(
      `Olá, equipe Vos Condomínios!\n\n` +
      `Gostaria de solicitar uma proposta comercial:\n` +
      `• Nome: ${name} (${role})\n` +
      `• Condomínio: ${condoName || 'A definir'}\n` +
      `• Cidade: ${city}\n` +
      `• Unidades: ${units}\n` +
      `• Plano Escolhido: Vos ${selectedPlan.toUpperCase()}\n` +
      (notes ? `• Observações: ${notes}\n` : '') +
      `\nAguardo contato para alinharmos os detalhes!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${COMPANY_INFO.whatsappClean}?text=${text}`, '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#1E3A2D]/40 backdrop-blur-xs"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-md rounded-[36px] p-8 sm:p-10 shadow-2xl border border-white/60 z-10 my-8"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#E8EFEA]">
          <div className="space-y-1.5">
            {/* Size 4 (text-xs) */}
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
              <span>Atendimento Consultivo</span>
            </div>
            {/* Size 1 standardized with uniform font and styling */}
            <h3 className="text-2xl sm:text-3xl font-extralight text-[#1A1A1A] tracking-tight leading-tight">
              Proposta Personalizada
            </h3>
            {/* Size 3 (text-sm) */}
            <p className="text-xs text-[#8E9DA4] font-light">
              Solicite um orçamento sob medida para o seu condomínio sem compromisso.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8E9DA4] hover:text-[#1A1A1A] hover:bg-[#F7FAF8] rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EAF3ED] border border-white/60 flex items-center justify-center mx-auto text-[#3F5E4D]">
              <CheckCircle2 className="w-8 h-8 text-[#3F5E4D]" />
            </div>
            {/* Size 2 (text-xl) */}
            <h4 className="text-xl font-light text-[#1A1A1A]">
              Solicitação Enviada com Sucesso!
            </h4>
            {/* Size 3 (text-sm) */}
            <p className="text-sm text-[#8E9DA4] max-w-sm mx-auto font-light">
              Estamos redirecionando você para o nosso WhatsApp oficial. Se a janela não abriu automaticamente, use o botão abaixo:
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#1E3A2D] hover:bg-[#14281E] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#3F5E4D]" />
                <span>Abrir Conversa no WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E9DA4] mb-1">
                  Seu Nome
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#8E9DA4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-full bg-[#F7FAF8] border border-[#E8EFEA] text-sm text-[#1A1A1A] focus:ring-2 focus:ring-[#1E3A2D]/20 focus:outline-none font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E9DA4] mb-1">
                  Sua Função
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-[#F7FAF8] border border-[#E8EFEA] text-sm text-[#1A1A1A] focus:ring-2 focus:ring-[#1E3A2D]/20 focus:outline-none font-light"
                >
                  <option value="Síndico(a) Morador(a)">Síndico(a) Morador(a)</option>
                  <option value="Síndico(a) Profissional">Síndico(a) Profissional</option>
                  <option value="Conselheiro(a) Fiscal/Consultivo">Conselheiro(a)</option>
                  <option value="Morador(a) Interessado">Morador(a) Interessado</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E9DA4] mb-1">
                  Nome do Condomínio
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-[#8E9DA4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Edifício Solar"
                    value={condoName}
                    onChange={(e) => setCondoName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-full bg-[#F7FAF8] border border-[#E8EFEA] text-sm text-[#1A1A1A] focus:ring-2 focus:ring-[#1E3A2D]/20 focus:outline-none font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E9DA4] mb-1">
                  Quantidade de Unidades
                </label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-[#8E9DA4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="4"
                    max="500"
                    required
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-full bg-[#F7FAF8] border border-[#E8EFEA] text-sm text-[#1A1A1A] focus:ring-2 focus:ring-[#1E3A2D]/20 focus:outline-none font-light"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E9DA4] mb-1">
                Plano de Interesse
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'starter', name: 'Starter' },
                  { id: 'essencial', name: 'Essencial' },
                  { id: 'pulse', name: 'Pulse' },
                  { id: '360', name: '360° Total' }
                ].map((p) => {
                  const isSelected = selectedPlan === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      id={`quote-plan-${p.id}`}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`py-2 px-2 text-xs uppercase tracking-wider rounded-full border text-center transition-all flex items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-[#1E3A2D] text-white font-medium shadow-xs border-transparent'
                          : 'bg-[#F7FAF8] border-[#E8EFEA] text-[#8E9DA4] hover:bg-white hover:text-[#1A1A1A]'
                      }`}
                    >
                      <span>{p.name}</span>
                      {isSelected && (
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0 inline-block" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E9DA4] mb-1">
                Observações ou Dúvidas (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Gostaria de saber sobre a transição da antiga administradora..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F7FAF8] border border-[#E8EFEA] text-sm text-[#1A1A1A] focus:ring-2 focus:ring-[#1E3A2D]/20 focus:outline-none font-light"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#1E3A2D] hover:bg-[#14281E] shadow-sm transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-[#3F5E4D]" />
                <span>Enviar Solicitação via WhatsApp</span>
              </button>
            </div>

            <div className="text-center text-xs text-[#8E9DA4] font-light">
              Ou envie diretamente por e-mail para{' '}
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Solicitação de Orçamento - ${condoName}`}
                className="font-normal text-[#1A1A1A] underline"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
