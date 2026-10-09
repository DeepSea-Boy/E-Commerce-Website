import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }
    if (!agreeTerms) {
      setError('Vui lòng đồng ý với các điều khoản dịch vụ.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      setIsLoading(false);
      if (res.success) {
        navigate('/verify-otp');
      } else {
        setError(res.message);
      }
    }, 500);
  };

  return (
    <div className="py-16 container-fluid flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-800 m-0">Tạo tài khoản mới</h1>
          <p className="text-xs text-slate-400 m-0">
            Trở thành thành viên để tích điểm và nhận voucher độc quyền
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            size="small"
            label="Họ và tên của bạn"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            size="small"
            label="Địa chỉ Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            size="small"
            label="Số điện thoại"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            size="small"
            label="Mật khẩu (ít nhất 6 ký tự)"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            size="small"
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                sx={{ '&.Mui-checked': { color: '#2bbef9' } }}
              />
            }
            label={
              <span className="text-xs text-slate-600">
                Tôi đồng ý với <span className="text-primary font-bold">Điều khoản & Chính sách bảo mật</span>
              </span>
            }
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-sky-500/20"
          >
            {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký ngay'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Đã có tài khoản?{' '}
          <Link to="/sign-in" className="text-primary font-bold hover:underline">
            Đăng nhập tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
