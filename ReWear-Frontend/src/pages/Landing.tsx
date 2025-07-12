import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, RefreshCw, Users, Heart, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const Landing: React.FC = () => {
  const { items } = useStore();

  const features = [
    {
      icon: RefreshCw,
      title: 'Swap & Share',
      description: 'Exchange clothes with community members and discover new styles'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Reduce waste and save the environment one swap at a time'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a growing community of conscious fashion enthusiasts'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Items Swapped' },
    { value: '5,000+', label: 'Active Members' },
    { value: '50 tons', label: 'CO₂ Saved' },
    { value: '1M L', label: 'Water Saved' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                ReWear
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-200">
                Community Exchange
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              Transform your closet, reduce waste, and discover amazing fashion finds 
              through our sustainable clothing exchange platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/browse">
                <Button size="lg" icon={ArrowRight}>
                  Start Browsing
                </Button>
              </Link>
              <Link to="/add-item">
                <Button variant="outline" size="lg">
                  List Your Items
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Animation Elements */}
          <div className="absolute inset-0 -z-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-emerald-400/20 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Why Choose ReWear?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join the sustainable fashion revolution and make a positive impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Featured Items
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Discover amazing finds from our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hover className="overflow-hidden">
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {item.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 font-semibold">
                        {item.pointsValue} points
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Heart size={16} />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg" icon={ArrowRight}>
                View All Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};