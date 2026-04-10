import { useState, useEffect, useMemo } from 'react';
import { Hero } from './components/Hero';
import { PosterGallery } from './components/PosterGallery';
import { ActivityList } from './components/ActivityList';
import { MusicControl } from './components/MusicControl';

// 模拟获取活动数据的函数（可替换为真实 API 请求）
const fetchActivities = async () => {
  // 这里使用本地 JSON 数据作为示例
  const response = await import('@/data/activities.json');
  return response.default;
};

export default function App() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetchActivities().then(setActivities);
  }, []);

  // 自动计算统计数据
const stats = useMemo(() => {
  const totalScreens = activities.reduce((sum, a) => sum + (Number(a.screenCount) || 0), 0);
  const totalActivities = activities.length;
  const uniqueCities = new Set(activities.map(a => a.city).filter(city => city && city.trim() !== '' && city !== '线上'));
  const totalCities = uniqueCities.size;

  return [
    { label: '大屏总数', value: totalScreens.toLocaleString(), icon: '/screen-icon.png', color: 'from-red-600 to-rose-600' },
    { label: '应援总数', value: totalActivities.toLocaleString(), icon: '/activity-icon.png', color: 'from-rose-600 to-pink-600' },
    { label: '覆盖城市', value: totalCities.toLocaleString(), icon: '/city-icon.png', color: 'from-pink-600 to-red-600' },
  ];
}, [activities]);
  const heroPosterUrl = 'https://upload.cc/i1/2026/03/07/sEYaFp.png'
 return (
  <div className="min-h-screen bg-black text-white">
    <MusicControl />
    <Hero posterUrl={heroPosterUrl} stats={stats} />
    {/* 指标卡与应援海报欣赏之间间距 80px */}
    <div className="h-[-10px]"></div>
    <PosterGallery />
    {/* 应援海报欣赏与活动清单之间间距 80px */}
    <div className="h-[20px]"></div>
    <ActivityList activities={activities} />
  </div>
);
}