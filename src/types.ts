export interface MOSOption {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  stats: {
    strategy: number;
    technology: number;
    leadership: number;
    endurance: number;
  };
  promptModifier: string;
}

export type BiologicalSex = 'male' | 'female';

export interface UserData {
  sex?: BiologicalSex;
  selectedMOS?: MOSOption;
  capturedImage?: string;
  generatedImage?: string;
}

export type AppScreen =
  | 'attract'
  | 'biodata'
  | 'mos-selection'
  | 'mos-video'
  | 'photo-capture'
  | 'processing'
  | 'reveal';

export interface ProcessingMessage {
  id: number;
  text: string;
  delay: number;
}