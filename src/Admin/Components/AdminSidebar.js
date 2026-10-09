import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  IoSpeedometerOutline,
  IoCubeOutline,
  IoLayersOutline,
  IoBagCheckOutline,
  IoPeopleOutline,
  IoGlobeOutline,
  IoLogOutOutline,
  IoChevronBack,
  IoChevronForward
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const navItems = [
  { title: 'Tổng quan (Dashboard)', path: '/admin/dashboard', icon: <IoSpeedometerOutline className="text-lg shrink-0" /> },
  { title: 'Quản lý Sản phẩm', path: '/admin/products', icon: <IoCubeOutline className="text-lg shrink-0" /> },
  { title: 'Quản lý Danh mục', path: '/admin/categories', icon: <IoLayersOutline className="text-lg shrink-0" /> },
  { title: 'Quản lý Đơn hàng', path: '/admin/orders', icon: <IoBagCheckOutline className="text-lg shrink-0" /> },
  { title: 'Quản lý Người dùng', path: '/admin/users', icon: <IoPeopleOutline className="text-lg shrink-0" /> },
];

const AdminSidebar = ({ collapsed, onToggle }) => {
  const { logout } = useAuth();

  return (
    <aside className={`admin-sidebar ${collapsed ? 'admin-sidebar--collapsed' : 'admin-sidebar--expanded'}`}>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {!collapsed && (
          <Link to="/admin/dashboard" className="flex items-center gap-2 overflow-hidden">
            <img src={logo} alt="Logo" className="h-8 brightness-200" />
            <span className="font-extrabold text-sm text-white tracking-wide">ADMIN</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition mx-auto"
          title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
        >
          {collapsed ? <IoChevronForward className="text-lg" /> : <IoChevronBack className="text-lg" />}
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `admin-sidebar__link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? item.title : undefined}
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          to="/"
          className={`admin-sidebar__link text-sky-400 hover:text-sky-300 ${collapsed ? 'justify-center px-0' : ''}`}
          title="Xem trang khách hàng"
        >
          <IoGlobeOutline className="text-lg shrink-0" />
          {!collapsed && <span>Xem cửa hàng</span>}
        </Link>

        <button
          onClick={logout}
          className={`w-full admin-sidebar__link text-rose-400 hover:text-rose-300 ${collapsed ? 'justify-center px-0' : ''}`}
          title="Đăng xuất"
        >
          <IoLogOutOutline className="text-lg shrink-0" />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
