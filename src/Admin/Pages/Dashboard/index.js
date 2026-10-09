import React, { useState } from 'react';
import {
  IoBagCheckOutline,
  IoCashOutline,
  IoPeopleOutline,
  IoCubeOutline,
  IoEyeOutline
} from 'react-icons/io5';
import DashboardCard from '../../Components/DashboardCard';
import AnalyticsCharts from '../../Components/AnalyticsCharts';
import TailwindDataTable from '../../Components/Tables/TailwindDataTable';
import MuiDataTable from '../../Components/Tables/MuiDataTable';
import { useAdmin } from '../../../context/AdminContext';
import { Chip } from '@mui/material';

const Dashboard = () => {
  const { stats, orders } = useAdmin();
  const [tableVariant, setTableVariant] = useState('mui'); // 'tailwind' or 'mui'

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Chip label="Đã giao" size="small" color="success" className="font-bold text-[10px]" />;
      case 'Confirmed':
        return <Chip label="Đã duyệt" size="small" color="primary" className="font-bold text-[10px]" />;
      case 'Cancelled':
        return <Chip label="Đã hủy" size="small" color="error" className="font-bold text-[10px]" />;
      default:
        return <Chip label="Chờ xử lý" size="small" color="warning" className="font-bold text-[10px]" />;
    }
  };

  const tableColumns = [
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
      accessor: 'date',
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
      header: 'Phương thức',
      accessor: 'paymentMethod',
    },
    {
      header: 'Trạng thái',
      accessor: 'status',
      render: (row) => getStatusBadge(row.status)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
            Bảng điều khiển Tổng quan (Dashboard)
          </h1>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Theo dõi thời gian thực các chỉ số tài chính, bán hàng và lượng người dùng
          </p>
        </div>
        <div className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 self-start">
          🟢 Hệ thống hoạt động bình thường
        </div>
      </div>

      {/* 1. Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Tổng doanh thu"
          value={`${(stats.totalRevenue / 1000000).toFixed(1)}M đ`}
          delta="+18.5%"
          isPositive={true}
          icon={<IoCashOutline />}
          colorClass="text-emerald-500 bg-emerald-50"
        />
        <DashboardCard
          title="Tổng đơn hàng"
          value={stats.totalOrders}
          delta="+12.4%"
          isPositive={true}
          icon={<IoBagCheckOutline />}
          colorClass="text-sky-500 bg-sky-50"
        />
        <DashboardCard
          title="Tổng người dùng"
          value={stats.totalUsersCount}
          delta="+8.2%"
          isPositive={true}
          icon={<IoPeopleOutline />}
          colorClass="text-purple-500 bg-purple-50"
        />
        <DashboardCard
          title="Tổng sản phẩm"
          value={stats.totalProductsCount}
          delta="+5.0%"
          isPositive={true}
          icon={<IoCubeOutline />}
          colorClass="text-amber-500 bg-amber-50"
        />
      </div>

      {/* 2. Recharts Analytics Charts */}
      <AnalyticsCharts />

      {/* 3. Recent Orders & Dual Table Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-800 m-0">
              Danh sách Đơn hàng gần đây
            </h3>
            <p className="text-xs text-slate-400 m-0 mt-0.5">
              Cho phép chuyển đổi linh hoạt giữa 2 biến thể bảng dữ liệu (Tailwind vs Material UI)
            </p>
          </div>

          {/* Table Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-200 p-1 rounded-xl self-start">
            <button
              onClick={() => setTableVariant('mui')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${
                tableVariant === 'mui' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Biến thể 2: Material UI Table (Sticky)
            </button>
            <button
              onClick={() => setTableVariant('tailwind')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${
                tableVariant === 'tailwind' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Biến thể 1: Tailwind CSS Table
            </button>
          </div>
        </div>

        {/* Render Table */}
        {tableVariant === 'mui' ? (
          <MuiDataTable columns={tableColumns} data={recentOrders} />
        ) : (
          <TailwindDataTable columns={tableColumns} data={recentOrders} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
