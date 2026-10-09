import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { couponsData } from '../data/mockData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => storageService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    storageService.saveCart(cartItems);
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedVariant = '') => {
    const itemKey = `${product.id}_${selectedVariant || 'default'}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.itemKey === itemKey);
      if (existing) {
        return prev.map(item =>
          item.itemKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          itemKey,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.images?.[0] || '',
          category: product.category,
          selectedVariant: selectedVariant || 'Mặc định',
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const found = couponsData.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      return { success: true, coupon: found, message: `Áp dụng thành công: ${found.desc}` };
    }
    return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.percent) {
      discount = Math.round((subtotal * appliedCoupon.percent) / 100);
      if (discount > 1000000) discount = 1000000;
    } else if (appliedCoupon.amount) {
      discount = appliedCoupon.amount;
    }
  }

  const shipping = subtotal > 5000000 || cartItems.length === 0 ? 0 : 40000;
  const total = Math.max(0, subtotal - discount + (discount === appliedCoupon?.amount ? 0 : shipping));

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      totalCount,
      subtotal,
      discount,
      shipping,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
