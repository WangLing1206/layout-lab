# Layout Classroom Redesign Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rename the product, add full Chinese/English switching, and redesign the home and chapter experience around clearer course structure and controllable layout motion.

**Architecture:** Keep the existing React Router structure. Add a language context backed by URL query and localStorage, convert course content to bilingual objects, and add a reusable animated layout stage with pause/replay controls.

**Tech Stack:** React 18, React Router 7, Ant Design 5, Vite, Vitest, CSS animations.

**Spec:** docs/superpowers/specs/2026-09-11-layout-lab-design.md plus the approved redesign direction in this thread.

## Global Constraints
- Product name: 页面布局课堂 / Layout Classroom. Do not use Lab or 实验室 in user-facing copy.
- Default language: Chinese. Switching to English must update URL query, localStorage, document title, and all visible course content.
- Preserve multi-level routes. Do not return to a fixed left/middle/right layout.
- Motion must be pausable and replayable, and respect prefers-reduced-motion.
- Keep the existing interactive lab functionality.

## Task 1: Bilingual data and language context
Files: src/course.js, src/i18n.jsx, src/i18n.test.jsx, src/App.jsx.
- Convert chapter fields to {zh, en} objects: title, group, intro, heading, concepts, tip, controls, question.
- Add a LanguageContext with lang, setLang, and t().
- Persist language in localStorage and reflect it in the URL query.
- Update App, Practice, Lab, and page copy to use localized text.
- Tests: default Chinese, English deep link, toggle persistence, no “Lab/实验室” in visible brand.

## Task 2: Animated layout stage
Files: src/Stage.jsx, src/Stage.test.jsx, src/App.jsx, src/styles.css.
- Build DynamicStage with four steps per chapter and localized captions.
- Add pause, replay, and step indicators.
- Use CSS transitions, not JavaScript layout measurement.
- Respect reduced motion by stopping automatic playback.
- Tests: stage advances, pause stops advancement, replay resets to step 1, captions switch by language.

## Task 3: Home and chapter structure redesign
Files: src/App.jsx, src/styles.css, src/App.test.jsx.
- Replace the old ribbon hero with a full-width animated layout scene and overlaid course copy.
- Group chapters into three learning stages: foundations, modern layout, applied practice.
- Add a dedicated motion section with a link to the live demo.
- Redesign chapter overview around DynamicStage, objectives, and tags.
- Keep knowledge, code, and demo routes unchanged in URL shape.
- Tests: grouped headings render, hero contains the new name, chapter overview shows DynamicStage.

## Task 4: Copy, metadata, and docs
Files: index.html, README.md, docs/superpowers/plans/2026-09-11-layout-classroom-redesign.md.
- Update title and metadata to 页面布局课堂 / Layout Classroom.
- Update README naming and bilingual feature notes.
- Remove user-facing “实验室/Lab” references.

## Task 5: Verification and release
- npm test
- npm run build
- Browser check: Chinese/English switching, home structure, chapter motion, live demo, mobile width.
- Commit, push, and verify GitHub Pages deployment.


## Verification Record
- 2026-09-11: 18 automated tests passed across course data, language switching, motion stage, editor behavior, progress persistence, and routing.
- Production build passed.
- Browser checks: Chinese and English switching, English deep links, language query retention across route navigation, shared left/right/category filtering, live stage controls, and mobile 390px width with no document-level horizontal overflow.
- Deployment remains GitHub Pages through the existing workflow and repository path.
