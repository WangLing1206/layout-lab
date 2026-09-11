import React from "react";
import { Button, Tooltip } from "antd";
import { Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
export default function CodeBlock({
  code,
  language = "css",
  filename,
  copyLabel,
  onCopy,
  note,
}) {
  return (
    <div className="code-block">
      <div className="code-block-bar">
        <div className="code-file">
          <span className="code-dot" />
          <strong>{filename}</strong>
          <span className="code-language">
            {language === "markup" ? "HTML" : "CSS"}
          </span>
        </div>
        <Tooltip title={copyLabel}>
          <Button
            aria-label={copyLabel}
            type="text"
            icon={<Copy size={16} />}
            onClick={onCopy}
          />
        </Tooltip>
      </div>
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " code-highlight"} style={style}>
            <code>
              {tokens.map((line, index) => {
                const lineProps = getLineProps({ line });
                return (
                  <span
                    {...lineProps}
                    className={"code-row " + (lineProps.className || "")}
                    key={index}
                  >
                    <span className="code-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="code-source">
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </span>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
      {note && <div className="code-note">{note}</div>}
    </div>
  );
}
