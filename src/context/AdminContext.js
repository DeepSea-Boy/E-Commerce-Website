import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { salesAnalyticsData } from '../data/mockData';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState(() => storageService.getProducts());
  const [categories, setCategories] = useState(() => storageService.getCategories());
  const [orders, setOrders] = useState(() => storageService.getOrders());
  const [users, setUsers] = useState(() => storageService.getUsers());
  const [analytics] = useState(salesAnalyticsData);

  useEffect(() => {
    storageService.saveProducts(products);
  }, [products]);

  useEffect(() => {
    storageService.saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    storageService.saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    storageService.saveUsers(users);
  }, [users]);

  // Products CRUD
  const addProduct = (newProd) => {
    const item = {
      ...newProd,
      id: `prod-${Date.now()}`,
      slug: (newProd.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 0,
      images: newProd.images?.length ? newProd.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80']
    };
    setProducts(prev => [item, ...prev]);
    return item;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Categories CRUD
  const addCategory = (newCat) => {
    const item = {
      ...newCat,
      id: `cat-${Date.now()}`,
      slug: (newCat.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      itemCount: 0,
      subCategories: newCat.subCategories || []
    };
    setCategories(prev => [...prev, item]);
    return item;
  };

  const updateCategory = (id, updatedFields) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Orders Management
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Users Management
  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' };
      }
      return u;
    }));
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalUsersCount = users.length;
  const totalProductsCount = products.length;

  return (
    <AdminContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      orders,
      updateOrderStatus,
      users,
      toggleUserStatus,
      analytics,
      stats: {
        totalRevenue,
        totalOrders,
        totalUsersCount,
        totalProductsCount
      }
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
