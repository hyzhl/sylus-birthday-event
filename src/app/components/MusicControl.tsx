import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  audioSrc?: string;
}

export function MusicControl({ audioSrc = '/music.mp3' }: MusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to play on mount (might be blocked by browser autoplay policy)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('播放失败:', error);
      });
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/* Fallback: Using a royalty-free sound URL - replace with your actual music file */}
        <source src={audioSrc} type="audio/mpeg" />
      </audio>

      {/* Floating music control button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        onClick={togglePlay}
        className="fixed top-6 right-6 z-50 group"
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
        
        {/* Button */}
        <div className="relative p-3 bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-full hover:border-red-500 transition-all group-hover:scale-110">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Volume2 className="w-5 h-5 text-red-400" />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <VolumeX className="w-5 h-5 text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated sound waves when playing */}
        <AnimatePresence>
          {isPlaying && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ height: 4 }}
                  animate={{ height: [4, 12, 4] }}
                  exit={{ height: 4 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                  className="w-0.5 bg-red-400 rounded-full"
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
