import type { GrowthStage } from "./common";
export interface Character {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface CharacterStatus {
  growthStage: GrowthStage;
  level: number;
  gone?: boolean;
}
