import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useLanguage, localized } from "./i18n";
import ChapterGraphic from "./ChapterVisual";
const bi = (zh, en) => ({ zh, en });
const captions = {
  "box-model": [
    bi("外边距与边框", "Margin and border"),
    bi("切换盒模型", "Switch box sizing"),
    bi("内边距空间", "Padding space"),
    bi("内容区域", "Content area"),
  ],
  flow: [
    bi("块级排列", "Block flow"),
    bi("行内块排列", "Inline-block flow"),
    bi("行内文本流", "Inline text flow"),
    bi("隐藏后的回流", "Hidden and reflow"),
  ],
  position: [
    bi("确定参照系", "Set the reference"),
    bi("相对偏移", "Relative offset"),
    bi("绝对定位", "Absolute positioning"),
    bi("包含块关系", "Containing block"),
  ],
  flex: [
    bi("主轴方向", "Main axis"),
    bi("交叉轴对齐", "Cross axis"),
    bi("剩余空间分配", "Free-space distribution"),
    bi("间距与换行", "Gap and wrapping"),
  ],
  grid: [
    bi("一列轨道", "One track"),
    bi("两列轨道", "Two tracks"),
    bi("三列轨道", "Three tracks"),
    bi("间距不是轨道", "Gap is not a track"),
  ],
  responsive: [
    bi("手机视口", "Phone viewport"),
    bi("平板视口", "Tablet viewport"),
    bi("桌面视口", "Desktop viewport"),
    bi("内容决定断点", "Content decides breakpoints"),
  ],
  patterns: [
    bi("页面骨架", "Page skeleton"),
    bi("侧栏在左", "Sidebar left"),
    bi("侧栏在右", "Sidebar right"),
    bi("小屏重排", "Small-screen reflow"),
  ],
  project: [
    bi("自动适配列数", "Auto columns"),
    bi("限制最小宽度", "Minimum width"),
    bi("弹性轨道", "Flexible tracks"),
    bi("保持视觉节奏", "Keep visual rhythm"),
  ],
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
  const steps = captions[chapter.id] ?? captions.grid;
  return (
    <section
      className={"dynamic-stage" + (compact ? " compact" : "")}
      aria-label={
        lang === "en"
          ? chapter.title.en + " layout motion"
          : chapter.title.zh + "动态布局演示"
      }
    >
      <ChapterGraphic chapter={chapter} step={step} />
      {!background && (
        <div className="stage-caption">
          <span>{localized(steps[step], lang)}</span>
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
          {steps.map((_, index) => (
            <i key={index} className={index === step ? "active" : ""} />
          ))}
        </div>
      )}
    </section>
  );
}
