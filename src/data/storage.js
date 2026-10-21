// AHA - A Taste Above | LocalStorage Engine
import {
  INITIAL_CITIES,
  INITIAL_CATEGORIES,
  INITIAL_RESTAURANTS,
  INITIAL_FOODS,
  INITIAL_OFFERS,
  INITIAL_REVIEWS,
  INITIAL_USER,
  INITIAL_ADDRESSES,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS
} from './mockData';

const KEYS = {
  USER: 'aha_user',
  AUTH: 'aha_auth',
  LOCATION: 'aha_location',
  CART: 'aha_cart',
  ADDRESSES: 'aha_addresses',
  FAVORITES: 'aha_favorites',
  ORDERS: 'aha_orders',
  NOTIFICATIONS: 'aha_notifications',
  REVIEWS: 'aha_reviews',
  PREFERENCES: 'aha_preferences',
  RECENT_SEARCHES: 'aha_recent_searches',
  COUPON: 'aha_coupon',
  CATALOG: 'aha_catalog'
};

const safeGet = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
};

export const initializeStorage = () => {
  if (!localStorage.getItem(KEYS.USER)) {
    safeSet(KEYS.USER, INITIAL_USER);
  }
  if (!localStorage.getItem(KEYS.AUTH)) {
    safeSet(KEYS.AUTH, { isAuthenticated: true, token: 'mock-jwt-token-aha-royal-9902' });
  }
  if (!localStorage.getItem(KEYS.LOCATION)) {
    safeSet(KEYS.LOCATION, {
      city: INITIAL_CITIES[0],
      area: 'Banjara Hills',
      addressString: 'Banjara Hills, Hyderabad'
    });
  }
  if (!localStorage.getItem(KEYS.CART)) {
    safeSet(KEYS.CART, {
      restaurant: null,
      items: [],
      coupon: null,
      cookingInstructions: '',
      orderType: 'DELIVERY'
    });
  }
  if (!localStorage.getItem(KEYS.ADDRESSES)) {
    safeSet(KEYS.ADDRESSES, INITIAL_ADDRESSES);
  }
  if (!localStorage.getItem(KEYS.FAVORITES)) {
    safeSet(KEYS.FAVORITES, {
      restaurants: ['rest-1', 'rest-3'],
      foods: ['food-1', 'food-6']
    });
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    safeSet(KEYS.ORDERS, INITIAL_ORDERS);
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    safeSet(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    safeSet(KEYS.REVIEWS, INITIAL_REVIEWS);
  }
  if (!localStorage.getItem(KEYS.PREFERENCES)) {
    safeSet(KEYS.PREFERENCES, {
      isPureVegOnly: false,
      pushNotifications: true,
      smsAlerts: true,
      theme: 'royal-dark'
    });
  }
  if (!localStorage.getItem(KEYS.RECENT_SEARCHES)) {
    safeSet(KEYS.RECENT_SEARCHES, ['Dum Biryani', 'Mutton Haleem', 'Babai Idli', 'Bukhara']);
  }
  if (!localStorage.getItem(KEYS.CATALOG)) {
    safeSet(KEYS.CATALOG, {
      restaurants: INITIAL_RESTAURANTS,
      foods: INITIAL_FOODS,
      categories: INITIAL_CATEGORIES,
      cities: INITIAL_CITIES,
      offers: INITIAL_OFFERS
    });
  }
};

// Data Access Helpers
let cachedCatalog = null;
export const getStoredCatalog = () => {
  if (!cachedCatalog) {
    cachedCatalog = safeGet(KEYS.CATALOG, {
      restaurants: INITIAL_RESTAURANTS,
      foods: INITIAL_FOODS,
      categories: INITIAL_CATEGORIES,
      cities: INITIAL_CITIES,
      offers: INITIAL_OFFERS
    });
  }
  return cachedCatalog;
};

export const getStoredUser = () => safeGet(KEYS.USER, INITIAL_USER);
export const setStoredUser = (user) => safeSet(KEYS.USER, user);

export const getStoredAuth = () => safeGet(KEYS.AUTH, { isAuthenticated: true, token: 'mock-jwt-token' });
export const setStoredAuth = (auth) => safeSet(KEYS.AUTH, auth);

export const getStoredLocation = () => safeGet(KEYS.LOCATION, { city: INITIAL_CITIES[0], area: 'Banjara Hills', addressString: 'Banjara Hills, Hyderabad' });
export const setStoredLocation = (loc) => safeSet(KEYS.LOCATION, loc);

export const getStoredCart = () => safeGet(KEYS.CART, { restaurant: null, items: [], coupon: null, cookingInstructions: '', orderType: 'DELIVERY' });
export const setStoredCart = (cart) => safeSet(KEYS.CART, cart);

export const getStoredAddresses = () => safeGet(KEYS.ADDRESSES, INITIAL_ADDRESSES);
export const setStoredAddresses = (addrs) => safeSet(KEYS.ADDRESSES, addrs);

export const addStoredAddress = (newAddr) => {
  const list = getStoredAddresses();
  const item = {
    ...newAddr,
    id: newAddr.id || `addr-${Date.now()}`
  };
  if (item.isDefault) {
    list.forEach(a => a.isDefault = false);
  }
  const updated = [item, ...list];
  setStoredAddresses(updated);
  return item;
};

export const updateStoredAddress = (id, updates) => {
  const list = getStoredAddresses();
  if (updates.isDefault) {
    list.forEach(a => a.isDefault = false);
  }
  const updated = list.map(a => a.id === id ? { ...a, ...updates } : a);
  setStoredAddresses(updated);
  return updated;
};

export const deleteStoredAddress = (id) => {
  const list = getStoredAddresses();
  const updated = list.filter(a => a.id !== id);
  setStoredAddresses(updated);
  return updated;
};

export const getStoredFavorites = () => safeGet(KEYS.FAVORITES, { restaurants: ['rest-1'], foods: ['food-1'] });
export const setStoredFavorites = (favs) => safeSet(KEYS.FAVORITES, favs);

export const toggleFavoriteRestaurant = (restaurantId) => {
  const favs = getStoredFavorites();
  const list = favs.restaurants || [];
  const exists = list.includes(restaurantId);
  const updatedList = exists ? list.filter(id => id !== restaurantId) : [...list, restaurantId];
  const updated = { ...favs, restaurants: updatedList };
  setStoredFavorites(updated);
  return !exists;
};

export const toggleFavoriteFood = (foodId) => {
  const favs = getStoredFavorites();
  const list = favs.foods || [];
  const exists = list.includes(foodId);
  const updatedList = exists ? list.filter(id => id !== foodId) : [...list, foodId];
  const updated = { ...favs, foods: updatedList };
  setStoredFavorites(updated);
  return !exists;
};

export const getStoredOrders = () => safeGet(KEYS.ORDERS, INITIAL_ORDERS);
export const setStoredOrders = (orders) => safeSet(KEYS.ORDERS, orders);

export const getStoredOrderById = (id) => {
  const orders = getStoredOrders();
  return orders.find(o => o.id === id || o.orderId === id);
};

export const addStoredOrder = (orderData) => {
  const orders = getStoredOrders();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const orderId = `AHA-${randomNum}`;
  const newOrder = {
    ...orderData,
    id: orderId,
    orderId,
    createdAt: new Date().toISOString(),
    status: 'PLACED',
    deliveryPartner: {
      name: 'Ravi Kumar',
      phone: '+91 99887 66554',
      vehicleNumber: 'TS 09 EZ 7788',
      rating: 4.9
    }
  };
  const updated = [newOrder, ...orders];
  setStoredOrders(updated);

  // Add notification
  addStoredNotification({
    title: 'Order Confirmed!',
    message: `Your feast #${orderId} is being prepared at ${newOrder.restaurant?.name || 'the royal kitchen'}.`,
    type: 'ORDER',
    link: `/orders/${orderId}/track`
  });

  return newOrder;
};

export const updateStoredOrderStatus = (orderId, status) => {
  const orders = getStoredOrders();
  let updatedOrder = null;
  const updated = orders.map(o => {
    if (o.id === orderId || o.orderId === orderId) {
      updatedOrder = { ...o, status };
      return updatedOrder;
    }
    return o;
  });
  setStoredOrders(updated);
  return updatedOrder;
};

export const getStoredNotifications = () => safeGet(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
export const setStoredNotifications = (notifs) => safeSet(KEYS.NOTIFICATIONS, notifs);

export const addStoredNotification = (notif) => {
  const notifs = getStoredNotifications();
  const item = {
    ...notif,
    id: `notif-${Date.now()}`,
    time: 'Just now',
    read: false
  };
  const updated = [item, ...notifs];
  setStoredNotifications(updated);
  return item;
};

export const markNotificationRead = (id) => {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
  setStoredNotifications(updated);
  return updated;
};

export const clearAllNotifications = () => {
  setStoredNotifications([]);
};

export const getStoredReviews = () => safeGet(KEYS.REVIEWS, INITIAL_REVIEWS);
export const setStoredReviews = (revs) => safeSet(KEYS.REVIEWS, revs);

export const addStoredReview = (rev) => {
  const revs = getStoredReviews();
  const item = {
    ...rev,
    id: `rev-${Date.now()}`,
    date: 'Just now'
  };
  const updated = [item, ...revs];
  setStoredReviews(updated);
  return item;
};

export const getStoredPreferences = () => safeGet(KEYS.PREFERENCES, {
  isPureVegOnly: false,
  pushNotifications: true,
  smsAlerts: true,
  theme: 'royal-dark'
});
export const setStoredPreferences = (prefs) => safeSet(KEYS.PREFERENCES, prefs);

export const getStoredRecentSearches = () => safeGet(KEYS.RECENT_SEARCHES, ['Dum Biryani', 'Mutton Haleem', 'Babai Idli']);
export const addStoredRecentSearch = (term) => {
  if (!term || !term.trim()) return;
  const list = getStoredRecentSearches().filter(s => s.toLowerCase() !== term.toLowerCase());
  const updated = [term.trim(), ...list].slice(0, 8);
  safeSet(KEYS.RECENT_SEARCHES, updated);
};

export const resetAllStorage = () => {
  localStorage.clear();
  cachedCatalog = null;
  initializeStorage();
};
