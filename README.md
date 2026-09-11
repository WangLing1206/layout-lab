# Layout Lab · 页面布局实验室

多级路由中文教学网站，使用 React、React Router、Ant Design、Lucide 和 Vite。纯前端静态部署，无需 API 密钥。

## 本地运行

需要 Node.js 22+ 和 npm。

~~~powershell
npm install
npm run dev
~~~

打开终端显示的本地地址。验证命令：

~~~powershell
npm test
npm run build
npm run preview
~~~

## 课程与页面

- 8 章：盒模型、文档流、定位、Flex、Grid、响应式、页面结构、综合实战。
- 每章 3 个知识点，基础和变化代码示例，独立实时实验和单选挑战。
- 可调整参数、编辑 HTML/CSS、切换预览宽度、重置、复制和下载实验。
- 答对章节自测后保存进度；进度仅保存在当前浏览器，不跨设备同步。
- 不包含后台账号、云端数据库或代码在线判题；综合实战目前是可编辑布局实验与概念自测。

~~~text
/#/
/#/course/:chapter
/#/course/:chapter/knowledge
/#/course/:chapter/code
/#/course/:chapter/demo
/#/practice
/#/practice/:id
~~~

使用 HashRouter 与相对资源路径，GitHub Pages 子路径、刷新和深链接均可工作。

## 一键发布到 GitHub Pages

此脚本会创建公开仓库并上传项目源代码。执行前检查 src、public、docs 等目录，确保没有私人文件。

首次准备：安装 Git 与 GitHub CLI，执行 gh auth login；配置 git config user.name 和 git config user.email。账户需要建仓和配置 Pages 权限。组织策略可能限制 Pages。

在项目根目录执行：

~~~powershell
powershell -ExecutionPolicy Bypass -File ./scripts/publish.ps1 -RepositoryName layout-lab
~~~

脚本会要求输入 PUBLISH，随后测试、构建、提交、建仓、配置 Pages 并推送。可用 -ConfirmPublic 显式跳过再次确认。不会修改已有的不匹配 origin，也不会强制切换分支或覆盖远端历史。失败会停止，按报错修复后可重新运行。已有同名远端仓库但本地未关联时，请先手动设置 origin。

GitHub Actions 成功后访问 https://你的用户名.github.io/layout-lab/ 。后续提交并推送 main 自动更新网站。没有本地 CLI 也可将项目上传到 GitHub，在 Settings → Pages → Build and deployment 选择 GitHub Actions，再运行 Publish Layout Lab workflow。

本次交付没有替用户创建远程仓库或执行公开发布；真实线上地址需首次发布成功后才能确认。

## 结构

~~~text
src/course.js        课程数据、CSS 生成、进度解析
src/App.jsx          导航、目录和学习页
src/Lab.jsx          隔离预览和代码编辑
src/Practice.jsx     自测和完成进度
src/styles.css       响应式视觉与图解
src/*.test.*         自动化测试
scripts/publish.ps1  带确认的一键发布
.github/workflows/   Pages 自动部署
~~~

HTML/CSS 预览位于无脚本权限的 sandbox iframe，并使用 CSP 禁止外部资源和表单。下载的 HTML 也包含 CSP，但下载文件本身不受 iframe sandbox 保护，请勿运行不信任的 HTML。

详细计划位于 docs/superpowers/plans/2026-09-11-layout-lab.md。

