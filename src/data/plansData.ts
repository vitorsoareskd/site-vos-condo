import { Plan } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Vos Starter',
    subtitle: 'O seu condomínio na palma da mão, com autonomia e baixo custo.',
    badge: 'Autonomia & App',
    highlighted: false,
    idealFor: 'Condomínios que buscam modernização digital rápida e autonomia na gestão com aplicativo completo.',
    supportLevel: 'Digital',
    features: [
      'App Completo: Licença total para moradores e síndicos (iOS e Android)',
      'Transparência Real: Acompanhamento financeiro em tempo real via app',
      'Facilidades: Reservas de áreas comuns, enquetes e comunicados em 1 clique',
      'Segurança: Livro de ocorrências digital e controle de entregas via aplicativo',
      'Comunidade: Mural exclusivo para trocas de objetos e serviços entre vizinhos',
      'Agilidade: Emissão de 2ª via de boletos e assembleias virtuais integradas'
    ],
    notes: 'Incluso em todos os pacotes Vos. Potencializado pela tecnologia uCondo.'
  },
  {
    id: 'essencial',
    name: 'Vos Essencial',
    subtitle: 'Gestão contábil, financeira e jurídica básica com suporte dedicado ao síndico.',
    badge: 'Essencial',
    highlighted: false,
    idealFor: 'Condomínios de pequeno a médio porte que necessitam de emissão de boletos, conciliação e balancetes regulares.',
    supportLevel: 'Básico',
    features: [
      'Contempla todos os recursos do plano Vos Starter',
      'Emissão de boletos e gestão de contas a pagar e receber',
      'Conciliação bancária rigorosa e emissão de balancete mensal',
      'Notificações automáticas de atraso geradas via sistema',
      'Previsão orçamentária anual automatizada baseada no histórico',
      'Cadastro de moradores e organização documental do condomínio',
      'Orientação jurídica administrativa básica (interpretação de Convenção e Regimento)',
      'Transparência financeira online em tempo real no app',
      'Suporte ao síndico em nível Básico'
    ],
    notes: 'Consultoria financeira estratégica é cobrada à parte (tabela de Hora Técnica).'
  },
  {
    id: 'pulse',
    name: 'Vos Pulse',
    subtitle: 'Acompanhamento proativo com o inovador Relatório Pulse de Saúde do Prédio.',
    badge: 'Saúde Predial',
    highlighted: false,
    idealFor: 'Síndicos que desejam controle preventivo de manutenção, fornecedores qualificados e relatórios executivos.',
    supportLevel: 'Prioritário',
    features: [
      'Contempla todos os serviços do plano Vos Essencial',
      'Controle rigoroso de vencimento de contratos (seguros, AVCB, manutenções periódicas)',
      'Triagem de chamados e moderação ativa de comunicados no app',
      'Pulse do Condomínio: Entrega mensal de relatório de saúde do prédio em PDF',
      'Indicação e cotação com fornecedores homologados e de confiança',
      'Apoio técnico remoto (análise técnica de orçamentos de obras)',
      'Acompanhamento de serviços de manutenção predial em nível Básico',
      'Suporte ao síndico em nível Prioritário (canal direto e ágil)'
    ],
    notes: 'Nosso plano de equilíbrio, unindo prevenção predial e suporte prioritário.'
  },
  {
    id: '360',
    name: 'Vos 360',
    subtitle: 'Parceria estratégica completa cuidando de cada detalhe técnico, operacional e jurídico.',
    badge: 'Mais Escolhido',
    highlighted: true,
    idealFor: 'Condomínios exigentes ou de grande porte que exigem combate ativo à inadimplência e consultoria presencial.',
    supportLevel: 'Dedicado',
    features: [
      'Contempla todos os serviços do plano Vos Pulse',
      'Controle e negociação ativa de inadimplência (atuação direta e humanizada nas cobranças)',
      'Consultoria Financeira Estratégica inclusa (reuniões extras para planejamento de cortes e obras)',
      'Pulse do Condomínio Plus: Relatório executivo em PDF + Reunião mensal de alinhamento com o síndico',
      'Acompanhamento de serviços de manutenção em nível Ativo',
      'Apoio completo na convocação e organização de pauta para assembleias',
      'Registro de atas simples e condução de assembleia (em formato virtual ou híbrido)',
      'Suporte ao síndico em nível Dedicado (gerente de conta exclusivo)'
    ],
    notes: 'O plano mais escolhido: gestão de ponta a ponta para síndicos que prezam por tranquilidade absoluta.'
  }
];

export const COMPARISON_CATEGORIES = [
  {
    category: 'Tecnologia & Moradores',
    items: [
      { name: 'App uCondo (iOS/Android) para moradores e síndico', starter: true, essencial: true, pulse: true, total: true },
      { name: '2ª via de boletos instantânea pelo app', starter: true, essencial: true, pulse: true, total: true },
      { name: 'Reservas de áreas comuns e livro de ocorrências digital', starter: true, essencial: true, pulse: true, total: true },
      { name: 'Mural de vizinhos e comunicados com 1 clique', starter: true, essencial: true, pulse: true, total: true },
      { name: 'Assembleias virtuais integradas ao sistema', starter: true, essencial: true, pulse: true, total: true }
    ]
  },
  {
    category: 'Financeiro & Contábil',
    items: [
      { name: 'Emissão e conciliação bancária mensal', starter: false, essencial: true, pulse: true, total: true },
      { name: 'Balancete mensal digital transparente', starter: false, essencial: true, pulse: true, total: true },
      { name: 'Previsão orçamentária anual inteligente', starter: false, essencial: true, pulse: true, total: true },
      { name: 'Cobrança automatizada de atrasos', starter: false, essencial: true, pulse: true, total: true },
      { name: 'Negociação ativa e direta de inadimplência', starter: false, essencial: false, pulse: false, total: true },
      { name: 'Consultoria Financeira Estratégica inclusa', starter: false, essencial: 'Hora Técnica', pulse: 'Hora Técnica', total: true }
    ]
  },
  {
    category: 'Manutenção & Saúde Predial',
    items: [
      { name: 'Controle de prazos de seguros e licenças (AVCB, etc.)', starter: false, essencial: false, pulse: true, total: true },
      { name: 'Relatório Pulse: Diagnóstico mensal da saúde do prédio', starter: false, essencial: false, pulse: true, total: true },
      { name: 'Rede de fornecedores homologados da construção civil', starter: false, essencial: false, pulse: true, total: true },
      { name: 'Apoio técnico na análise de orçamentos de obras', starter: false, essencial: false, pulse: true, total: true },
      { name: 'Acompanhamento ativo de serviços prediais', starter: false, essencial: false, pulse: 'Básico', total: 'Ativo' }
    ]
  },
  {
    category: 'Assessoria & Assembleias',
    items: [
      { name: 'Nível de suporte ao Síndico', starter: 'Digital', essencial: 'Básico', pulse: 'Prioritário', total: 'Dedicado' },
      { name: 'Orientação jurídica e regimento interno', starter: false, essencial: true, pulse: true, total: true },
      { name: 'Organização de pauta e convocação de assembleia', starter: false, essencial: false, pulse: false, total: true },
      { name: 'Condução de assembleia e registro de ata simples', starter: false, essencial: false, pulse: false, total: true },
      { name: 'Reunião mensal de alinhamento com a diretoria', starter: false, essencial: false, pulse: false, total: true }
    ]
  }
];
