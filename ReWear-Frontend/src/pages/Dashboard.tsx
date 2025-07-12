import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Leaf, Droplets, RefreshCw, Plus, Heart, Eye, Edit3, Trash2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, items } = useStore();
  
  if (!user) return null;

  const userItems = items.filter(item => item.ownerId === user.id);

  const environmentalImpact = [
    {
      icon: Leaf,
      value: user.co2Saved,
      unit: 'kg',
      label: 'CO₂ Saved',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: Droplets,
      value: user.waterSaved,
      unit: 'L',
      label: 'Water Saved',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: RefreshCw,
      value: user.itemsSwapped,
      unit: '',
      label: 'Items Swapped',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Here's your sustainability impact and activity overview
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {user.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Points Balance</p>
                  <motion.p 
                    className="text-2xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    {user.points}
                  </motion.p>
                </div>
                <Trophy size={32} className="text-emerald-200" />
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-2">
              <h4 className="font-medium text-slate-700 dark:text-slate-300">Recent Badges</h4>
              {user.badges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Trophy size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{badge.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
              Your Environmental Impact
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {environmentalImpact.map((impact, index) => (
                <motion.div
                  key={impact.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`bg-gradient-to-br ${impact.color} rounded-lg p-4 text-white`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <impact.icon size={24} />
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      This month
                    </span>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {impact.value}{impact.unit}
                  </div>
                  <div className="text-sm opacity-90">{impact.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                <strong>Great job!</strong> Your sustainable choices have prevented the equivalent of 
                driving {Math.round(user.co2Saved * 4.4)} km in a car. Keep it up!
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* My Listings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            My Listings
          </h2>
          <Link to="/add-item">
            <Button icon={Plus}>Add New Item</Button>
          </Link>
        </div>

        {userItems.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <div className="text-slate-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
              No items listed yet
            </h3>
            <p className="text-slate-500 dark:text-slate-500 mb-4">
              Start sharing your clothes with the community
            </p>
            <Link to="/add-item">
              <Button>List Your First Item</Button>
            </Link>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <div className="aspect-w-16 aspect-h-12 relative">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'available' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {item.description.substring(0, 80)}...
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-emerald-600 font-semibold">
                        {item.pointsValue} points
                      </span>
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
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" icon={Edit3} className="flex-1">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" icon={Trash2} className="text-red-500 hover:text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};