import { create } from 'zustand';
import { User, ClothingItem, Theme } from '../types';

interface AppStore {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Items
  items: ClothingItem[];
  setItems: (items: ClothingItem[]) => void;
  addItem: (item: ClothingItem) => void;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  // Theme
  theme: { isDark: false },
  toggleTheme: () => set(state => ({ 
    theme: { isDark: !state.theme.isDark } 
  })),
  
  // User
  user: {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    points: 850,
    badges: [
      { id: '1', name: 'Eco Warrior', icon: 'Leaf', description: 'Saved 100kg CO2', earnedAt: '2024-01-01' },
      { id: '2', name: 'First Swap', icon: 'RefreshCw', description: 'Completed your first swap', earnedAt: '2024-01-15' }
    ],
    joinedAt: '2024-01-01',
    co2Saved: 125.5,
    waterSaved: 2400,
    itemsSwapped: 15
  },
  setUser: (user) => set({ user }),
  
  // Items
  items: [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      description: 'Classic blue denim jacket in excellent condition. Perfect for casual outings.',
      category: 'Outerwear',
      size: 'M',
      condition: 'Excellent',
      images: ['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400'],
      tags: ['vintage', 'denim', 'casual'],
      ownerId: '2',
      ownerName: 'Sarah Johnson',
      ownerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      pointsValue: 120,
      status: 'available',
      createdAt: '2024-01-20',
      likes: 24,
      views: 156
    },
    {
      id: '2',
      title: 'Floral Summer Dress',
      description: 'Beautiful floral print dress, perfect for summer occasions.',
      category: 'Dresses',
      size: 'S',
      condition: 'Very Good',
      images: ['https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400'],
      tags: ['floral', 'summer', 'casual'],
      ownerId: '3',
      ownerName: 'Emma Wilson',
      ownerAvatar: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      pointsValue: 95,
      status: 'available',
      createdAt: '2024-01-18',
      likes: 18,
      views: 89
    }
  ],
  setItems: (items) => set({ items }),
  addItem: (item) => set(state => ({ items: [...state.items, item] })),
  
  // Search & Filters
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category })
}));