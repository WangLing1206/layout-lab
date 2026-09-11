import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useLanguage, localized } from "./i18n";
const bi = (zh, en) => ({ zh, en });
const stageConfig = {
  "box-model": {
    cells: 1,
    steps: [
      {
        caption: bi("外边距", "Margin"),
        container: {
          padding: 28,
          border: "4px solid #d99c6a",
          background: "#f8e8d3",
        },
        cell: { background: "#bad4c0", padding: 18 },
      },
      {
        caption: bi("边框", "Border"),
        container: {
          padding: 18,
          border: "10px solid #d99c6a",
          background: "#f8e8d3",
        },
        cell: { background: "#bad4c0", padding: 14 },
      },
      {
        caption: bi("内边距", "Padding"),
        container: {
          padding: 34,
          border: "4px solid #d99c6a",
          background: "#f8e8d3",
        },
        cell: { background: "#bad4c0", padding: 26 },
      },
      {
        caption: bi("内容区", "Content"),
        container: {
          padding: 10,
          border: "4px solid #d99c6a",
          background: "#f8e8d3",
        },
        cell: { background: "#bad4c0", padding: 8 },
      },
    ],
  },
  flow: {
    cells: 6,
    steps: [
      {
        caption: bi("块级排列", "Block flow"),
        container: { display: "block" },
        cell: { display: "block", width: "100%", marginBottom: 6 },
      },
      {
        caption: bi("行内块", "Inline block"),
        container: { display: "block" },
        cell: { display: "inline-block", width: "30%", marginRight: 6 },
      },
      {
        caption: bi("行内", "Inline"),
        container: { display: "block" },
        cell: { display: "inline", width: "auto", marginRight: 8 },
      },
      {
        caption: bi("隐藏与占位", "Hidden but present"),
        container: { display: "block" },
        cell: {
          display: "inline-block",
          width: "30%",
          marginRight: 6,
          opacity: 0.25,
        },
      },
    ],
  },
  position: {
    cells: 2,
    steps: [
      {
        caption: bi("普通流", "Normal flow"),
        container: { position: "relative", minHeight: 150 },
        cell: { display: "inline-block", width: 90, height: 60, margin: 8 },
      },
      {
        caption: bi("相对定位", "Relative"),
        container: { position: "relative", minHeight: 150 },
        cell: {
          display: "inline-block",
          width: 90,
          height: 60,
          margin: 8,
          top: 18,
          left: 18,
          position: "relative",
        },
      },
      {
        caption: bi("绝对定位", "Absolute"),
        container: { position: "relative", minHeight: 150 },
        cell: {
          display: "inline-block",
          width: 90,
          height: 60,
          position: "absolute",
          top: 34,
          left: 44,
        },
      },
      {
        caption: bi("层叠上下文", "Stacking"),
        container: { position: "relative", minHeight: 150 },
        cell: {
          display: "inline-block",
          width: 90,
          height: 60,
          position: "absolute",
          top: 22,
          left: 72,
          zIndex: 2,
        },
      },
    ],
  },
  flex: {
    cells: 6,
    steps: [
      {
        caption: bi("主轴：行", "Main axis: row"),
        container: { display: "flex", flexDirection: "row", gap: 10 },
        cell: { flex: "0 0 22%" },
      },
      {
        caption: bi("主轴：列", "Main axis: column"),
        container: { display: "flex", flexDirection: "column", gap: 10 },
        cell: { flex: "0 0 auto", height: 30 },
      },
      {
        caption: bi("两端对齐", "Space between"),
        container: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        },
        cell: { flex: "0 0 18%" },
      },
      {
        caption: bi("间距变化", "Gap changes"),
        container: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 28,
        },
        cell: { flex: "0 0 16%" },
      },
    ],
  },
  grid: {
    cells: 6,
    steps: [
      {
        caption: bi("单列", "One column"),
        container: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
        cell: {},
      },
      {
        caption: bi("两列", "Two columns"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        },
        cell: {},
      },
      {
        caption: bi("三列", "Three columns"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        },
        cell: {},
      },
      {
        caption: bi("间距扩大", "Larger gap"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        },
        cell: {},
      },
    ],
  },
  responsive: {
    cells: 6,
    steps: [
      {
        caption: bi("手机视口", "Phone viewport"),
        container: {
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 8,
          width: "70%",
        },
        cell: {},
      },
      {
        caption: bi("平板视口", "Tablet viewport"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          width: "85%",
        },
        cell: {},
      },
      {
        caption: bi("桌面视口", "Desktop viewport"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          width: "100%",
        },
        cell: {},
      },
      {
        caption: bi("宽屏视口", "Wide viewport"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          width: "100%",
        },
        cell: {},
      },
    ],
  },
  patterns: {
    cells: 4,
    steps: [
      {
        caption: bi("语义结构", "Semantic structure"),
        container: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "40px 1fr 40px",
          gap: 8,
        },
        cell: {},
      },
      {
        caption: bi("侧栏在左", "Sidebar left"),
        container: {
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gridTemplateRows: "40px 1fr 40px",
          gap: 8,
        },
        cell: {},
      },
      {
        caption: bi("侧栏在右", "Sidebar right"),
        container: {
          display: "grid",
          gridTemplateColumns: "1fr 160px",
          gridTemplateRows: "40px 1fr 40px",
          gap: 8,
        },
        cell: {},
      },
      {
        caption: bi("小屏重排", "Small-screen stack"),
        container: {
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "40px 1fr 1fr 40px",
          gap: 8,
        },
        cell: {},
      },
    ],
  },
  project: {
    cells: 6,
    steps: [
      {
        caption: bi("自动列数", "Auto columns"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        },
        cell: { aspectRatio: "4 / 3" },
      },
      {
        caption: bi("最小宽度", "Minimum width"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        },
        cell: { aspectRatio: "4 / 3" },
      },
      {
        caption: bi("弹性轨道", "Flexible tracks"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        },
        cell: { aspectRatio: "4 / 3" },
      },
      {
        caption: bi("画廊节奏", "Gallery rhythm"),
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 18,
        },
        cell: { aspectRatio: "4 / 3" },
      },
    ],
  },
};
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return reduced;
}
export default function DynamicStage({
  chapter,
  compact = false,
  background = false,
}) {
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);
  useEffect(() => {
    if (!playing || reducedMotion) return;
    const id = setInterval(() => setStep((current) => (current + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [playing, reducedMotion]);
  const config = stageConfig[chapter.id] ?? stageConfig.grid;
  const current = config.steps[step];
  return (
    <section
      className={"dynamic-stage" + (compact ? " compact" : "")}
      aria-label={localized(
        {
          zh: chapter.title.zh + "动态布局演示",
          en: chapter.title.en + " layout motion",
        },
        lang,
      )}
    >
      <div className="stage-frame" style={current.container}>
        {Array.from({ length: config.cells }, (_, index) => (
          <span key={index} className="stage-cell" style={current.cell}>
            {index + 1}
          </span>
        ))}
      </div>
      {!background && (
        <div className="stage-caption">
          <span>{localized(current.caption, lang)}</span>
          <div className="stage-controls">
            <Button
              size="small"
              icon={playing ? <Pause size={14} /> : <Play size={14} />}
              onClick={() => setPlaying(!playing)}
              aria-label={
                playing
                  ? localized({ zh: "暂停动画", en: "Pause animation" }, lang)
                  : localized({ zh: "播放动画", en: "Play animation" }, lang)
              }
            />
            <Button
              size="small"
              icon={<RotateCcw size={14} />}
              onClick={() => {
                setStep(0);
                setPlaying(true);
              }}
              aria-label={localized({ zh: "重新播放", en: "Replay" }, lang)}
            />
          </div>
        </div>
      )}
      {!background && (
        <div className="stage-indicators" aria-hidden="true">
          {config.steps.map((_, index) => (
            <i key={index} className={index === step ? "active" : ""} />
          ))}
        </div>
      )}
    </section>
  );
}
