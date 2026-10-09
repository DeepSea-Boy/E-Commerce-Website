import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { categoriesData } from '../../data/categoriesData';
import { useFilter } from '../../context/FilterContext';

import 'swiper/css';
import 'swiper/css/navigation';

const CategorySlider = () => {
  const { setSelectedCategory } = useFilter();

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-800 m-0">
            Danh mục sản phẩm nổi bật
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Lựa chọn theo nhu cầu công nghệ và thiết bị thông minh của bạn
          </p>
        </div>
        <Link to="/products" className="text-xs font-bold text-primary hover:underline">
          Xem tất cả danh mục →
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="category-swiper py-2"
      >
        {categoriesData.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Link
              to="/products"
              onClick={() => setSelectedCategory(cat.name)}
              className="group block p-4 bg-white rounded-2xl border border-slate-200 hover:border-primary/50 shadow-sm hover:shadow-md transition text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 bg-sky-50 flex items-center justify-center p-2 group-hover:scale-108 transition duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-primary transition truncate m-0">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {cat.itemCount} sản phẩm
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategorySlider;
