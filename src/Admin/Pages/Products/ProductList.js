import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoAdd, IoTrashOutline, IoPencilOutline, IoEyeOutline } from 'react-icons/io5';
import { useAdmin } from '../../../context/AdminContext';
import MuiDataTable from '../../Components/Tables/MuiDataTable';
import TailwindDataTable from '../../Components/Tables/TailwindDataTable';

const ProductList = () => {
  const { products, deleteProduct } = useAdmin();
  const navigate = useNavigate();
  const [tableType, setTableType] = useState('mui');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi hệ thống?')) {
      deleteProduct(id);
    }
  };

  const columns = [
    {
      header: 'Sản phẩm',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.images?.[0] || 'https://via.placeholder.com/80'}
            alt=""
            className="w-12 h-12 object-contain rounded-lg border border-slate-200 p-1 shrink-0 bg-white"
          />
          <div className="max-w-xs">
            <strong className="block text-slate-800 line-clamp-1">{row.name}</strong>
            <span className="text-[11px] text-slate-400">Danh mục: {row.category}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Thương hiệu',
      accessor: 'brand',
      render: (row) => <span className="font-semibold text-slate-700">{row.brand}</span>
    },
    {
      header: 'Giá bán',
      accessor: 'price',
      render: (row) => (
        <span className="font-extrabold text-rose-600">
          {row.price?.toLocaleString('vi-VN')}đ
        </span>
      )
    },
    {
      header: 'Tồn kho',
      accessor: 'stock',
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
          row.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {row.stock} cái
        </span>
      )
    },
    {
      header: 'Đánh giá',
      accessor: 'rating',
      render: (row) => (
        <span className="font-semibold text-slate-700">⭐ {row.rating || 5.0}</span>
      )
    },
    {
      header: 'Thao tác',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/products/edit/${row.id}`)}
            className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition"
            title="Sửa sản phẩm"
          >
            <IoPencilOutline className="text-base" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
            title="Xóa sản phẩm"
          >
            <IoTrashOutline className="text-base" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
            Quản lý Sản phẩm ({products.length})
          </h1>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Danh sách toàn bộ các mặt hàng đang bày bán trong hệ thống
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl transition shadow-md shadow-sky-500/20"
        >
          <IoAdd className="text-lg" />
          <span>Thêm sản phẩm mới</span>
        </Link>
      </div>

      {/* Filter and View toggle bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Tìm sản phẩm theo tên hoặc danh mục..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 w-full sm:w-80 outline-none focus:border-primary"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Dạng bảng:</span>
          <button
            onClick={() => setTableType('mui')}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold ${
              tableType === 'mui' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            MUI Sticky Table
          </button>
          <button
            onClick={() => setTableType('tailwind')}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold ${
              tableType === 'tailwind' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Tailwind Table
          </button>
        </div>
      </div>

      {/* Table */}
      {tableType === 'mui' ? (
        <MuiDataTable columns={columns} data={filteredProducts} />
      ) : (
        <TailwindDataTable columns={columns} data={filteredProducts} />
      )}
    </div>
  );
};

export default ProductList;
