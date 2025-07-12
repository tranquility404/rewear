export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  badges: Badge[];
  joinedAt: string;
  co2Saved: number;
  waterSaved: number;
  itemsSwapped: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  images: string[];
  tags: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  pointsValue: number;
  status: 'available' | 'swapped' | 'pending';
  createdAt: string;
  likes: number;
  views: number;
}

export interface SwapRequest {
  id: string;
  itemId: string;
  requesterId: string;
  ownerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
}

export interface Theme {
  isDark: boolean;
}