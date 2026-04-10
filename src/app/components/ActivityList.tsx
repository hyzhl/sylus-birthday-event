import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, User, Tag, ExternalLink, X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Activity {
  id: number;
  country: string;
  city: string;
  name: string;
  type: string;
  sponsor: string;
  location: string;
  link: string;
  hasPoster: boolean;
}

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const cities = useMemo(() => {
    return Array.from(new Set(activities.map(a => a.city))).sort();
  }, [activities]);

  const types = useMemo(() => {
    return Array.from(new Set(activities.map(a => a.type))).sort();
  }, [activities]);

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const cityMatch = filterCity === 'all' || activity.city === filterCity;
      const typeMatch = filterType === 'all' || activity.type === filterType;
      const searchMatch = searchQuery === '' || 
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.sponsor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.type.toLowerCase().includes(searchQuery.toLowerCase());
      return cityMatch && typeMatch && searchMatch;
    });
  }, [activities, filterCity, filterType, searchQuery]);

  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredActivities.slice(start, end);
  }, [filteredActivities, currentPage]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const handleFilterChange = (type: 'city' | 'type', value: string) => {
    setCurrentPage(1);
    if (type === 'city') {
      setFilterCity(value);
    } else {
      setFilterType(value);
    }
  };

  const handleSearchToggle = () => {
    if (isSearchOpen && searchQuery) {
      setSearchQuery('');
      setCurrentPage(1);
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <section className="px-[20px] py-12 bg-black min-h-screen">
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
            活动清单
          </h2>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Filter className="w-4 h-4" />
            <span>筛选条件</span>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterCity}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="flex-1 h-9 px-3 rounded-md border border-red-900/30 bg-zinc-900 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">全部城市</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="flex-1 h-9 px-3 rounded-md border border-red-900/30 bg-zinc-900 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">全部类型</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <button
              onClick={handleSearchToggle}
              className={`shrink-0 p-2.5 rounded-lg transition-all ${
                isSearchOpen 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-zinc-900 border border-red-900/30 hover:border-red-700/50 text-red-400'
              }`}
            >
              {isSearchOpen && searchQuery ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <Input
                  type="text"
                  placeholder="搜索活动名称、城市、应援人..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="bg-zinc-900 border-red-900/30 text-white placeholder:text-gray-500"
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          {(filterCity !== 'all' || filterType !== 'all' || searchQuery !== '') && (
            <div className="flex items-center gap-2 flex-wrap">
              {filterCity !== 'all' && (
                <button
                  onClick={() => handleFilterChange('city', 'all')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-900/30 border border-red-700/50 rounded text-xs text-red-300 hover:bg-red-900/50 transition-colors"
                >
                  {filterCity}
                  <X className="w-3 h-3" />
                </button>
              )}
              {filterType !== 'all' && (
                <button
                  onClick={() => handleFilterChange('type', 'all')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-900/30 border border-red-700/50 rounded text-xs text-red-300 hover:bg-red-900/50 transition-colors"
                >
                  {filterType}
                  <X className="w-3 h-3" />
                </button>
              )}
              {searchQuery !== '' && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-900/30 border border-red-700/50 rounded text-xs text-red-300 hover:bg-red-900/50 transition-colors"
                >
                  搜索: {searchQuery.length > 10 ? searchQuery.substring(0, 10) + '...' : searchQuery}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <AnimatePresence mode="popLayout">
            {paginatedActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => setSelectedActivity(activity)}
                className="bg-zinc-900 rounded-lg p-4 border border-red-900/30 hover:border-red-700/50 hover:bg-zinc-800/50 transition-all cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-white flex-1 line-clamp-2">{activity.name}</h3>
                    <span className="px-2 py-0.5 bg-red-900/30 border border-red-700/50 rounded text-xs text-red-300 shrink-0">
                      {activity.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.country} · {activity.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="truncate">{activity.sponsor}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-zinc-900 border border-red-900/30 rounded text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              上一页
            </button>
            
            <span className="text-sm text-gray-400">
              第 {currentPage} / {totalPages} 页
            </span>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-zinc-900 border border-red-900/30 rounded text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              下一页
            </button>
          </div>
        )}

        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="bg-zinc-900 border-red-900/50 text-white max-w-[90vw] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent pr-8">
                {selectedActivity?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedActivity && (
              <div className="space-y-4 pt-4">
                {selectedActivity.hasPoster && (
                  <div className="w-32 aspect-[3/4] mx-auto rounded-lg overflow-hidden border border-red-900/30">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1552595458-3df9ba563207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjByZWQlMjBsaWdodHN8ZW58MXx8fHwxNzcyODg0NTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="活动海报"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <DetailRow icon={<MapPin className="w-4 h-4" />} label="国家" value={selectedActivity.country} />
                  <DetailRow icon={<MapPin className="w-4 h-4" />} label="城市" value={selectedActivity.city} />
                  <DetailRow icon={<Tag className="w-4 h-4" />} label="活动类型" value={selectedActivity.type} />
                  <DetailRow icon={<User className="w-4 h-4" />} label="应援人" value={selectedActivity.sponsor} />
                  <DetailRow icon={<MapPin className="w-4 h-4" />} label="活动位置" value={selectedActivity.location} />
                  
                  {selectedActivity.link && (
                    <div className="pt-2">
                      <a
                        href={selectedActivity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        查看活动详情
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-red-400 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}