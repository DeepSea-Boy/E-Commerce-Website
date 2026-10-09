import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoFlame } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    tag: 'SIÊU PHẨM CÔNG NGHỆ 2026',
    title: 'iPhone 16 Pro Max Titan Tự Nhiên',
    desc: 'Chip A18 Pro mạnh mẽ đỉnh cao. Khung viền titan chuẩn hàng không vũ trụ cùng camera tele 5x siêu nét.',
    price: 'Chỉ từ 34.990.000đ',
    badge: 'Giảm ngay 2.000.000đ',
    link: '/products',
    bgGradient: 'from-slate-900 via-slate-800 to-indigo-950',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
  },
  {
    tag: 'ĐỒ HỌA & LẬP TRÌNH CHUYÊN NGHIỆP',
    title: 'MacBook Pro 14 M3 Pro Cực Mạnh',
    desc: 'Hiệu năng đồ họa đột phá với Hardware Ray Tracing, màn hình Liquid Retina XDR 120Hz 1600 nits siêu thực.',
    price: 'Chỉ từ 48.900.000đ',
    badge: 'Tặng kèm phụ kiện 1.5M',
    link: '/products',
    bgGradient: 'from-gray-900 via-zinc-800 to-slate-900',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
  },
  {
    tag: 'SMART HOME IOT ECOSYSTEM',
    title: 'Giải Pháp Nhà Thông Minh IoT Toàn Diện',
    desc: 'Hệ thống Camera AI 4K, đèn thông minh Zigbee và khóa cửa sinh trắc học bảo vệ gia đình bạn 24/7.',
    price: 'Combo ưu đãi -25%',
    badge: 'Hot Trend',
    link: '/products',
    bgGradient: 'from-blue-950 via-slate-900 to-teal-950',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
  }
];

const HeroSlider = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-[420px] lg:h-[460px]"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className={`w-full h-full bg-gradient-to-r ${s.bgGradient} text-white flex items-center p-8 lg:p-14 relative`}>
              <div className="max-w-xl z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <IoFlame className="text-rose-400" />
                  <span>{s.tag}</span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white m-0">
                  {s.title}
                </h1>

                <p className="text-xs lg:text-sm text-slate-300 leading-relaxed max-w-md">
                  {s.desc}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xl lg:text-2xl font-bold text-sky-400">{s.price}</span>
                  <span className="bg-amber-400/20 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded border border-amber-400/30">
                    {s.badge}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    to={s.link}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-md shadow-sky-500/20"
                  >
                    <span>Khám phá ngay</span>
                    <IoArrowForward className="text-sm" />
                  </Link>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="hidden md:flex absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-80 lg:w-96 h-80 items-center justify-center">
                <img
                  src={s.image}
                  alt={s.title}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
