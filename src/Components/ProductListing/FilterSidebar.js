import React from 'react';
import { Slider, Checkbox, FormControlLabel, Rating } from '@mui/material';
import { IoFilterOutline, IoRefreshOutline } from 'react-icons/io5';
import { useFilter } from '../../context/FilterContext';
import { categoriesData } from '../../data/categoriesData';

const brandsList = ['Apple', 'Samsung', 'Sony', 'Aqara / Xiaomi', 'Keychron', 'Marshall'];

const FilterSidebar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedBrands,
    toggleBrand,
    inStockOnly,
    setInStockOnly,
    ratingFilter,
    setRatingFilter,
    resetFilters
  } = useFilter();

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <aside className="w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* Title & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <IoFilterOutline className="text-primary text-lg" />
          <span>Bộ lọc sản phẩm</span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] text-rose-500 font-semibold hover:underline"
        >
          <IoRefreshOutline />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Danh mục sản phẩm
        </h4>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition font-medium ${
              selectedCategory === '' ? 'bg-sky-50 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả danh mục
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition font-medium flex items-center justify-between ${
                selectedCategory === cat.name ? 'bg-sky-50 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-slate-400">({cat.itemCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider m-0">
            Mức giá
          </h4>
          <span className="text-[11px] font-bold text-primary">
            {priceRange[0].toLocaleString('vi-VN')}đ - {priceRange[1].toLocaleString('vi-VN')}đ
          </span>
        </div>
        <div className="px-2">
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => `${(val / 1000000).toFixed(1)}M`}
            min={0}
            max={55000000}
            step={1000000}
            color="primary"
          />
        </div>
      </div>

      {/* 3. Brands */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Thương hiệu
        </h4>
        <div className="space-y-1">
          {brandsList.map((brand) => (
            <div key={brand} className="flex items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    sx={{ padding: '4px', '&.Mui-checked': { color: '#2bbef9' } }}
                  />
                }
                label={<span className="text-xs text-slate-600">{brand}</span>}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. In Stock */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Tình trạng tồn kho
        </h4>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              sx={{ padding: '4px', '&.Mui-checked': { color: '#2bbef9' } }}
            />
          }
          label={<span className="text-xs text-slate-600 font-medium">Chỉ hiện sản phẩm còn hàng</span>}
        />
      </div>

      {/* 5. Rating Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Đánh giá xếp hạng
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 0].map((star) => (
            <button
              key={star}
              onClick={() => setRatingFilter(star)}
              className={`w-full flex items-center gap-2 text-xs p-1.5 rounded-lg transition ${
                ratingFilter === star ? 'bg-sky-50 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {star > 0 ? (
                <>
                  <Rating value={star} readOnly size="small" />
                  <span className="text-slate-600 text-xs">từ {star} sao trở lên</span>
                </>
              ) : (
                <span className="text-slate-500 text-xs">Mọi mức đánh giá</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
