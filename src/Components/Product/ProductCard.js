import React from 'react';
import { Rating, Tooltip } from '@mui/material';
import { IoHeartOutline, IoHeart, IoEyeOutline, IoCartOutline, IoGitCompareOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useQuickView } from '../../context/QuickViewContext';
import { useCompare } from '../../context/CompareContext';

const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const { isInCompare, toggleCompare } = useCompare();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleToggleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-primary/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {product.discountPercent && (
          <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            -{product.discountPercent}%
          </span>
        )}
        {product.badge && (
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <Tooltip title="Xem nhanh" placement="left">
          <button
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:text-primary hover:bg-sky-50 transition"
          >
            <IoEyeOutline className="text-base" />
          </button>
        </Tooltip>

        <Tooltip title={isFavorited ? 'Bỏ yêu thích' : 'Thêm yêu thích'} placement="left">
          <button
            onClick={handleToggleWishlist}
            className={`w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition ${
              isFavorited ? 'text-rose-500 bg-rose-50' : 'text-slate-600 hover:text-rose-500 hover:bg-rose-50'
            }`}
          >
            {isFavorited ? <IoHeart className="text-base" /> : <IoHeartOutline className="text-base" />}
          </button>
        </Tooltip>

        <Tooltip title={isCompared ? 'Bỏ so sánh' : 'So sánh sản phẩm'} placement="left">
          <button
            onClick={handleToggleCompare}
            className={`w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition ${
              isCompared ? 'text-primary bg-sky-50' : 'text-slate-600 hover:text-primary hover:bg-sky-50'
            }`}
          >
            <IoGitCompareOutline className="text-base" />
          </button>
        </Tooltip>
      </div>

      {/* Product Image */}
      <Link
        to={`/product/${product.slug || product.id}`}
        className="block relative aspect-square w-full bg-slate-50 overflow-hidden p-4 flex items-center justify-center"
      >
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block mb-1">
            {product.category}
          </span>

          <Link
            to={`/product/${product.slug || product.id}`}
            className="text-xs font-bold text-slate-800 hover:text-primary line-clamp-2 leading-snug mb-2 block min-h-[34px]"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <Rating value={product.rating || 5} precision={0.1} size="small" readOnly />
            <span className="text-[11px] text-slate-400">({product.reviewCount || 0})</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-extrabold text-rose-600">
              {product.price?.toLocaleString('vi-VN')}đ
            </div>
            {product.oldPrice && (
              <div className="text-[11px] text-slate-400 line-through">
                {product.oldPrice?.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>

          <Tooltip title="Thêm vào giỏ">
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-lg bg-sky-50 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition shadow-sm"
            >
              <IoCartOutline className="text-lg" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
