import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { IoKeyOutline } from 'react-icons/io5';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        navigate('/verify-otp');
      }, 1500);
    }
  };

  return (
    <div className="py-16 container-fluid flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-sky-50 text-primary rounded-full flex items-center justify-center text-3xl mx-auto">
          <IoKeyOutline />
        </div>

        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">Quên mật khẩu?</h1>
          <p className="text-xs text-slate-400 mt-1 m-0">
            Nhập email của bạn để nhận mã xác minh OTP đặt lại mật khẩu mới.
          </p>
        </div>

        {submitted && (
          <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl font-medium">
            Mã OTP khôi phục đã được gửi! Đang chuyển hướng đến trang xác thực...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            size="small"
            label="Địa chỉ Email của bạn"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-sky-500/20"
          >
            Gửi mã xác thực
          </button>
        </form>

        <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
          Nhớ lại mật khẩu?{' '}
          <Link to="/sign-in" className="text-primary font-bold hover:underline">
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
