import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, AlertCircle } from 'lucide-react';
import HUDFrame from './ui/HUDFrame';

interface PhotoCaptureProps {
  onCapture: (imageData: string) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize webcam
  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera. Please check permissions.');
      }
    };

    initCamera();

    // Cleanup
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Update video source when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Handle photo capture
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    let count = 3;
    setCountdown(count);

    const countdownInterval = setInterval(() => {
      count -= 1;

      if (count <= 0) {
        clearInterval(countdownInterval);
        setCountdown(null);

        // Take the photo after a small delay to ensure state is updated
        setTimeout(() => {
          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (!video || !canvas) return;

          const context = canvas.getContext('2d');
          if (!context) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0);

          const imageData = canvas.toDataURL('image/png');

          // Stop the stream
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }

          // Send the captured image
          onCapture(imageData);
        }, 100);
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [stream, onCapture]);

  if (error) {
    return (
      <motion.div
        className="h-full w-full flex items-center justify-center bg-army-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-2xl text-white">{error}</h2>
          <p className="text-gray-400">Please ensure camera permissions are enabled.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="h-full w-full flex items-center justify-center bg-army-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HUDFrame className="w-full max-w-5xl mx-auto p-12">
        <div className="text-center space-y-6">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl text-army-gold uppercase tracking-widest mb-2">
              Biometric Capture
            </h2>
            <h1 className="text-5xl font-bold text-white">
              FACE SCAN ACTIVE
            </h1>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-12 h-1 bg-army-gold" />
            <div className="w-12 h-1 bg-army-gold" />
            <div className="w-12 h-1 bg-army-gold" />
            <div className="w-12 h-1 bg-gray-600" />
          </motion.div>

          {/* Video Feed Container */}
          <div className="relative aspect-video max-w-3xl mx-auto bg-black border-2 border-army-gold overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Scanning lines */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-hud-green to-transparent"
                animate={{
                  y: [0, 480, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Face targeting brackets */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-80">
                  {/* Top left */}
                  <div className="absolute top-0 left-0 w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-hud-green" />
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-hud-green" />
                  </div>
                  {/* Top right */}
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-hud-green" />
                    <div className="absolute top-0 right-0 w-0.5 h-full bg-hud-green" />
                  </div>
                  {/* Bottom left */}
                  <div className="absolute bottom-0 left-0 w-16 h-16">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-hud-green" />
                    <div className="absolute bottom-0 left-0 w-0.5 h-full bg-hud-green" />
                  </div>
                  {/* Bottom right */}
                  <div className="absolute bottom-0 right-0 w-16 h-16">
                    <div className="absolute bottom-0 right-0 w-full h-0.5 bg-hud-green" />
                    <div className="absolute bottom-0 right-0 w-0.5 h-full bg-hud-green" />
                  </div>

                  {/* Center crosshair */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute -left-8 w-16 h-0.5 bg-hud-green opacity-50" />
                      <div className="absolute -top-8 w-0.5 h-16 bg-hud-green opacity-50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* HUD Text */}
              <div className="absolute top-4 left-4 text-hud-green font-hud text-sm">
                <p>SCAN MODE: ACTIVE</p>
                <p>RESOLUTION: 1280x720</p>
                <p>FPS: 30</p>
              </div>

              <div className="absolute top-4 right-4 text-hud-green font-hud text-sm text-right">
                <p>FACE DETECTED</p>
                <p>TRACKING: LOCKED</p>
                <motion.p
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ● REC
                </motion.p>
              </div>
            </div>

            {/* Countdown Overlay */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    key={countdown}
                    className="text-9xl font-bold text-army-gold glow-text"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {countdown}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Capture Button */}
          <motion.button
            onClick={capturePhoto}
            disabled={countdown !== null}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative bg-army-olive border-2 border-army-gold px-12 py-6 flex items-center space-x-4">
              <Camera className="w-8 h-8 text-army-gold" />
              <span className="text-2xl font-bold text-white uppercase tracking-wider">
                Capture Image
              </span>
            </div>

            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 border-2 border-army-gold"
              animate={{
                scale: [1, 1.1, 1.1],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.button>

          {/* Instructions */}
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Position your face within the targeting brackets
          </motion.p>

          {/* Bottom Status */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest">
              Step 3 of 4 • Biometric Capture
            </p>
          </motion.div>
        </div>
      </HUDFrame>
    </motion.div>
  );
};

export default PhotoCapture;