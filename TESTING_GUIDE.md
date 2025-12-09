# Hướng Dẫn Chạy Tests Locally

## 🚀 Quick Start

### 1. Cài đặt dependencies (chỉ lần đầu)
```bash
npm install
```

### 2. Chạy tests
```bash
# Chạy tất cả tests
npm test

# Chạy với coverage report
npm run test:coverage

# Chạy watch mode (tự động re-run khi code thay đổi)
npm run test:watch
```

## 📊 Xem Coverage Report

Sau khi chạy `npm run test:coverage`, mở file HTML:

**Windows:**
```bash
start coverage/lcov-report/index.html
```

**Mac/Linux:**
```bash
open coverage/lcov-report/index.html
```

## ✅ Expected Results

```
Test Suites: 6 passed, 6 total
Tests:       42 passed, 42 total
Coverage:    79.24% ✅
```

### Coverage Breakdown:
- **Statements**: 79.24%
- **Functions**: 81.81%
- **Lines**: 83.67%

## 📝 Test Files

```
src/screens/__tests__/
├── HomeScreen.test.tsx         (9 tests)
├── WriteMessageScreen.test.tsx (11 tests)
├── ReadMessageScreen.test.tsx  (10 tests)
├── FoundBottleScreen.test.tsx  (7 tests)
└── WaitingScreen.test.tsx      (3 tests)

App.test.tsx                    (2 tests)
```

## 🐛 Troubleshooting

### Lỗi: "Cannot find module"
```bash
npm install
npm test -- --clearCache
```

### Tests chạy chậm
```bash
npm test -- --maxWorkers=2
```

### Muốn chạy 1 file test cụ thể
```bash
npm test -- HomeScreen.test.tsx
```

## 📈 Coverage Goals

- ✅ **Minimum**: 70%
- 🎯 **Target**: 80%
- 🏆 **Excellent**: 90%+

## 📦 Test Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Chạy tất cả tests |
| `npm run test:coverage` | Chạy tests + coverage report |
| `npm run test:watch` | Watch mode |

---

**Thời gian chạy**: ~4-5 giây
**Coverage hiện tại**: 79.24% ✅
