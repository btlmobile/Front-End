# Testing Guide - FE SeaBottle

## 📋 Tổng quan

Dự án này sử dụng **Jest** và **React Native Testing Library** để viết unit tests cho React Native components.

## ✅ Test Coverage

```
Test Suites: 2 passed, 2 total
Tests:       11 passed, 11 total
Coverage:    37.73% (đang tiếp tục cải thiện)
```

### Coverage chi tiết:

| File | % Stmts | % Branch | % Funcs | % Lines |
|------|---------|----------|---------|---------|
| App.tsx | 100% | 100% | 100% | 100% |
| HomeScreen.tsx | 100% | 100% | 100% | 100% |
| Các screens khác | Đang phát triển... |

## 🚀 Chạy Tests

### Chạy tất cả tests
```bash
npm test
```

### Chạy tests với watch mode
```bash
npm run test:watch
```

### Chạy tests với coverage
```bash
npm run test:coverage
```

## 📁 Cấu trúc Test Files

```
FE_seaBottle/
├── src/
│   └── screens/
│       ├── __tests__/
│       │   └── HomeScreen.test.tsx     # Tests cho HomeScreen
│       └── HomeScreen.tsx
├── App.test.tsx                         # Tests cho App component
├── jest.setup.js                        # Jest configuration
└── package.json                         # Test scripts & Jest config
```

## 🧪 Ví dụ Test Case

### HomeScreen.test.tsx

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  it('should render title correctly', () => {
    const { getByText } = render(<HomeScreen {...mockProps} />);
    expect(getByText('Thông Điệp Trong Chai')).toBeTruthy();
  });

  it('should navigate when button pressed', () => {
    const { getByText } = render(<HomeScreen {...mockProps} />);
    fireEvent.press(getByText('Viết thư'));
    expect(mockNavigate).toHaveBeenCalledWith('WriteMessage');
  });
});
```

## 🔧 Cấu hình

### package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage --watchAll=false"
  },
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*)"
    ],
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "App.tsx",
      "!**/*.d.ts",
      "!**/node_modules/**"
    ]
  }
}
```

### jest.setup.js

```javascript
// Mocks cho utilities và styles
jest.mock('./src/utils/scaling', () => ({
  scale: (size) => size,
  verticalScale: (size) => size,
  moderateScale: (size) => size,
}));

jest.mock('./src/styles/common', () => ({
  commonStyles: {
    container: { flex: 1 },
    background: { flex: 1 },
  },
}));
```

## 📊 Test Cases hiện tại

### App.tsx (2 tests)
- ✅ Render without crashing
- ✅ Render NavigationContainer

### HomeScreen.tsx (9 tests)
- ✅ Render without crashing
- ✅ Display title correctly
- ✅ Display subtitle correctly
- ✅ Render "Viết thư" button
- ✅ Render "Dạo biển" button
- ✅ Navigate to WriteMessage screen
- ✅ Navigate to Waiting screen
- ✅ Render background image
- ✅ Have correct button styles

## 🎯 Roadmap

### Phase 1: Core Screens (Completed ✅)
- [x] HomeScreen
- [x] App.tsx

### Phase 2: Other Screens (In Progress 🚧)
- [ ] WriteMessageScreen
- [ ] ReadMessageScreen
- [ ] WaitingScreen
- [ ] FoundBottleScreen

### Phase 3: Components (Planned 📝)
- [ ] MessageLayout component
- [ ] Navigation tests
- [ ] Utils tests

## 📚 Tài liệu tham khảo

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Best Practices](https://github.com/testing-library/react-testing-library)

## 💡 Tips

1. **Luôn test user interactions**: Tập trung vào những gì user thấy và làm
2. **Sử dụng testID**: Thêm `testID` prop cho các elements quan trọng
3. **Mock dependencies**: Mock các external dependencies để tests chạy nhanh hơn
4. **Coverage không phải là mọi thứ**: 100% coverage không có nghĩa là code perfect

## 🐛 Troubleshooting

### Lỗi: Cannot find module
```bash
# Clear Jest cache
npm test -- --clearCache
```

### Lỗi: Transform errors
```bash
# Kiểm tra transformIgnorePatterns trong package.json
# Thêm package bị lỗi vào danh sách ignore
```

## 📞 Hỗ trợ

Nếu gặp vấn đề với tests, vui lòng:
1. Check Jest cache: `npm test -- --clearCache`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Kiểm tra version compatibility giữa React, React Native, và testing libraries
