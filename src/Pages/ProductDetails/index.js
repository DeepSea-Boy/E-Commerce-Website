import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Rating, Tooltip } from '@mui/material';
import {
  IoHeartOutline,
  IoHeart,
  IoCartOutline,
  IoFlashOutline,
  IoGitCompareOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';
import ProductGallery from '../../Components/ProductDetails/ProductGallery';
import ProductTabs from '../../Components/ProductDetails/ProductTabs';
import ProductCard from '../../Components/Product/ProductCard';
import { useAdmin } from '../../context/AdminContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useAdmin();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug) || products[0];

  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      const defaultVar =
        product.variants?.ram?.[0] ||
        product.variants?.size?.[0] ||
        product.variants?.colors?.[0] ||
        'Tiêu chuẩn';
      setSelectedVariant(defaultVar);
      setQuantity(1);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="container-fluid py-20 text-center">
        <h2 className="text-xl font-bold mb-3">Sản phẩm không tồn tại</h2>
        <Link to="/products" className="text-primary font-bold text-xs underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-details-page py-6">
      <div className="container-fluid">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-primary">Trang chủ</Link> /{' '}
          <Link to="/products" className="hover:text-primary">{product.category}</Link> /{' '}
          <span className="text-slate-800 font-bold">{product.name}</span>
        </div>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          {/* Col Left: Gallery (5 cols) */}
          <div className="lg:col-span-5">
            <ProductGallery images={product.images || []} />
          </div>

          {/* Col Right: Information & Action (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold text-primary bg-sky-50 px-2.5 py-1 rounded-full uppercase">
                  {product.category}
                </span>
                <span className="text-xs text-slate-400">Mã SP: #{product.id}</span>
                <span className="text-xs text-slate-400">• Thương hiệu: <strong className="text-slate-700">{product.brand}</strong></span>
              </div>

              <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 leading-snug m-0">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-2.5">
                <div className="flex items-center gap-1">
                  <Rating value={product.rating || 5} precision={0.1} size="small" readOnly />
                  <span className="text-xs font-bold text-slate-700">{product.rating || 5}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500">{product.reviewCount || 0} bài đánh giá</span>
                <span className="text-slate-300">|</span>
                <span className="text-xs font-semibold text-emerald-600">
                  {product.stock > 0 ? `Tồn kho: Còn ${product.stock} cái` : 'Hết hàng tạm thời'}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-slate-50 rounded-2xl flex items-baseline gap-4 border border-slate-100">
              <span className="text-2xl lg:text-3xl font-extrabold text-rose-600">
                {product.price?.toLocaleString('vi-VN')}đ
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {product.oldPrice?.toLocaleString('vi-VN')}đ
                </span>
              )}
              {product.discountPercent && (
                <span className="text-xs bg-rose-500 text-white font-bold px-2 py-0.5 rounded shadow-sm">
                  Tiết kiệm {product.discountPercent}%
                </span>
              )}
            </div>

            {/* Short Desc */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Attribute / Variant Selectors */}
            {product.variants && (
              <div className="space-y-3.5 border-t border-b border-slate-100 py-4">
                {/* RAM / Storage / Size */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Lựa chọn cấu hình / Kích thước:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ...(product.variants?.ram || []),
                      ...(product.variants?.storage || []),
                      ...(product.variants?.size || [])
                    ].map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(v)}
                        className={`text-xs py-2 px-3.5 rounded-xl border font-semibold transition ${
                          selectedVariant === v
                            ? 'border-primary bg-sky-50 text-primary shadow-sm ring-1 ring-sky-300'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                {product.variants?.colors && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Màu sắc:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.colors.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedVariant(c)}
                          className={`text-xs py-1.5 px-3 rounded-lg border font-medium transition ${
                            selectedVariant === c
                              ? 'border-primary bg-sky-50 text-primary font-bold'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity & CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 rounded-xl bg-white shrink-0 self-start">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 rounded-l-xl font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    className="px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 rounded-r-xl font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedSuccess}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary hover:bg-sky-500 text-white shadow-sky-500/20'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <IoCheckmarkCircle className="text-lg" />
                      <span>Đã thêm vào giỏ thành công!</span>
                    </>
                  ) : (
                    <>
                      <IoCartOutline className="text-lg" />
                      <span>Thêm vào giỏ hàng</span>
                    </>
                  )}
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md shadow-rose-600/20"
                >
                  Mua ngay
                </button>

                {/* Action icons */}
                <div className="flex gap-2">
                  <Tooltip title={isFavorited ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center transition ${
                        isFavorited ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-slate-400 hover:text-rose-500'
                      }`}
                    >
                      {isFavorited ? <IoHeart className="text-lg" /> : <IoHeartOutline className="text-lg" />}
                    </button>
                  </Tooltip>

                  <Tooltip title={isCompared ? 'Bỏ so sánh' : 'So sánh sản phẩm'}>
                    <button
                      onClick={() => toggleCompare(product)}
                      className={`w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center transition ${
                        isCompared ? 'text-primary bg-sky-50 border-primary/30' : 'text-slate-400 hover:text-primary'
                      }`}
                    >
                      <IoGitCompareOutline className="text-lg" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Policy badges */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <IoShieldCheckmarkOutline /> Bảo hành 12 tháng chính hãng
              </span>
              <span className="flex items-center gap-1.5 text-sky-600">
                <IoFlashOutline /> Giao hỏa tốc trong 2 giờ
              </span>
            </div>
          </div>
        </div>

        {/* Tab specifications and reviews */}
        <ProductTabs product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h3 className="text-lg font-bold text-slate-800 mb-5">
              Sản phẩm tương tự có thể bạn quan tâm
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
