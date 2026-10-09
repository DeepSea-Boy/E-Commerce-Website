import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../../Components/Sliders/HeroSlider';
import CategorySlider from '../../Components/Sliders/CategorySlider';
import ProductCard from '../../Components/Product/ProductCard';
import FeatureBadges from '../../Components/Common/FeatureBadges';
import BlogSection from '../../Components/Blog/BlogSection';
import { useAdmin } from '../../context/AdminContext';
import { IoFlashOutline, IoSparklesOutline, IoArrowForward } from 'react-icons/io5';

const Home = () => {
  const { products } = useAdmin();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const latestProducts = products.filter(p => p.isLatest).slice(0, 4);
  const displayBestSellers = bestSellers.length > 0 ? bestSellers : products.slice(0, 4);
  const displayLatest = latestProducts.length > 0 ? latestProducts : products.slice(4, 8);

  return (
    <div className="home-page pb-12">
      <div className="container-fluid pt-4">
        {/* 1. Hero Banner Slider */}
        <HeroSlider />

        {/* 2. Highlighted Categories Slider */}
        <CategorySlider />

        {/* 3. Best Sellers Section */}
        <section className="py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-50 text-amber-500 rounded-lg text-lg">
                <IoFlashOutline />
              </span>
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-slate-800 m-0">
                  Sản phẩm Bán chạy nhất
                </h2>
                <p className="text-xs text-slate-400 m-0 mt-0.5">
                  Được khách hàng săn đón nhiều nhất trong tuần này
                </p>
              </div>
            </div>
            <Link to="/products?filter=bestseller" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <span>Xem tất cả</span>
              <IoArrowForward className="text-xs" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {displayBestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* 4. Promotional Banner Strip */}
        <section className="my-8 rounded-2xl overflow-hidden bg-gradient-to-r from-sky-600 via-indigo-600 to-primary p-6 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-xs font-extrabold uppercase px-3 py-1 rounded-full">
              Ưu đãi độc quyền App & Web
            </span>
            <h3 className="text-xl lg:text-3xl font-extrabold m-0">
              Giảm ngay 1.000.000đ khi nhập mã <span className="text-amber-300">DISCOUNT10</span>
            </h3>
            <p className="text-xs lg:text-sm text-sky-100 max-w-lg m-0">
              Áp dụng cho toàn bộ danh mục smartphone cao cấp, laptop và hệ sinh thái Smart Home thông minh.
            </p>
          </div>
          <Link
            to="/products"
            className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shrink-0 shadow-lg"
          >
            Sử dụng mã ngay
          </Link>
        </section>

        {/* 5. Latest Arrivals Section */}
        <section className="py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-sky-50 text-primary rounded-lg text-lg">
                <IoSparklesOutline />
              </span>
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-slate-800 m-0">
                  Sản phẩm Mới cập bến
                </h2>
                <p className="text-xs text-slate-400 m-0 mt-0.5">
                  Đón đầu các thiết bị công nghệ đỉnh cao vừa ra mắt
                </p>
              </div>
            </div>
            <Link to="/products?filter=latest" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <span>Xem tất cả</span>
              <IoArrowForward className="text-xs" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {displayLatest.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* 6. Blog & News Section */}
        <BlogSection />
      </div>

      {/* 7. Utility Feature Badges */}
      <FeatureBadges />
    </div>
  );
};

export default Home;