export type TabType = 'inicio' | 'dicas' | 'planos';

export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  highlighted?: boolean;
  idealFor: string;
  features: string[];
  notes?: string;
  supportLevel: 'Básico' | 'Prioritário' | 'Dedicado' | 'Digital';
}

export interface TipCategory {
  id: string;
  label: string;
  iconName: string;
}

export interface TipItem {
  id: string;
  title: string;
  category: 'financas' | 'convivencia' | 'manutencao' | 'juridico' | 'tecnologia';
  readTime: string;
  summary: string;
  steps: string[];
  keyAdvice: string;
  importance: 'Alta' | 'Média' | 'Essencial';
}

export interface SimulatorState {
  units: number;
  condoType: 'vertical' | 'horizontal' | 'comercial';
  currentPainPoint: 'inadimplencia' | 'transparencia' | 'manutencao' | 'tempo';
  needAssemblySupport: boolean;
}
