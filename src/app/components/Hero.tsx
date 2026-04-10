import * as React from 'react';
import { motion, useInView } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  posterUrl: string;
  stats?: Array<{ label: string; value: string; icon: string; color: string }>;
}

const CountUp = ({ target, duration = 1.5 }: { target: number; duration?: number }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    if (start === end) return;
    const totalSteps = Math.ceil(duration * 60);
    const increment = (end - start) / totalSteps;
    let current = start;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export function Hero({ posterUrl, stats: propStats }: HeroProps) {
  const defaultStats = [
    { label: '大屏总数', value: '1234', icon: '/screen-icon.png', color: 'from-red-600 to-rose-600' },
    { label: '应援总数', value: '856', icon: '/activity-icon.png', color: 'from-rose-600 to-pink-600' },
    { label: '覆盖城市', value: '378', icon: '/city-icon.png', color: 'from-pink-600 to-red-600' },
  ];
  const stats = propStats || defaultStats;
  const numericValues = stats.map(s => parseInt(s.value.replace(/,/g, ''), 10) || 0);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 h-[60vh]">
        <ImageWithFallback
          src={posterUrl}
          alt="Birthday celebration poster"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 h-[60vh] overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{ boxShadow: '0 0 4px rgba(239, 68, 68, 0.8)' }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: -10,
              opacity: 0,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight * 0.6 + 10 : 400,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative">
        <div className="h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div></div>
          </motion.div>
        </div>

        {/* 精确控制左右间距为20px，移除max-w-md限制 */}
        <div className="px-[20px] mt-0">
          <div className="space-y-5">
            {/* 大卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1, type: 'spring', stiffness: 100 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/30 to-rose-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-rose-600/20 rounded-2xl blur-xl"></div>
              
              <div className="relative backdrop-blur-md bg-black/30 rounded-2xl p-8 border border-red-500/60 shadow-[0_0_15px_rgba(170,3,27,0.3)] hover:shadow-[0_0_25px_rgba(170,3,27,0.5)] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      className="p-4 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{ boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)' }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <img src={stats[0].icon} alt={stats[0].label} className="w-12 h-12 relative z-10" />
                    </motion.div>
                    <div>
                      <p className="text-sm mb-2 font-medium" style={{ fontFamily: 'Alibaba PuHuiTi 3.0, sans-serif', color: '#ffbfc8' }}>{stats[0].label}</p>
                      <p className="text-[70px] font-bold leading-none" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#ffbfc8' }}>
                        <CountUp target={numericValues[0]} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 两个小卡片 - 左右结构 */}
            <div className="grid grid-cols-2 gap-5">
              {stats.slice(1).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + 0.15 * index, type: 'spring', stiffness: 100 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-2 bg-gradient-to-r ${stat.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`}></div>
                  
                  <div className="relative backdrop-blur-md bg-black/30 rounded-xl p-4 border border-red-500/60 shadow-[0_0_10px_rgba(170,3,27,0.2)] hover:shadow-[0_0_20px_rgba(170,3,27,0.4)] transition-all">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} relative overflow-hidden shrink-0`}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{ boxShadow: '0 8px 30px rgba(239, 68, 68, 0.3)' }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                          animate={{ opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                        <img src={stat.icon} alt={stat.label} className="w-8 h-8 relative z-10" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm mb-1 font-medium" style={{ fontFamily: 'Alibaba PuHuiTi 3.0, sans-serif', color: '#ffbfc8' }}>{stat.label}</p>
                        <p className="text-[36px] font-bold leading-none" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#ffbfc8' }}>
                          <CountUp target={numericValues[index+1]} />
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, black 100%);
        }
      `}</style>
    </div>
  );
}