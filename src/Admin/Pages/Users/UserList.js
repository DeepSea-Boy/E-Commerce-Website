import React, { useState } from 'react';
import { Avatar, Chip, Switch } from '@mui/material';
import { useAdmin } from '../../../context/AdminContext';
import MuiDataTable from '../../Components/Tables/MuiDataTable';

const UserList = () => {
  const { users, toggleUserStatus } = useAdmin();
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Người dùng',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} alt={row.name} sx={{ width: 36, height: 36 }} />
          <div>
            <strong className="block text-slate-800 text-xs">{row.name}</strong>
            <span className="text-[11px] text-slate-400">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Số điện thoại',
      accessor: 'phone',
      render: (row) => <span className="text-slate-600">{row.phone || 'Chưa cập nhật'}</span>
    },
    {
      header: 'Vai trò',
      accessor: 'role',
      render: (row) => (
        <Chip
          label={row.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
          size="small"
          color={row.role === 'admin' ? 'primary' : 'default'}
          className="font-bold text-[10px]"
        />
      )
    },
    {
      header: 'Ngày đăng ký',
      accessor: 'createdAt'
    },
    {
      header: 'Trạng thái',
      accessor: 'status',
      render: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            row.status === 'Active'
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              : 'bg-rose-50 text-rose-600 border border-rose-200'
          }`}
        >
          {row.status === 'Active' ? 'Hoạt động' : 'Đã khóa'}
        </span>
      )
    },
    {
      header: 'Khóa / Mở khóa',
      accessor: 'actions',
      render: (row) => (
        <Switch
          size="small"
          checked={row.status === 'Active'}
          onChange={() => toggleUserStatus(row.id)}
          disabled={row.role === 'admin'} // Ngăn admin tự khóa mình
          color="primary"
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
            Quản lý Người dùng ({users.length})
          </h1>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Danh sách toàn bộ tài khoản khách hàng và phân quyền quản trị trong hệ thống
          </p>
        </div>

        <input
          type="text"
          placeholder="Tìm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-72 outline-none focus:border-primary shadow-sm"
        />
      </div>

      <MuiDataTable columns={columns} data={filteredUsers} />
    </div>
  );
};

export default UserList;
