import React from 'react';
import { Link } from 'react-router-dom';
import { IoTrashOutline, IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="py-20 text-center container-fluid">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-4xl mx-auto">
            <IoHeartOutline />
          </div>
          <h2 className="text-xl font-bold text-slate-800 m-0">Danh sách yêu thích trống</h2>
          <p className="text-xs text-slate-400">
            Bạn chưa lưu sản phẩm nào vào danh sách yêu thích. Khám phá và nhấn biểu tượng trái tim để lưu lại nhé!
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-md shadow-sky-500/20"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page py-8">
      <div className="container-fluid">
        <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 mb-6">
          Sản phẩm yêu thích ({wishlistItems.length})
        </h1>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Sản phẩm</th>
                  <th className="py-3.5 px-4">Đơn giá</th>
                  <th className="py-3.5 px-4">Tình trạng</th>
                  <th className="py-3.5 px-4 text-center">Thao tác</th>
                  <th className="py-3.5 px-4 text-center">Xóa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wishlistItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    {/* Product */}
                    <td className="py-4 px-4 flex items-center gap-3 min-w-[220px]">
                      <img
                        src={item.images?.[0] || 'https://via.placeholder.com/150'}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-xl border border-slate-200 p-1 shrink-0 bg-slate-50"
                      />
                      <div>
                        <Link
                          to={`/product/${item.slug || item.id}`}
                          className="font-bold text-slate-800 hover:text-primary transition line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-bold text-rose-600 whitespace-nowrap">
                      {item.price?.toLocaleString('vi-VN')}đ
                    </td>

                    {/* Stock */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        Còn hàng ({item.stock || 20})
                      </span>
                    </td>

                    {/* Add to cart */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="bg-primary hover:bg-sky-500 text-white font-bold text-xs py-2 px-3.5 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <IoCartOutline className="text-base" />
                        <span>Thêm vào giỏ</span>
                      </button>
                    </td>

                    {/* Remove */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition p-1"
                        title="Xóa khỏi yêu thích"
                      >
                        <IoTrashOutline className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
