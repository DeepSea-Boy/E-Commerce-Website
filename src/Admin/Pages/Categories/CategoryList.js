import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { IoAdd, IoTrashOutline, IoLayersOutline } from 'react-icons/io5';
import { useAdmin } from '../../../context/AdminContext';
import MuiDataTable from '../../Components/Tables/MuiDataTable';

const CategoryList = () => {
  const { categories, addCategory, deleteCategory } = useAdmin();
  const [openModal, setOpenModal] = useState(false);
  const [catName, setCatName] = useState('');
  const [catIcon, setCatIcon] = useState('📦');
  const [catImage, setCatImage] = useState('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=60');

  const handleCreate = (e) => {
    e.preventDefault();
    if (catName.trim()) {
      addCategory({
        name: catName.trim(),
        icon: catIcon.trim() || '📦',
        image: catImage
      });
      setCatName('');
      setOpenModal(false);
    }
  };

  const columns = [
    {
      header: 'Biểu tượng',
      accessor: 'icon',
      render: (row) => <span className="text-2xl">{row.icon}</span>
    },
    {
      header: 'Tên Danh mục chính',
      accessor: 'name',
      render: (row) => (
        <div>
          <strong className="block text-slate-800 text-xs">{row.name}</strong>
          <span className="text-[11px] text-slate-400">Slug: {row.slug}</span>
        </div>
      )
    },
    {
      header: 'Số danh mục con',
      accessor: 'subCategories',
      render: (row) => (
        <span className="font-semibold text-slate-600">
          {row.subCategories?.length || 0} danh mục con
        </span>
      )
    },
    {
      header: 'Số sản phẩm',
      accessor: 'itemCount',
      render: (row) => (
        <span className="bg-sky-50 text-primary font-bold px-2.5 py-0.5 rounded-full text-xs">
          {row.itemCount || 0} SP
        </span>
      )
    },
    {
      header: 'Thao tác',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => {
            if (window.confirm(`Xác nhận xóa danh mục ${row.name}?`)) {
              deleteCategory(row.id);
            }
          }}
          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
          title="Xóa danh mục"
        >
          <IoTrashOutline className="text-base" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
            Quản lý Danh mục ({categories.length})
          </h1>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Cấu trúc phân loại sản phẩm trên hệ thống E-Commerce
          </p>
        </div>

        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="primary"
          startIcon={<IoAdd />}
          className="font-bold text-xs rounded-xl shadow-md shadow-sky-500/20"
        >
          Thêm danh mục mới
        </Button>
      </div>

      {/* Table */}
      <MuiDataTable columns={columns} data={categories} />

      {/* Modal Add Category */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
        <form onSubmit={handleCreate}>
          <DialogTitle className="font-bold text-base text-slate-800 border-b pb-3">
            Thêm danh mục sản phẩm mới
          </DialogTitle>
          <DialogContent className="pt-4 space-y-4">
            <TextField
              fullWidth
              size="small"
              label="Tên danh mục"
              required
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Emoji / Biểu tượng icon (VD: 📱, 💻, 🎧)"
              value={catIcon}
              onChange={(e) => setCatIcon(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="URL Hình ảnh đại diện"
              value={catImage}
              onChange={(e) => setCatImage(e.target.value)}
            />
          </DialogContent>
          <DialogActions className="p-4 border-t">
            <Button onClick={() => setOpenModal(false)}>Hủy bỏ</Button>
            <Button type="submit" variant="contained" color="primary">
              Tạo danh mục
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CategoryList;
