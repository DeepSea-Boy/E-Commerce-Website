import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { IoEyeOutline, IoEyeOffOutline, IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('customer@example.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="py-16 container-fluid flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-800 m-0">Đăng nhập</h1>
          <p className="text-xs text-slate-400 m-0">
            Truy cập tài khoản để theo dõi đơn hàng và nhận ưu đãi riêng
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Demo Account Button */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full py-2 bg-sky-50 text-primary border border-sky-200 rounded-xl text-xs font-bold hover:bg-sky-100 transition"
        >
          💡 Bấm để điền tài khoản khách hàng mẫu (Demo)
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            size="small"
            label="Địa chỉ Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoMailOutline className="text-slate-400" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{ '&.Mui-checked': { color: '#2bbef9' } }}
                />
              }
              label={<span className="text-xs text-slate-600">Ghi nhớ đăng nhập</span>}
            />

            <Link to="/forgot-password" className="text-xs font-bold text-primary hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-sky-500/20"
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập ngay'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Chưa có tài khoản?{' '}
          <Link to="/sign-up" className="text-primary font-bold hover:underline">
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
