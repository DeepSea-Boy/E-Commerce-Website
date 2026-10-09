import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { FilterProvider } from './context/FilterContext';
import { QuickViewProvider } from './context/QuickViewContext';
import { OrderProvider } from './context/OrderContext';
import { AdminProvider } from './context/AdminContext';

// Client Layout & Pages
import ClientLayout from './Components/Layout/ClientLayout';
import Home from './Pages/Home';
import ProductListing from './Pages/ProductListing';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Wishlist from './Pages/Wishlist';
import Compare from './Pages/Compare';
import Checkout from './Pages/Checkout';
import OrderSuccess from './Pages/Checkout/OrderSuccess';
import MyOrders from './Pages/Orders/MyOrders';
import MyAccount from './Pages/Account/MyAccount';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import VerifyOTP from './Pages/Auth/VerifyOTP';

// Admin Layout & Pages
import AdminLayout from './Admin/Layout/AdminLayout';
import AdminSignIn from './Admin/Pages/Auth/AdminSignIn';
import AdminSignUp from './Admin/Pages/Auth/AdminSignUp';
import Dashboard from './Admin/Pages/Dashboard';
import AdminProductList from './Admin/Pages/Products/ProductList';
import AddEditProduct from './Admin/Pages/Products/AddEditProduct';
import CategoryList from './Admin/Pages/Categories/CategoryList';
import AdminOrderList from './Admin/Pages/Orders/OrderList';
import UserList from './Admin/Pages/Users/UserList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <FilterProvider>
                  <QuickViewProvider>
                    <OrderProvider>
                      <BrowserRouter>
                        <Routes>
                          {/* Client-side Routes */}
                          <Route path="/" element={<ClientLayout />}>
                            <Route index element={<Home />} />
                            <Route path="products" element={<ProductListing />} />
                            <Route path="product/:slug" element={<ProductDetails />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="wishlist" element={<Wishlist />} />
                            <Route path="compare" element={<Compare />} />
                            <Route path="checkout" element={<Checkout />} />
                            <Route path="order-success/:orderId" element={<OrderSuccess />} />
                            <Route path="orders" element={<MyOrders />} />
                            <Route path="account" element={<MyAccount />} />
                            <Route path="sign-in" element={<SignIn />} />
                            <Route path="sign-up" element={<SignUp />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                            <Route path="verify-otp" element={<VerifyOTP />} />
                            <Route path="blog" element={<Home />} />
                            <Route path="help" element={<Home />} />
                            <Route path="contact" element={<Home />} />
                          </Route>

                          {/* Admin Authentication */}
                          <Route path="/admin/sign-in" element={<AdminSignIn />} />
                          <Route path="/admin/sign-up" element={<AdminSignUp />} />

                          {/* Admin Dashboard & Management Routes */}
                          <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="/admin/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="products" element={<AdminProductList />} />
                            <Route path="products/add" element={<AddEditProduct />} />
                            <Route path="products/edit/:id" element={<AddEditProduct />} />
                            <Route path="categories" element={<CategoryList />} />
                            <Route path="orders" element={<AdminOrderList />} />
                            <Route path="users" element={<UserList />} />
                          </Route>

                          {/* Fallback */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </BrowserRouter>
                    </OrderProvider>
                  </QuickViewProvider>
                </FilterProvider>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
