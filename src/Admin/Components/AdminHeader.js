import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import {
  IoMenuOutline,
  IoSearch,
  IoNotificationsOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoGlobeOutline
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminHeader = ({ onToggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <header className="admin-header">
      {/* Left: Toggle & Search */}
      <div className="flex items-center gap-4">
        <IconButton onClick={onToggleSidebar} size="small" className="text-slate-600">
          <IoMenuOutline className="text-2xl" />
        </IconButton>

        <div className="hidden sm:flex items-center bg-slate-100 rounded-xl px-3 py-1.5 gap-2 border border-slate-200 w-72">
          <IoSearch className="text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Tìm kiếm trong quản trị..."
            className="bg-transparent border-none text-xs outline-none w-full text-slate-700"
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition"
        >
          <IoGlobeOutline className="text-sm" />
          <span>Mở trang Shop</span>
        </Link>

        {/* Notifications */}
        <IconButton size="small" className="text-slate-600 hover:bg-slate-100">
          <Badge badgeContent={3} color="error">
            <IoNotificationsOutline className="text-xl" />
          </Badge>
        </IconButton>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition"
          >
            <Avatar
              src={currentUser?.avatar}
              alt={currentUser?.name}
              sx={{ width: 34, height: 34 }}
            />
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-slate-800">{currentUser?.name || 'Administrator'}</span>
              <span className="block text-[10px] text-sky-600 font-semibold uppercase">Super Admin</span>
            </div>
          </button>

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{ sx: { width: 200, borderRadius: 3, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' } }}
          >
            <div className="px-4 py-2 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-800">{currentUser?.name}</div>
              <div className="text-[11px] text-slate-400">{currentUser?.email}</div>
            </div>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/account'); }}>
              <IoPersonOutline className="mr-2 text-slate-500" />
              <span className="text-xs">Thông tin cá nhân</span>
            </MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); logout(); navigate('/admin/sign-in'); }}>
              <IoLogOutOutline className="mr-2 text-rose-500" />
              <span className="text-xs text-rose-600 font-medium">Đăng xuất Admin</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
