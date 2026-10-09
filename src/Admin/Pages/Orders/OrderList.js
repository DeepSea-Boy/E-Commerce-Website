import React, { useState } from 'react';
import { Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IoEyeOutline, IoReceiptOutline } from 'react-icons/io5';
import { useAdmin } from '../../../context/AdminContext';
import MuiDataTable from '../../Components/Tables/MuiDataTable';

const OrderList = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'ALL') return true;
    return o.status === filterStatus;
  });

  const columns = [
    {
      header: 'Mã đơn',
      accessor: 'id',
      render: (row) => <strong className="text-primary font-bold">#{row.id}</strong>
    },
    {
      header: 'Khách hàng',
      accessor: 'customerName',
      render: (row) => (
        <div>
          <strong className="block text-slate-800">{row.customerName}</strong>
          <span className="text-[11px] text-slate-400">{row.customerPhone}</span>
        </div>
      )
    },
    {
      header: 'Ngày đặt',
      accessor: 'date'
    },
    {
      header: 'Tổng tiền',
      accessor: 'total',
      render: (row) => (
        <span className="font-extrabold text-rose-600">
          {row.total?.toLocaleString('vi-VN')}đ
        </span>
      )
    },
    {
      header: 'Cập nhật Trạng thái',
      accessor: 'status',
      render: (row) => (
        <Select
          size="small"
          value={row.status || 'Pending'}
          onChange={(e) => updateOrderStatus(row.id, e.target.value)}
          sx={{
            fontSize: '11px',
            fontWeight: 700,
            borderRadius: 2,
            height: 32,
            bgcolor:
              row.status === 'Delivered'
                ? '#ecfdf5'
                : row.status === 'Confirmed'
                ? '#f0f9ff'
                : row.status === 'Cancelled'
                ? '#fef2f2'
                : '#fffbeb',
            color:
              row.status === 'Delivered'
                ? '#059669'
                : row.status === 'Confirmed'
                ? '#0284c7'
                : row.status === 'Cancelled'
                ? '#dc2626'
                : '#d97706',
          }}
        >
          <MenuItem value="Pending" sx={{ fontSize: '12px' }}>Chờ xử lý (Pending)</MenuItem>
          <MenuItem value="Confirmed" sx={{ fontSize: '12px' }}>Đã xác nhận (Confirmed)</MenuItem>
          <MenuItem value="Delivered" sx={{ fontSize: '12px' }}>Đã giao hàng (Delivered)</MenuItem>
          <MenuItem value="Cancelled" sx={{ fontSize: '12px' }}>Hủy đơn (Cancelled)</MenuItem>
        </Select>
      )
    },
    {
      header: 'Chi tiết',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => setSelectedOrder(row)}
          className="p-1.5 text-primary hover:bg-sky-50 rounded-lg transition"
          title="Xem chi tiết"
        >
          <IoEyeOutline className="text-base" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
            Quản lý Đơn hàng ({orders.length})
          </h1>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Cập nhật trạng thái giao hàng và xử lý thanh toán đơn hàng toàn hệ thống
          </p>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['ALL', 'Pending', 'Confirmed', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === st ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {st === 'ALL' ? 'Tất cả' : st}
            </button>
          ))}
        </div>
      </div>

      <MuiDataTable columns={columns} data={filteredOrders} />

      {/* Order Detail Modal */}
      <Dialog
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedOrder && (
          <div>
            <DialogTitle className="font-bold text-base text-slate-800 border-b pb-3 flex items-center gap-2">
              <IoReceiptOutline className="text-primary text-xl" />
              <span>Chi tiết đơn hàng #{selectedOrder.id}</span>
            </DialogTitle>
            <DialogContent className="pt-4 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1.5 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Khách hàng:</span>
                  <strong className="text-slate-800">{selectedOrder.customerName} ({selectedOrder.customerPhone})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-700">{selectedOrder.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Địa chỉ:</span>
                  <span className="text-slate-700 max-w-xs text-right">{selectedOrder.shippingAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hình thức thanh toán:</span>
                  <strong>{selectedOrder.paymentMethod}</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Danh sách sản phẩm ({selectedOrder.items?.length || 0}):
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-xl text-xs">
                      <img src={item.image} alt="" className="w-10 h-10 object-contain rounded p-1 border border-slate-100" />
                      <div className="flex-1 min-w-0">
                        <strong className="block text-slate-800 truncate">{item.name}</strong>
                        <span className="text-[11px] text-slate-400">SL: {item.quantity} x {item.price?.toLocaleString('vi-VN')}đ</span>
                      </div>
                      <span className="font-bold text-slate-800">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between items-baseline text-xs">
                <span className="font-bold text-slate-700">Tổng thanh toán:</span>
                <strong className="text-lg font-extrabold text-rose-600">
                  {selectedOrder.total?.toLocaleString('vi-VN')}đ
                </strong>
              </div>
            </DialogContent>
            <DialogActions className="p-4 border-t">
              <Button onClick={() => setSelectedOrder(null)} variant="contained" color="primary">
                Đóng
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default OrderList;
