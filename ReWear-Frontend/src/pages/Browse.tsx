import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, Eye, MapPin } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const Browse: React.FC = () => {
  const { items, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['New', 'Excellent', 'Very Good', 'Good', 'Fair'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Browse Items
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Discover amazing finds from our community
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <GlassCard className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <Button
              variant="outline"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-white/30 dark:border-slate-600/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Size
                  </label>
                  <select className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-lg">
                    <option>Any Size</option>
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Condition
                  </label>
                  <select className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-lg">
                    <option>Any Condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Points Range
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-slate-600 dark:text-slate-400">
          Showing {filteredItems.length} items
        </p>
      </motion.div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/item/${item.id}`}>
              <GlassCard hover className="overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-emerald-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                      {item.pointsValue} pts
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 text-slate-800 px-2 py-1 text-xs font-medium rounded-full">
                      {item.condition}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <img
                      src={item.ownerAvatar}
                      alt={item.ownerName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item.ownerName}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center">
                      <MapPin size={12} className="mr-1" />
                      2.5km away
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <GlassCard className="p-8 max-w-md mx-auto">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
              No items found
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              Try adjusting your search criteria or browse all categories
            </p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};