import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => storageService.getCurrentUser());
  const [users, setUsers] = useState(() => storageService.getUsers());

  useEffect(() => {
    storageService.setCurrentUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    storageService.saveUsers(users);
  }, [users]);

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, message: 'Email này chưa được đăng ký trong hệ thống.' };
    }
    if (found.password !== password) {
      return { success: false, message: 'Mật khẩu không chính xác.' };
    }
    if (found.status === 'Blocked') {
      return { success: false, message: 'Tài khoản của bạn đã bị khóa bởi Quản trị viên.' };
    }
    setCurrentUser(found);
    return { success: true, user: found };
  };

  const adminLogin = (email, password) => {
    const res = login(email, password);
    if (res.success && res.user.role !== 'admin') {
      return { success: false, message: 'Tài khoản này không có quyền Quản trị (Admin).' };
    }
    return res;
  };

  const register = ({ name, email, password, phone, role = 'customer' }) => {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'Email này đã tồn tại trên hệ thống.' };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password,
      phone: phone || '',
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      addresses: []
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const verifyOtp = (otpCode) => {
    if (otpCode === '123456') {
      return { success: true, message: 'Xác thực OTP thành công!' };
    }
    return { success: false, message: 'Mã OTP không chính xác. Vui lòng nhập mã mẫu 123456.' };
  };

  const updateProfile = (data) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(users.map(u => u.id === updated.id ? updated : u));
    return { success: true, user: updated };
  };

  const addAddress = (address) => {
    if (!currentUser) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      isDefault: currentUser.addresses?.length === 0,
      ...address
    };
    const updatedAddresses = [...(currentUser.addresses || []), newAddr];
    updateProfile({ addresses: updatedAddresses });
  };

  const removeAddress = (addrId) => {
    if (!currentUser) return;
    const updatedAddresses = (currentUser.addresses || []).filter(a => a.id !== addrId);
    updateProfile({ addresses: updatedAddresses });
  };

  const setDefaultAddress = (addrId) => {
    if (!currentUser) return;
    const updatedAddresses = (currentUser.addresses || []).map(a => ({
      ...a,
      isDefault: a.id === addrId
    }));
    updateProfile({ addresses: updatedAddresses });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      adminLogin,
      register,
      logout,
      verifyOtp,
      updateProfile,
      addAddress,
      removeAddress,
      setDefaultAddress,
      isAdmin: currentUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
