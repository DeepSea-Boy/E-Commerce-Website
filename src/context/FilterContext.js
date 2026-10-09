import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 55000000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid-4'); // grid-1, grid-2, grid-3, grid-4, list

  const resetFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setPriceRange([0, 55000000]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setRatingFilter(0);
    setSortBy('latest');
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <FilterContext.Provider value={{
      searchKeyword,
      setSearchKeyword,
      selectedCategory,
      setSelectedCategory,
      selectedSubCategory,
      setSelectedSubCategory,
      priceRange,
      setPriceRange,
      selectedBrands,
      setSelectedBrands,
      toggleBrand,
      inStockOnly,
      setInStockOnly,
      ratingFilter,
      setRatingFilter,
      sortBy,
      setSortBy,
      viewMode,
      setViewMode,
      resetFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
