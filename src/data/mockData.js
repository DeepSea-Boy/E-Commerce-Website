import { categoriesData } from './categoriesData';
import { productsData } from './productsData';

export const usersData = [
  {
    id: 'usr-customer-1',
    name: 'Nguyễn Văn An',
    email: 'customer@example.com',
    password: 'password123',
    phone: '0988123456',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    createdAt: '2025-01-15',
    addresses: [
      {
        id: 'addr-1',
        isDefault: true,
        name: 'Nguyễn Văn An',
        phone: '0988123456',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        street: '123 Đường Lê Lợi, Tòa nhà Bitexco'
      },
      {
        id: 'addr-2',
        isDefault: false,
        name: 'Văn An (Văn phòng)',
        phone: '0988123456',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 7',
        ward: 'Tân Phong',
        street: 'Tòa nhà Landmark 81, P.22, Bình Thạnh'
      }
    ]
  },
  {
    id: 'usr-admin-1',
    name: 'Administrator Lead',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '0909999888',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    createdAt: '2024-10-01',
    addresses: []
  }
];

export const ordersData = [
  {
    id: 'ORD-7821',
    customerName: 'Nguyễn Văn An',
    customerEmail: 'customer@example.com',
    customerPhone: '0988123456',
    date: '2026-10-08',
    status: 'Confirmed',
    paymentMethod: 'COD',
    paymentStatus: 'Chưa thanh toán (COD)',
    shippingAddress: '123 Đường Lê Lợi, Bến Nghé, Quận 1, TP. HCM',
    items: [
      {
        productId: 'prod-1',
        name: 'iPhone 16 Pro Max 256GB - Titan Tự Nhiên',
        price: 34990000,
        quantity: 1,
        selectedVariant: 'RAM 8GB / 256GB / Titan Tự Nhiên',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 34990000,
    shippingFee: 0,
    discountAmount: 1000000,
    total: 33990000
  },
  {
    id: 'ORD-7819',
    customerName: 'Trần Thị Thu Hà',
    customerEmail: 'thuha.tran@example.com',
    customerPhone: '0912345678',
    date: '2026-10-07',
    status: 'Delivered',
    paymentMethod: 'Chuyển khoản QR',
    paymentStatus: 'Đã thanh toán',
    shippingAddress: '45 Hai Bà Trưng, Hoàn Kiếm, Hà Nội',
    items: [
      {
        productId: 'prod-4',
        name: 'Tai nghe Chống ồn Sony WH-1000XM5 Hi-Res',
        price: 6990000,
        quantity: 1,
        selectedVariant: 'Đen Midnight',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 6990000,
    shippingFee: 30000,
    discountAmount: 0,
    total: 7020000
  },
  {
    id: 'ORD-7815',
    customerName: 'Lê Hoàng Nam',
    customerEmail: 'nam.le@example.com',
    customerPhone: '0933445566',
    date: '2026-10-06',
    status: 'Pending',
    paymentMethod: 'COD',
    paymentStatus: 'Chờ giao hàng thu tiền',
    shippingAddress: '88 Nguyễn Huệ, Phường 1, TP. Vũng Tàu',
    items: [
      {
        productId: 'prod-7',
        name: 'Bàn phím cơ Custom Gaming Không Dây QK75',
        price: 3450000,
        quantity: 1,
        selectedVariant: 'Anodized Grey',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 3450000,
    shippingFee: 40000,
    discountAmount: 0,
    total: 3490000
  }
];

export const blogsData = [
  {
    id: 'blog-1',
    title: 'Đánh giá chi tiết iPhone 16 Pro Max sau 1 tháng trải nghiệm thực tế',
    date: '05 Tháng 10, 2026',
    author: 'Tech Review Team',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    summary: 'Nút Camera Control có thực sự tiện lợi như quảng cáo? Khung viền titan có chống xước tốt hơn thế hệ tiền nhiệm?'
  },
  {
    id: 'blog-2',
    title: 'Top 5 bàn phím cơ Custom đáng mua nhất dành cho dân văn phòng và lập trình',
    date: '02 Tháng 10, 2026',
    author: 'Gear Master',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    summary: 'Cảm giác gõ phím êm tai không làm phiền đồng nghiệp xung quanh với switch linear được lube sẵn chuẩn factory.'
  },
  {
    id: 'blog-3',
    title: 'Xu hướng nhà thông minh IoT năm 2026: Giao thức Matter lên ngôi',
    date: '28 Tháng 09, 2026',
    author: 'Smart Home Guru',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    summary: 'Kết nối mọi thiết bị từ Apple HomeKit, Google Home đến Home Assistant không còn rào cản nhờ chuẩn Matter.'
  }
];

export const locationsData = [
  'Việt Nam - TP. Hồ Chí Minh',
  'Việt Nam - Hà Nội',
  'Việt Nam - Đà Nẵng',
  'Việt Nam - Cần Thơ',
  'Việt Nam - Hải Phòng',
  'Singapore',
  'Hoa Kỳ (United States)',
  'Nhật Bản (Japan)'
];

export const couponsData = [
  { code: 'DISCOUNT10', percent: 10, desc: 'Giảm 10% tối đa 1.000.000đ' },
  { code: 'FREESHIP', amount: 30000, desc: 'Miễn phí vận chuyển toàn quốc' },
  { code: 'VIP2026', percent: 15, desc: 'Ưu đãi thành viên VIP 15%' }
];

export const salesAnalyticsData = [
  { month: 'Tháng 1', revenue: 450, orders: 120 },
  { month: 'Tháng 2', revenue: 520, orders: 135 },
  { month: 'Tháng 3', revenue: 610, orders: 160 },
  { month: 'Tháng 4', revenue: 580, orders: 150 },
  { month: 'Tháng 5', revenue: 720, orders: 190 },
  { month: 'Tháng 6', revenue: 850, orders: 220 },
  { month: 'Tháng 7', revenue: 790, orders: 205 },
  { month: 'Tháng 8', revenue: 940, orders: 245 },
  { month: 'Tháng 9', revenue: 1050, orders: 280 },
  { month: 'Tháng 10', revenue: 1180, orders: 310 }
];

export { categoriesData, productsData };
