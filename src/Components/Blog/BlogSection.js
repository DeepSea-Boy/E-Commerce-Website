import React from 'react';
import { Link } from 'react-router-dom';
import { IoCalendarOutline, IoPersonOutline, IoArrowForward } from 'react-icons/io5';
import { blogsData } from '../../data/mockData';

const BlogSection = () => {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-800 m-0">
            Tin tức & Công nghệ mới nhất
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Cập nhật xu hướng, mẹo công nghệ và hướng dẫn sử dụng sản phẩm
          </p>
        </div>
        <Link to="/blog" className="text-xs font-bold text-primary hover:underline">
          Đọc tất cả bài viết →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogsData.map((blog) => (
          <article
            key={blog.id}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/50 shadow-sm hover:shadow-md transition flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <IoCalendarOutline />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoPersonOutline />
                    {blog.author}
                  </span>
                </div>

                <h3 className="text-xs lg:text-sm font-bold text-slate-800 group-hover:text-primary transition line-clamp-2 leading-snug mb-2">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {blog.summary}
                </p>
              </div>

              <div>
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition"
                >
                  <span>Đọc tiếp</span>
                  <IoArrowForward className="text-xs" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
