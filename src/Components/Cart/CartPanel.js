import React from 'react';
import { Drawer, IconButton, Divider } from '@mui/material';
import { IoClose, IoTrashOutline, IoCartOutline, IoArrowForward } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartPanel = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
      <div className="w-96 max-w-[90vw] h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <IoCartOutline className="text-2xl text-primary" />
            <h3 className="font-bold text-base text-slate-800 m-0">
              Giỏ hàng của bạn ({totalCount})
            </h3>
          </div>
          <IconButton onClick={() => setIsCartOpen(false)} size="small">
            <IoClose className="text-xl text-slate-500" />
          </IconButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center text-primary text-4xl mb-4">
                <IoCartOutline />
              </div>
              <h4 className="text-slate-700 font-bold mb-1">Giỏ hàng đang trống</h4>
              <p className="text-xs text-slate-400 mb-6">Hãy dạo xem cửa hàng và chọn các sản phẩm ưng ý nhé!</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/products');
                }}
                className="bg-primary hover:bg-sky-500 text-white font-bold text-xs py-2.5 px-6 rounded-lg transition"
              >
                Khám phá sản phẩm ngay
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.itemKey} className="flex gap-3 pb-3 border-b border-slate-100 group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 mb-0.5">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mb-1.5">
                      Thuộc tính: <span className="text-slate-600 font-medium">{item.selectedVariant}</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.itemKey, -1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-rose-600">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>
                  </div>

                  <IconButton
                    onClick={() => removeFromCart(item.itemKey)}
                    size="small"
                    className="text-slate-300 hover:text-rose-500 self-start"
                  >
                    <IoTrashOutline className="text-base" />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-600">Tạm tính:</span>
              <span className="text-rose-600 text-base">{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <p className="text-[11px] text-slate-400 m-0">
              * Thuế và phí vận chuyển sẽ được tính ở bước thanh toán.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleViewCart}
                className="w-full py-2.5 px-3 border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg transition"
              >
                Xem giỏ hàng
              </button>
              <button
                onClick={handleCheckout}
                className="w-full py-2.5 px-3 bg-primary hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Thanh toán</span>
                <IoArrowForward className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartPanel;
