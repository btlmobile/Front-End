# FE SeaBottle - Thông Điệp Trong Chai

Ứng dụng mobile cho phép người dùng viết và gửi thông điệp theo sóng biển.

## Cài đặt

```bash
npm install
```

## Cấu hình Environment Variables

1. Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Cập nhật các giá trị trong file `.env` theo môi trường của bạn

## Chạy ứng dụng

### Tự động mở Android Emulator (Khuyến nghị)
```bash
npm start
```

### Chỉ khởi động dev server
```bash
npm run dev
```

### Chạy trên các nền tảng khác
```bash
npm run ios      # iOS Simulator
npm run web      # Web Browser
npm run android  # Android Emulator
```

## Cấu trúc thư mục

```
FE_seaBottle/
├── src/
│   ├── screens/        # Các màn hình
│   ├── components/     # Các component tái sử dụng
│   ├── navigation/     # Cấu hình navigation
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   └── constants/      # Constants (colors, configs, etc.)
├── asset/
│   └── image/         # Hình ảnh
├── .env               # Biến môi trường (không commit)
├── .env.example       # Mẫu biến môi trường
├── App.tsx            # Entry point
├── app.json           # Cấu hình Expo
├── babel.config.js    # Cấu hình Babel
└── package.json       # Dependencies
```

## Sử dụng Environment Variables

```typescript
import { API_URL, DEBUG } from '@env';

console.log('API URL:', API_URL);
console.log('Debug mode:', DEBUG);
```

## Scripts

| Command | Mô tả |
|---------|-------|
| `npm start` | Tự động mở Android emulator |
| `npm run dev` | Chỉ khởi động server |
| `npm run android` | Mở Android emulator |
| `npm run ios` | Mở iOS simulator |
| `npm run web` | Mở web browser |

## Công nghệ sử dụng

- React Native
- Expo
- React Navigation
- TypeScript
