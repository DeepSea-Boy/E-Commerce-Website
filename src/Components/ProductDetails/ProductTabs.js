import React, { useState } from 'react';
import { Tabs, Tab, Rating, TextField, Button } from '@mui/material';
import { IoCheckmarkCircleOutline, IoStar, IoSend } from 'react-icons/io5';

const defaultReviews = [
  {
    name: 'Hoàng Minh Tuấn',
    rating: 5,
    date: '04/10/2026',
    comment: 'Sản phẩm đóng gói rất kỹ càng, giao hàng hỏa tốc trong 2 tiếng tại TP.HCM. Máy dùng cực mượt, đúng mô tả chính hãng 100%!'
  },
  {
    name: 'Phạm Thị Thảo',
    rating: 5,
    date: '28/09/2026',
    comment: 'Màu sắc bên ngoài đẹp hơn trong ảnh rất nhiều. Đội ngũ tư vấn nhiệt tình, có voucher giảm giá rất hời.'
  }
];

const ProductTabs = ({ product }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [reviews, setReviews] = useState(defaultReviews);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([
        {
          name: newReview.name,
          rating: newReview.rating,
          date: 'Hôm nay',
          comment: newReview.comment
        },
        ...reviews
      ]);
      setNewReview({ name: '', rating: 5, comment: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-8">
      <Tabs
        value={tabIndex}
        onChange={(e, val) => setTabIndex(val)}
        textColor="primary"
        indicatorColor="primary"
        className="border-b border-slate-200"
      >
        <Tab label={<span className="font-bold text-xs">Mô tả sản phẩm</span>} />
        <Tab label={<span className="font-bold text-xs">Thông số kỹ thuật</span>} />
        <Tab label={<span className="font-bold text-xs">Đánh giá ({reviews.length})</span>} />
      </Tabs>

      {/* Tab 0: Description */}
      {tabIndex === 0 && (
        <div className="py-6 space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-800 text-sm">
            {product.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <IoCheckmarkCircleOutline className="text-emerald-500 text-lg shrink-0" />
              <span>Chính hãng 100% nguyên seal, đầy đủ hóa đơn VAT</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <IoCheckmarkCircleOutline className="text-emerald-500 text-lg shrink-0" />
              <span>Bảo hành điện tử 12 tháng tại các trung tâm ủy quyền toàn quốc</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <IoCheckmarkCircleOutline className="text-emerald-500 text-lg shrink-0" />
              <span>Giao hàng hỏa tốc trong 2 giờ nội thành Hà Nội & TP.HCM</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <IoCheckmarkCircleOutline className="text-emerald-500 text-lg shrink-0" />
              <span>Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Specs */}
      {tabIndex === 1 && (
        <div className="py-6">
          <div className="border border-slate-200 rounded-xl overflow-hidden max-w-2xl">
            {product.specs ? (
              Object.entries(product.specs).map(([key, val], idx) => (
                <div
                  key={idx}
                  className={`flex text-xs py-3 px-4 ${
                    idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                  }`}
                >
                  <span className="w-1/3 font-bold text-slate-700">{key}</span>
                  <span className="w-2/3 text-slate-600">{val}</span>
                </div>
              ))
            ) : (
              <p className="p-4 text-xs text-slate-400">Thông số kỹ thuật đang được cập nhật.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Reviews */}
      {tabIndex === 2 && (
        <div className="py-6 space-y-8">
          {/* Review List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Khách hàng đánh giá ({reviews.length})
            </h4>
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{rev.name}</span>
                    <Rating value={rev.rating} size="small" readOnly />
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
                <p className="text-xs text-slate-600 m-0">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Viết nhận xét của bạn
            </h4>
            {submitted && (
              <div className="mb-3 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-semibold">
                Cảm ơn bạn đã gửi đánh giá! Nhận xét của bạn đã được ghi nhận.
              </div>
            )}
            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600">Đánh giá số sao:</span>
                <Rating
                  value={newReview.rating}
                  onChange={(e, val) => setNewReview({ ...newReview, rating: val })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextField
                  fullWidth
                  size="small"
                  label="Họ và tên của bạn"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />
              </div>

              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Nội dung đánh giá sản phẩm (tối thiểu 10 ký tự)..."
                required
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<IoSend className="text-sm" />}
                className="font-bold text-xs py-2 px-5"
              >
                Gửi đánh giá
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
