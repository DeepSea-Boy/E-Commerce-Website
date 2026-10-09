import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => storageService.getOrders());

  useEffect(() => {
    storageService.saveOrders(orders);
  }, [orders]);

  const placeOrder = ({ customerInfo, items, subtotal, shippingFee, discountAmount, total, paymentMethod }) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Chờ thanh toán khi nhận hàng' : 'Đã thanh toán Online',
      shippingAddress: `${customerInfo.street}, ${customerInfo.ward}, ${customerInfo.district}, ${customerInfo.city}`,
      items,
      subtotal,
      shippingFee,
      discountAmount,
      total
    };

    setOrders(prev => [newOrder, ...prev]);
    return { success: true, order: newOrder };
  };

  const getOrderById = (id) => orders.find(o => o.id === id);

  const getOrdersByEmail = (email) => {
    if (!email) return [];
    return orders.filter(o => o.customerEmail?.toLowerCase() === email.toLowerCase());
  };

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      getOrderById,
      getOrdersByEmail
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
