import React, { useState } from 'react';

const ProductGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(images[0] || '');
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${activeImage})`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  return (
    <div className="space-y-4">
      {/* Main image with zoom preview */}
      <div
        className="relative w-full aspect-square bg-white rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-6 cursor-crosshair group shadow-sm"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={activeImage}
          alt="Product detail"
          className="max-h-full max-w-full object-contain select-none"
        />

        {/* Zoom Window Indicator */}
        <div
          className="absolute inset-0 bg-no-repeat bg-[length:220%] pointer-events-none transition-opacity duration-200 rounded-2xl z-20"
          style={zoomStyle}
        />

        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-[10px] font-bold text-slate-500 px-2.5 py-1 rounded-full border border-slate-200 shadow-sm pointer-events-none">
          🔍 Rê chuột để phóng to chi tiết
        </div>
      </div>

      {/* Thumbnails row */}
      <div className="flex gap-3 justify-center overflow-x-auto py-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`w-18 h-18 rounded-xl overflow-hidden border-2 p-1 bg-white transition duration-200 shrink-0 ${
              activeImage === img
                ? 'border-primary ring-2 ring-sky-100'
                : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
