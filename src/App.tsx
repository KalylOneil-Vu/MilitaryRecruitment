import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AttractScreen from './components/AttractScreen';
import BiodataEntry from './components/BiodataEntry';
import MOSSelection from './components/MOSSelection';
import PhotoCapture from './components/PhotoCapture';
import ProcessingScreen from './components/ProcessingScreen';
import RevealScreen from './components/RevealScreen';
import ScanlineOverlay from './components/ui/ScanlineOverlay';
import { AppScreen, UserData, BiologicalSex, MOSOption, GeneratedImages } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('attract');
  const [userData, setUserData] = useState<UserData>({});

  // Navigation handlers
  const handleStart = () => {
    setCurrentScreen('biodata');
  };

  const handleSexSelection = (sex: BiologicalSex) => {
    setUserData(prev => ({ ...prev, sex }));
    setCurrentScreen('mos-selection');
  };

  const handleMOSSelection = (mos: MOSOption) => {
    setUserData(prev => ({ ...prev, selectedMOS: mos }));
    // Go directly to photo capture - MOS-specific videos play during processing
    setCurrentScreen('photo-capture');
  };

  const handlePhotoCapture = (imageData: string) => {
    setUserData(prev => ({ ...prev, capturedImage: imageData }));
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = (generatedImages: GeneratedImages) => {
    setUserData(prev => ({ ...prev, generatedImages }));
    setCurrentScreen('reveal');
  };

  const handleRestart = () => {
    setUserData({});
    setCurrentScreen('attract');
  };

  return (
    <div className="h-screen w-screen bg-army-black overflow-hidden relative">

      {/* Screen router with animations */}
      <AnimatePresence mode="wait">
        {currentScreen === 'attract' && (
          <AttractScreen key="attract" onStart={handleStart} />
        )}

        {currentScreen === 'biodata' && (
          <BiodataEntry key="biodata" onSelect={handleSexSelection} />
        )}

        {currentScreen === 'mos-selection' && (
          <MOSSelection key="mos" onSelect={handleMOSSelection} />
        )}

        {currentScreen === 'photo-capture' && (
          <PhotoCapture key="photo" onCapture={handlePhotoCapture} />
        )}

        {currentScreen === 'processing' && (
          <ProcessingScreen
            key="processing"
            userData={userData}
            onComplete={handleProcessingComplete}
          />
        )}

        {currentScreen === 'reveal' && (
          <RevealScreen
            key="reveal"
            userData={userData}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      {/* HUD Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-army-black/80 border-b border-army-gold/30 flex items-center justify-between px-4 z-50">
        <div className="flex items-center space-x-4 text-xs text-army-gold font-hud">
          <span>SYS: ONLINE</span>
          <span className="text-hud-green">●</span>
          <span>FPS: 60</span>
        </div>
        <div className="flex items-center text-xs font-hud uppercase">
          <span className="text-white">U.S. Army Recruitment Experience</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-army-gold font-hud">
          <span>v2.0.1</span>
          <span>AI: ACTIVE</span>
          <span className="text-hud-green animate-pulse">●</span>
        </div>
      </div>
    </div>
  );
}

export default App;
