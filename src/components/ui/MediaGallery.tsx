import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { MediaItem } from '../../types';

interface MediaGalleryProps {
  items: MediaItem[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleItemClick = (item: MediaItem) => {
    if (item.type === 'video') {
      setActiveVideo(item);
    }
  };

  return (
    <>
      <div className="relative group">
        {/* Scroll Left Button */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-army-gold hover:text-black text-white p-2 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll Right Button */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-army-gold hover:text-black text-white p-2 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable Gallery */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 cursor-pointer group/item"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative w-[200px] h-[130px] overflow-hidden border border-army-gold/50 hover:border-army-gold transition-colors">
                {/* Thumbnail */}
                <img
                  src={item.type === 'video' ? item.thumbnail : item.url}
                  alt={item.caption || 'Gallery item'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                />

                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/item:bg-black/60 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-army-gold/90 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-black fill-black ml-1" />
                    </div>
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                    item.type === 'video'
                      ? 'bg-red-600 text-white'
                      : 'bg-army-gold text-black'
                  }`}>
                    {item.type}
                  </span>
                </div>

                {/* Caption */}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <p className="text-xs text-white font-medium truncate">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gradient Fades */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-army-dark to-transparent pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-army-dark to-transparent pointer-events-none" />
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl mx-4 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-army-gold transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Video Embed */}
              <iframe
                src={activeVideo.url}
                title={activeVideo.caption || 'Video'}
                className="w-full h-full border-2 border-army-gold"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Caption */}
              {activeVideo.caption && (
                <p className="text-center text-white mt-4 text-lg">
                  {activeVideo.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediaGallery;
