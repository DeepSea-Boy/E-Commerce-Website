import React from 'react';
import { Rating, Tooltip } from '@mui/material';
import { IoHeartOutline, IoHeart, IoEyeOutline, IoCartOutline, IoGitCompareOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useQuickView } from '../../context/QuickViewContext';
import { useCompare } from '../../context/CompareContext';

const ProductListItem = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const { isInCompare, toggleCompare } = useCompare();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="bg-white border border-slate-200 hover:border-primary/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-center gap-5">
      {/* Image */}
      <Link
        to={`/product/${product.slug || product.id}`}
        className="w-full sm:w-48 h-48 bg-slate-50 rounded-xl overflow-hidden p-3 flex items-center justify-center shrink-0"
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Middle info */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-primary bg-sky-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          <span className="text-xs text-slate-400">• Thương hiệu: {product.brand}</span>
        </div>

        <Link
          to={`/product/${product.slug || product.id}`}
          className="text-sm font-bold text-slate-800 hover:text-primary transition line-clamp-1 block"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <Rating value={product.rating || 5} precision={0.1} size="small" readOnly />
          <span className="text-xs text-slate-400">({product.reviewCount || 0} đánh giá)</span>
          <span className="text-xs text-emerald-600 font-semibold ml-2">Còn hàng ({product.stock})</span>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.shortDescription || product.description}
        </p>

        {/* Action icons row */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => openQuickView(product)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary bg-slate-100 hover:bg-sky-50 px-2.5 py-1 rounded-lg transition"
          >
            <IoEyeOutline />
            <span>Xem nhanh</span>
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition ${
              isFavorited ? 'text-rose-500 bg-rose-50 font-bold' : 'text-slate-500 hover:text-rose-500 bg-slate-100 hover:bg-rose-50'
            }`}
          >
            {isFavorited ? <IoHeart /> : <IoHeartOutline />}
            <span>Yêu thích</span>
          </button>

          <button
            onClick={() => toggleCompare(product)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition ${
              isCompared ? 'text-primary bg-sky-50 font-bold' : 'text-slate-500 hover:text-primary bg-slate-100 hover:bg-sky-50'
            }`}
          >
            <IoGitCompareOutline />
            <span>So sánh</span>
          </button>
        </div>
      </div>

      {/* Right Pricing & Button */}
      <div className="w-full sm:w-48 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-slate-100 sm:pl-5 pt-3 sm:pt-0 shrink-0 gap-3">
        <div className="sm:text-right">
          <div className="text-lg font-extrabold text-rose-600">
            {product.price?.toLocaleString('vi-VN')}đ
          </div>
          {product.oldPrice && (
            <div className="text-xs text-slate-400 line-through">
              {product.oldPrice?.toLocaleString('vi-VN')}đ
            </div>
          )}
          {product.discountPercent && (
            <span className="text-[10px] bg-rose-100 text-rose-600 font-bold px-1.5 py-0.5 rounded inline-block mt-0.5">
              Tiết kiệm {product.discountPercent}%
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          className="bg-primary hover:bg-sky-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <IoCartOutline className="text-base" />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
