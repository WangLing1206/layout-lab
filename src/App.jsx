import React, { useContext, createContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Button, Input, Segmented, Progress, message } from "antd";
import {
  PanelsTopLeft,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Search,
  BookOpen,
  Code2,
  FlaskConical,
  Clock,
  CheckCircle2,
  ChevronRight,
  Layers,
  GraduationCap,
  Eye,
  TriangleAlert,
} from "lucide-react";
import {
  chapters,
  getChapter,
  makeCss,
  documentFor,
  readProgress,
} from "./course";
import Lab, { copyText } from "./Lab";
import { PracticeList, PracticeDetail } from "./Practice";
import DynamicStage from "./Stage";
import ChapterGraphic from "./ChapterVisual";
import CodeBlock from "./CodeBlock";
import { getKnowledgeDetail } from "./knowledge";
import {
  LanguageContext,
  getInitialLanguage,
  localized,
  useLanguage,
} from "./i18n";
const ProgressContext = createContext([]);
const num = (i) => String(i + 1).padStart(2, "0");
const chapterFilename = (id, type) => id + (type === "CSS" ? ".css" : ".html");
const copy = {
  zh: {
    brand: "页面布局课堂",
    brandEn: "Layout Classroom",
    navCourse: "课程学习",
    navPractice: "练习中心",
    progress: "已完成",
    search: "搜索章节或 CSS 属性",
    allChapters: "全部章节",
    chapter: "章节",
    minutes: "分钟",
    completed: "已完成",
    interactive: "交互实验",
    empty: "没有匹配的章节",
    clear: "清除筛选",
    practiceTitle: "理解之后，动手验证。",
    practiceText: "完成章节挑战，检验你的布局知识。",
    practiceLink: "进入练习中心",
    coursePath: "YOUR LEARNING PATH",
    courseTitle: "循序渐进，搭建你的知识地图",
    start: "开始学习",
    startFirst: "开始第一章",
    continue: "继续学习",
    tryDemo: "试试交互实验",
    learn: "进入章节",
    objectives: "学完这一章，你将能够：",
    knowledge: "THE FUNDAMENTALS",
    remember: "记住这个关键点",
    readCode: "READ THE CODE",
    codeTitle: "从一个典型示例开始",
    basicExample: "基础示例",
    changeExample: "变化示例",
    defaultResult: "默认布局效果",
    changedResult: "改变第一个参数后的效果",
    copyCode: "复制代码",
    enterDemo: "进入实时实验",
    demoTitle: "让布局动起来",
    demoText: "调整参数，观察结构如何响应。",
    challenge: "准备好了吗？完成本章挑战",
    notFound: "这个页面还没有布局",
    notFoundText: "地址可能有误，回到课程目录继续探索。",
    back: "返回课程目录",
    previous: "上一章",
    next: "下一章",
    motionEyebrow: "MOTION LAB",
    motionTitle: "看见每一次布局变化",
    motionText: "暂停、重播，用四个步骤看清布局规则。",
    heroEyebrow: "INTERACTIVE CSS LAYOUT COURSE",
    heroTitle: "页面布局，从理解到创造。",
    heroText: "不止于阅读代码，更在于亲手改变。",
    heroStats: ["系统章节", "核心知识点", "布局可能"],
    practiceEyebrow: "LEARN BY DOING",
    practiceHeading: "把理解，变成你的能力。",
    practiceSub: "先动手实验，再用一道问题检验自己的理解。",
    challengeEyebrow: "CHAPTER CHALLENGE",
    submit: "提交答案",
    correct: "回答正确，已记录学习进度",
    wrong: "再想一想，可以在下方实验中验证",
    review: "回顾本章知识",
    notFoundPractice: "练习不存在",
    backPractice: "返回练习中心",
    stage: "动态布局演示",
    pause: "暂停动画",
    play: "播放动画",
    replay: "重新播放",
    unknown: "未知章节",
  },
  en: {
    brand: "Layout Classroom",
    brandEn: "页面布局课堂",
    navCourse: "Courses",
    navPractice: "Practice",
    progress: "completed",
    search: "Search chapters or CSS properties",
    allChapters: "All chapters",
    chapter: "Chapter",
    minutes: "min",
    completed: "Completed",
    interactive: "Interactive",
    empty: "No matching chapters",
    clear: "Clear filters",
    practiceTitle: "Turn understanding into ability.",
    practiceText: "Try a challenge after each chapter.",
    practiceLink: "Open practice",
    coursePath: "YOUR LEARNING PATH",
    courseTitle: "Build your layout knowledge step by step",
    start: "Start learning",
    startFirst: "Start first chapter",
    continue: "Continue learning",
    tryDemo: "Try the motion demo",
    learn: "Open chapter",
    objectives: "By the end of this chapter, you will be able to:",
    knowledge: "THE FUNDAMENTALS",
    remember: "Remember this key idea",
    readCode: "READ THE CODE",
    codeTitle: "Start with a typical example",
    basicExample: "Basic example",
    changeExample: "Changed example",
    defaultResult: "Default layout result",
    changedResult: "Result after changing the first parameter",
    copyCode: "Copy code",
    enterDemo: "Open live demo",
    demoTitle: "Make layout move",
    demoText: "Adjust a parameter and watch the structure respond.",
    challenge: "Ready to complete the chapter challenge?",
    notFound: "This page has no layout yet",
    notFoundText:
      "The address may be incorrect. Return to the course catalogue.",
    back: "Back to course catalogue",
    previous: "Previous",
    next: "Next",
    motionEyebrow: "MOTION LAB",
    motionTitle: "See every layout change",
    motionText: "Pause and replay four steps to understand the rules.",
    heroEyebrow: "INTERACTIVE CSS LAYOUT COURSE",
    heroTitle: "Layout, from understanding to creation.",
    heroText:
      "Don't just read code. Change it, observe it, and build intuition.",
    heroStats: ["Systematic chapters", "Core concepts", "Layout possibilities"],
    practiceEyebrow: "LEARN BY DOING",
    practiceHeading: "Turn understanding into ability.",
    practiceSub:
      "Experiment first, then test your understanding with a question.",
    challengeEyebrow: "CHAPTER CHALLENGE",
    submit: "Submit answer",
    correct: "Correct. Progress has been saved.",
    wrong: "Think again, then verify in the demo below.",
    review: "Review chapter knowledge",
    notFoundPractice: "Practice not found",
    backPractice: "Back to practice",
    stage: "Layout motion demo",
    pause: "Pause animation",
    play: "Play animation",
    replay: "Replay",
    unknown: "Unknown chapter",
  },
};
const stageGroups = [
  { id: "foundations", label: { zh: "布局基础", en: "Foundations" } },
  { id: "modern", label: { zh: "现代布局", en: "Modern Layout" } },
  { id: "applied", label: { zh: "综合应用", en: "Applied Practice" } },
];
export function Diagram({ chapter, large = false }) {
  const { lang } = useLanguage();
  return (
    <div
      className={"diagram diagram-" + chapter.id + (large ? " large" : "")}
      role="img"
      aria-label={
        localized(chapter.title, lang) +
        " " +
        (lang === "en" ? "layout diagram" : "布局图解")
      }
      style={{ "--accent": chapter.color }}
    >
      <ChapterGraphic chapter={chapter} />
      <small>{chapter.tags[0]}</small>
    </div>
  );
}
function Home() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const progress = useContext(ProgressContext);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const shown = chapters.filter((c) => {
    const normalized = query.toLowerCase();
    const inGroup =
      group === "all" ||
      c.group.zh === stageGroups.find((item) => item.id === group)?.label.zh;
    const haystack = [c.title.zh, c.title.en, c.group.zh, c.group.en, ...c.tags]
      .join(" ")
      .toLowerCase();
    return inGroup && haystack.includes(normalized);
  });
  const next = chapters.find((c) => !progress.includes(c.id)) || chapters[0];
  return (
    <div>
      <section className="hero">
        <div className="hero-stage" aria-hidden="true">
          <DynamicStage chapter={getChapter("patterns")} compact background />
        </div>
        <div className="page hero-copy">
          <div className="hero-top">
            <span className="eyebrow">
              <span className="tiny-square" />
              {t.heroEyebrow}
            </span>
            <span className="semester">WEB DESIGN / 2026</span>
          </div>
          <h1>{t.heroTitle}</h1>
          <p>
            {t.heroText}
            <br />
            {lang === "en"
              ? "Build your layout instincts across eight chapters."
              : "用八个章节，建立你的页面布局思维。"}
          </p>
          <div className="hero-actions">
            <Link className="primary-link" to={"/course/" + next.id}>
              {progress.length ? t.continue : t.startFirst}
              <ArrowUpRight size={19} />
            </Link>
            <Link className="text-link" to="/course/flex/demo">
              <FlaskConical size={18} />
              {t.tryDemo}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="hero-stats">
            {["08", "24", "∞"].map((value, index) => (
              <span key={value}>
                <strong>{value}</strong>
                {t.heroStats[index]}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="page catalogue">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.coursePath}</span>
            <h2>{t.courseTitle}</h2>
          </div>
          <div className="progress-summary">
            <span>
              {t.progress} <b>{progress.length} / 8</b>
            </span>
            <Progress
              percent={(progress.length / 8) * 100}
              showInfo={false}
              strokeColor="#24765f"
              size="small"
            />
          </div>
        </div>
        <div className="catalogue-tools">
          <Segmented
            value={group}
            onChange={setGroup}
            options={[
              { value: "all", label: t.allChapters },
              ...stageGroups.map((item) => ({
                value: item.id,
                label: localized(item.label, lang),
              })),
            ]}
          />
          <Input
            aria-label={t.search}
            prefix={<Search size={17} />}
            placeholder={t.search}
            allowClear
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="learning-path">
          {stageGroups.map((stage) => {
            const groupChapters = shown.filter(
              (c) => c.group.zh === stage.label.zh,
            );
            if (!groupChapters.length) return null;
            return (
              <section className="path-group" key={stage.id}>
                <div className="path-heading">
                  <span className="path-number">
                    {num(stageGroups.indexOf(stage))}
                  </span>
                  <h3>{localized(stage.label, lang)}</h3>
                  <span className="path-line" />
                </div>
                <div className="chapter-grid">
                  {groupChapters.map((c) => {
                    const index = chapters.indexOf(c);
                    return (
                      <Link
                        to={"/course/" + c.id}
                        className="chapter-card"
                        key={c.id}
                      >
                        <div className="card-art">
                          <span className="chapter-index">
                            {t.chapter} {num(index)}
                          </span>
                          <span className="chapter-group">
                            {localized(c.group, lang)}
                          </span>
                          <Diagram chapter={c} />
                        </div>
                        <div className="card-content">
                          <div className="card-title">
                            <h3>{localized(c.title, lang)}</h3>
                            <ArrowUpRight size={20} />
                          </div>
                          <p>{localized(c.intro, lang)}</p>
                          <div className="card-meta">
                            <span>
                              <Clock size={13} />
                              {c.time} {t.minutes}
                            </span>
                            <span>
                              {progress.includes(c.id) ? (
                                <>
                                  <CheckCircle2 size={14} />
                                  {t.completed}
                                </>
                              ) : (
                                <>
                                  <FlaskConical size={14} />
                                  {t.interactive}
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
        {!shown.length && (
          <div className="empty">
            <Search size={28} />
            <h3>{t.empty}</h3>
            <Button
              onClick={() => {
                setQuery("");
                setGroup("all");
              }}
            >
              {t.clear}
            </Button>
          </div>
        )}
        <div className="practice-banner">
          <div>
            <GraduationCap size={28} />
            <div>
              <h3>{t.practiceTitle}</h3>
              <p>{t.practiceText}</p>
            </div>
          </div>
          <Link to="/practice">
            {t.practiceLink}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="page motion-section">
        <div className="motion-copy">
          <span className="eyebrow">{t.motionEyebrow}</span>
          <h2>{t.motionTitle}</h2>
          <p>{t.motionText}</p>
          <Link className="primary-link" to="/course/grid/demo">
            {t.enterDemo}
            <ArrowRight size={17} />
          </Link>
        </div>
        <DynamicStage chapter={getChapter("grid")} />
      </section>
    </div>
  );
}
function ChapterLayout() {
  const { chapter: id } = useParams();
  const { lang } = useLanguage();
  const t = copy[lang];
  const c = getChapter(id);
  const progress = useContext(ProgressContext);
  if (!c) return <NotFound />;
  const index = chapters.indexOf(c);
  const tabs = [
    ["", t.chapter, Layers],
    ["knowledge", "基本知识", BookOpen],
    ["code", "典型代码", Code2],
    ["demo", "实时演示", FlaskConical],
  ];
  const tabLabels = {
    zh: ["章节概览", "基本知识", "典型代码", "实时演示"],
    en: ["Overview", "Knowledge", "Code", "Demo"],
  }[lang];
  return (
    <div className="page chapter-page">
      <div className="crumb">
        <Link to="/">{t.back}</Link>
        <ChevronRight size={13} />
        <span>{localized(c.group, lang)}</span>
        <ChevronRight size={13} />
        <span>{localized(c.title, lang)}</span>
      </div>
      <header className="chapter-heading">
        <div>
          <span className="eyebrow" style={{ color: c.color }}>
            {t.chapter} {num(index)} / 08 · {c.title.en}
          </span>
          <h1>{localized(c.title, lang)}</h1>
          <p>{localized(c.intro, lang)}</p>
        </div>
        <span className="chapter-duration">
          {progress.includes(c.id) ? (
            <>
              <CheckCircle2 size={18} />
              {t.completed}
            </>
          ) : (
            <>
              <Clock size={18} />
              {c.time} {t.minutes}
            </>
          )}
        </span>
      </header>
      <nav
        className="chapter-tabs"
        aria-label={lang === "en" ? "Chapter content" : "章节内容"}
      >
        {tabs.map(([path, label, Icon], i) => (
          <NavLink
            key={path}
            end
            to={"/course/" + id + (path ? "/" + path : "")}
          >
            <Icon size={17} />
            {tabLabels[i]}
          </NavLink>
        ))}
      </nav>
      <Outlet context={c} />
      <div className="chapter-pagination">
        {index > 0 ? (
          <Link to={"/course/" + chapters[index - 1].id}>
            <ArrowLeft size={17} />
            <span>
              {t.previous}
              <b>{localized(chapters[index - 1].title, lang)}</b>
            </span>
          </Link>
        ) : (
          <Link to="/">{t.back}</Link>
        )}
        {index < chapters.length - 1 ? (
          <Link to={"/course/" + chapters[index + 1].id}>
            <span>
              {t.next}
              <b>{localized(chapters[index + 1].title, lang)}</b>
            </span>
            <ArrowRight size={17} />
          </Link>
        ) : (
          <Link to="/practice">
            {t.practiceLink}
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}
function Overview() {
  const { chapter: id } = useParams();
  const { lang } = useLanguage();
  const t = copy[lang];
  const c = getChapter(id);
  return (
    <section className="overview">
      <div className="overview-copy">
        <span className="eyebrow">IN THIS CHAPTER</span>
        <h2>{localized(c.heading, lang)}</h2>
        <p>
          {localized(c.intro, lang)} {t.objectives}
        </p>
        <ol>
          {c.concepts.map((item) => (
            <li key={item.title.zh}>
              <strong>{localized(item.title, lang)}</strong>
              <span>
                {
                  localized(item.text, lang).split(
                    lang === "en" ? "." : "。",
                  )[0]
                }
                .
              </span>
            </li>
          ))}
        </ol>
        <Link className="primary-link" to="knowledge">
          {t.start}
          <BookOpen size={17} />
        </Link>
      </div>
      <div className="overview-art">
        <DynamicStage chapter={c} />
        <div className="tag-list">
          {c.tags.map((tag) => (
            <code key={tag}>{tag}</code>
          ))}
        </div>
      </div>
    </section>
  );
}
function Knowledge() {
  const { chapter: id } = useParams();
  const { lang } = useLanguage();
  const t = copy[lang];
  const c = getChapter(id);
  return (
    <article className="knowledge">
      <span className="eyebrow">{t.knowledge}</span>
      <h2>{localized(c.heading, lang)}</h2>
      <p className="lead">{localized(c.intro, lang)}</p>
      <div className="knowledge-focus">
        <span>
          {lang === "en" ? "Connected demo controls" : "对应实验参数"}
        </span>
        <div>
          {c.controls.map((control) => (
            <code key={control.key}>{localized(control.label, lang)}</code>
          ))}
        </div>
      </div>
      <DynamicStage chapter={c} />
      {c.concepts.map((item, i) => {
        const detail = getKnowledgeDetail(c.id, i);
        return (
          <section className="concept concept-rich" key={item.title.zh}>
            <div className="concept-heading">
              <span>{num(i)}</span>
              <div>
                <h3>{localized(item.title, lang)}</h3>
                <p>{localized(item.text, lang)}</p>
              </div>
            </div>
            <div className="concept-details">
              <div className="concept-detail observe">
                <Eye size={17} />
                <div>
                  <strong>
                    {lang === "en" ? "Observe in the demo" : "在演示中观察"}
                  </strong>
                  <p>{localized(detail.observe, lang)}</p>
                </div>
              </div>
              <div className="concept-detail caution">
                <TriangleAlert size={17} />
                <div>
                  <strong>
                    {lang === "en" ? "Common mistake" : "常见误区"}
                  </strong>
                  <p>{localized(detail.caution, lang)}</p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <aside className="learning-note">
        <BookOpen size={21} />
        <div>
          <strong>{t.remember}</strong>
          <p>{localized(c.tip, lang)}</p>
        </div>
      </aside>
      <div className="knowledge-actions">
        <Link className="primary-link" to={"/course/" + id + "/code"}>
          {lang === "en" ? "See it in code" : "看看代码如何实现"}
          <Code2 size={17} />
        </Link>
        <Link className="secondary-link" to={"/course/" + id + "/demo"}>
          {lang === "en" ? "Open the matching demo" : "打开对应实验"}
          <FlaskConical size={17} />
        </Link>
      </div>
    </article>
  );
}
function CodePage() {
  const { chapter: id } = useParams();
  const { lang } = useLanguage();
  const t = copy[lang];
  const c = getChapter(id);
  const [type, setType] = useState("CSS");
  const [variant, setVariant] = useState("basic");
  const changed = {
    [c.controls[0].key]: c.controls[0].options
      ? c.controls[0].options.at(-1)
      : c.controls[0].max,
  };
  const css = makeCss(c, variant === "changed" ? changed : {});
  const code = type === "CSS" ? css : c.html;
  return (
    <section className="code-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t.readCode}</span>
          <h2>{t.codeTitle}</h2>
          <p>{localized(c.tip, lang)}</p>
        </div>
        <Segmented
          value={variant}
          onChange={setVariant}
          options={[
            { value: "basic", label: t.basicExample },
            { value: "changed", label: t.changeExample },
          ]}
        />
      </div>
      <CodeBlock
        code={code}
        language={type === "CSS" ? "css" : "markup"}
        filename={chapterFilename(c.id, type)}
        copyLabel={t.copyCode}
        onCopy={() => copyText(code, lang)}
      />
      <div className="code-reading">
        <article>
          <span>01</span>
          <div>
            <strong>{lang === "en" ? "Container rule" : "容器规则"}</strong>
            <p>
              {lang === "en"
                ? "The first rule controls how children are arranged or positioned."
                : "第一条规则决定子元素如何排列或定位。"}
            </p>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <strong>{lang === "en" ? "Linked parameter" : "关联参数"}</strong>
            <p>
              {localized(c.controls[0].label, lang)}
              {lang === "en"
                ? " changes the highlighted declaration in the live demo."
                : " 会直接改变实时演示中的对应声明。"}
            </p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <strong>
              {lang === "en" ? "Try it in the demo" : "到实验中验证"}
            </strong>
            <p>
              {lang === "en"
                ? "Compare the basic and changed examples before editing the code."
                : "先比较基础和变化示例，再进入编辑器自由修改。"}
            </p>
          </div>
        </article>
      </div>
      <div className="code-explanation">
        <span className="eyebrow">RESULT</span>
        <h3>{variant === "basic" ? t.defaultResult : t.changedResult}</h3>
        <iframe
          title={lang === "en" ? "Typical code result" : "典型代码效果"}
          sandbox=""
          srcDoc={documentFor(c.html, css, lang)}
        />
      </div>
      <Link className="primary-link" to={"/course/" + id + "/demo"}>
        {t.enterDemo}
        <FlaskConical size={17} />
      </Link>
    </section>
  );
}
function DemoPage() {
  const { chapter: id } = useParams();
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <>
      <Lab key={id + lang} chapter={getChapter(id)} />
      <div className="demo-next">
        <Link to={"/practice/" + id}>
          {t.challenge}
          <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}
function NotFound() {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <div className="empty not-found">
      <PanelsTopLeft size={44} />
      <span className="eyebrow">404 / NOT FOUND</span>
      <h1>{t.notFound}</h1>
      <p>{t.notFoundText}</p>
      <Link className="primary-link" to="/">
        {t.back}
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
export default function App() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lang, setLangState] = useState(() =>
    getInitialLanguage(searchParams, localStorage),
  );
  const [progress, setProgress] = useState(() => {
    try {
      return readProgress(localStorage);
    } catch {
      return [];
    }
  });
  const t = copy[lang];
  useEffect(() => {
    window.scrollTo?.(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title =
      lang === "en"
        ? "Layout Classroom | CSS Layout Course"
        : "页面布局课堂 | CSS 布局课程";
  }, [lang]);
  useEffect(() => {
    if (searchParams.get("lang") !== lang) {
      const params = new URLSearchParams(searchParams);
      params.set("lang", lang);
      setSearchParams(params, { replace: true });
    }
  }, [lang, searchParams, setSearchParams]);
  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem("layout-language", next);
    } catch {}
    const params = new URLSearchParams(searchParams);
    params.set("lang", next);
    setSearchParams(params, { replace: true });
  };
  const complete = (id) =>
    setProgress((old) => {
      const next = [...new Set([...old, id])];
      try {
        localStorage.setItem("layout-progress", JSON.stringify(next));
      } catch {
        message.warning(
          lang === "en"
            ? "Progress could not be saved in this browser."
            : "浏览器未允许保存进度，本次进度仍保留",
        );
      }
      return next;
    });
  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: (key, fallback) => t[key] ?? fallback ?? key }}
    >
      <ProgressContext.Provider value={progress}>
        <a
          className="skip-link"
          href="#main-content"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("main-content").focus();
          }}
        >
          {lang === "en" ? "Skip to main content" : "跳到主要内容"}
        </a>
        <header className="site-header">
          <div className="nav-inner">
            <Link className="brand" to="/">
              <span className="brand-icon">
                <PanelsTopLeft size={23} />
              </span>
              <strong>
                {lang === "en" ? (
                  <>
                    Layout <span>Classroom</span>
                  </>
                ) : (
                  <>
                    页面布局<span>课堂</span>
                  </>
                )}
              </strong>
              <span className="brand-caption">
                {lang === "en" ? "页面布局课堂" : "Layout Classroom"}
              </span>
            </Link>
            <nav aria-label={lang === "en" ? "Main navigation" : "主导航"}>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive || location.pathname.startsWith("/course")
                    ? "active"
                    : ""
                }
              >
                {t.navCourse}
              </NavLink>
              <NavLink to="/practice">{t.navPractice}</NavLink>
            </nav>
            <div className="header-tools">
              <Segmented
                size="small"
                value={lang}
                onChange={setLang}
                options={[
                  { value: "zh", label: "中文" },
                  { value: "en", label: "EN" },
                ]}
              />
              <Link className="header-progress" to="/practice">
                <span className="progress-dots">
                  {chapters.map((c) => (
                    <i
                      key={c.id}
                      className={progress.includes(c.id) ? "done" : ""}
                    />
                  ))}
                </span>
                <span>
                  {progress.length}/8 {t.progress}
                </span>
              </Link>
            </div>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:chapter" element={<ChapterLayout />}>
              <Route index element={<Overview />} />
              <Route path="knowledge" element={<Knowledge />} />
              <Route path="code" element={<CodePage />} />
              <Route path="demo" element={<DemoPage />} />
            </Route>
            <Route
              path="/practice"
              element={<PracticeList progress={progress} />}
            />
            <Route
              path="/practice/:id"
              element={<PracticeDetail complete={complete} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <Link className="footer-brand" to="/">
            <PanelsTopLeft size={18} />
            {lang === "en" ? "Layout Classroom" : "页面布局课堂"}
          </Link>
          <span>
            {lang === "en"
              ? "Every adjustment builds understanding."
              : "每一次调整，都是一次理解。"}
          </span>
          <span>
            {lang === "en" ? "CSS Layout Course · 2026" : "页面布局课程 · 2026"}
          </span>
        </footer>
      </ProgressContext.Provider>
    </LanguageContext.Provider>
  );
}
