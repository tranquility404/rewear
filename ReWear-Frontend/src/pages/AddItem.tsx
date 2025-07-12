import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { FloatingLabel } from '../components/ui/FloatingLabel';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export const AddItem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    pointsValue: '',
    tags: '',
    images: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addItem, user } = useStore();
  const navigate = useNavigate();

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['New', 'Excellent', 'Very Good', 'Good', 'Fair'];

  const steps = [
    { title: 'Basic Info', description: 'Tell us about your item' },
    { title: 'Details', description: 'Size, condition, and category' },
    { title: 'Photos', description: 'Add photos of your item' },
    { title: 'Preview', description: 'Review and publish' }
  ];

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.pointsValue) newErrors.pointsValue = 'Points value is required';
        break;
      case 2:
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.size) newErrors.size = 'Size is required';
        if (!formData.condition) newErrors.condition = 'Condition is required';
        break;
      case 3:
        if (formData.images.length === 0) newErrors.images = 'At least one photo is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!user) return;

    const newItem = {
      id: Date.now().toString(),
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      ownerId: user.id,
      ownerName: user.name,
      ownerAvatar: user.avatar,
      pointsValue: parseInt(formData.pointsValue),
      status: 'available' as const,
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0
    };

    addItem(newItem);
    navigate('/dashboard');
  };

  const addSampleImage = () => {
    const sampleImages = [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, randomImage]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          List a New Item
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Share your pre-loved clothes with the community
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex-1">
              <div className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep > index + 1 
                    ? 'bg-emerald-500 text-white' 
                    : currentStep === index + 1 
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400' 
                    : 'bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
                  }
                `}>
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= index + 1 
                      ? 'text-slate-800 dark:text-slate-200' 
                      : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 ml-4 ${
                    currentStep > index + 1 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                  }`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <GlassCard className="p-8">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Basic Information
            </h2>
            
            <FloatingLabel
              label="Item Title"
              value={formData.title}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              error={errors.title}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-emerald-500 dark:bg-slate-800/50 transition-colors duration-200 outline-none"
                placeholder="Describe your item in detail..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            <FloatingLabel
              label="Points Value"
              type="number"
              value={formData.pointsValue}
              onChange={(value) => setFormData(prev => ({ ...prev, pointsValue: value }))}
              error={errors.pointsValue}
              required
            />
            
            <FloatingLabel
              label="Tags (comma separated)"
              value={formData.tags}
              onChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
            />
          </motion.div>
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Item Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-emerald-500 dark:bg-slate-800/50"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Size *
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-emerald-500 dark:bg-slate-800/50"
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.size && (
                  <p className="text-red-500 text-sm mt-1">{errors.size}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Condition *
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-emerald-500 dark:bg-slate-800/50"
                >
                  <option value="">Select condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="text-red-500 text-sm mt-1">{errors.condition}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Photos */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Add Photos
            </h2>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
              <Camera size={48} className="mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Add photos of your item (up to 5 photos)
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button icon={Upload}>
                  Upload Photos
                </Button>
                <Button variant="outline" onClick={addSampleImage}>
                  Add Sample Photo
                </Button>
              </div>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {formData.images.length < 5 && (
                  <button
                    onClick={addSampleImage}
                    className="w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Plus size={24} />
                  </button>
                )}
              </div>
            )}

            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
          </motion.div>
        )}

        {/* Step 4: Preview */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Preview Your Listing
            </h2>
            
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {formData.images.length > 0 && (
                    <img
                      src={formData.images[0]}
                      alt={formData.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    {formData.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {formData.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Category:</span>
                      <span className="font-medium">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Size:</span>
                      <span className="font-medium">{formData.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Condition:</span>
                      <span className="font-medium">{formData.condition}</span>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-emerald-600">
                    {formData.pointsValue} points
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button
              icon={ArrowRight}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
            >
              Publish Item
            </Button>
          )}
        </div>
      </GlassCard>
    </div>
  );
};