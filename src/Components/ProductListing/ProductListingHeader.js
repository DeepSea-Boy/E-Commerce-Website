import React from 'react';
import { IoGridOutline, IoListOutline } from 'react-icons/io5';
import { useFilter } from '../../context/FilterContext';

const ProductListingHeader = ({ totalResults }) => {
  const { viewMode, setViewMode, sortBy, setSortBy } = useFilter();

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      {/* Left count */}
      <div className="text-xs text-slate-500">
        Tìm thấy <strong className="text-slate-800 text-sm">{totalResults}</strong> sản phẩm phù hợp
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 shrink-0">Sắp xếp:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:border-primary"
          >
            <option value="latest">Mới nhất</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-0.5">
          {/* Grid 1 */}
          <button
            onClick={() => setViewMode('grid-1')}
            title="1 cột"
            className={`p-1.5 rounded transition text-xs font-bold ${
              viewMode === 'grid-1' ? 'bg-white shadow text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            1C
          </button>
          {/* Grid 2 */}
          <button
            onClick={() => setViewMode('grid-2')}
            title="2 cột"
            className={`p-1.5 rounded transition text-xs font-bold ${
              viewMode === 'grid-2' ? 'bg-white shadow text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            2C
          </button>
          {/* Grid 3 */}
          <button
            onClick={() => setViewMode('grid-3')}
            title="3 cột"
            className={`p-1.5 rounded transition text-xs font-bold hidden md:block ${
              viewMode === 'grid-3' ? 'bg-white shadow text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            3C
          </button>
          {/* Grid 4 */}
          <button
            onClick={() => setViewMode('grid-4')}
            title="4 cột"
            className={`p-1.5 rounded transition text-xs font-bold hidden lg:block ${
              viewMode === 'grid-4' ? 'bg-white shadow text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            4C
          </button>
          {/* List View */}
          <button
            onClick={() => setViewMode('list')}
            title="Xem danh sách"
            className={`p-1.5 rounded transition ${
              viewMode === 'list' ? 'bg-white shadow text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <IoListOutline className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListingHeader;
