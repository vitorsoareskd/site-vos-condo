import React from 'react';
import { TabType } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { MessageCircle, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E3A2D] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center p-1.5 backdrop-blur-xs">
                <img
                  src="/logo.png"
                  alt="Logo Vos"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-light tracking-tight text-white">
                Vos <span className="italic font-serif text-white/80">Condomínios</span>
              </span>
            </div>

            <p className="text-sm text-[#8E9DA4] max-w-sm leading-relaxed font-light">
              {COMPANY_INFO.tagline} {COMPANY_INFO.subtagline} Unindo o legado sólido da engenharia à transparência e agilidade da tecnologia uCondo.
            </p>

            <div className="pt-2 text-xs text-[#8E9DA4] font-light">
              Atendimento especializado para Curitiba e Região Metropolitana.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E9DA4]">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li>
                <button
                  onClick={() => handleNav('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dicas')}
                  className="hover:text-white transition-colors"
                >
                  Dicas para Síndicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('planos')}
                  className="hover:text-white transition-colors"
                >
                  Planos & Pacotes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuoteModal}
                  className="hover:text-white transition-colors"
                >
                  Solicitar Proposta
                </button>
              </li>
            </ul>
          </div>

          {/* Plans Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E9DA4]">
              Nossos Planos
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li>
                <button
                  onClick={() => handleNav('planos')}
                  className="hover:text-white transition-colors"
                >
                  Vos Starter (App uCondo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('planos')}
                  className="hover:text-white transition-colors"
                >
                  Vos Essencial (Contábil)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('planos')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Vos Pulse</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white font-medium uppercase tracking-wider">
                    Destaque
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('planos')}
                  className="hover:text-white transition-colors"
                >
                  Vos 360 (Gestão Completa)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E9DA4]">
              Fale Conosco
            </h4>
            <div className="space-y-2.5 text-xs text-white/80 font-light">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#8E9DA4] shrink-0" />
                <span>{COMPANY_INFO.whatsapp}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8E9DA4] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-[#8E9DA4] pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Curitiba - PR • Digital & Presencial</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9DA4] font-light">
          <div>
            © {new Date().getFullYear()} Vos Condomínios. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1">
            <span>Harmonia e solidez para o seu condomínio florescer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
