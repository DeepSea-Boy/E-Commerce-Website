import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { salesAnalyticsData } from '../../data/mockData';

const AnalyticsCharts = () => {
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800 m-0">
            Biểu đồ Phân tích Doanh thu & Đơn hàng 2026
          </h3>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Dữ liệu tăng trưởng doanh số theo tháng (triệu VNĐ)
          </p>
        </div>

        {/* Toggle Line / Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${
              chartType === 'line'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Biểu đồ Đường (Line)
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${
              chartType === 'bar'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Biểu đồ Cột (Bar)
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={salesAnalyticsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `${val}M`} />
              <Tooltip
                formatter={(val, name) => [
                  name === 'revenue' ? `${val.toLocaleString()} triệu VNĐ` : `${val} đơn`,
                  name === 'revenue' ? 'Doanh thu' : 'Số đơn hàng'
                ]}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Legend formatter={(value) => (value === 'revenue' ? 'Doanh thu (Triệu VNĐ)' : 'Số lượng đơn hàng')} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2bbef9"
                strokeWidth={3}
                dot={{ r: 4, fill: '#2bbef9' }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#ed174a"
                strokeWidth={2}
                dot={{ r: 3, fill: '#ed174a' }}
              />
            </LineChart>
          ) : (
            <BarChart data={salesAnalyticsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `${val}M`} />
              <Tooltip
                formatter={(val, name) => [
                  name === 'revenue' ? `${val.toLocaleString()} triệu VNĐ` : `${val} đơn`,
                  name === 'revenue' ? 'Doanh thu' : 'Số đơn hàng'
                ]}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend formatter={(value) => (value === 'revenue' ? 'Doanh thu (Triệu VNĐ)' : 'Số lượng đơn hàng')} />
              <Bar dataKey="revenue" fill="#2bbef9" radius={[6, 6, 0, 0]} />
              <Bar dataKey="orders" fill="#ed174a" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
