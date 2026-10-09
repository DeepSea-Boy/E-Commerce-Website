import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';
import { IoCloudUploadOutline, IoTrashOutline, IoArrowBack, IoCheckmarkCircle } from 'react-icons/io5';
import { useAdmin } from '../../../context/AdminContext';

const sampleImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
];

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, categories } = useAdmin();

  const isEdit = Boolean(id);
  const existingProduct = isEdit ? products.find((p) => p.id === id) : null;

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    subCategory: '',
    subSubCategory: '',
    price: '',
    oldPrice: '',
    stock: '',
    shortDescription: '',
    description: '',
    images: [sampleImages[0]],
    ramOptions: '8GB, 16GB',
    sizeOptions: 'Tiêu chuẩn',
    weightOptions: '200g',
    colorOptions: 'Đen, Bạc, Xanh'
  });

  const [level1Cat, setLevel1Cat] = useState('');
  const [level2Cat, setLevel2Cat] = useState('');
  const [level3Cat, setLevel3Cat] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        brand: existingProduct.brand || '',
        category: existingProduct.category || '',
        subCategory: existingProduct.subCategory || '',
        subSubCategory: '',
        price: existingProduct.price || '',
        oldPrice: existingProduct.oldPrice || '',
        stock: existingProduct.stock || '',
        shortDescription: existingProduct.shortDescription || '',
        description: existingProduct.description || '',
        images: existingProduct.images?.length ? existingProduct.images : [sampleImages[0]],
        ramOptions: existingProduct.variants?.ram?.join(', ') || '8GB, 16GB',
        sizeOptions: existingProduct.variants?.size?.join(', ') || 'Tiêu chuẩn',
        weightOptions: existingProduct.variants?.weight?.join(', ') || '200g',
        colorOptions: existingProduct.variants?.colors?.join(', ') || 'Đen, Bạc'
      });
      setLevel1Cat(existingProduct.category);
    }
  }, [existingProduct]);

  // Cascading categories resolution
  const selectedCatObj = categories.find((c) => c.name === level1Cat);
  const availableSubCats = selectedCatObj?.subCategories || [];
  const selectedSubCatObj = availableSubCats.find((s) => s.name === level2Cat);
  const availableSubSubCats = selectedSubCatObj?.items || [];

  const handleLevel1Change = (val) => {
    setLevel1Cat(val);
    setLevel2Cat('');
    setLevel3Cat('');
    setFormData((prev) => ({ ...prev, category: val, subCategory: '' }));
  };

  const handleLevel2Change = (val) => {
    setLevel2Cat(val);
    setLevel3Cat('');
    setFormData((prev) => ({ ...prev, subCategory: val }));
  };

  const handleAddSampleImage = () => {
    const nextImg = sampleImages[formData.images.length % sampleImages.length];
    setFormData({ ...formData, images: [...formData.images, nextImg] });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, idx) => idx !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productPayload = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category || level1Cat || 'Thiết bị công nghệ',
      subCategory: formData.subCategory || level2Cat || '',
      price: Number(formData.price) || 0,
      oldPrice: Number(formData.oldPrice) || 0,
      stock: Number(formData.stock) || 10,
      shortDescription: formData.shortDescription,
      description: formData.description,
      images: formData.images,
      variants: {
        ram: formData.ramOptions.split(',').map((s) => s.trim()).filter(Boolean),
        size: formData.sizeOptions.split(',').map((s) => s.trim()).filter(Boolean),
        weight: formData.weightOptions.split(',').map((s) => s.trim()).filter(Boolean),
        colors: formData.colorOptions.split(',').map((s) => s.trim()).filter(Boolean)
      }
    };

    if (isEdit) {
      updateProduct(id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/admin/products');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:text-primary transition"
          >
            <IoArrowBack className="text-lg" />
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
              {isEdit ? 'Chỉnh sửa Sản phẩm' : 'Đăng Sản phẩm Mới'}
            </h1>
            <p className="text-xs text-slate-400 m-0 mt-0.5">
              Hỗ trợ tải nhiều ảnh, phân loại danh mục 3 cấp và thiết lập thuộc tính biến thể
            </p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-700 text-xs rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold">
          <IoCheckmarkCircle className="text-xl" />
          <span>Lưu thông tin sản phẩm thành công! Đang chuyển hướng...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Basic Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 m-0">
            1. Thông tin chung
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              fullWidth
              size="small"
              label="Tên sản phẩm"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Thương hiệu (Brand)"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextField
              fullWidth
              size="small"
              label="Giá bán (VNĐ)"
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Giá gốc / Giá cũ (VNĐ)"
              type="number"
              value={formData.oldPrice}
              onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Số lượng tồn kho"
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />
          </div>
        </div>

        {/* Card 2: Cascading Category Hierarchy (Cấp 1 -> Cấp 2 -> Cấp 3) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 m-0">
            2. Phân loại danh mục xếp tầng 3 cấp
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Level 1 */}
            <TextField
              select
              fullWidth
              size="small"
              label="Danh mục Cấp 1 (Chính)"
              required
              value={level1Cat}
              onChange={(e) => handleLevel1Change(e.target.value)}
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.icon} {c.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Level 2 */}
            <TextField
              select
              fullWidth
              size="small"
              label="Danh mục Cấp 2 (Con)"
              disabled={!level1Cat || availableSubCats.length === 0}
              value={level2Cat}
              onChange={(e) => handleLevel2Change(e.target.value)}
            >
              {availableSubCats.map((sub) => (
                <MenuItem key={sub.id} value={sub.name}>
                  {sub.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Level 3 */}
            <TextField
              select
              fullWidth
              size="small"
              label="Danh mục Cấp 3 (Chi tiết)"
              disabled={!level2Cat || availableSubSubCats.length === 0}
              value={level3Cat}
              onChange={(e) => setLevel3Cat(e.target.value)}
            >
              {availableSubSubCats.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        {/* Card 3: Multi-image Upload Preview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider m-0">
              3. Thư viện hình ảnh sản phẩm ({formData.images.length} ảnh)
            </h3>
            <button
              type="button"
              onClick={handleAddSampleImage}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <IoCloudUploadOutline className="text-base" />
              <span>+ Thêm ảnh mẫu</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded-xl border border-slate-200 overflow-hidden group bg-slate-50 p-1">
                <img src={img} alt="" className="w-full h-full object-contain" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow"
                  title="Xóa ảnh"
                >
                  <IoTrashOutline className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Variant Attributes Setup (RAM, Size, Weight, Colors) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 m-0">
            4. Thiết lập thuộc tính biến thể (Phân cách bằng dấu phẩy)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              fullWidth
              size="small"
              label="Tùy chọn RAM / Bộ nhớ"
              value={formData.ramOptions}
              onChange={(e) => setFormData({ ...formData, ramOptions: e.target.value })}
              helperText="VD: 8GB, 16GB, 32GB, 512GB"
            />
            <TextField
              fullWidth
              size="small"
              label="Tùy chọn Kích thước / Size"
              value={formData.sizeOptions}
              onChange={(e) => setFormData({ ...formData, sizeOptions: e.target.value })}
              helperText="VD: 14 inch, 49mm, Size L"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              fullWidth
              size="small"
              label="Trọng lượng (Weight)"
              value={formData.weightOptions}
              onChange={(e) => setFormData({ ...formData, weightOptions: e.target.value })}
              helperText="VD: 200g, 1.45kg"
            />
            <TextField
              fullWidth
              size="small"
              label="Màu sắc (Colors)"
              value={formData.colorOptions}
              onChange={(e) => setFormData({ ...formData, colorOptions: e.target.value })}
              helperText="VD: Titan Tự Nhiên, Đen Midnight, Bạc"
            />
          </div>
        </div>

        {/* Card 5: Descriptions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 m-0">
            5. Nội dung mô tả sản phẩm
          </h3>

          <TextField
            fullWidth
            size="small"
            label="Mô tả tóm tắt ngắn"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            size="small"
            label="Mô tả chi tiết sản phẩm"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => navigate('/admin/products')}
            variant="outlined"
            className="rounded-xl px-6 text-xs font-bold"
          >
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="rounded-xl px-8 text-xs font-bold py-2.5 shadow-md shadow-sky-500/20"
          >
            {isEdit ? 'Lưu thay đổi sản phẩm' : 'Đăng bán sản phẩm'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProduct;
