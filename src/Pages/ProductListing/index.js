import React, { useState, useMemo } from 'react';
import { Pagination, Drawer, IconButton } from '@mui/material';
import { IoFilterOutline, IoClose } from 'react-icons/io5';
import FilterSidebar from '../../Components/ProductListing/FilterSidebar';
import ProductListingHeader from '../../Components/ProductListing/ProductListingHeader';
import ProductCard from '../../Components/Product/ProductCard';
import ProductListItem from '../../Components/Product/ProductListItem';
import { useAdmin } from '../../context/AdminContext';
import { useFilter } from '../../context/FilterContext';

const ProductListing = () => {
  const { products } = useAdmin();
  const {
    searchKeyword,
    selectedCategory,
    selectedSubCategory,
    priceRange,
    selectedBrands,
    inStockOnly,
    ratingFilter,
    sortBy,
    viewMode,
    resetFilters
  } = useFilter();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter & Sort Engine
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search keyword
      if (searchKeyword) {
        const query = searchKeyword.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = (p.shortDescription || p.description || '').toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }

      // 2. Category
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }

      // 3. SubCategory
      if (selectedSubCategory && p.subCategory !== selectedSubCategory) {
        return false;
      }

      // 4. Price range
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }

      // 5. Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // 6. In Stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      // 7. Rating
      if (ratingFilter > 0 && (p.rating || 5) < ratingFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return 0; // latest
    });
  }, [products, searchKeyword, selectedCategory, selectedSubCategory, priceRange, selectedBrands, inStockOnly, ratingFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Grid layout class based on viewMode
  const getGridClass = () => {
    if (viewMode === 'grid-1') return 'grid grid-cols-1 gap-4';
    if (viewMode === 'grid-2') return 'grid grid-cols-1 sm:grid-cols-2 gap-4';
    if (viewMode === 'grid-3') return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4';
    if (viewMode === 'grid-4') return 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
    return 'space-y-4'; // list view
  };

  return (
    <div className="product-listing-page py-6">
      <div className="container-fluid">
        {/* Breadcrumb & Mobile Filter Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-slate-400">
            Trang chủ / <span className="text-slate-800 font-bold">{selectedCategory || 'Tất cả sản phẩm'}</span>
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-sm"
          >
            <IoFilterOutline className="text-primary text-base" />
            <span>Bộ lọc</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-28">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Drawer */}
          <Drawer anchor="left" open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)}>
            <div className="w-80 p-4">
              <div className="flex justify-end mb-2">
                <IconButton onClick={() => setMobileFilterOpen(false)} size="small">
                  <IoClose />
                </IconButton>
              </div>
              <FilterSidebar />
            </div>
          </Drawer>

          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full">
            <ProductListingHeader totalResults={filteredProducts.length} />

            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <div className="text-4xl text-slate-300">🔍</div>
                <h3 className="text-base font-bold text-slate-800 m-0">
                  Không tìm thấy sản phẩm nào phù hợp
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto m-0">
                  Vui lòng thử điều chỉnh lại dải giá, danh mục hoặc đặt lại bộ lọc để xem các sản phẩm khác.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-3 bg-primary hover:bg-sky-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className={getGridClass()}>
                  {paginatedProducts.map((p) =>
                    viewMode === 'list' ? (
                      <ProductListItem key={p.id} product={p} />
                    ) : (
                      <ProductCard key={p.id} product={p} />
                    )
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      shape="rounded"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
