# FE SeaBottle - Thông Điệp Trong Chai 🌊

[![Run Tests](https://github.com/YOUR_USERNAME/FE_seaBottle/actions/workflows/test.yml/badge.svg)](https://github.com/YOUR_USERNAME/FE_seaBottle/actions/workflows/test.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=coverage)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=bugs)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)

Ứng dụng mobile cho phép người dùng viết và gửi thông điệp theo sóng biển.

## 📱 Tính năng

- ✍️ Viết thông điệp cảm xúc
- 🌊 Thả chai theo sóng biển
- 🔍 Dạo biển tìm chai
- 📖 Đọc thông điệp từ người lạ

## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình Environment

```bash
cp .env.example .env
```

### 3. Chạy ứng dụng

```bash
npm start  # Tự động mở Android Emulator
```

## 🧪 Testing

```bash
npm test                # Chạy tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

**Test Coverage**: 79.24% ✅

Xem chi tiết: [TESTING.md](TESTING.md)

## 📁 Cấu trúc dự án

```
FE_seaBottle/
├── src/
│   ├── screens/          # Màn hình
│   │   └── __tests__/   # Tests
│   ├── components/       # Components
│   ├── navigation/       # Navigation
│   └── utils/           # Utilities
├── .github/workflows/    # CI/CD
└── App.tsx              # Entry point
```

## 🛠️ Tech Stack

- React Native + Expo
- TypeScript
- React Navigation
- Jest + Testing Library
- GitHub Actions
- SonarCloud

## 📊 CI/CD

- **GitHub Actions**: Auto test on push/PR
- **SonarCloud**: Code quality analysis
- **Coverage Reports**: Automatic upload

## 🎯 Roadmap

- [x] Core UI & Navigation
- [x] Testing infrastructure
- [x] CI/CD pipeline
- [ ] API integration
- [ ] User authentication
- [ ] Advanced features

## 📖 Documentation

- [Testing Guide](TESTING.md)
- Setup SonarCloud: See [sonar-project.properties](sonar-project.properties)

## 🤝 Contributing

1. Fork the project
2. Create feature branch
3. Write tests
4. Submit PR

---

**Note**: Replace `YOUR_USERNAME` and `YOUR_PROJECT_KEY` với thông tin thật trong badges.
