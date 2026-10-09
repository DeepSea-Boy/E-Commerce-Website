export const productsData = [
  {
    id: 'prod-1',
    name: 'iPhone 16 Pro Max 256GB - Titan Tự Nhiên',
    slug: 'iphone-16-pro-max-256gb',
    category: 'Điện thoại & Phụ kiện',
    categoryId: 'cat-1',
    subCategory: 'Smartphone cao cấp',
    brand: 'Apple',
    price: 34990000,
    oldPrice: 36990000,
    discountPercent: 5,
    rating: 4.9,
    reviewCount: 128,
    stock: 24,
    isBestSeller: true,
    isLatest: true,
    badge: 'Hot',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      ram: ['8GB'],
      storage: ['256GB', '512GB', '1TB'],
      size: ['6.9 inch Super Retina XDR'],
      weight: ['227g'],
      colors: ['Titan Tự Nhiên', 'Titan Sa Mạc', 'Titan Đen', 'Titan Trắng']
    },
    specs: {
      'Màn hình': '6.9 inch OLED 120Hz ProMotion',
      'Chipset': 'Apple A18 Pro 3nm cực mạnh',
      'Camera sau': '48MP Chính + 48MP Siêu rộng + 12MP Tele 5x',
      'Pin': 'Hỗ trợ sạc nhanh MagSafe 25W, xem video 33 giờ',
      'Hệ điều hành': 'iOS 18 với Apple Intelligence'
    },
    shortDescription: 'Siêu phẩm mới nhất từ Apple với khung titan chuẩn hàng không vũ trụ, chip A18 Pro và nút điều khiển Camera mới.',
    description: 'iPhone 16 Pro Max sở hữu màn hình lớn nhất từ trước đến nay với viền mỏng ấn tượng. Thiết kế titan chuẩn hàng không vũ trụ bền bỉ và nhẹ hơn, đồng thời hệ thống camera chuyên nghiệp 48MP mang lại chất lượng quay chụp đẳng cấp Hollywood.'
  },
  {
    id: 'prod-2',
    name: 'MacBook Pro 14 M3 Pro (18GB RAM / 512GB SSD)',
    slug: 'macbook-pro-14-m3-pro',
    category: 'Máy tính & Laptop',
    categoryId: 'cat-2',
    subCategory: 'Laptop Gaming & Đồ họa',
    brand: 'Apple',
    price: 48900000,
    oldPrice: 52900000,
    discountPercent: 8,
    rating: 4.8,
    reviewCount: 64,
    stock: 15,
    isBestSeller: true,
    isLatest: false,
    badge: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      ram: ['18GB', '36GB'],
      storage: ['512GB', '1TB'],
      size: ['14.2 inch Liquid Retina XDR'],
      weight: ['1.61kg'],
      colors: ['Space Black', 'Silver']
    },
    specs: {
      'CPU': '11-core CPU M3 Pro',
      'GPU': '14-core GPU với Hardware Ray Tracing',
      'Màn hình': 'Mini-LED 120Hz độ sáng 1600 nits đỉnh',
      'Cổng kết nối': '3x Thunderbolt 4, HDMI, MagSafe 3, SD Card',
      'Thời lượng pin': 'Lên tới 18 giờ liên tục'
    },
    shortDescription: 'Cỗ máy trạm di động vượt trội cho lập trình viên, nhà sáng tạo nội dung và kỹ sư đồ họa.',
    description: 'MacBook Pro 14 inch tích hợp chip M3 Pro mang lại hiệu năng phi thường trong một thiết kế nhỏ gọn, tản nhiệt êm ái cùng màn hình Liquid Retina XDR đẹp nhất thế giới máy tính xách tay.'
  },
  {
    id: 'prod-3',
    name: 'Samsung Galaxy S24 Ultra 5G AI Phone',
    slug: 'samsung-galaxy-s24-ultra',
    category: 'Điện thoại & Phụ kiện',
    categoryId: 'cat-1',
    subCategory: 'Smartphone cao cấp',
    brand: 'Samsung',
    price: 29990000,
    oldPrice: 33990000,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 92,
    stock: 30,
    isBestSeller: false,
    isLatest: true,
    badge: 'AI Powered',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      ram: ['12GB'],
      storage: ['256GB', '512GB'],
      size: ['6.8 inch QHD+ Dynamic AMOLED 2X'],
      weight: ['232g'],
      colors: ['Titan Xám', 'Titan Đen', 'Titan Tím', 'Titan Vàng']
    },
    specs: {
      'Màn hình': '6.8 inch phẳng kính Corning Gorilla Armor chống chói',
      'Chipset': 'Snapdragon 8 Gen 3 for Galaxy',
      'Bút cảm ứng': 'S-Pen tích hợp sẵn',
      'Camera': '200MP + Zoom quang học AI 100x Space Zoom'
    },
    shortDescription: 'Kỷ nguyên quyền năng Galaxy AI với trợ lý tìm kiếm khoanh tròn, dịch thuật trực tiếp và bút S-Pen huyền thoại.',
    description: 'Galaxy S24 Ultra mở ra kỷ nguyên mới của trí tuệ nhân tạo di động. Kính chống lóa cao cấp giúp nhìn rõ ngoài trời nắng gắt kết hợp camera 200MP siêu chi tiết.'
  },
  {
    id: 'prod-4',
    name: 'Tai nghe Chống ồn Sony WH-1000XM5 Hi-Res',
    slug: 'sony-wh-1000xm5',
    category: 'Âm thanh & Tai nghe Pro',
    categoryId: 'cat-5',
    subCategory: 'Loa Bluetooth & Soundbar',
    brand: 'Sony',
    price: 6990000,
    oldPrice: 8490000,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 88,
    stock: 18,
    isBestSeller: true,
    isLatest: false,
    badge: 'Hot',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      ram: ['N/A'],
      size: ['Over-Ear Foam mềm mại'],
      weight: ['250g'],
      colors: ['Đen Midnight', 'Bạc Platinum', 'Xanh Khói']
    },
    specs: {
      'Chống ồn': 'Bộ xử lý tích hợp V1 và HD QN1 với 8 micro',
      'Thời lượng pin': '30 giờ bật ANC, sạc nhanh 3 phút nghe 3 giờ',
      'Driver': '30mm màng carbon nhẹ và cứng cáp',
      'Chuẩn kết nối': 'Bluetooth 5.2, LDAC Hi-Res Wireless'
    },
    shortDescription: 'Tai nghe chống ồn chủ động hàng đầu thế giới với công nghệ khử ồn AI và âm thanh chuẩn audiophile.',
    description: 'Sony WH-1000XM5 định nghĩa lại tiêu chuẩn chống ồn với 2 vi xử lý điều khiển 8 micro, mang lại không gian tĩnh lặng tuyệt đối cho công việc và tận hưởng âm nhạc.'
  },
  {
    id: 'prod-5',
    name: 'Apple Watch Ultra 2 GPS + Cellular 49mm',
    slug: 'apple-watch-ultra-2',
    category: 'Đồng hồ thông minh & Smartwear',
    categoryId: 'cat-4',
    subCategory: 'Apple Watch & Wear OS',
    brand: 'Apple',
    price: 21490000,
    oldPrice: 22990000,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 45,
    stock: 12,
    isBestSeller: false,
    isLatest: true,
    badge: 'Titanium',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      size: ['49mm Vỏ Titan'],
      weight: ['61.4g'],
      colors: ['Dây Alpine Xanh', 'Dây Trail Đen', 'Dây Ocean Cam']
    },
    specs: {
      'Màn hình': 'OLED độ sáng 3000 nits nhìn rõ dưới biển',
      'Kháng nước': 'Độ sâu 100m, chứng nhận lặn EN13319',
      'Pin': '36 giờ sử dụng thông thường, 72 giờ chế độ tiết kiệm'
    },
    shortDescription: 'Đồng hồ thể thao chuyên nghiệp mạnh mẽ nhất, chế tác từ titan cho những nhà thám hiểm thực thụ.',
    description: 'Với chip S9 SiP tiên tiến và thao tác chạm hai lần chạm ma thuật (Double Tap), Apple Watch Ultra 2 là người bạn đồng hành không thể thiếu cho các môn thể thao mạo hiểm.'
  },
  {
    id: 'prod-6',
    name: 'Camera AI Thông Minh Kháng Nước Ngoài Trời 4K',
    slug: 'camera-ai-thong-minh-4k',
    category: 'Thiết bị Smart Home & IoT',
    categoryId: 'cat-3',
    subCategory: 'Camera & An ninh',
    brand: 'Aqara / Xiaomi',
    price: 1850000,
    oldPrice: 2290000,
    discountPercent: 19,
    rating: 4.7,
    reviewCount: 53,
    stock: 50,
    isBestSeller: true,
    isLatest: false,
    badge: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      storage: ['Hỗ trợ thẻ 256GB / Cloud'],
      size: ['Chuẩn IP67 chống nước mưa'],
      weight: ['380g'],
      colors: ['Trắng Arctic']
    },
    specs: {
      'Độ phân giải': '4K UHD HDR Siêu nét ban đêm có màu',
      'AI thông minh': 'Nhận diện người, thú cưng, xe và bưu kiện',
      'Góc quan sát': 'Xoay 360 độ điều khiển qua Smartphone'
    },
    shortDescription: 'Bảo vệ ngôi nhà bạn 24/7 với camera AI nhận diện khuôn mặt và cảnh báo còi hú thông minh.',
    description: 'Camera an ninh IoT thế hệ mới tích hợp chip AI phân tích hành vi tại biên, loại bỏ 99% báo động giả do lá cây hay bóng râm.'
  },
  {
    id: 'prod-7',
    name: 'Bàn phím cơ Custom Gaming Không Dây QK75',
    slug: 'ban-phim-co-gaming-qk75',
    category: 'Máy tính & Laptop',
    categoryId: 'cat-2',
    subCategory: 'Linh kiện PC & Màn hình',
    brand: 'Keychron',
    price: 3450000,
    oldPrice: 3890000,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 76,
    stock: 22,
    isBestSeller: false,
    isLatest: true,
    badge: 'Custom',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      size: ['Layout 75% gọn gàng có núm xoay'],
      weight: ['1.45kg vỏ nhôm CNC đầm chắc'],
      colors: ['Anodized Grey', 'E-White', 'Navy Blue']
    },
    specs: {
      'Switch': 'Linear Gateron Oil King bôi trơn sẵn',
      'Kết nối': '3 chế độ: Type-C, Bluetooth 5.1, Wireless 2.4GHz',
      'Keycap': 'PBT Double-shot Cherry Profile chống bóng'
    },
    shortDescription: 'Cảm giác gõ phím êm ái, âm thanh "thocky" trầm ấm nhờ cấu trúc Gasket Mount đa tầng foam.',
    description: 'QK75 là kiệt tác bàn phím cơ kết hợp giữa vỏ nhôm nguyên khối và công nghệ cách âm cao cấp, nâng tầm trải nghiệm làm việc và giải trí.'
  },
  {
    id: 'prod-8',
    name: 'Loa Di Động Marshall Stanmore III Bluetooth 5.2',
    slug: 'marshall-stanmore-iii',
    category: 'Âm thanh & Tai nghe Pro',
    categoryId: 'cat-5',
    subCategory: 'Loa Bluetooth & Soundbar',
    brand: 'Marshall',
    price: 8990000,
    oldPrice: 9990000,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 112,
    stock: 14,
    isBestSeller: true,
    isLatest: false,
    badge: 'Vintage',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80'
    ],
    variants: {
      size: ['350 x 203 x 188 mm'],
      weight: ['4.25kg'],
      colors: ['Black Gold Vintage', 'Cream White', 'Brown']
    },
    specs: {
      'Công suất': '80W Class D tràn ngập phòng 40m2',
      'Âm trường': 'Công nghệ Dynamic Loudness điều chỉnh dải âm',
      'Núm chỉnh': 'Đồng thau chỉnh Bass, Treble, Volume analog'
    },
    shortDescription: 'Thiết kế vintage huyền thoại kết hợp chất âm mạnh mẽ, chi tiết từng nốt nhạc rock và acoustic.',
    description: 'Stanmore III mang lại âm thanh đặc trưng của Marshall với âm trường thậm chí còn rộng hơn so với người tiền nhiệm, mang lại trải nghiệm âm thanh gia đình đắm chìm.'
  }
];
