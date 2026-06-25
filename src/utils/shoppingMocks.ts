import type { ShoppingItem, ShoppingTemplate } from '../types';

export const mockUrgentItems: ShoppingItem[] = [
  {
    id: 'shop-u1',
    title: 'Молоко',
    quantity: '2 шт.',
    categoryId: 'cat-dairy',
    category: 'Молочное',
    categoryColor: '#4A90D9',
    categoryIcon: '🥛',
    purchased: false,
    assignee: 'alex',
    priority: 'high',
    
    estimatedPrice: 8,
  },
  {
    id: 'shop-u2',
    title: 'Подгузники',
    quantity: '1 уп.',
    categoryId: 'cat-home',
    category: 'Дом',
    categoryColor: '#9B59B6',
    categoryIcon: '🧷',
    purchased: false,
    assignee: 'maya',
    priority: 'high',
    
    estimatedPrice: 25,
  },
  {
    id: 'shop-u3',
    title: 'Хлеб',
    quantity: '1 шт.',
    categoryId: 'cat-bakery',
    category: 'Хлеб',
    categoryColor: '#E67E22',
    categoryIcon: '🍞',
    purchased: false,
    assignee: 'shared',
    priority: 'high',
    
    estimatedPrice: 5,
  },
  {
    id: 'shop-u4',
    title: 'Лосось',
    quantity: '500 г',
    categoryId: 'cat-meat-fish',
    category: 'Мясо и рыба',
    categoryColor: '#E74C3C',
    categoryIcon: '🐟',
    purchased: false,
    assignee: 'alex',
    priority: 'high',
    
    estimatedPrice: 35,
  },
];

export const mockSoonItems: ShoppingItem[] = [
  {
    id: 'shop-s1',
    title: 'Корм для кота',
    quantity: '1 уп.',
    categoryId: 'cat-pet',
    category: 'Питомцы',
    categoryColor: '#F39C12',
    categoryIcon: '🐱',
    purchased: false,
    assignee: 'maya',
    priority: 'high',
    
    
    estimatedPrice: 18,
  },
  {
    id: 'shop-s2',
    title: 'Порошок для стирки',
    quantity: '1 шт.',
    categoryId: 'cat-home',
    category: 'Дом',
    categoryColor: '#27AE60',
    categoryIcon: '🧴',
    purchased: false,
    assignee: 'shared',
    priority: 'high',
    
    
    estimatedPrice: 22,
  },
  {
    id: 'shop-s3',
    title: 'Туалетная бумага',
    quantity: '1 уп.',
    categoryId: 'cat-home',
    category: 'Дом',
    categoryColor: '#2980B9',
    categoryIcon: '🧻',
    purchased: false,
    assignee: 'alex',
    priority: 'high',
    
    
    estimatedPrice: 12,
  },
];

export const mockPurchasedCount = 34;

export const mockTripItemCount = 12;
export const mockTripEstimatedPrice = 65;

export const mockShoppingTemplates: ShoppingTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Продукты\nна неделю',
    iconBg: 'rgba(82,183,136,0.12)',
    iconColor: '#52B788',
    iconName: 'basket-outline',
    itemCount: 12,
    scope: 'family',
    lastUsedDaysAgo: 3,
  },
  {
    id: 'tmpl-2',
    name: 'Большая\nзакупка',
    iconBg: 'rgba(109,93,246,0.12)',
    iconColor: '#6D5DF6',
    iconName: 'cart-outline',
    itemCount: 24,
    scope: 'family',
    lastUsedDaysAgo: 7,
  },
  {
    id: 'tmpl-3',
    name: 'Аптека',
    iconBg: 'rgba(232,85,74,0.12)',
    iconColor: '#E8554A',
    iconName: 'medical-outline',
    itemCount: 15,
    scope: 'personal',
    lastUsedDaysAgo: 14,
  },
  {
    id: 'tmpl-4',
    name: 'Поездка',
    iconBg: 'rgba(214,154,69,0.12)',
    iconColor: '#D69A45',
    iconName: 'airplane-outline',
    itemCount: 18,
    scope: 'family',
    lastUsedDaysAgo: 30,
  },
];
