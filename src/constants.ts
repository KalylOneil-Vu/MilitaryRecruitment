import { MOSOption, ProcessingMessage } from './types';

export const MOS_OPTIONS: MOSOption[] = [
  {
    id: 'cyber',
    title: 'Cyber Operations Officer',
    shortTitle: 'CYBER OPS',
    description: 'Lead digital warfare operations, protect critical infrastructure, and conduct offensive cyber missions.',
    icon: 'Shield',
    stats: {
      strategy: 85,
      technology: 100,
      leadership: 75,
      endurance: 60,
    },
    promptModifier: 'cyber warfare specialist, digital operations, tactical gear with tech elements',
  },
  {
    id: 'artillery',
    title: 'Field Artillery Officer',
    shortTitle: 'ARTILLERY',
    description: 'Command fire support operations, coordinate precision strikes, and lead artillery battalions.',
    icon: 'Target',
    stats: {
      strategy: 95,
      technology: 70,
      leadership: 85,
      endurance: 75,
    },
    promptModifier: 'field artillery commander, tactical operations, combat uniform',
  },
  {
    id: 'aviation',
    title: 'Aviation Officer',
    shortTitle: 'AVIATION',
    description: 'Pilot advanced aircraft, lead air assault missions, and manage aviation operations.',
    icon: 'Plane',
    stats: {
      strategy: 80,
      technology: 90,
      leadership: 80,
      endurance: 85,
    },
    promptModifier: 'military aviator, pilot gear, flight suit with tactical equipment',
  },
];

export const PROCESSING_MESSAGES: ProcessingMessage[] = [
  { id: 1, text: 'INITIALIZING NEURAL NETWORK...', delay: 0 },
  { id: 2, text: 'ANALYZING BIOMETRIC DATA...', delay: 800 },
  { id: 3, text: 'MAPPING FACIAL FEATURES...', delay: 1600 },
  { id: 4, text: 'APPLYING MOS PARAMETERS...', delay: 2400 },
  { id: 5, text: 'GENERATING TACTICAL PROFILE...', delay: 3200 },
  { id: 6, text: 'ENHANCING MILITARY ATTRIBUTES...', delay: 4000 },
  { id: 7, text: 'FINALIZING TRANSFORMATION...', delay: 4800 },
  { id: 8, text: 'RECRUIT PROFILE COMPLETE', delay: 5600 },
];