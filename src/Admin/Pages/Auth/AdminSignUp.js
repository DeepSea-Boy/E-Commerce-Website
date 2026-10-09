import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { IoShieldCheckmark } from 'react-icons/io5';
import { useAuth } from '../../../context/AuthContext';

const AdminSignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Require master admin security code
    if (secretCode !== 'ADMIN2026') {
      setError('Mã bảo mật Quản trị viên (Master Code) không chính xác. Mã mẫu là: ADMIN2026');
      return;
    }

    const res = register({ name, email, password, role: 'admin' });
    if (res.success) {
      alert('Đăng ký tài khoản Admin thành công!');
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-slate-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
            <IoShieldCheckmark />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide m-0">Đăng ký Quản trị viên</h1>
          <p className="text-xs text-slate-400 m-0">
            Tạo tài khoản với vai trò Admin kiểm soát toàn bộ hệ sinh thái
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            size="small"
            label="Họ và tên Quản trị viên"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              input: { color: '#ffffff' },
              label: { color: '#94a3b8' },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#0f172a',
                borderRadius: 3,
                '& fieldset': { borderColor: '#334155' },
              }
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Email Quản trị"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: '#ffffff' },
              label: { color: '#94a3b8' },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#0f172a',
                borderRadius: 3,
                '& fieldset': { borderColor: '#334155' },
              }
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Mật khẩu"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: '#ffffff' },
              label: { color: '#94a3b8' },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#0f172a',
                borderRadius: 3,
                '& fieldset': { borderColor: '#334155' },
              }
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Mã bảo mật Quản trị (Master Code: ADMIN2026)"
            required
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            helperText="Yêu cầu nhập đúng ADMIN2026 để cấp quyền Admin."
            sx={{
              input: { color: '#ffffff' },
              label: { color: '#94a3b8' },
              '& .MuiFormHelperText-root': { color: '#38bdf8' },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#0f172a',
                borderRadius: 3,
                '& fieldset': { borderColor: '#334155' },
              }
            }}
          />

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-sky-500/20"
          >
            Đăng ký quyền Admin
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 border-t border-slate-800 pt-3">
          Đã có tài khoản?{' '}
          <Link to="/admin/sign-in" className="text-sky-400 hover:underline">
            Đăng nhập Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
