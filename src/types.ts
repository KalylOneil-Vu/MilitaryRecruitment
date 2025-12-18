export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface MOSOption {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  detailedDescription: string;
  icon: string;
  stats: {
    strategy: number;
    technology: number;
    leadership: number;
    endurance: number;
  };
  portraitPrompt: string;
  fieldPrompt: string;
  media: MediaItem[];
}

export type BiologicalSex = 'male' | 'female';

export interface GeneratedImages {
  portrait: string;
  field: string;
}

export interface UserData {
  sex?: BiologicalSex;
  selectedMOS?: MOSOption;
  capturedImage?: string;
  generatedImages?: GeneratedImages;
}

export type AppScreen =
  | 'attract'
  | 'biodata'
  | 'mos-selection'
  | 'photo-capture'
  | 'processing'
  | 'reveal';

export interface ProcessingMessage {
  id: number;
  text: string;
  delay: number;
}