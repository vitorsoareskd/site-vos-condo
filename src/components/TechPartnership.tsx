import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  CreditCard,
  CalendarCheck,
  PackageCheck,
  Video,
  Users,
  CheckCircle,
  ExternalLink,
  Lock,
  Download
} from 'lucide-react';

export const TechPartnership: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'app',
      icon: Smartphone,
      title: 'App Completo para Moradores & Síndico',
      shortDesc: 'Disponível para iOS e Android com licença total inclusa em todos os planos.',
      bullets: [
        'Acesso rápido a comunicados oficiais sem papel na portaria',
        'Emissão de 2ª via de boletos com código PIX dinâmico com 1 clique',
        'Notificações em tempo real sobre entregas e visitantes',
        'Interface limpa, moderna e acessível para todas as idades'
      ],
      previewHeadline: 'O condomínio inteiro na palma da mão',
      previewHighlight: 'iOS & Android'
    },
    {
      id: 'finance',
      icon: CreditCard,
      title: 'Transparência Financeira em Tempo Real',
      shortDesc: 'Chega de esperar o final do mês para entender as contas do condomínio.',
      bullets: [
        'Acompanhamento ao vivo de receitas e despesas ordinárias',
        'Conciliação bancária automatizada com extrato oficial',
        'Relatórios gráficos simples para entendimento de qualquer morador',
        'Balancete mensal digital disponível para consulta a qualquer hora'
      ],
      previewHeadline: 'Controle de cada centavo com clareza',
      previewHighlight: '100% Transparente'
    },
    {
      id: 'reservas',
      icon: CalendarCheck,
      title: 'Reservas de Espaços & Mural de Trocas',
      shortDesc: 'Salão de festas, churrasqueira, academia e piscina sem livro físico ou conflito de datas.',
      bullets: [
        'Regras e termos de uso aceitos digitalmente antes da reserva',
        'Bloqueio automático de inadimplentes conforme regimento interno',
        'Mural exclusivo entre vizinhos para empréstimo de ferramentas, doações e serviços',
        'Enquetes rápidas para decisões cotidianas da comunidade'
      ],
      previewHeadline: 'Fim dos conflitos de agenda',
      previewHighlight: 'Sem Papel'
    },
    {
      id: 'seguranca',
      icon: PackageCheck,
      title: 'Portaria, Encomendas & Livro de Ocorrências',
      shortDesc: 'Segurança perimetral e registro fotográfico de todas as chegadas.',
      bullets: [
        'Controle ágil de entregas de encomendas com foto no app',
        'Livro de ocorrências digital auditável, sem rasuras e com resposta documentada',
        'Pré-autorização de convidados e prestadores de serviço com QR Code',
        'Histórico completo de visitas e chamados técnicos'
      ],
      previewHeadline: 'Portaria eficiente e pacotes seguros',
      previewHighlight: 'Auditável'
    },
    {
      id: 'assembleia',
      icon: Video,
      title: 'Assembleias Virtuais Integradas',
      shortDesc: 'Votações democráticas, auditáveis e dentro da Lei 14.309/2022.',
      bullets: [
        'Pautas organizadas com antecedência e documentos anexados para leitura prévia',
        'Votação eletrônica com contagem rigorosa de fração ideal de cada unidade',
        'Gravação e ata digital simples registradas com segurança',
        'Participação média de moradores sobe de 15% para mais de 60%'
      ],
      previewHeadline: 'Decisões democráticas sem filas e sem brigas',
      previewHighlight: 'Votação Segura'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Header with original quote */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Size 4 (text-xs) */}
          <div className="inline-block px-4 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
            <span>Parceria Estrutural • Sistema uCondo</span>
          </div>

          {/* Size 1 standardized with increased font size for "para você" */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#1A1A1A] tracking-tight leading-[1.15]">
            Tecnologia de ponta a ponta <span className="italic font-serif text-[1.2em] sm:text-[1.25em] font-normal text-[#1A1A1A]">para você</span>
          </h2>

          {/* Size 3 (text-sm) */}
          <p className="text-sm text-[#8E9DA4] leading-relaxed font-light">
            &ldquo;Sabe a raiz forte e segura da nossa marca? É o sistema <span className="font-normal text-[#1A1A1A]">uCondo</span> trabalhando nos bastidores para automatizar as finanças e trazer facilidade e comunicação rápida com transparência total para seu condomínio, incluso em todos nossos planos VOS!&rdquo;
          </p>
        </div>

        {/* Feature switcher & interactive display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Left Column: Interactive Feature Pills */}
          <div className="lg:col-span-5 space-y-3">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              const isActive = activeFeature === idx;
              const isUcondoApp = feat.id === 'app';

              // Quando selecionado o App Completo, ativa o roxo uCondo com fonte branca
              let buttonStyle = 'bg-white/40 hover:bg-white/80 border border-transparent text-[#8E9DA4]';
              let iconStyle = 'bg-[#F7FAF8] border border-[#E8EFEA] text-[#3F5E4D]';
              let titleStyle = 'text-[#8E9DA4]';
              let descStyle = 'text-[#8E9DA4]';

              if (isActive) {
                if (isUcondoApp) {
                  // Alusão ao App uCondo: Roxo com fonte branca
                  buttonStyle = 'bg-[#6927B8] border border-[#5B21B6] shadow-md shadow-[#6927B8]/20 text-white';
                  iconStyle = 'bg-white text-[#6927B8] shadow-xs';
                  titleStyle = 'text-white font-medium';
                  descStyle = 'text-white/85';
                } else {
                  buttonStyle = 'bg-white border border-[#E8EFEA] shadow-sm text-[#1A1A1A]';
                  iconStyle = 'bg-[#1E3A2D] text-white';
                  titleStyle = 'text-[#1A1A1A] font-medium';
                  descStyle = 'text-[#8E9DA4]';
                }
              }

              return (
                <button
                  key={feat.id}
                  id={`tech-feature-${feat.id}`}
                  onClick={() => setActiveFeature(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-[24px] transition-all duration-200 flex items-start gap-4 ${buttonStyle}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${iconStyle}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    {/* Size 3 (text-sm) */}
                    <h4 className={`text-sm font-light ${titleStyle}`}>
                      {feat.title}
                    </h4>
                    {/* Size 4 (text-xs) */}
                    <p className={`text-xs mt-0.5 leading-snug font-light ${descStyle}`}>
                      {feat.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Mockup Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className={`p-8 sm:p-10 rounded-[36px] bg-white/80 backdrop-blur-md border shadow-sm space-y-6 transition-all duration-300 ${
                  activeFeature === 0 ? 'border-[#6927B8]/25 shadow-[#6927B8]/5' : 'border-white/60'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#E8EFEA]">
                  {/* Módulo uCondo • VOSCONDO: ao clicar ou quando App Completo está ativo, fica roxo com fonte branca */}
                  <button
                    type="button"
                    onClick={() => setActiveFeature(0)}
                    title="Alternar para módulo uCondo"
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeFeature === 0
                        ? 'bg-[#6927B8] text-white shadow-xs shadow-[#6927B8]/25 scale-[1.02]'
                        : 'bg-[#F7FAF8] hover:bg-[#F3E8FF] hover:text-[#6927B8] text-[#8E9DA4]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeFeature === 0 ? 'bg-white animate-pulse' : 'bg-[#3F5E4D]'
                      }`}
                    />
                    {/* Size 4 (text-xs) */}
                    <span
                      className={`text-xs font-medium uppercase tracking-widest ${
                        activeFeature === 0 ? 'text-white' : 'text-[#8E9DA4]'
                      }`}
                    >
                      Módulo uCondo • VOSCONDO
                    </span>
                  </button>

                  {/* Size 4 (text-xs) */}
                  <span
                    className={`text-xs font-medium uppercase tracking-wider px-3.5 py-1 rounded-full border transition-colors ${
                      activeFeature === 0
                        ? 'bg-[#6927B8]/10 text-[#6927B8] border-[#6927B8]/25 font-semibold'
                        : 'bg-[#EAF3ED] text-[#3F5E4D] border-white/60'
                    }`}
                  >
                    {features[activeFeature].previewHighlight}
                  </span>
                </div>

                <div>
                  {/* Size 2 (text-xl) */}
                  <h3 className="text-xl font-light text-[#1A1A1A] tracking-tight">
                    {features[activeFeature].previewHeadline}
                  </h3>
                  {/* Size 3 (text-sm) */}
                  <p className="text-sm text-[#8E9DA4] mt-1 font-light">
                    {features[activeFeature].shortDesc}
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {features[activeFeature].bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 text-sm text-[#1A1A1A] font-light">
                      <CheckCircle
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          activeFeature === 0 ? 'text-[#6927B8]' : 'text-[#3F5E4D]'
                        }`}
                      />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Micro preview card simulating app experience */}
                <div className="pt-4 mt-4 border-t border-[#E8EFEA] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8E9DA4]">
                  <span className="flex items-center gap-1.5 font-light">
                    <Lock
                      className={`w-3.5 h-3.5 ${
                        activeFeature === 0 ? 'text-[#6927B8]' : 'text-[#3F5E4D]'
                      }`}
                    />
                    Conformidade LGPD & Criptografia Ponta a Ponta
                  </span>
                  <span
                    className={`font-medium uppercase tracking-wider text-xs ${
                      activeFeature === 0 ? 'text-[#6927B8]' : 'text-[#3F5E4D]'
                    }`}
                  >
                    Incluso em todos os planos
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
