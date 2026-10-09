import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoGridOutline, IoFlashOutline, IoChevronDown, IoShieldCheckmarkOutline } from 'react-icons/io5';
import CategoryDrawer from './CategoryDrawer';

const Navigation = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Tất cả sản phẩm', path: '/products' },
    { title: 'Bán chạy nhất', path: '/products?filter=bestseller' },
    { title: 'Tin tức & Blog', path: '/blog' },
    { title: 'Liên hệ', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm relative z-20">
      <div className="container-fluid">
        <div className="flex items-center justify-between py-1.5">
          {/* Left: Shop by Category Button */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsCategoryOpen(true)}
              className="flex items-center gap-2.5 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition shadow-sm"
              id="shop-by-category-btn"
            >
              <IoGridOutline className="text-base" />
              <span>DANH MỤC SẢN PHẨM</span>
              <IoChevronDown className="text-xs ml-1" />
            </button>

            {/* Middle: Navigation Links */}
            <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
              {navLinks.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className={`text-xs font-bold transition uppercase tracking-wide hover:text-primary ${
                        isActive ? 'text-primary' : 'text-slate-700'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Promotion Highlight */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full animate-pulse">
              <IoFlashOutline className="text-sm" />
              Flash Sale: Giảm đến 50%
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <IoShieldCheckmarkOutline className="text-sm" />
              100% Chính hãng
            </span>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <CategoryDrawer open={isCategoryOpen} onClose={() => setIsCategoryOpen(false)} />
    </nav>
  );
};

export default Navigation;
