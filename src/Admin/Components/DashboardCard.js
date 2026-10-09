import React from 'react';
import { IoTrendingUpOutline, IoTrendingDownOutline } from 'react-icons/io5';

const DashboardCard = ({ title, value, delta, isPositive = true, icon, colorClass = 'text-primary bg-sky-50' }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          {title}
        </span>
        <h3 className="text-2xl font-extrabold text-slate-800 m-0">
          {value}
        </h3>
        {delta && (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span
              className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}
            >
              {isPositive ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
              {delta}
            </span>
            <span className="text-slate-400 font-normal text-[11px]">so với tháng trước</span>
          </div>
        )}
      </div>

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
