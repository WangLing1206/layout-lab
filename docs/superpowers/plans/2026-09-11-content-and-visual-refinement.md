# Content and Visual Refinement Plan

> **For agentic workers:** Use TDD and verify each task before deployment.

**Goal:** Replace repetitive numbered diagrams with semantic chapter graphics, redesign code blocks with syntax highlighting, and align basic knowledge with each chapter's code and live demo.

**Tech Stack:** React 18, Ant Design 5, prism-react-renderer, Vite, Vitest.

## Task 1: Semantic chapter graphics
- Create ChapterVisual with a distinct diagram for all eight chapters.
- Replace numbered card art and dynamic-stage cells with labels, layout structures, arrows, devices, and content roles.
- Add motion states through data-step CSS transitions.
- Test all chapters render meaningful labels rather than repeated numbers.

## Task 2: Code workbench
- Add prism-react-renderer.
- Create CodeBlock with syntax highlighting, filename, language badge, line numbers, copy action, and responsive overflow.
- Replace the current raw code window.
- Add chapter-specific code reading notes linking the sample to the demo parameters.

## Task 3: Knowledge alignment
- Add per-concept observe and caution details for all 24 knowledge points.
- Track the current concept through definition, live-demo observation, and common mistake.
- Correct concepts whose current wording does not match the demonstration, especially box sizing, positioning, and Grid tracks.
- Add links from knowledge to code and demo routes.

## Task 4: Verification and deployment
- Run automated tests and production build.
- Browser-check desktop and mobile diagrams, syntax highlighting, language switching, and chapter routes.
- Commit, push, and verify GitHub Pages deployment.


## Verification Record
- 2026-09-11: 23 automated tests passed across semantic graphics, code highlighting, knowledge details, bilingual switching, motion, editor, practice, and routing.
- Production build passed.
- Browser checks: chapter cards no longer use numbered diagram cells; dynamic stage renders semantic chapter graphics; code page shows syntax highlighting with line numbers; knowledge page shows aligned parameters, observation, and caution content.
- Mobile checks at 390px found no document-level horizontal overflow on code and knowledge pages.
