import React from 'react';
import { Link } from 'react-router-dom';
import { IoTrashOutline, IoCartOutline, IoGitCompareOutline } from 'react-icons/io5';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareItems.length === 0) {
    return (
      <div className="py-20 text-center container-fluid">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-20 h-20 bg-sky-50 text-primary rounded-full flex items-center justify-center text-4xl mx-auto">
            <IoGitCompareOutline />
          </div>
          <h2 className="text-xl font-bold text-slate-800 m-0">Chưa có sản phẩm để so sánh</h2>
          <p className="text-xs text-slate-400">
            Bạn có thể thêm tối đa 4 sản phẩm cùng lúc để so sánh chi tiết thông số và giá cả.
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition"
          >
            Chọn sản phẩm so sánh
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-page py-8">
      <div className="container-fluid">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 m-0">
            So sánh sản phẩm ({compareItems.length}/4)
          </h1>
          <button
            onClick={clearCompare}
            className="text-xs text-rose-500 hover:underline font-semibold"
          >
            Xóa danh sách so sánh
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-[640px]">
            {compareItems.map((prod) => (
              <div key={prod.id} className="border border-slate-100 rounded-xl p-4 flex flex-col justify-between space-y-4 bg-slate-50/50">
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeFromCompare(prod.id)}
                      className="text-slate-400 hover:text-rose-500"
                      title="Xóa khỏi so sánh"
                    >
                      <IoTrashOutline className="text-base" />
                    </button>
                  </div>
                  <img
                    src={prod.images?.[0]}
                    alt={prod.name}
                    className="w-full h-36 object-contain bg-white rounded-lg p-2 border border-slate-100"
                  />
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-2 m-0">
                    {prod.name}
                  </h3>
                  <div className="text-sm font-extrabold text-rose-600">
                    {prod.price?.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-xs text-slate-500 space-y-1 border-t border-slate-200 pt-2">
                    <div><strong>Danh mục:</strong> {prod.category}</div>
                    <div><strong>Hãng:</strong> {prod.brand}</div>
                    <div><strong>Tồn kho:</strong> {prod.stock > 0 ? 'Còn hàng' : 'Hết'}</div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(prod, 1)}
                  className="w-full py-2 bg-primary hover:bg-sky-500 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <IoCartOutline className="text-sm" />
                  <span>Thêm vào giỏ</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
