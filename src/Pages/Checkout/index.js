import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { IoShieldCheckmarkOutline, IoBagCheckOutline, IoLocationOutline } from 'react-icons/io5';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';

const Checkout = () => {
  const { cartItems, subtotal, discount, shipping, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const defaultAddr = currentUser?.addresses?.find((a) => a.isDefault) || currentUser?.addresses?.[0];

  const [formData, setFormData] = useState({
    name: currentUser?.name || defaultAddr?.name || 'Nguyễn Văn An',
    email: currentUser?.email || 'customer@example.com',
    phone: currentUser?.phone || defaultAddr?.phone || '0988123456',
    city: defaultAddr?.city || 'TP. Hồ Chí Minh',
    district: defaultAddr?.district || 'Quận 1',
    ward: defaultAddr?.ward || 'Phường Bến Nghé',
    street: defaultAddr?.street || '123 Đường Lê Lợi, Tòa nhà Bitexco',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectSavedAddress = (addr) => {
    setFormData({
      ...formData,
      name: addr.name,
      phone: addr.phone,
      city: addr.city,
      district: addr.district,
      ward: addr.ward,
      street: addr.street
    });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const res = placeOrder({
        customerInfo: formData,
        items: cartItems,
        subtotal,
        shippingFee: shipping,
        discountAmount: discount,
        total,
        paymentMethod
      });

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${res.order.id}`);
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center container-fluid">
        <h2 className="text-xl font-bold mb-3">Không có sản phẩm nào để thanh toán</h2>
        <Link to="/products" className="text-primary font-bold text-xs underline">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page py-8">
      <div className="container-fluid">
        <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 mb-6">
          Thanh toán đơn hàng
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Billing Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Address Book Quick Pick */}
            {currentUser?.addresses?.length > 0 && (
              <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                  <IoLocationOutline className="text-primary text-base" />
                  <span>Chọn nhanh từ Sổ địa chỉ của bạn:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentUser.addresses.map((addr) => (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => handleSelectSavedAddress(addr)}
                      className="p-3 bg-white rounded-xl border border-sky-200 text-left hover:border-primary transition text-xs"
                    >
                      <strong className="block text-slate-800">{addr.name} - {addr.phone}</strong>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{addr.street}, {addr.city}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Billing Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 m-0">
                Thông tin người nhận hàng
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  size="small"
                  label="Họ và tên người nhận"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Số điện thoại"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <TextField
                fullWidth
                size="small"
                label="Địa chỉ email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextField
                  fullWidth
                  size="small"
                  label="Tỉnh / Thành phố"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Quận / Huyện"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Phường / Xã"
                  name="ward"
                  required
                  value={formData.ward}
                  onChange={handleInputChange}
                />
              </div>

              <TextField
                fullWidth
                size="small"
                label="Địa chỉ cụ thể (Số nhà, tên đường, tòa nhà...)"
                name="street"
                required
                value={formData.street}
                onChange={handleInputChange}
              />

              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                label="Ghi chú đơn hàng (không bắt buộc)"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 m-0">
                Phương thức thanh toán
              </h3>

              <FormControl component="fieldset">
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="COD"
                    control={<Radio size="small" />}
                    label={
                      <div className="text-xs">
                        <strong className="text-slate-800 block">Thanh toán khi nhận hàng (COD)</strong>
                        <span className="text-[11px] text-slate-500">Khách hàng kiểm tra hàng và thanh toán tiền mặt trực tiếp cho bưu tá.</span>
                      </div>
                    }
                    className="mb-2 p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
                  />
                  <FormControlLabel
                    value="QR"
                    control={<Radio size="small" />}
                    label={
                      <div className="text-xs">
                        <strong className="text-slate-800 block">Chuyển khoản QR Ngân hàng (VietQR / MoMo)</strong>
                        <span className="text-[11px] text-slate-500">Quét mã QR tiện lợi qua mọi ứng dụng ngân hàng di động.</span>
                      </div>
                    }
                    className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {/* Right: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 sticky top-28">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 m-0">
              Đơn hàng của bạn ({cartItems.length} món)
            </h3>

            {/* List preview */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => (
                <div key={item.itemKey} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt="" className="w-12 h-12 object-contain rounded-lg border border-slate-200 p-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-slate-800 truncate m-0">{item.name}</h5>
                    <span className="text-[11px] text-slate-400">SL: {item.quantity} x {item.price?.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <span className="font-bold text-slate-800 shrink-0">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính tiền hàng:</span>
                <span className="font-semibold text-slate-800">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Giảm giá:</span>
                <span className="font-semibold text-emerald-600">-{discount.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold text-slate-800">
                  {shipping === 0 ? <span className="text-emerald-600">Miễn phí</span> : `${shipping.toLocaleString('vi-VN')}đ`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-800">Tổng thanh toán:</span>
                <span className="text-xl font-extrabold text-rose-600">
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
            >
              <IoBagCheckOutline className="text-base" />
              <span>{isSubmitting ? 'Đang tạo đơn hàng...' : 'Xác nhận đặt hàng'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
              <IoShieldCheckmarkOutline className="text-emerald-500 text-sm" />
              <span>Bảo mật thông tin đơn hàng 100%</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
