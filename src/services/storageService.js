import { productsData, categoriesData, usersData, ordersData } from '../data/mockData';

const KEYS = {
  PRODUCTS: 'ecom_products',
  CATEGORIES: 'ecom_categories',
  USERS: 'ecom_users',
  ORDERS: 'ecom_orders',
  CURRENT_USER: 'ecom_current_user',
  CART: 'ecom_cart',
  WISHLIST: 'ecom_wishlist',
  LOCATION: 'ecom_location'
};

export const storageService = {
  init() {
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(productsData));
    }
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categoriesData));
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(usersData));
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(ordersData));
    }
    if (!localStorage.getItem(KEYS.LOCATION)) {
      localStorage.setItem(KEYS.LOCATION, 'Việt Nam - TP. Hồ Chí Minh');
    }
  },

  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  getProducts() {
    return this.get(KEYS.PRODUCTS, productsData);
  },
  saveProducts(products) {
    this.set(KEYS.PRODUCTS, products);
  },

  getCategories() {
    return this.get(KEYS.CATEGORIES, categoriesData);
  },
  saveCategories(categories) {
    this.set(KEYS.CATEGORIES, categories);
  },

  getUsers() {
    return this.get(KEYS.USERS, usersData);
  },
  saveUsers(users) {
    this.set(KEYS.USERS, users);
  },

  getOrders() {
    return this.get(KEYS.ORDERS, ordersData);
  },
  saveOrders(orders) {
    this.set(KEYS.ORDERS, orders);
  },

  getCurrentUser() {
    return this.get(KEYS.CURRENT_USER, null);
  },
  setCurrentUser(user) {
    this.set(KEYS.CURRENT_USER, user);
  },

  getCart() {
    return this.get(KEYS.CART, []);
  },
  saveCart(cart) {
    this.set(KEYS.CART, cart);
  },

  getWishlist() {
    return this.get(KEYS.WISHLIST, []);
  },
  saveWishlist(wishlist) {
    this.set(KEYS.WISHLIST, wishlist);
  },

  getLocation() {
    return this.get(KEYS.LOCATION, 'Việt Nam - TP. Hồ Chí Minh');
  },
  setLocation(loc) {
    this.set(KEYS.LOCATION, loc);
  },

  resetAll() {
    localStorage.clear();
    this.init();
  }
};

// Tự động khởi tạo ngay khi load
storageService.init();
