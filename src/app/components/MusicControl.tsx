import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export function MusicControl({ audioSrc = '/music.mp3' }: { audioSrc?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 只在用户第一次点击时才创建 Audio 元素并加载
  const initAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.preload = 'metadata'; // 只加载元数据，不加载全部
      audioRef.current = audio;
      setAudioLoaded(true);
    }
  };

  const togglePlay = () => {
    initAudio(); // 确保音频存在
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('播放失败:', err));
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        onClick={togglePlay}
        className="fixed top-6 right-6 z-50 group"
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
        <div className="relative p-3 bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-full hover:border-red-500 transition-all group-hover:scale-110">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div key="playing" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.3 }}>
                <Volume2 className="w-5 h-5 text-red-400" />
              </motion.div>
            ) : (
              <motion.div key="paused" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.3 }}>
                <VolumeX className="w-5 h-5 text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {isPlaying && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ height: 4 }}
                  animate={{ height: [4, 12, 4] }}
                  exit={{ height: 4 }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
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