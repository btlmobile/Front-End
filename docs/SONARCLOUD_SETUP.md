# SonarCloud Setup Guide

Hướng dẫn chi tiết để setup SonarCloud cho dự án FE SeaBottle.

## 📋 Prerequisites

- GitHub repository đã được tạo
- Code đã được push lên GitHub
- Account GitHub

## 🚀 Bước 1: Tạo SonarCloud Account

1. Truy cập [sonarcloud.io](https://sonarcloud.io)
2. Click **Log in** → Chọn **With GitHub**
3. Authorize SonarCloud truy cập GitHub account của bạn

## 🎯 Bước 2: Import Project

1. Sau khi đăng nhập, click **Analyze new project**
2. Chọn repository `FE_seaBottle` từ danh sách
3. Click **Set Up**

## 🔑 Bước 3: Lấy Project Key và Organization Key

### Project Key
- Sau khi setup, bạn sẽ thấy **Project Key** trên dashboard
- Ví dụ: `your-username_FE_seaBottle`

### Organization Key
1. Click vào avatar góc phải → **My Organizations**
2. Chọn organization của bạn
3. Vào **Settings** → **Organization**
4. Copy **Key** (thường là username của bạn)

## ⚙️ Bước 4: Cấu hình sonar-project.properties

1. Mở file `sonar-project.properties` trong project
2. Replace các giá trị:

```properties
sonar.projectKey=your-username_FE_seaBottle
sonar.organization=your-username
```

Ví dụ:
```properties
sonar.projectKey=john_doe_FE_seaBottle
sonar.organization=john_doe
```

## 🔐 Bước 5: Tạo SONAR_TOKEN

### Tạo Token trên SonarCloud

1. Vào **My Account** (click avatar)
2. Chọn **Security** tab
3. Trong mục **Generate Tokens**:
   - Name: `FE_seaBottle_GitHub_Actions`
   - Type: **Global Analysis Token**
   - Expiration: Chọn **90 days** hoặc **1 year**
4. Click **Generate**
5. **Copy token ngay** (sẽ không thấy lại được!)

### Thêm Token vào GitHub Secrets

1. Vào GitHub repository của bạn
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Nhập:
   - **Name**: `SONAR_TOKEN`
   - **Value**: Paste token vừa copy
5. Click **Add secret**

## 📝 Bước 6: Cập nhật README Badges

1. Mở file `README.md`
2. Replace các badge URLs:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=YOUR_PROJECT_KEY&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=YOUR_PROJECT_KEY)
```

Thay `YOUR_PROJECT_KEY` bằng project key thật của bạn:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=john_doe_FE_seaBottle&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=john_doe_FE_seaBottle)
```

Tương tự cho các badges khác (Coverage, Bugs, Code Smells).

## 🚦 Bước 7: Push và Kiểm tra

1. Commit và push changes:

```bash
git add .
git commit -m "Setup SonarCloud integration"
git push origin main
```

2. Vào tab **Actions** trong GitHub repository
3. Xem workflow **SonarCloud Analysis** đang chạy
4. Đợi workflow hoàn thành (thường 2-3 phút)

## 📊 Bước 8: Xem Kết quả

1. Vào [sonarcloud.io](https://sonarcloud.io)
2. Click vào project **FE_seaBottle**
3. Xem các metrics:
   - **Quality Gate**: Pass/Fail
   - **Coverage**: % code được test
   - **Bugs**: Số lượng bugs
   - **Code Smells**: Issues về code quality
   - **Security Hotspots**: Vấn đề bảo mật
   - **Duplications**: Code trùng lặp

## 🎯 Quality Gate Standards

SonarCloud mặc định yêu cầu:
- ✅ Coverage >= 80%
- ✅ Duplicated Lines < 3%
- ✅ Maintainability Rating >= A
- ✅ Reliability Rating >= A
- ✅ Security Rating >= A

## 🔧 Troubleshooting

### Lỗi: "Could not find a valid token"

**Giải pháp:**
1. Kiểm tra `SONAR_TOKEN` đã được thêm vào GitHub Secrets chưa
2. Token có đúng không (không có khoảng trắng thừa)
3. Token chưa hết hạn

### Lỗi: "Project key does not exist"

**Giải pháp:**
1. Kiểm tra `sonar-project.properties`
2. Đảm bảo `sonar.projectKey` đúng với project key trên SonarCloud
3. Project đã được import trên SonarCloud chưa

### Workflow chạy nhưng không thấy kết quả trên SonarCloud

**Giải pháp:**
1. Check logs của workflow trên GitHub Actions
2. Đảm bảo test coverage được generate (`npm run test:coverage`)
3. File `coverage/lcov.info` có tồn tại không

### Coverage = 0% trên SonarCloud

**Giải pháp:**
1. Kiểm tra đường dẫn trong `sonar-project.properties`:
   ```properties
   sonar.typescript.lcov.reportPaths=coverage/lcov.info
   ```
2. Chạy local: `npm run test:coverage` và check file `coverage/lcov.info`
3. Đảm bảo workflow chạy tests trước khi scan

## 📚 Tài liệu tham khảo

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [GitHub Actions Integration](https://github.com/SonarSource/sonarcloud-github-action)
- [Understanding Quality Gates](https://docs.sonarcloud.io/improving/quality-gates/)

## 💡 Tips

1. **Chạy local trước**: Đảm bảo tests pass local trước khi push
2. **Monitor Quality Gate**: Theo dõi quality gate để maintain code quality
3. **Fix Issues sớm**: Sửa bugs và code smells ngay khi phát hiện
4. **Review Coverage**: Tăng dần coverage lên >=80%
5. **Security First**: Ưu tiên fix security issues trước

## 🎓 Next Steps

Sau khi setup xong:
1. ✅ Viết thêm tests để tăng coverage
2. ✅ Fix bugs và code smells được SonarCloud phát hiện
3. ✅ Setup branch protection rules
4. ✅ Require quality gate pass trước khi merge PR

---

**Chúc bạn setup thành công!** 🎉
