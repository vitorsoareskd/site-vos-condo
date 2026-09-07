import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoryAndValues } from './components/StoryAndValues';
import { TechPartnership } from './components/TechPartnership';
import { CondoSimulator } from './components/CondoSimulator';
import { PlanosView } from './components/PlanosView';
import { DicasView } from './components/DicasView';
import { QuoteModal } from './components/QuoteModal';
import { Footer } from './components/Footer';
import { COMPANY_INFO } from './data/companyData';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedPlanForQuote, setSelectedPlanForQuote] = useState<string>('pulse');

  const handleOpenQuoteModal = (planId?: string) => {
    if (planId) setSelectedPlanForQuote(planId);
    setQuoteModalOpen(true);
  };

  const handleScrollToSimulator = () => {
    if (activeTab !== 'inicio') {
      setActiveTab('inicio');
      setTimeout(() => {
        const el = document.getElementById('simulador');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('simulador');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] bg-clean-canvas text-[#1A1A1A] selection:bg-[#EAF3ED] selection:text-[#1E3A2D]">
      
      {/* Sticky Navbar with Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Content with Animated Tab Switching */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <HeroSection
                setActiveTab={setActiveTab}
                onOpenQuoteModal={handleOpenQuoteModal}
                onScrollToSimulator={handleScrollToSimulator}
              />

              {/* Story & Values Bento Section */}
              <StoryAndValues />

              {/* Tech & uCondo Integration Section */}
              <TechPartnership />

              {/* Interactive Condo Simulator */}
              <CondoSimulator
                setActiveTab={setActiveTab}
                onOpenQuoteModal={handleOpenQuoteModal}
              />

              {/* Teaser to Explore Plans */}
              <section className="py-20 bg-white/60 backdrop-blur-md border-t border-[#E8EFEA] text-center">
                <div className="max-w-4xl mx-auto px-4 space-y-6">
                  {/* Size 4 (text-xs) */}
                  <div className="inline-block px-4 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
                    <span>Transparência em Primeiro Lugar</span>
                  </div>
                  {/* Size 1 standardized (text-3xl sm:text-4xl lg:text-5xl) */}
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#1A1A1A] tracking-tight leading-[1.15]">
                    Pronto para transformar a gestão <span className="italic font-serif">do seu prédio</span>?
                  </h3>
                  {/* Size 3 (text-sm) */}
                  <p className="text-sm text-[#8E9DA4] max-w-xl mx-auto font-light leading-relaxed">
                    Conheça a composição detalhada de cada plano ou fale diretamente com a nossa equipe comercial no WhatsApp.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setActiveTab('planos');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-[#1E3A2D] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#14281E] hover:scale-[1.02] transition-all shadow-sm flex items-center gap-2"
                    >
                      <span>Ver Todos os Planos</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('dicas');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="border border-[#E8EFEA] bg-white/80 text-[#1A1A1A] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white hover:border-[#1E3A2D] transition-all shadow-xs"
                    >
                      Dicas para Síndicos
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'dicas' && (
            <motion.div
              key="dicas"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <DicasView />
            </motion.div>
          )}

          {activeTab === 'planos' && (
            <motion.div
              key="planos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <PlanosView onOpenQuoteModal={handleOpenQuoteModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Action Button (Clean Minimalist styling) */}
      <a
        id="floating-whatsapp-action"
        href={`https://wa.me/${COMPANY_INFO.whatsappClean}?text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Vos%20Condom%C3%ADnios%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 bg-[#1E3A2D] hover:bg-[#14281E] text-white font-medium text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group border border-white/20"
        aria-label="Falar no WhatsApp"
      >
        <span className="w-2 h-2 rounded-full bg-[#3F5E4D] animate-pulse" />
        <MessageCircle className="w-4 h-4 text-white" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* Quote / Proposal Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedPlanId={selectedPlanForQuote}
      />

      {/* Minimalist Pastel Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

    </div>
  );
}
