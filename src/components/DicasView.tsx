import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIPS } from '../data/tipsData';
import { TipItem } from '../types';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Share2,
  X,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const DicasView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vos_bookmarked_tips');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeTipModal, setActiveTipModal] = useState<TipItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('vos_bookmarked_tips', JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'todas', label: 'Todas as Dicas' },
    { id: 'financas', label: 'Finanças & Inadimplência' },
    { id: 'convivencia', label: 'Convivência & Regimento' },
    { id: 'manutencao', label: 'Manutenção Preventiva' },
    { id: 'juridico', label: 'Jurídico & Assembleias' },
    { id: 'tecnologia', label: 'Tecnologia & Portaria' }
  ];

  const filteredTips = TIPS.filter((tip) => {
    const matchesCategory =
      selectedCategory === 'todas' || tip.category === selectedCategory;
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.keyAdvice.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShareTip = (tip: TipItem) => {
    const text = `Dica Vos Condomínios: "${tip.title}" - ${tip.summary}`;
    if (navigator.share) {
      navigator.share({ title: tip.title, text: text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${tip.title}\n\n${tip.summary}\n\nConselho Vos: ${tip.keyAdvice}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="py-12 md:py-20 space-y-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        {/* Size 4 (text-xs) */}
        <div className="inline-block px-4 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] text-xs font-semibold uppercase tracking-widest border border-white/60">
          <span>Guia Prático • Síndicos & Condôminos</span>
        </div>

        {/* Size 1 standardized (text-3xl sm:text-4xl lg:text-5xl) */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#1A1A1A] tracking-tight leading-[1.15]">
          Dicas & <span className="italic font-serif">Melhores Práticas</span>
        </h1>

        {/* Size 3 (text-sm) */}
        <p className="text-sm text-[#8E9DA4] max-w-2xl mx-auto leading-relaxed font-light">
          Orientações práticas, embasadas em legislação e no dia a dia da administração condominial para valorizar seu imóvel e evitar conflitos.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8E9DA4] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="search-tips-input"
              type="text"
              placeholder="Buscar por inadimplência, barulho, assembleia, obras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-sm text-[#1A1A1A] placeholder-[#8E9DA4] focus:outline-none focus:ring-2 focus:ring-[#1E3A2D]/20 shadow-xs transition-all font-light"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider text-[#8E9DA4] hover:text-[#1A1A1A]"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#1E3A2D] text-white shadow-xs font-medium'
                  : 'bg-white/80 backdrop-blur-md border border-white/60 text-[#8E9DA4] hover:bg-white hover:text-[#1A1A1A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTips.length === 0 ? (
          <div className="p-12 text-center rounded-[36px] bg-white/80 backdrop-blur-md border border-white/60 max-w-md mx-auto space-y-3">
            <Lightbulb className="w-8 h-8 text-[#8E9DA4] mx-auto" />
            {/* Size 2 (text-xl) */}
            <h3 className="text-xl font-light text-[#1A1A1A]">
              Nenhuma dica encontrada
            </h3>
            {/* Size 4 (text-xs) */}
            <p className="text-xs text-[#8E9DA4] font-light">
              Tente buscar outros termos ou selecione &ldquo;Todas as Dicas&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todas');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-wider bg-[#EAF3ED] text-[#3F5E4D]"
            >
              Ver todas as dicas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => {
              const isBookmarked = bookmarkedIds.includes(tip.id);
              return (
                <motion.div
                  key={tip.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveTipModal(tip)}
                  className="p-7 rounded-[32px] bg-white/80 backdrop-blur-md border border-white/60 hover:border-[#E8EFEA] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Meta header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-widest px-3 py-0.5 rounded-full bg-[#EAF3ED] text-[#3F5E4D] border border-white/60">
                        {tip.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-[#8E9DA4] font-light">
                          <Clock className="w-3.5 h-3.5" />
                          {tip.readTime}
                        </span>
                        <button
                          onClick={(e) => toggleBookmark(tip.id, e)}
                          className="p-1 text-[#8E9DA4] hover:text-[#1A1A1A] transition-colors"
                          title={isBookmarked ? 'Remover dos favoritos' : 'Salvar dica'}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-[#3F5E4D] fill-[#3F5E4D]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Title & Summary */}
                    <div>
                      {/* Size 2 (text-xl) */}
                      <h3 className="text-xl font-light text-[#1A1A1A] group-hover:text-[#1E3A2D] transition-colors leading-snug">
                        {tip.title}
                      </h3>
                      {/* Size 3 (text-sm) */}
                      <p className="text-sm text-[#8E9DA4] mt-2 line-clamp-3 leading-relaxed font-light">
                        {tip.summary}
                      </p>
                    </div>

                    {/* Key Advice Teaser */}
                    <div className="p-3.5 rounded-[20px] bg-[#F7FAF8] border border-[#E8EFEA] text-xs text-[#1A1A1A] font-light">
                      <span className="font-normal text-[#1A1A1A]">Conselho Vos:</span>{' '}
                      <span className="line-clamp-2 text-[#8E9DA4]">{tip.keyAdvice}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8EFEA] flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#1E3A2D]">
                    <span>Ler passo a passo</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tip Detail Reader Modal */}
      <AnimatePresence>
        {activeTipModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTipModal(null)}
              className="absolute inset-0 bg-[#1E3A2D]/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-[36px] p-6 sm:p-10 shadow-2xl border border-white/60 max-h-[90vh] overflow-y-auto space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8EFEA]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#EAF3ED] text-[#3F5E4D] border border-white/60">
                      {activeTipModal.category}
                    </span>
                    <span className="text-xs text-[#8E9DA4] font-light">
                      Leitura: {activeTipModal.readTime}
                    </span>
                  </div>
                  {/* Size 2 (text-xl) */}
                  <h2 className="text-xl font-light text-[#1A1A1A] tracking-tight">
                    {activeTipModal.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTipModal(null)}
                  className="p-2 text-[#8E9DA4] hover:text-[#1A1A1A] hover:bg-[#F7FAF8] rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Context Summary - Size 3 (text-sm) */}
              <p className="text-sm text-[#8E9DA4] leading-relaxed font-light">
                {activeTipModal.summary}
              </p>

              {/* Steps / Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium uppercase tracking-widest text-[#8E9DA4]">
                  Passo a Passo Recomendado:
                </h4>
                <div className="space-y-2.5">
                  {activeTipModal.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-[20px] bg-[#F7FAF8] border border-[#E8EFEA] flex items-start gap-3 text-sm text-[#1A1A1A] leading-relaxed font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#3F5E4D] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Advice */}
              <div className="p-5 rounded-[24px] bg-[#FAF4F0] border border-[#E8EFEA] space-y-1">
                <div className="text-xs font-semibold text-[#3F5E4D] uppercase tracking-widest">
                  Visão Prática da Vos Condomínios:
                </div>
                <p className="text-sm text-[#8E9DA4] leading-relaxed font-light">
                  {activeTipModal.keyAdvice}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8EFEA]">
                <button
                  onClick={() => handleShareTip(activeTipModal)}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8E9DA4] hover:text-[#1A1A1A] transition-colors font-light"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Copiado para a área de transferência!' : 'Compartilhar Dica'}</span>
                </button>

                <button
                  onClick={() => setActiveTipModal(null)}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E3A2D] hover:bg-[#14281E] rounded-full transition-colors"
                >
                  Concluir Leitura
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
