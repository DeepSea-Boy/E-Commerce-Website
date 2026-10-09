import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoCheckmarkCircleOutline, IoReceiptOutline, IoHomeOutline } from 'react-icons/io5';
import { useOrders } from '../../context/OrderContext';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  return (
    <div className="py-16 container-fluid">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto animate-bounce">
          <IoCheckmarkCircleOutline />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-800 m-0">
          Đặt hàng thành công!
        </h1>

        <p className="text-xs text-slate-500 leading-relaxed">
          Cảm ơn bạn đã tin tưởng mua sắm tại cửa hàng chúng tôi. Đơn hàng của bạn đã được tiếp nhận và đang trong quá trình chuẩn bị giao.
        </p>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Mã đơn hàng:</span>
            <strong className="text-primary font-bold text-sm">#{orderId}</strong>
          </div>
          {order && (
            <>
              <div className="flex justify-between">
                <span className="text-slate-500">Người nhận:</span>
                <span className="font-semibold text-slate-700">{order.customerName} ({order.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Địa chỉ giao:</span>
                <span className="font-semibold text-slate-700 text-right max-w-[240px] truncate">{order.shippingAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tổng thanh toán:</span>
                <strong className="text-rose-600 font-bold">{order.total?.toLocaleString('vi-VN')}đ</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hình thức:</span>
                <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
              </div>
            </>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition"
          >
            <IoReceiptOutline className="text-sm" />
            <span>Xem lịch sử đơn hàng</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition"
          >
            <IoHomeOutline className="text-sm" />
            <span>Quay về trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
