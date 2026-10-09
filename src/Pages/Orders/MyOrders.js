import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { IoChevronDown, IoReceiptOutline, IoLocationOutline, IoCubeOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';

const getStatusChip = (status) => {
  switch (status) {
    case 'Delivered':
      return <Chip label="Đã giao hàng" color="success" size="small" className="font-bold text-[11px]" />;
    case 'Confirmed':
      return <Chip label="Đã xác nhận" color="primary" size="small" className="font-bold text-[11px]" />;
    case 'Cancelled':
      return <Chip label="Đã hủy" color="error" size="small" className="font-bold text-[11px]" />;
    default:
      return <Chip label="Chờ xử lý (Pending)" color="warning" size="small" className="font-bold text-[11px]" />;
  }
};

const MyOrders = () => {
  const { orders } = useOrders();
  const { currentUser } = useAuth();
  const [expanded, setExpanded] = useState(orders[0]?.id || false);

  // Filter orders for current user if logged in, otherwise show mock orders
  const displayOrders = currentUser
    ? orders.filter(o => !o.customerEmail || o.customerEmail.toLowerCase() === currentUser.email?.toLowerCase())
    : orders;

  const handleAccordionChange = (orderId) => (event, isExpanded) => {
    setExpanded(isExpanded ? orderId : false);
  };

  return (
    <div className="orders-page py-8">
      <div className="container-fluid">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
              Đơn hàng của tôi
            </h1>
            <p className="text-xs text-slate-400 mt-1 m-0">
              Theo dõi tình trạng vận chuyển và lịch sử mua sắm của bạn
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-primary hover:underline"
          >
            Mua thêm sản phẩm →
          </Link>
        </div>

        {displayOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3 max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-3xl mx-auto">
              <IoReceiptOutline />
            </div>
            <h3 className="font-bold text-slate-800 text-sm m-0">Chưa có đơn hàng nào</h3>
            <p className="text-xs text-slate-400 m-0">
              Bạn chưa thực hiện đơn đặt hàng nào trong hệ thống.
            </p>
            <Link
              to="/products"
              className="inline-block mt-2 bg-primary hover:bg-sky-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
            >
              Bắt đầu mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <Accordion
                  expanded={expanded === order.id}
                  onChange={handleAccordionChange(order.id)}
                  elevation={0}
                  disableGutters
                  className="before:hidden"
                >
                  <AccordionSummary
                    expandIcon={<IoChevronDown className="text-slate-400 text-base" />}
                    className="p-4 hover:bg-slate-50/60 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full pr-4 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-primary flex items-center justify-center text-xl shrink-0">
                          <IoCubeOutline />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-800">
                              Đơn hàng #{order.id}
                            </span>
                            <span className="text-[11px] text-slate-400">• Ngày đặt: {order.date}</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            Khách hàng: <strong>{order.customerName}</strong> ({order.customerPhone})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Tổng tiền</span>
                          <span className="text-sm font-extrabold text-rose-600 block">
                            {order.total?.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <div>{getStatusChip(order.status)}</div>
                      </div>
                    </div>
                  </AccordionSummary>

                  {/* Expandable Order Details */}
                  <AccordionDetails className="p-6 bg-slate-50/50 border-t border-slate-100 space-y-6">
                    {/* Item list */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                        Chi tiết sản phẩm đã mua ({order.items?.length || 0} sản phẩm):
                      </h4>
                      <div className="space-y-3">
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200"
                          >
                            <img
                              src={item.image}
                              alt=""
                              className="w-14 h-14 object-contain rounded-lg border border-slate-100 p-1 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-xs text-slate-800 truncate m-0">
                                {item.name}
                              </h5>
                              <span className="text-[11px] text-slate-400 block mt-0.5">
                                Cấu hình: {item.selectedVariant || 'Mặc định'}
                              </span>
                              <span className="text-xs text-slate-500 block mt-0.5">
                                Số lượng: <strong>x{item.quantity}</strong>
                              </span>
                            </div>
                            <div className="text-right font-bold text-xs text-slate-800">
                              {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Payment Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <IoLocationOutline className="text-primary text-base" />
                          <span>Địa chỉ nhận hàng:</span>
                        </div>
                        <p className="text-slate-600 m-0 leading-relaxed">
                          {order.shippingAddress}
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <IoCheckmarkDoneOutline className="text-emerald-500 text-base" />
                          <span>Thanh toán & Vận chuyển:</span>
                        </div>
                        <div className="space-y-1 text-slate-600">
                          <div className="flex justify-between">
                            <span>Phương thức thanh toán:</span>
                            <strong>{order.paymentMethod}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Trạng thái thanh toán:</span>
                            <strong>{order.paymentStatus}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Phí giao hàng:</span>
                            <span>{order.shippingFee === 0 ? 'Miễn phí' : `${order.shippingFee?.toLocaleString('vi-VN')}đ`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
