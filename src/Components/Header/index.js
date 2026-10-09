import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import {
  IoSearch,
  IoCartOutline,
  IoHeartOutline,
  IoGitCompareOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoChevronDown,
  IoLogOutOutline,
  IoBagCheckOutline,
  IoSpeedometerOutline
} from 'react-icons/io5';
import TopStrip from './TopStrip';
import LocationModal from './LocationModal';
import Navigation from '../Navigation/Navigation';
import CartPanel from '../Cart/CartPanel';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { useFilter } from '../../context/FilterContext';
import { productsData } from '../../data/mockData';
import { storageService } from '../../services/storageService';
import logo from '../../assets/logo.png';
import './header.css';

const Header = () => {
  const { totalCount, setIsCartOpen } = useCart();
  const { totalWishlist } = useWishlist();
  const { totalCompare } = useCompare();
  const { currentUser, logout, isAdmin } = useAuth();
  const { setSearchKeyword } = useFilter();
  const navigate = useNavigate();

  // Location modal state
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => storageService.getLocation());

  // Search input & suggestion state
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // User menu anchor state
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    storageService.setLocation(loc);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchKeyword(query.trim());
      setShowSuggestions(false);
      navigate('/products');
    }
  };

  const matchingProducts = query.trim()
    ? productsData.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="header sticky top-0 z-40 bg-white shadow-sm">
      {/* 1. Top Strip */}
      <TopStrip />

      {/* 2. Main Header */}
      <div className="header__main">
        <div className="container-fluid">
          <div className="header__inner">
            {/* Logo */}
            <div className="header__logo">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Shop Logo" className="logo-img" />
              </Link>
            </div>

            {/* Location Selector */}
            <button
              onClick={() => setIsLocationOpen(true)}
              className="location-btn"
              title="Chọn tỉnh thành của bạn"
            >
              <IoLocationOutline className="text-primary text-base shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase leading-none">Giao tới</span>
                <span className="block font-bold text-xs truncate max-w-[130px]">{selectedLocation}</span>
              </div>
              <IoChevronDown className="text-xs text-slate-400 ml-1" />
            </button>

            {/* Search Box with Autocomplete */}
            <div className="header__search-wrapper">
              <form onSubmit={handleSearchSubmit} className="header__search">
                <input
                  type="text"
                  placeholder="Tìm kiếm điện thoại, laptop, thiết bị IoT thông minh..."
                  className="search-input"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  id="header-search-input"
                />
                <button type="submit" className="search-btn" aria-label="Tìm kiếm" id="header-search-btn">
                  <IoSearch />
                </button>
              </form>

              {/* Suggestions dropdown */}
              {showSuggestions && matchingProducts.length > 0 && (
                <div
                  className="search-suggestions"
                  onMouseDown={(e) => e.preventDefault()} // Ngăn blur
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Sản phẩm gợi ý
                  </div>
                  {matchingProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug || p.id}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition"
                    >
                      <img src={p.images?.[0]} alt="" className="w-10 h-10 object-contain rounded border border-slate-100" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-semibold text-slate-800 truncate m-0">{p.name}</h5>
                        <span className="text-xs font-bold text-rose-600">{p.price?.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="header__actions">
              {/* Compare Button */}
              <Tooltip title="So sánh sản phẩm">
                <Link to="/compare" className="action-icon-btn">
                  <Badge badgeContent={totalCompare} color="primary" max={9}>
                    <IoGitCompareOutline />
                  </Badge>
                </Link>
              </Tooltip>

              {/* Wishlist Button */}
              <Tooltip title="Sản phẩm yêu thích">
                <Link to="/wishlist" className="action-icon-btn">
                  <Badge badgeContent={totalWishlist} color="secondary" max={99}>
                    <IoHeartOutline />
                  </Badge>
                </Link>
              </Tooltip>

              {/* User Account Button & Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  className="action-icon-btn"
                  title="Tài khoản"
                  id="user-account-menu-btn"
                >
                  {currentUser?.avatar ? (
                    <Avatar src={currentUser.avatar} sx={{ width: 28, height: 28 }} />
                  ) : (
                    <IoPersonOutline />
                  )}
                </button>

                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={() => setAnchorEl(null)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    sx: { width: 220, borderRadius: 3, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }
                  }}
                >
                  {currentUser ? (
                    [
                      <div key="info" className="px-4 py-2 border-b border-slate-100">
                        <div className="font-bold text-xs text-slate-800">{currentUser.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      </div>,
                      <MenuItem key="acc" onClick={() => { setAnchorEl(null); navigate('/account'); }}>
                        <IoPersonOutline className="mr-2.5 text-base text-slate-500" />
                        <span className="text-xs font-medium">Hồ sơ cá nhân</span>
                      </MenuItem>,
                      <MenuItem key="orders" onClick={() => { setAnchorEl(null); navigate('/orders'); }}>
                        <IoBagCheckOutline className="mr-2.5 text-base text-slate-500" />
                        <span className="text-xs font-medium">Đơn hàng của tôi</span>
                      </MenuItem>,
                      isAdmin && (
                        <MenuItem key="admin" onClick={() => { setAnchorEl(null); navigate('/admin/dashboard'); }}>
                          <IoSpeedometerOutline className="mr-2.5 text-base text-sky-500" />
                          <span className="text-xs font-bold text-sky-600">Trang Quản trị Admin</span>
                        </MenuItem>
                      ),
                      <MenuItem key="logout" onClick={() => { setAnchorEl(null); logout(); }}>
                        <IoLogOutOutline className="mr-2.5 text-base text-rose-500" />
                        <span className="text-xs font-medium text-rose-600">Đăng xuất</span>
                      </MenuItem>
                    ]
                  ) : (
                    [
                      <MenuItem key="login" onClick={() => { setAnchorEl(null); navigate('/sign-in'); }}>
                        <span className="text-xs font-semibold">Đăng nhập tài khoản</span>
                      </MenuItem>,
                      <MenuItem key="reg" onClick={() => { setAnchorEl(null); navigate('/sign-up'); }}>
                        <span className="text-xs font-semibold text-primary">Tạo tài khoản mới</span>
                      </MenuItem>,
                      <div key="div" className="border-t border-slate-100 my-1" />,
                      <MenuItem key="admin-auth" onClick={() => { setAnchorEl(null); navigate('/admin/sign-in'); }}>
                        <span className="text-xs font-semibold text-slate-600">Đăng nhập Quản trị viên</span>
                      </MenuItem>
                    ]
                  )}
                </Menu>
              </div>

              {/* Cart Drawer Trigger */}
              <Tooltip title="Xem nhanh giỏ hàng">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="action-icon-btn bg-sky-50 text-primary border-primary/30 hover:bg-primary hover:text-white"
                  id="header-cart-btn"
                >
                  <Badge badgeContent={totalCount} color="error" max={99}>
                    <IoCartOutline className="text-xl" />
                  </Badge>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Horizontal Navigation Bar */}
      <Navigation />

      {/* 4. Slide-out Quick Cart Panel */}
      <CartPanel />

      {/* 5. Location Selector Modal */}
      <LocationModal
        open={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
      />
    </header>
  );
};

export default Header;