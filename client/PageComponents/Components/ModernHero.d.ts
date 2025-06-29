// Types for ModernHero component props
export interface MarketData {
  totalVolume: string;
  avgROI: string;
  activeProperties: number;
}

export interface ModernHeroProps {
  marketData?: MarketData;
  propertyCount?: number;
}

// Re-export component with proper typing
declare const ModernHero: React.FC<ModernHeroProps>;
export default ModernHero;
