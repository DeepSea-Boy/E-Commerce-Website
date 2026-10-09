import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton, Rating } from '@mui/material';
import { IoClose, IoHeartOutline, IoHeart, IoCartOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductQuickViewModal = () => {
  const { isQuickViewOpen, quickViewProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.images?.[0] || '');
      // Mặc định chọn biến thể đầu tiên
      const firstVariant =
        quickViewProduct.variants?.ram?.[0] ||
        quickViewProduct.variants?.size?.[0] ||
        quickViewProduct.variants?.colors?.[0] ||
        'Tiêu chuẩn';
      setSelectedVariant(firstVariant);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedVariant);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <Dialog open={isQuickViewOpen} onClose={closeQuickView} maxWidth="md" fullWidth>
      <div className="relative bg-white rounded-xl overflow-hidden">
        <IconButton
          onClick={closeQuickView}
          size="small"
          className="absolute top-3 right-3 z-20 bg-slate-100 hover:bg-slate-200"
        >
          <IoClose className="text-xl text-slate-700" />
        </IconButton>

        <DialogContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Gallery Left */}
            <div>
              <div className="h-80 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center">
                {quickViewProduct.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                      activeImage === img ? 'border-primary' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Right */}
            <div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded-full inline-block mb-1">
                {quickViewProduct.category}
              </span>

              <h2 className="text-lg font-bold text-slate-800 leading-snug mb-2">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mb-3">
                <Rating value={quickViewProduct.rating || 5} precision={0.1} size="small" readOnly />
                <span className="text-xs text-slate-400">({quickViewProduct.reviewCount || 0} đánh giá)</span>
                <span className="text-xs text-emerald-600 font-semibold ml-2">
                  • Còn {quickViewProduct.stock || 20} sản phẩm
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-extrabold text-rose-600">
                  {quickViewProduct.price?.toLocaleString('vi-VN')}đ
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {quickViewProduct.oldPrice?.toLocaleString('vi-VN')}đ
                  </span>
                )}
                {quickViewProduct.discountPercent && (
                  <span className="text-xs bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded">
                    -{quickViewProduct.discountPercent}%
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                {quickViewProduct.shortDescription || quickViewProduct.description}
              </p>

              {/* Variants */}
              {(quickViewProduct.variants?.ram || quickViewProduct.variants?.size || quickViewProduct.variants?.colors) && (
                <div className="mb-4 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Chọn phiên bản:</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ...(quickViewProduct.variants?.ram || []),
                      ...(quickViewProduct.variants?.storage || []),
                      ...(quickViewProduct.variants?.size || []),
                      ...(quickViewProduct.variants?.colors || [])
                    ].map((val, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(val)}
                        className={`text-xs py-1 px-3 rounded-lg border font-medium transition ${
                          selectedVariant === val
                            ? 'border-primary bg-sky-50 text-primary font-bold'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & CTA */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(quickViewProduct.stock || 99, quantity + 1))}
                    className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addedSuccess}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary hover:bg-sky-500 text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <IoCheckmarkCircle className="text-base" />
                      <span>Đã thêm vào giỏ!</span>
                    </>
                  ) : (
                    <>
                      <IoCartOutline className="text-base" />
                      <span>Thêm vào giỏ</span>
                    </>
                  )}
                </button>

                <IconButton
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`border border-slate-200 ${isFavorited ? 'text-rose-500' : 'text-slate-400'}`}
                >
                  {isFavorited ? <IoHeart /> : <IoHeartOutline />}
                </IconButton>
              </div>

              {/* View Full Link */}
              <div className="border-t border-slate-100 pt-3">
                <Link
                  to={`/product/${quickViewProduct.slug || quickViewProduct.id}`}
                  onClick={closeQuickView}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Xem toàn bộ thông số chi tiết & đánh giá →
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ProductQuickViewModal;
