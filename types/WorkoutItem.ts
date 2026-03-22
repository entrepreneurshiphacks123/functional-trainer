export type WorkoutItemSlot = "prep" | "fc_block" | "individual" | "accessory" | "finisher" | "cooldown";

export type WorkoutItem = {
  id: string;
  slot: WorkoutItemSlot;
  name: string;
  dose: string;
  equipment?: string;
  description?: string;
  hint?: string;
  howTo?: string;
  howToImage?: string;
  fcBlock?: number;
  fcPosition?: 1 | 2 | 3 | 4;
  restAfter?: number;
  hpOnly?: boolean;
  kneeFlag?: boolean;
  finisherRounds?: number;
};

export type WorkoutData = {
  day: string;
  items: WorkoutItem[];
};
