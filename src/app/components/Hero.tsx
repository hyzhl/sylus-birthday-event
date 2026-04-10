import * as React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles, Monitor, Users, User, TrendingUp } from 'lucide-react';

interface HeroProps {
  posterUrl: string;
  stats?: Array<{ label: string; value: string; icon: any; color: string }>;
}

export function Hero({ posterUrl, stats: propStats }: HeroProps) {
  const defaultStats = [
    { label: '大屏总数', value: '1,234', icon: Monitor, color: 'from-red-600 to-rose-600' },
    { label: '生贺组应援数量', value: '856', icon: Users, color: 'from-rose-600 to-pink-600' },
    { label: '个人应援数量', value: '378', icon: User, color: 'from-pink-600 to-red-600' },
  ];
  const stats = propStats || defaultStats;

  return (
    <div className="relative min-h-screen overflow-hidden pb-12">
      {/* 背景图片 - 已移除所有遮罩层 */}
      <div className="absolute inset-0 h-[60vh]">
        <ImageWithFallback
          src={posterUrl}
          alt="Birthday celebration poster"
          className="w-full h-full object-cover"
        />
        {/* 以下遮罩层已全部删除，只留原始图片 */}
      </div>

      {/* 粒子动画 */}
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

      {/* 内容区 */}
      <div className="relative">
        {/* 标题部分 - 已清空文字，只保留容器结构 */}
        <div className="h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* 这里不显示任何文字，只留一个空占位 */}
            <div></div>
          </motion.div>
        </div>

        {/* 统计卡片部分 */}
        <div className="px-6 -mt-8">
          <div className="max-w-md mx-auto space-y-6">
            {/* 第一个大卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1, type: 'spring', stiffness: 100 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/30 to-rose-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-rose-600/20 rounded-2xl blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-2xl p-8 border-2 border-red-600/50 hover:border-red-500 transition-all shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      className={`p-5 rounded-2xl bg-gradient-to-br ${stats[0].color} relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{ boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)' }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {React.createElement(stats[0].icon, { className: "w-10 h-10 text-white relative z-10" })}
                    </motion.div>
                    <div>
                      <p className="text-base text-gray-300 mb-2 font-medium">{stats[0].label}</p>
                      <motion.p 
                        className="text-5xl font-bold bg-gradient-to-r from-red-300 to-rose-300 bg-clip-text text-transparent"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                      >
                        {stats[0].value}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 两个小卡片 */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(1).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + 0.15 * index, type: 'spring', stiffness: 100 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-2 bg-gradient-to-r ${stat.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`}></div>
                  
                  <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-xl p-5 border-2 border-red-700/40 hover:border-red-600/60 transition-all shadow-xl">
                    <div className="space-y-4">
                      <motion.div 
                        className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} w-fit relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{ boxShadow: '0 8px 30px rgba(239, 68, 68, 0.3)' }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                          animate={{ opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                        {React.createElement(stat.icon, { className: "w-6 h-6 text-white relative z-10" })}
                      </motion.div>
                      <div>
                        <p className="text-xs text-gray-300 mb-2 font-medium">{stat.label}</p>
                        <motion.p 
                          className="text-3xl font-bold bg-gradient-to-r from-red-300 to-rose-300 bg-clip-text text-transparent"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.3 + 0.15 * index, type: 'spring', stiffness: 200 }}
                        >
                          {stat.value}
                        </motion.p>
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