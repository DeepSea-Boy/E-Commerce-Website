import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoSend, IoCheckmarkCircle } from 'react-icons/io5';
import logo from '../../assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 border-t border-slate-800">
      <div className="container-fluid">
        {/* Top Newsletter row */}
        <div className="bg-slate-800/80 rounded-2xl p-6 lg:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
              Đăng ký nhận bản tin khuyến mãi
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Nhận voucher giảm giá 10% cho đơn hàng đầu tiên và thông tin ưu đãi sớm nhất.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-sky-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition shrink-0 flex items-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <IoCheckmarkCircle />
                  <span>Đã nhận!</span>
                </>
              ) : (
                <>
                  <span>Đăng ký</span>
                  <IoSend className="text-xs" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Logo" className="h-9 brightness-200" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Nền tảng thương mại điện tử chuyên cung cấp thiết bị công nghệ, smartphone, laptop và hệ thống IoT thông minh hàng đầu.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <IoCallOutline className="text-primary" />
                <span>Hotline: 1800 6868 (Miễn phí)</span>
              </div>
              <div className="flex items-center gap-2">
                <IoMailOutline className="text-primary" />
                <span>support@ecomerce-shop.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <IoLocationOutline className="text-primary" />
                <span>Tòa nhà Bitexco, Q.1, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary pl-2">
              Danh mục nổi bật
            </h4>
            <ul className="space-y-2 text-xs list-none p-0 m-0">
              <li><Link to="/products" className="text-slate-400 hover:text-primary transition">Điện thoại & Phụ kiện cao cấp</Link></li>
              <li><Link to="/products" className="text-slate-400 hover:text-primary transition">Laptop Gaming & Đồ họa</Link></li>
              <li><Link to="/products" className="text-slate-400 hover:text-primary transition">Thiết bị Smart Home & IoT</Link></li>
              <li><Link to="/products" className="text-slate-400 hover:text-primary transition">Đồng hồ Apple Watch & Garmin</Link></li>
              <li><Link to="/products" className="text-slate-400 hover:text-primary transition">Tai nghe chống ồn & Loa Marshall</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary pl-2">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2 text-xs list-none p-0 m-0">
              <li><Link to="/help" className="text-slate-400 hover:text-primary transition">Trung tâm trợ giúp (FAQ)</Link></li>
              <li><Link to="/orders" className="text-slate-400 hover:text-primary transition">Tra cứu trạng thái đơn hàng</Link></li>
              <li><Link to="/cart" className="text-slate-400 hover:text-primary transition">Chính sách vận chuyển & Giao nhận</Link></li>
              <li><Link to="/help" className="text-slate-400 hover:text-primary transition">Chính sách đổi trả trong 30 ngày</Link></li>
              <li><Link to="/help" className="text-slate-400 hover:text-primary transition">Bảo hành chính hãng</Link></li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Admin */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary pl-2">
              Liên kết nhanh & Quản trị
            </h4>
            <ul className="space-y-2 text-xs list-none p-0 m-0">
              <li><Link to="/account" className="text-slate-400 hover:text-primary transition">Hồ sơ tài khoản của tôi</Link></li>
              <li><Link to="/wishlist" className="text-slate-400 hover:text-primary transition">Danh sách sản phẩm yêu thích</Link></li>
              <li><Link to="/checkout" className="text-slate-400 hover:text-primary transition">Thanh toán đơn hàng</Link></li>
              <li className="pt-2">
                <Link
                  to="/admin/sign-in"
                  className="inline-block bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs transition"
                >
                  🚀 Cổng Quản Trị (Admin Portal)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © 2026 E-Commerce System. All rights reserved. Chế tác với React 19 & Material UI.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Điều khoản dịch vụ</span>
            <span className="hover:text-slate-400 cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
