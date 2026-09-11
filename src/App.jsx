import React, { useState, useEffect, useContext, createContext } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { Button, Input, Segmented, Progress, Tooltip, message } from "antd";
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
  Copy,
  GraduationCap,
  ExternalLink,
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
const ProgressContext = createContext([]);
const num = (i) => String(i + 1).padStart(2, "0");
export function Diagram({ chapter, large = false }) {
  return (
    <div
      className={"diagram diagram-" + chapter.id + (large ? " large" : "")}
      role="img"
      aria-label={chapter.title + "布局图解"}
      style={{ "--accent": chapter.color }}
    >
      <div className="diagram-stage">
        {Array.from({ length: chapter.id === "box-model" ? 3 : 6 }, (_, i) => (
          <span key={i}>
            {chapter.id === "box-model"
              ? ["margin", "padding", "content"][i]
              : num(i)}
          </span>
        ))}
      </div>
      <small>{chapter.tags[0]}</small>
    </div>
  );
}
function Home() {
  const progress = useContext(ProgressContext);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("全部章节");
  const shown = chapters.filter(
    (c) =>
      (group === "全部章节" || c.group === group) &&
      (c.title + c.en + c.tags.join(""))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const next = chapters.find((c) => !progress.includes(c.id)) || chapters[0];
  return (
    <div>
      <section className="course-intro">
        <div className="page intro-inner">
          <div className="intro-top">
            <span className="eyebrow">
              <span className="tiny-square" />
              THE INTERACTIVE CSS COURSE
            </span>
            <span className="semester">WEB DESIGN / 2026</span>
          </div>
          <h1>页面布局，从理解到创造。</h1>
          <p className="intro-description">
            不止于阅读代码，更在于亲手改变。
            <br />在 8 个章节中，建立你的页面布局思维。
          </p>
          <div className="intro-bottom">
            <Link className="primary-link" to={"/course/" + next.id}>
              {progress.length ? "继续学习" : "开始第一章"}
              <ArrowUpRight size={19} />
            </Link>
            <Link className="text-link" to="/course/flex/demo">
              <FlaskConical size={18} />
              试试交互实验
              <ArrowRight size={16} />
            </Link>
            <div className="intro-stats">
              <span>
                <strong>08</strong>系统章节
              </span>
              <span>
                <strong>24</strong>核心知识点
              </span>
              <span>
                <strong>∞</strong>探索可能
              </span>
            </div>
          </div>
          <div className="layout-ribbon" aria-label="页面布局示意">
            <div className="ribbon-label">
              <PanelsTopLeft size={22} />
              <span>
                从空间
                <br />
                到秩序
              </span>
            </div>
            <div className="ribbon-box">
              <span>margin</span>
              <div>
                padding<div>content</div>
              </div>
            </div>
            <div className="ribbon-flex">
              <i />
              <i />
              <i />
              <span>display: flex</span>
            </div>
            <div className="ribbon-grid">
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} />
              ))}
              <span>display: grid</span>
            </div>
            <div className="ribbon-screen">
              <div />
              <div />
              <div />
              <span>@media</span>
            </div>
            <span className="ribbon-end">
              小小的规则，
              <br />
              无限的布局。
              <ArrowUpRight size={24} />
            </span>
          </div>
        </div>
      </section>
      <section className="page catalogue">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR LEARNING PATH</span>
            <h2>循序渐进，搭建你的知识地图</h2>
          </div>
          <div className="progress-summary">
            <span>
              学习进度 <b>{progress.length} / 8</b>
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
            options={["全部章节", "布局基础", "现代布局", "综合应用"]}
          />
          <Input
            aria-label="搜索章节"
            prefix={<Search size={17} />}
            placeholder="搜索章节或 CSS 属性"
            allowClear
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chapter-grid">
          {shown.map((c) => {
            const i = chapters.indexOf(c);
            return (
              <Link to={"/course/" + c.id} className="chapter-card" key={c.id}>
                <div className="card-art">
                  <span className="chapter-index">CHAPTER {num(i)}</span>
                  <span className="chapter-group">{c.group}</span>
                  <Diagram chapter={c} />
                </div>
                <div className="card-content">
                  <div className="card-title">
                    <h3>{c.title}</h3>
                    <ArrowUpRight size={20} />
                  </div>
                  <span className="english-title">{c.en}</span>
                  <p>{c.intro}</p>
                  <div className="card-meta">
                    <span>
                      <Clock size={13} />
                      {c.time} 分钟
                    </span>
                    <span>
                      {progress.includes(c.id) ? (
                        <>
                          <CheckCircle2 size={14} />
                          已完成
                        </>
                      ) : (
                        <>
                          <FlaskConical size={14} />
                          交互实验
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {!shown.length && (
          <div className="empty">
            <Search size={28} />
            <h3>没有匹配的章节</h3>
            <Button
              onClick={() => {
                setQuery("");
                setGroup("全部章节");
              }}
            >
              清除筛选
            </Button>
          </div>
        )}
        <div className="practice-banner">
          <div>
            <GraduationCap size={28} />
            <div>
              <h3>理解之后，动手验证。</h3>
              <p>完成章节挑战，检验你的布局知识。</p>
            </div>
          </div>
          <Link to="/practice">
            进入练习中心
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
function ChapterLayout() {
  const { chapter: id } = useParams();
  const c = getChapter(id);
  const progress = useContext(ProgressContext);
  if (!c) return <NotFound />;
  const index = chapters.indexOf(c);
  return (
    <div className="page chapter-page">
      <div className="crumb">
        <Link to="/">课程目录</Link>
        <ChevronRight size={13} />
        <span>{c.group}</span>
        <ChevronRight size={13} />
        <span>{c.title}</span>
      </div>
      <header className="chapter-heading">
        <div>
          <span className="eyebrow" style={{ color: c.color }}>
            CHAPTER {num(index)} / 08 · {c.en}
          </span>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </div>
        <span className="chapter-duration">
          {progress.includes(c.id) ? (
            <>
              <CheckCircle2 size={18} />
              已完成
            </>
          ) : (
            <>
              <Clock size={18} />
              {c.time} 分钟
            </>
          )}
        </span>
      </header>
      <nav className="chapter-tabs" aria-label="章节内容">
        {[
          ["", "章节概览", Layers],
          ["knowledge", "基本知识", BookOpen],
          ["code", "典型代码", Code2],
          ["demo", "实时演示", FlaskConical],
        ].map(([path, label, Icon]) => (
          <NavLink
            key={path}
            end
            to={"/course/" + id + (path ? "/" + path : "")}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <Outlet context={c} />
      <div className="chapter-pagination">
        {index > 0 ? (
          <Link to={"/course/" + chapters[index - 1].id}>
            <ArrowLeft size={17} />
            <span>
              上一章<b>{chapters[index - 1].title}</b>
            </span>
          </Link>
        ) : (
          <Link to="/">返回课程目录</Link>
        )}
        {index < 7 ? (
          <Link to={"/course/" + chapters[index + 1].id}>
            <span>
              下一章<b>{chapters[index + 1].title}</b>
            </span>
            <ArrowRight size={17} />
          </Link>
        ) : (
          <Link to="/practice">
            开始综合练习
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}
function Overview() {
  const { chapter: id } = useParams();
  const c = getChapter(id);
  return (
    <section className="overview">
      <div className="overview-copy">
        <span className="eyebrow">IN THIS CHAPTER</span>
        <h2>{c.heading}</h2>
        <p>{c.intro} 学完这一章，你将能够：</p>
        <ol>
          {c.concepts.map(([t, d]) => (
            <li key={t}>
              <strong>{t}</strong>
              <span>{d.split("。")[0]}。</span>
            </li>
          ))}
        </ol>
        <Link className="primary-link" to="knowledge">
          开始学习
          <BookOpen size={17} />
        </Link>
      </div>
      <div className="overview-art">
        <Diagram chapter={c} large />
        <div className="tag-list">
          {c.tags.map((t) => (
            <code key={t}>{t}</code>
          ))}
        </div>
      </div>
    </section>
  );
}
function Knowledge() {
  const { chapter: id } = useParams();
  const c = getChapter(id);
  return (
    <article className="knowledge">
      <span className="eyebrow">THE FUNDAMENTALS</span>
      <h2>{c.heading}</h2>
      <p className="lead">{c.intro}</p>
      <Diagram chapter={c} large />
      {c.concepts.map(([title, text], i) => (
        <section className="concept" key={title}>
          <span>{num(i)}</span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </section>
      ))}
      <aside className="learning-note">
        <BookOpen size={21} />
        <div>
          <strong>记住这个关键点</strong>
          <p>{c.tip}</p>
        </div>
      </aside>
      <Link className="primary-link" to={"/course/" + id + "/code"}>
        看看代码如何实现
        <ArrowRight size={17} />
      </Link>
    </article>
  );
}
function CodePage() {
  const { chapter: id } = useParams();
  const c = getChapter(id);
  const [type, setType] = useState("CSS");
  const [variant, setVariant] = useState("基础示例");
  const changed = {
    [c.controls[0].key]: c.controls[0].options
      ? c.controls[0].options.at(-1)
      : c.controls[0].max,
  };
  const css = makeCss(c, variant === "变化示例" ? changed : {});
  const code = type === "CSS" ? css : c.html;
  return (
    <section className="code-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">READ THE CODE</span>
          <h2>从一个典型示例开始</h2>
          <p>{c.tip}</p>
        </div>
        <Segmented
          value={variant}
          onChange={setVariant}
          options={["基础示例", "变化示例"]}
        />
      </div>
      <div className="code-window">
        <div className="code-bar">
          <Segmented
            value={type}
            onChange={setType}
            options={["CSS", "HTML"]}
          />
          <Tooltip title="复制代码">
            <Button
              aria-label="复制代码"
              type="text"
              icon={<Copy size={16} />}
              onClick={() => copyText(code)}
            />
          </Tooltip>
        </div>
        <pre>
          {code.split("\n").map((line, i) => (
            <div className="code-line" key={i}>
              <span>{i + 1}</span>
              <code>{line || " "}</code>
            </div>
          ))}
        </pre>
      </div>
      <div className="code-explanation">
        <span className="eyebrow">RESULT</span>
        <h3>
          {variant === "基础示例" ? "默认布局效果" : "改变第一个参数后的效果"}
        </h3>
        <iframe
          title="典型代码效果"
          sandbox=""
          srcDoc={documentFor(c.html, css)}
        />
      </div>
      <Link className="primary-link" to={"/course/" + id + "/demo"}>
        进入实时实验
        <FlaskConical size={17} />
      </Link>
    </section>
  );
}
function DemoPage() {
  const { chapter: id } = useParams();
  return (
    <>
      <Lab key={id} chapter={getChapter(id)} />
      <div className="demo-next">
        <Link to={"/practice/" + id}>
          准备好了吗？完成本章挑战
          <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}
function NotFound() {
  return (
    <div className="empty not-found">
      <PanelsTopLeft size={44} />
      <span className="eyebrow">404 / NOT FOUND</span>
      <h1>这个页面还没有布局</h1>
      <p>地址可能有误，回到课程目录继续探索。</p>
      <Link className="primary-link" to="/">
        返回课程目录
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
export default function App() {
  const location = useLocation();
  const [progress, setProgress] = useState(() => {
    try {
      return readProgress(localStorage);
    } catch {
      return [];
    }
  });
  useEffect(() => {
    window.scrollTo?.(0, 0);
  }, [location.pathname]);
  const complete = (id) =>
    setProgress((old) => {
      const next = [...new Set([...old, id])];
      try {
        localStorage.setItem("layout-progress", JSON.stringify(next));
      } catch {
        message.warning("浏览器未允许保存进度，本次进度仍保留");
      }
      return next;
    });
  return (
    <ProgressContext.Provider value={progress}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content").focus();
        }}
      >
        {" "}
        跳到主要内容
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="brand" to="/">
            <span className="brand-icon">
              <PanelsTopLeft size={23} />
            </span>
            <strong>
              Layout<span>Lab</span>
            </strong>
            <span className="brand-caption">页面布局实验室</span>
          </Link>
          <nav aria-label="主导航">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive || location.pathname.startsWith("/course")
                  ? "active"
                  : ""
              }
            >
              课程学习
            </NavLink>
            <NavLink to="/practice">练习中心</NavLink>
          </nav>
          <Link className="header-progress" to="/practice">
            <span className="progress-dots">
              {chapters.map((c) => (
                <i
                  key={c.id}
                  className={progress.includes(c.id) ? "done" : ""}
                />
              ))}
            </span>
            <span>{progress.length}/8 已完成</span>
          </Link>
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
          Layout Lab
        </Link>
        <span>每一次调整，都是一次理解。</span>
        <span>页面布局课程 · 2026</span>
      </footer>
    </ProgressContext.Provider>
  );
}
