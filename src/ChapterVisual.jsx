import React from "react";
import { Image, Monitor, Smartphone, Tablet } from "lucide-react";
import { useLanguage } from "./i18n";
export default function ChapterGraphic({ chapter, step = 0 }) {
  const { lang } = useLanguage();
  const L = (zh, en) => (lang === "en" ? en : zh);
  let graphic = null;
  if (chapter.id === "box-model") {
    graphic = (
      <div className="box-diagram">
        <span className="layer-label label-margin">margin</span>
        <div className="box-layer layer-margin">
          <span className="layer-label label-border">border</span>
          <div className="box-layer layer-border">
            <span className="layer-label label-padding">padding</span>
            <div className="box-layer layer-padding">
              <div className="content-chip">content</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (chapter.id === "flow") {
    graphic = (
      <div className="flow-diagram">
        <div className="flow-block-row">
          <span>{L("块级", "Block")}</span>
          <i />
          <i />
        </div>
        <div className="flow-inline-row">
          <span>{L("行内块", "Inline-block")}</span>
          <i />
          <i />
          <i />
        </div>
        <p>inline text · inline text</p>
      </div>
    );
  } else if (chapter.id === "position") {
    graphic = (
      <div className="position-diagram">
        <div className="position-reference">
          <span>{L("定位参考", "Reference")}</span>
        </div>
        <div className="position-card">
          <b>{L("偏移元素", "Offset")}</b>
          <small>top · left</small>
        </div>
        <span className="position-axis axis-top">top</span>
        <span className="position-axis axis-left">left</span>
      </div>
    );
  } else if (chapter.id === "flex") {
    graphic = (
      <div className="flex-diagram">
        <span className="axis-label main-axis">{L("主轴", "main axis")} →</span>
        <div className="flex-track">
          <i>A</i>
          <i>B</i>
          <i>C</i>
        </div>
        <span className="axis-label cross-axis">
          ↕ {L("交叉轴", "cross axis")}
        </span>
      </div>
    );
  } else if (chapter.id === "grid") {
    graphic = (
      <div className="grid-diagram">
        <span className="grid-label">grid line</span>
        <div className="grid-board">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <i key={item}>{item === 3 ? "span 2" : "1fr"}</i>
          ))}
        </div>
        <span className="gap-label">gap</span>
      </div>
    );
  } else if (chapter.id === "responsive") {
    graphic = (
      <div className="responsive-diagram">
        <div className="device phone">
          <Smartphone size={13} />
          <i />
          <i />
        </div>
        <div className="device tablet">
          <Tablet size={15} />
          <i />
          <i />
          <i />
        </div>
        <div className="device desktop">
          <Monitor size={18} />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  } else if (chapter.id === "patterns") {
    graphic = (
      <div className="patterns-diagram">
        <header>header</header>
        <aside>aside</aside>
        <main>main</main>
        <footer>footer</footer>
      </div>
    );
  } else {
    graphic = (
      <div className="project-diagram">
        {[0, 1, 2, 3].map((item) => (
          <div className={"gallery-card card-" + item} key={item}>
            <Image size={14} />
            <span>auto-fit</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div
      className={"chapter-graphic graphic-" + chapter.id}
      data-step={step}
      aria-hidden="true"
    >
      {graphic}
    </div>
  );
}
