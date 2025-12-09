# CI/CD Setup Guide - GitHub Actions

Hướng dẫn chi tiết về CI/CD pipeline sử dụng GitHub Actions.

## 📋 Tổng quan

Dự án sử dụng 2 workflows chính:

1. **test.yml** - Chạy unit tests và generate coverage
2. **sonarcloud.yml** - Phân tích chất lượng code

## 🔄 Test Workflow

### File: `.github/workflows/test.yml`

**Trigger:**
- Push lên branches: `main`, `master`, `develop`
- Pull Requests vào branches trên

**Steps:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Run tests với coverage
5. Upload coverage reports

### Chạy local để test

```bash
# Test workflow sẽ chạy command này
npm ci --legacy-peer-deps
npm test -- --ci --coverage --maxWorkers=2
```

## 📊 SonarCloud Workflow

### File: `.github/workflows/sonarcloud.yml`

**Trigger:** Giống test workflow

**Steps:**
1. Checkout code (with full git history)
2. Setup Node.js
3. Install dependencies
4. Run tests with coverage
5. Upload results to SonarCloud

### Environment Variables Required

- `GITHUB_TOKEN` - Auto-provided by GitHub
- `SONAR_TOKEN` - Cần setup trong GitHub Secrets

## 🚀 Quick Start

### 1. Enable GitHub Actions

GitHub Actions tự động enable khi bạn push file workflow.

### 2. Kiểm tra Workflow

1. Push code lên GitHub
2. Vào tab **Actions** trong repository
3. Xem workflows đang chạy

### 3. Debug Workflow

Nếu workflow fail:

```bash
# Click vào workflow fail
# Click vào job bị lỗi
# Xem logs chi tiết
# Fix lỗi và push lại
```

## 📦 Artifacts

### Coverage Reports

Sau khi test workflow chạy xong:

1. Vào tab **Actions**
2. Click vào workflow run
3. Scroll xuống **Artifacts**
4. Download `coverage-report`
5. Extract và mở `coverage/index.html` trong browser

## 🔧 Customization

### Thay đổi Node version

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Đổi thành version bạn muốn
```

### Thay đổi branches trigger

```yaml
on:
  push:
    branches: [main, develop, staging]  # Thêm branches
```

### Thêm step mới

```yaml
- name: Your Custom Step
  run: |
    echo "Running custom command"
    npm run your-script
```

## 📈 Best Practices

### 1. Branch Protection Rules

Setup trong **Settings** → **Branches**:

```
✅ Require status checks to pass before merging
   ✅ test / Unit Tests
   ✅ sonarcloud / SonarCloud
✅ Require branches to be up to date before merging
```

### 2. PR Template

Tạo `.github/pull_request_template.md`:

```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Checklist
- [ ] Tests pass locally
- [ ] Added/updated tests
- [ ] Updated documentation
- [ ] Code passes SonarCloud quality gate
```

### 3. Commit Message Convention

```bash
feat: Add new feature
fix: Fix bug
test: Add tests
docs: Update documentation
refactor: Refactor code
chore: Update dependencies
```

## 🐛 Troubleshooting

### Workflow không chạy

**Nguyên nhân:**
- File workflow sai format
- Workflow bị disable

**Giải pháp:**
1. Check syntax YAML
2. Vào **Actions** tab → Enable workflows

### Tests fail trên CI nhưng pass local

**Nguyên nhân:**
- Dependencies version khác nhau
- Environment variables thiếu

**Giải pháp:**
1. Sử dụng `npm ci` thay vì `npm install`
2. Check `package-lock.json` được commit chưa
3. Add environment variables vào GitHub Secrets

### Coverage upload fail

**Nguyên nhân:**
- Path không đúng
- Coverage chưa được generate

**Giải pháp:**
1. Check `coverage/` folder có được tạo không
2. Verify path trong workflow
3. Đảm bảo tests chạy với `--coverage`

## 📊 Monitoring

### GitHub Actions Usage

- Vào **Settings** → **Billing**
- Check **Actions minutes used**
- Free tier: 2000 minutes/month

### Optimization Tips

1. **Cache dependencies:**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # Enable caching
```

2. **Limit test runs:**
```yaml
on:
  push:
    branches: [main]  # Chỉ chạy trên main
  pull_request:
    branches: [main]
```

3. **Use matrix strategy cho multiple versions:**
```yaml
strategy:
  matrix:
    node-version: [18, 20]
```

## 🔐 Security

### Secrets Management

**GitHub Secrets:**
1. Vào **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `SONAR_TOKEN`
   - API keys (nếu có)

**Sử dụng trong workflow:**
```yaml
env:
  SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### Dependabot

Enable để tự động update dependencies:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

## 📚 Advanced Features

### 1. Conditional Steps

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: npm run deploy
```

### 2. Manual Trigger

```yaml
on:
  workflow_dispatch:  # Allow manual trigger
```

### 3. Scheduled Runs

```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight
```

## 🎯 Next Steps

1. ✅ Setup branch protection
2. ✅ Add PR template
3. ✅ Enable Dependabot
4. ✅ Add deploy workflow (optional)
5. ✅ Setup notifications

## 📖 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Marketplace Actions](https://github.com/marketplace?type=actions)

---

**Happy CI/CD!** 🚀
