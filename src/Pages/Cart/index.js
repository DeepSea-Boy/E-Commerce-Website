import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoArrowForward, IoCartOutline, IoCheckmarkCircle, IoTicketOutline } from 'react-icons/io5';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    shipping,
    total
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const res = applyCoupon(couponInput.trim());
      setCouponMessage(res);
      if (res.success) setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center container-fluid">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-20 h-20 bg-sky-50 text-primary rounded-full flex items-center justify-center text-4xl mx-auto">
            <IoCartOutline />
          </div>
          <h2 className="text-xl font-bold text-slate-800 m-0">Giỏ hàng của bạn đang trống</h2>
          <p className="text-xs text-slate-400">
            Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy tham khảo các sản phẩm công nghệ hot nhất hôm nay!
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-md shadow-sky-500/20"
          >
            Tiếp tục mua sắm ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-8">
      <div className="container-fluid">
        <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 mb-6">
          Giỏ hàng của bạn ({cartItems.length} mục)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Sản phẩm</th>
                    <th className="py-3.5 px-4">Đơn giá</th>
                    <th className="py-3.5 px-4">Số lượng</th>
                    <th className="py-3.5 px-4">Thành tiền</th>
                    <th className="py-3.5 px-4 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <tr key={item.itemKey} className="hover:bg-slate-50/50 transition">
                      {/* Product */}
                      <td className="py-4 px-4 flex items-center gap-3 min-w-[220px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded-xl border border-slate-200 p-1 shrink-0 bg-slate-50"
                        />
                        <div>
                          <Link
                            to={`/product/${item.slug || item.productId}`}
                            className="font-bold text-slate-800 hover:text-primary transition line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Cấu hình: <strong className="text-slate-600">{item.selectedVariant}</strong>
                          </span>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                        {item.price.toLocaleString('vi-VN')}đ
                      </td>

                      {/* Quantity */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.itemKey, -1)}
                            className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-l-lg font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.itemKey, 1)}
                            className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-r-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="py-4 px-4 font-bold text-rose-600 whitespace-nowrap">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.itemKey)}
                          className="text-slate-400 hover:text-rose-500 transition p-1"
                          title="Xóa sản phẩm"
                        >
                          <IoTrashOutline className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions inside table card */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/products"
                className="text-xs font-bold text-primary hover:underline"
              >
                ← Tiếp tục lựa chọn sản phẩm khác
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-slate-500 hover:text-rose-600 font-semibold"
              >
                Xóa tất cả sản phẩm
              </button>
            </div>
          </div>

          {/* Right Summary Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4 sticky top-28">
            {/* Coupon Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                <IoTicketOutline className="text-primary text-base" />
                <span>Mã giảm giá & Khuyến mãi</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <div>
                    <span className="font-bold text-emerald-800 block">{appliedCoupon.code}</span>
                    <span className="text-[11px] text-emerald-600">{appliedCoupon.desc}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-500 text-xs font-bold hover:underline"
                  >
                    Bỏ mã
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã (VD: DISCOUNT10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 uppercase placeholder-slate-400 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
                  >
                    Áp dụng
                  </button>
                </form>
              )}

              {couponMessage && (
                <div className={`text-[11px] font-semibold ${couponMessage.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMessage.message}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
              <h3 className="text-sm font-bold text-slate-800 m-0 pb-3 border-b border-slate-100">
                Tóm tắt đơn hàng
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính tiền hàng:</span>
                  <span className="font-semibold text-slate-800">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Giảm giá khuyến mãi:</span>
                  <span className="font-semibold text-emerald-600">-{discount.toLocaleString('vi-VN')}đ</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-slate-800">
                    {shipping === 0 ? <span className="text-emerald-600">Miễn phí</span> : `${shipping.toLocaleString('vi-VN')}đ`}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="font-bold text-sm text-slate-800">Tổng cộng:</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-rose-600 block">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-[10px] text-slate-400 block">(Đã bao gồm thuế VAT)</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
              >
                <span>Tiến hành thanh toán</span>
                <IoArrowForward className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
