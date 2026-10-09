import React from 'react';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline, IoHelpCircleOutline, IoReceiptOutline } from 'react-icons/io5';
import { MdLanguage } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const TopStrip = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="top-strip">
      <div className="container-fluid">
        <div className="top-strip__inner">
          <div className="top-strip__left">
            <span className="top-strip__notification">
              <IoNotificationsOutline className="notif-icon" />
              <span>Miễn phí vận chuyển cho đơn hàng trên 5.000.000đ! Mã: <strong>FREESHIP</strong></span>
            </span>
          </div>

          <div className="top-strip__right">
            <Link to="/help" className="top-strip__link">
              <IoHelpCircleOutline className="strip-icon" />
              <span>Trợ giúp</span>
            </Link>
            <span className="top-strip__divider">|</span>
            <Link to="/orders" className="top-strip__link">
              <IoReceiptOutline className="strip-icon" />
              <span>Tra cứu đơn hàng</span>
            </Link>
            <span className="top-strip__divider">|</span>
            <span className="top-strip__lang">
              <span className="lang-dot"></span>
              <MdLanguage className="lang-icon" />
              Tiếng Việt
            </span>
            <span className="top-strip__divider">|</span>

            {currentUser ? (
              <div className="top-strip__auth-user">
                <span>Xin chào, <strong>{currentUser.name}</strong></span>
                <span className="top-strip__divider">|</span>
                <button onClick={logout} className="top-strip__auth-btn">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link to="/sign-in" className="top-strip__auth">Đăng nhập</Link>
                <span className="top-strip__divider">|</span>
                <Link to="/sign-up" className="top-strip__auth">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStrip;
