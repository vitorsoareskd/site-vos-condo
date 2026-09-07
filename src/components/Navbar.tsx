import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { MessageCircle, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenQuoteModal: (planId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'inicio', label: 'Página Inicial' },
    { id: 'dicas', label: 'Dicas' },
    { id: 'planos', label: 'Planos' }
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F7FAF8]/80 border-b border-[#E8EFEA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div
          id="brand-header"
          onClick={() => handleTabClick('inicio')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#EAF3ED] border border-white/80 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-200 shadow-2xs">
            <img
              src="/logo.png"
              alt="Vos Condomínios Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-light tracking-[0.22em] uppercase text-[#1A1A1A]">
              VOS CONDO
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav
          id="desktop-navigation"
          className="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-[#8E9DA4]"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`relative py-1 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#1E3A2D] font-semibold'
                    : 'hover:text-[#1A1A1A]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1E3A2D]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            id="whatsapp-header-button"
            href={`https://wa.me/${COMPANY_INFO.whatsappClean}?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20administra%C3%A7%C3%A3o%20de%20condom%C3%ADnios%20da%20Vos`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1E3A2D] bg-white/80 border border-[#E8EFEA] rounded-full hover:bg-white hover:border-[#1E3A2D] transition-all duration-200"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#3F5E4D]" />
            <span>{COMPANY_INFO.whatsapp}</span>
          </a>

          <button
            id="request-quote-button"
            onClick={() => onOpenQuoteModal()}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white bg-[#1E3A2D] hover:bg-[#14281E] rounded-full transition-all duration-200 shadow-xs hover:shadow-sm active:scale-98"
          >
            <span>Solicitar Proposta</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-quote-button"
            onClick={() => onOpenQuoteModal()}
            className="px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#1E3A2D] rounded-full"
          >
            Proposta
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E3A2D] hover:bg-[#EAF3ED] rounded-xl transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#E8EFEA] bg-[#F7FAF8] px-6 pt-4 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm uppercase tracking-widest font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-white text-[#1E3A2D] font-semibold border border-[#E8EFEA]'
                      : 'text-[#8E9DA4] hover:bg-white/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <span className="w-2 h-2 rounded-full bg-[#1E3A2D]" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8EFEA] space-y-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappClean}?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Vos%20Condom%C3%ADnios`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium uppercase tracking-wider text-[#1E3A2D] bg-white border border-[#E8EFEA] rounded-xl"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#3F5E4D]" />
                <span>WhatsApp: {COMPANY_INFO.whatsapp}</span>
              </a>

              <div className="text-center text-xs uppercase tracking-wider text-[#8E9DA4]">
                E-mail: {COMPANY_INFO.email}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
