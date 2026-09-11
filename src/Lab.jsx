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
import { localized, useLanguage } from "./i18n";
const copy = {
  zh: {
    playground: "LIVE PLAYGROUND",
    title: "让布局动起来",
    live: "实时预览",
    reset: "重置实验",
    edit: "编辑代码",
    close: "收起代码",
    copy: "复制完整 HTML",
    copied: "已复制到剪贴板",
    copyFailed: "剪贴板不可用，请在编辑器中选择并复制代码",
    download: "下载实验",
    preview: "实时布局预览",
    viewport: "预览宽度",
    phone: "手机 360px",
    tablet: "平板 768px",
    full: "适应宽度",
    autoViewport: "自适应视口",
    pxViewport: "px 视口",
    parameterMode: "参数模式",
    customMode: "自定义 CSS",
  },
  en: {
    playground: "LIVE PLAYGROUND",
    title: "Make layout move",
    live: "Live preview",
    reset: "Reset demo",
    edit: "Edit code",
    close: "Close code",
    copy: "Copy full HTML",
    copied: "Copied to clipboard",
    copyFailed: "Clipboard unavailable. Select and copy from the editor.",
    download: "Download demo",
    preview: "Live layout preview",
    viewport: "Preview width",
    phone: "Phone 360px",
    tablet: "Tablet 768px",
    full: "Fit width",
    autoViewport: "Responsive viewport",
    pxViewport: "px viewport",
    parameterMode: "Parameter mode",
    customMode: "Custom CSS",
  },
};
export async function copyText(text, lang = "zh") {
  try {
    await navigator.clipboard.writeText(text);
    message.success(copy[lang].copied);
  } catch {
    message.warning(copy[lang].copyFailed);
  }
}
export default function Lab({ chapter }) {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [values, setValues] = useState(() => defaults(chapter));
  const [html, setHtml] = useState(chapter.html);
  const [custom, setCustom] = useState(null);
  const [editor, setEditor] = useState(false);
  const [viewport, setViewport] = useState("full");
  const css = custom ?? makeCss(chapter, values);
  const source = documentFor(html, css, lang);
  const change = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
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
          <span className="eyebrow">{t.playground}</span>
          <h2>{t.title}</h2>
          <p>{localized(chapter.tip, lang)}</p>
        </div>
        <span className="live-indicator">
          <i />
          {t.live}
        </span>
      </div>
      <div className="lab-controls">
        <SlidersHorizontal size={18} />
        {chapter.controls.map((parameter) => (
          <div className="parameter" key={parameter.key}>
            <label id={"label-" + parameter.key}>
              {localized(parameter.label, lang)}
              {!parameter.options && (
                <span>
                  {values[parameter.key]}
                  {parameter.key === "columns" ? "" : "px"}
                </span>
              )}
            </label>
            {parameter.options ? (
              <Select
                aria-labelledby={"label-" + parameter.key}
                value={values[parameter.key]}
                options={parameter.options.map((value) => ({
                  value,
                  label: value,
                }))}
                onChange={(value) => change(parameter.key, value)}
              />
            ) : (
              <Slider
                ariaLabelForHandle={localized(parameter.label, lang)}
                min={parameter.min}
                max={parameter.max}
                value={values[parameter.key]}
                onChange={(value) => change(parameter.key, value)}
              />
            )}
          </div>
        ))}
        <Tooltip title={t.reset}>
          <Button
            aria-label={t.reset}
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
            aria-label={t.viewport}
            value={viewport}
            onChange={setViewport}
            options={[
              {
                value: "360",
                label: (
                  <Tooltip title={t.phone}>
                    <Smartphone size={16} aria-label={t.phone} />
                  </Tooltip>
                ),
              },
              {
                value: "768",
                label: (
                  <Tooltip title={t.tablet}>
                    <Tablet size={16} aria-label={t.tablet} />
                  </Tooltip>
                ),
              },
              {
                value: "full",
                label: (
                  <Tooltip title={t.full}>
                    <Monitor size={16} aria-label={t.full} />
                  </Tooltip>
                ),
              },
            ]}
          />
        </div>
        <div className="preview-canvas">
          <iframe
            title={t.preview}
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
            {viewport === "full" ? t.autoViewport : viewport + t.pxViewport} ·{" "}
            {custom === null ? t.parameterMode : t.customMode}
          </span>
        </div>
      </div>
      <div className="lab-actions">
        <Button icon={<Code2 size={17} />} onClick={() => setEditor(!editor)}>
          {editor ? t.close : t.edit}
        </Button>
        <div>
          <Tooltip title={t.copy}>
            <Button
              aria-label={t.copy}
              icon={<Copy size={17} />}
              onClick={() => copyText(source, lang)}
            />
          </Tooltip>
          <Tooltip title={t.download}>
            <Button
              aria-label={t.download}
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
              aria-label="HTML editor"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
            />
          </label>
          <label>
            CSS
            <textarea
              aria-label="CSS editor"
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
