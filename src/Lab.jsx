import React, { useState } from "react";
import { Button, Slider, Select, Segmented, Tooltip, message } from "antd";
import {
  RotateCcw,
  Code2,
  Copy,
  Download,
  Monitor,
  Tablet,
  Smartphone,
  SlidersHorizontal,
} from "lucide-react";
import { defaults, makeCss, documentFor } from "./course";
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    message.success("已复制到剪贴板");
  } catch {
    message.warning("剪贴板不可用，请在编辑器中选择并复制代码");
  }
}
export default function Lab({ chapter }) {
  const [values, setValues] = useState(() => defaults(chapter));
  const [html, setHtml] = useState(chapter.html);
  const [custom, setCustom] = useState(null);
  const [editor, setEditor] = useState(false);
  const [viewport, setViewport] = useState("full");
  const css = custom ?? makeCss(chapter, values);
  const source = documentFor(html, css);
  const change = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setCustom(null);
  };
  const reset = () => {
    setValues(defaults(chapter));
    setHtml(chapter.html);
    setCustom(null);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([source], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = chapter.id + "-experiment.html";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <section className="lab">
      <div className="section-heading">
        <div>
          <span className="eyebrow">LIVE PLAYGROUND</span>
          <h2>让布局动起来</h2>
          <p>{chapter.tip}</p>
        </div>
        <span className="live-indicator">
          <i />
          实时预览
        </span>
      </div>
      <div className="lab-controls">
        <SlidersHorizontal size={18} />
        {chapter.controls.map((p) => (
          <div className="parameter" key={p.key}>
            <label id={"label-" + p.key}>
              {p.label}
              {!p.options && (
                <span>
                  {values[p.key]}
                  {p.key === "columns" ? "" : "px"}
                </span>
              )}
            </label>
            {p.options ? (
              <Select
                aria-labelledby={"label-" + p.key}
                value={values[p.key]}
                options={p.options.map((value) => ({ value, label: value }))}
                onChange={(v) => change(p.key, v)}
              />
            ) : (
              <Slider
                ariaLabelForHandle={p.label}
                min={p.min}
                max={p.max}
                value={values[p.key]}
                onChange={(v) => change(p.key, v)}
              />
            )}
          </div>
        ))}
        <Tooltip title="重置实验">
          <Button
            aria-label="重置实验"
            icon={<RotateCcw size={17} />}
            onClick={reset}
          />
        </Tooltip>
      </div>
      <div className="preview-shell">
        <div className="preview-bar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>{chapter.id}.html</span>
          <Segmented
            aria-label="预览宽度"
            value={viewport}
            onChange={setViewport}
            options={[
              {
                value: "360",
                label: (
                  <Tooltip title="手机 360px">
                    <Smartphone size={16} aria-label="手机 360px" />
                  </Tooltip>
                ),
              },
              {
                value: "768",
                label: (
                  <Tooltip title="平板 768px">
                    <Tablet size={16} aria-label="平板 768px" />
                  </Tooltip>
                ),
              },
              {
                value: "full",
                label: (
                  <Tooltip title="适应宽度">
                    <Monitor size={16} aria-label="适应宽度" />
                  </Tooltip>
                ),
              },
            ]}
          />
        </div>
        <div className="preview-canvas">
          <iframe
            title="实时布局预览"
            sandbox=""
            srcDoc={source}
            style={{ width: viewport === "full" ? "100%" : Number(viewport) }}
          />
        </div>
        <div className="preview-status">
          <span>
            <i />
            HTML + CSS
          </span>
          <span>
            {viewport === "full" ? "自适应视口" : viewport + "px 视口"} ·{" "}
            {custom === null ? "参数模式" : "自定义 CSS"}
          </span>
        </div>
      </div>
      <div className="lab-actions">
        <Button icon={<Code2 size={17} />} onClick={() => setEditor(!editor)}>
          {editor ? "收起代码" : "编辑代码"}
        </Button>
        <div>
          <Tooltip title="复制完整 HTML">
            <Button
              aria-label="复制完整 HTML"
              icon={<Copy size={17} />}
              onClick={() => copyText(source)}
            />
          </Tooltip>
          <Tooltip title="下载实验">
            <Button
              aria-label="下载实验"
              icon={<Download size={17} />}
              onClick={download}
            />
          </Tooltip>
        </div>
      </div>
      {editor && (
        <div className="editors">
          <label>
            HTML
            <textarea
              aria-label="HTML 编辑器"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
            />
          </label>
          <label>
            CSS
            <textarea
              aria-label="CSS 编辑器"
              value={css}
              onChange={(e) => setCustom(e.target.value)}
              spellCheck={false}
            />
          </label>
        </div>
      )}
    </section>
  );
}
