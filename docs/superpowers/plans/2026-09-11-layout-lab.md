# Layout Lab Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 交付中文、多级路由、可交互的页面布局教学网站。
**Architecture:** 课程数据驱动页面；HashRouter 嵌套路由；sandbox iframe 展示实验；localStorage 保存进度。
**Tech Stack:** React 18.3, React Router 7, Ant Design 5, Vite 6, Vitest 3, Lucide.
**Spec:** docs/superpowers/specs/2026-09-11-layout-lab-design.md

## Global Constraints
- 八章各有知识、代码、演示独立 URL；禁止固定三栏。
- 360px 手机及桌面无整页横向溢出。
- 不需要后台密钥，不擅自公开发布。

## Task 1: 数据与项目基线
Files: package.json, vite.config.js, src/course.js, src/course.test.js.
接口：chapters；getChapter(id)；makeCss(chapter, values)；readProgress(storage)。
- [x] 安装依赖；建立测试，断言 chapters 长度为 8、ID 唯一、知识点不少于 3。
- [x] 测试未知 ID 返回 undefined、Grid 列数生成 repeat(4, 1fr)、损坏存储返回空数组。
- [x] 运行 npm test 观察失败；实现数据与函数；再次运行测试。

## Task 2: 学习页面
Files: src/App.jsx, src/main.jsx, src/App.test.jsx.
接口：App 提供首页、章节父路由和 knowledge/code/demo 子路由、练习路由和错误页。
- [x] 测试首页标题、Grid 知识页和未知章节返回入口。
- [x] 实现顶部导航、面包屑、页签、章节前后导航。
- [x] 实现章节搜索/分类、知识图解、代码示例切换和复制。
- [x] 运行测试，检查页签切换真实改变 URL。

## Task 3: 实验与进度
Files: src/Lab.jsx, src/Practice.jsx, src/Lab.test.jsx.
接口：Lab({chapter})；通过 iframe.srcDoc 展示 HTML/CSS。
- [x] 测试参数更改影响 srcDoc、重置恢复初值、编辑 CSS 更新预览。
- [x] 实现参数控件、预览宽度、代码编辑、复制和下载。
- [x] 实现单选题、答案解释、完成进度；处理错误练习 ID 和存储写入失败。
- [x] 运行测试和生产构建。

## Task 4: 视觉与发布
Files: src/styles.css, .github/workflows/deploy.yml, scripts/publish.ps1, README.md.
- [x] 完成章节布局图示和响应式样式；尊重减少动画偏好。
- [x] Actions 配置 checkout、npm ci、test、build、upload-pages-artifact、deploy-pages。
- [x] 发布脚本检查 gh/git 和登录，初始化仓库、建仓、配置 Pages、推送；失败立即终止。
- [x] 文档写明首次发布授权与运行命令。

## Task 5: 验收
- [x] npm test；npm run build。
- [x] 浏览器验收首页、知识、代码、演示和练习；实际调节参数。
- [x] 检查桌面及手机溢出并保存截图。
- [x] 启动持续本地服务并交付 URL。

## Commands
    npm install
    npm test
    npm run build
    npm run dev -- --port 5173

## 验收记录
- 2026-09-11：12 项自动化测试通过；生产构建成功；发布脚本 PowerShell 语法检查通过。
- 浏览器验证：参数变化、代码示例切换、答题进度和刷新恢复；360px 页面无整页横向溢出。
- 已保存桌面和手机截图；当前工具不支持读取图像，因此不宣称完成截图人工视觉审查。
- 本地服务 http://127.0.0.1:5173 已启动；未公开发布到 GitHub。
