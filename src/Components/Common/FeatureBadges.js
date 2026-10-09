import React from 'react';
import { IoRocketOutline, IoReloadOutline, IoHeadsetOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const FeatureBadges = () => {
  const features = [
    {
      icon: <IoRocketOutline className="text-3xl text-primary" />,
      title: 'Miễn phí vận chuyển',
      desc: 'Cho tất cả đơn hàng trên 5.000.000đ'
    },
    {
      icon: <IoReloadOutline className="text-3xl text-primary" />,
      title: 'Đổi trả trong 30 ngày',
      desc: '100% hoàn tiền nếu sản phẩm lỗi'
    },
    {
      icon: <IoHeadsetOutline className="text-3xl text-primary" />,
      title: 'Hỗ trợ khách hàng 24/7',
      desc: 'Giải đáp tận tình mọi lúc mọi nơi'
    },
    {
      icon: <IoShieldCheckmarkOutline className="text-3xl text-primary" />,
      title: 'Thanh toán bảo mật',
      desc: 'Được chứng nhận an toàn 100%'
    }
  ];

  return (
    <section className="py-8 bg-white border-y border-slate-200">
      <div className="container-fluid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-0.5">{item.title}</h4>
                <p className="text-[11px] text-slate-500 m-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBadges;
