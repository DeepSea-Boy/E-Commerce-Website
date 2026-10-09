import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoShieldCheckmarkOutline, IoArrowForward } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const VerifyOTP = () => {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      const newOtp = pasted.split('');
      while (newOtp.length < 6) newOtp.push('');
      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) {
      setError('Vui lòng nhập đủ 6 chữ số mã OTP.');
      return;
    }

    const res = verifyOtp(code);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } else {
      setError(res.message);
    }
  };

  const handleFillDemo = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setError('');
  };

  return (
    <div className="py-16 container-fluid flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-sky-50 text-primary rounded-full flex items-center justify-center text-3xl mx-auto">
          <IoShieldCheckmarkOutline />
        </div>

        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">Xác minh mã OTP</h1>
          <p className="text-xs text-slate-400 mt-1 m-0">
            Chúng tôi đã gửi mã xác thực 6 chữ số đến email/số điện thoại của bạn.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium">
            {successMsg}
          </div>
        )}

        <button
          type="button"
          onClick={handleFillDemo}
          className="text-xs font-bold text-primary bg-sky-50 py-1.5 px-4 rounded-full border border-sky-200 hover:bg-sky-100 transition"
        >
          💡 Điền nhanh mã mẫu: 123456
        </button>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-14 text-center font-extrabold text-lg rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-sky-100 focus:outline-none transition"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
          >
            <span>Xác thực ngay</span>
            <IoArrowForward className="text-sm" />
          </button>
        </form>

        <div className="text-xs text-slate-500">
          {countdown > 0 ? (
            <span>Gửi lại mã sau <strong>{countdown}s</strong></span>
          ) : (
            <button
              onClick={() => setCountdown(60)}
              className="text-primary font-bold hover:underline"
            >
              Gửi lại mã OTP ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
