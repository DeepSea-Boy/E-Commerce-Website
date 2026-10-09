import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { IoShieldCheckmark, IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useAuth } from '../../../context/AuthContext';

const AdminSignIn = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = adminLogin(email, password);
      setLoading(false);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const fillAdminDemo = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-slate-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
            <IoShieldCheckmark />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide m-0">Admin Portal Sign In</h1>
          <p className="text-xs text-slate-400 m-0">
            Hệ thống Quản trị & Báo cáo E-Commerce chuyên sâu
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={fillAdminDemo}
          className="w-full py-2 bg-sky-950/60 border border-sky-800 text-sky-300 rounded-xl text-xs font-semibold hover:bg-sky-900/60 transition"
        >
          🔑 Điền nhanh tài khoản Admin mẫu: admin@example.com / admin123
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1.5">Tài khoản Email Quản trị:</label>
            <TextField
              fullWidth
              size="small"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#0f172a',
                  borderRadius: 3,
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#0284c7' },
                  '&.Mui-focused fieldset': { borderColor: '#2bbef9' },
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMailOutline className="text-slate-400" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1.5">Mật khẩu Quản trị:</label>
            <TextField
              fullWidth
              size="small"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#0f172a',
                  borderRadius: 3,
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#0284c7' },
                  '&.Mui-focused fieldset': { borderColor: '#2bbef9' },
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoLockClosedOutline className="text-slate-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className="text-slate-400"
                    >
                      {showPassword ? <IoEyeOffOutline className="text-slate-400" /> : <IoEyeOutline className="text-slate-400" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-sky-500/20"
          >
            {loading ? 'Đang xác thực...' : 'Đăng nhập vào Dashboard'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 border-t border-slate-800 pt-4 flex justify-between">
          <Link to="/" className="text-slate-400 hover:text-sky-400">
            ← Quay về trang mua sắm
          </Link>
          <Link to="/admin/sign-up" className="text-sky-400 hover:underline">
            Tạo tài khoản Admin mới
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
