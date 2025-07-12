import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, MapPin, User, MessageCircle, Star, Flag, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { useStore } from '../store/useStore';
import { useParams, useNavigate } from 'react-router-dom';

export const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);

  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GlassCard className="p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Item not found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/browse')}>
            Back to Browse
          </Button>
        </GlassCard>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const suggestedItems = items.filter(i => 
    i.id !== item.id && 
    (i.category === item.category || i.tags.some(tag => item.tags.includes(tag)))
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/browse')}
        className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Browse</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <GlassCard className="overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute top-4 right-4">
                <span className="bg-emerald-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                  {item.pointsValue} points
                </span>
              </div>
            </div>

            {/* Image Thumbnails */}
            {item.images.length > 1 && (
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex 
                          ? 'border-emerald-500' 
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Item Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  {item.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Heart size={16} />
                    <span>{item.likes} likes</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{item.views} views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>2.5km away</span>
                  </span>
                </div>
              </div>
              <Button variant="ghost" icon={Flag} />
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Category</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{item.category}</p>
              </div>
              <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Size</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{item.size}</p>
              </div>
              <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Condition</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{item.condition}</p>
              </div>
              <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'available' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button
                className="flex-1"
                onClick={() => setShowSwapModal(true)}
                disabled={item.status !== 'available'}
              >
                Request Swap
              </Button>
              <Button variant="outline" icon={MessageCircle}>
                Message
              </Button>
              <Button variant="ghost" icon={Heart} />
            </div>
          </GlassCard>

          {/* Owner Info */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Owner Information
            </h3>
            <div className="flex items-center space-x-4">
              <img
                src={item.ownerAvatar}
                alt={item.ownerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {item.ownerName}
                </p>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Star size={14} className="text-yellow-500" />
                  <span>4.8 rating</span>
                  <span>•</span>
                  <span>23 swaps completed</span>
                </div>
              </div>
              <Button variant="outline" icon={User}>
                View Profile
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Suggested Items */}
      {suggestedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedItems.map((suggestedItem, index) => (
              <motion.div
                key={suggestedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <GlassCard
                  hover
                  className="overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/item/${suggestedItem.id}`)}
                >
                  <img
                    src={suggestedItem.images[0]}
                    alt={suggestedItem.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {suggestedItem.title}
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      {suggestedItem.pointsValue} points
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Request Swap
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Send a swap request to {item.ownerName} for "{item.title}".
            </p>
            <textarea
              placeholder="Add a message (optional)..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg mb-4 dark:bg-slate-700"
            />
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSwapModal(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1">
                Send Request
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};