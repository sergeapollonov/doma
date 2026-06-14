/**
 * Doma Design Tokens
 *
 * Source:
 * /docs/design-system.md
 *
 * Style direction:
 * Warm premium iOS-first interface with soft glass panels,
 * deep navy primary accent and warm gold secondary accent.
 */

export const colors = {
  // Backgrounds
  warmBackground: '#F7F1E8',
  backgroundTop: '#FFF8EE',
  backgroundBottom: '#F3E8DA',
  surfacePrimary: '#FFFFFF',
  surfaceWarm: '#FFFBF5',
  glassSurface: 'rgba(255, 255, 255, 0.68)',
  
  glass: {
    light: 'rgba(255, 255, 255, 0.54)',
    medium: 'rgba(255, 255, 255, 0.74)',
    heavy: 'rgba(255, 255, 255, 0.86)',
    solid: 'rgba(255, 255, 255, 0.94)',
    borderLight: 'rgba(255, 255, 255, 0.6)',
    borderMedium: 'rgba(255, 255, 255, 0.74)',
    borderHeavy: 'rgba(255, 255, 255, 0.88)',
  },

  // Text
  textPrimary: '#152235',
  textSecondary: '#6F747C',
  textTertiary: '#A2A6AD',

  // Strokes / dividers
  strokeSoft: '#E8DED2',
  strokeLight: '#F1E8DD',
  divider: 'rgba(232, 222, 210, 0.72)',

  // Brand / accents
  domaBlue: '#163A5F',
  domaBlueLight: '#1D4A76',
  domaGold: '#D69A45',
  domaGoldLight: '#E5B76C',
  taskOrange: '#EF8A1F',
  shoppingGreen: '#5F9669',
  familySand: '#D7B98B',
  dangerRed: '#D85C4A',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  inactive: '#8A8F98',
  transparent: 'transparent',
} as const;

export const gradients = {
  warmBackground: ['#FFF8EE', '#F7F1E8', '#F3E8DA'],
  goldCta: ['#E5B76C', '#D69A45'],
  blueActive: ['#1D4A76', '#163A5F'],
} as const;

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screen: 20,
  card: 16,
  row: 12,
  screenHorizontal: 20,
  cardInner: 16,
  section: 24,
  cardGap: 12,
} as const;

export const radius = {
  none: 0,
  xs: 6,
  small: 10,
  sm: 10,
  medium: 14,
  md: 14,
  large: 20,
  lg: 16,
  xl: 20,
  xxl: 24,
  xlarge: 28,
  xxxl: 28,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    ui: 'SF Pro Text',
    uiAndroid: 'Roboto',
    brand: 'Playfair Display',
  },

  largeTitle: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
  },

  screenTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },

  body: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
  },

  bodyMedium: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
  },

  caption: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
  },

  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },

  tabLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
} as const;

export const shadows = {
  softCard: {
    shadowColor: 'rgba(55, 38, 20, 0.08)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 3,
  },

  glass: {
    shadowColor: 'rgba(55, 38, 20, 0.10)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 36,
    elevation: 4,
  },

  button: {
    shadowColor: 'rgba(214, 154, 69, 0.24)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 3,
  },
} as const;

export const sizes = {
  minTouchTarget: 44,

  tabBarHeight: 84,
  headerHeight: 64,

  listRowMinHeight: 52,
  listRowLargeHeight: 68,

  buttonHeight: 54,
  inputHeight: 56,
  chipHeight: 34,

  iconSmall: 16,
  iconMedium: 22,
  iconTab: 24,

  avatarSmall: 20,
  avatarMedium: 32,
  avatarLarge: 48,
  avatarProfile: 72,

  calendarDay: 40,
} as const;

export const opacity = {
  disabled: 0.45,
  pressed: 0.72,
  purchased: 0.45,
  overlay: 0.32,
} as const;

export const zIndex = {
  base: 0,
  card: 1,
  header: 10,
  tabBar: 20,
  modal: 100,
  toast: 200,
} as const;

export const domaTokens = {
  colors,
  gradients,
  spacing,
  radius,
  typography,
  shadows,
  sizes,
  opacity,
  zIndex,
} as const;

export type DomaColorToken = keyof typeof colors;
export type DomaSpacingToken = keyof typeof spacing;
export type DomaRadiusToken = keyof typeof radius;
export type DomaTokens = typeof domaTokens;

export default domaTokens;
