import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Radio, Alert } from "antd";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import { chapters, getChapter } from "./course";
import Lab from "./Lab";
export function PracticeList({ progress }) {
  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">LEARN BY DOING</span>
        <h1>把理解，变成你的能力。</h1>
        <p>先动手实验，再用一道问题检验自己的理解。</p>
      </div>
      <div className="practice-list">
        {chapters.map((c, i) => (
          <Link to={"/practice/" + c.id} key={c.id}>
            <span className="practice-number" style={{ color: c.color }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{c.title}挑战</h3>
              <p>{c.intro}</p>
            </div>
            <span className="practice-state">
              {progress.includes(c.id) ? (
                <>
                  <CheckCircle2 size={18} />
                  已完成
                </>
              ) : (
                <>
                  <FlaskConical size={18} />
                  待挑战
                </>
              )}
            </span>
            <ArrowRight size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
}
export function PracticeDetail({ complete }) {
  const { id } = useParams();
  const c = getChapter(id);
  return c ? (
    <Challenge key={id} chapter={c} complete={complete} />
  ) : (
    <div className="empty">
      <h1>练习不存在</h1>
      <Link to="/practice">返回练习中心</Link>
    </div>
  );
}
function Challenge({ chapter: c, complete }) {
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = answer === c.question.answer;
  return (
    <div className="page">
      <div className="crumb">
        <Link to="/practice">练习中心</Link>
        <span>/</span>
        {c.title}
      </div>
      <div className="page-heading">
        <span className="eyebrow">CHAPTER CHALLENGE</span>
        <h1>{c.title}挑战</h1>
        <p>{c.intro}</p>
      </div>
      <section className="question">
        <span className="eyebrow">理解自测 · 单选</span>
        <h2>{c.question.text}</h2>
        <Radio.Group
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setSubmitted(false);
          }}
        >
          {c.question.options.map((o, i) => (
            <Radio key={o} value={i}>
              <span className="answer-letter">
                {String.fromCharCode(65 + i)}
              </span>
              {o}
            </Radio>
          ))}
        </Radio.Group>
        <Button
          type="primary"
          disabled={answer === null}
          onClick={() => {
            setSubmitted(true);
            if (correct) complete(c.id);
          }}
        >
          提交答案
        </Button>
        {submitted && (
          <Alert
            showIcon
            type={correct ? "success" : "warning"}
            message={
              correct
                ? "回答正确，已记录学习进度"
                : "再想一想，可以在下方实验中验证"
            }
            description={
              correct
                ? c.question.explanation
                : "回到知识点或调整实验参数，再试一次。"
            }
          />
        )}
        <Link to={"/course/" + c.id + "/knowledge"}>
          回顾本章知识 <ArrowRight size={14} />
        </Link>
      </section>
      <Lab chapter={c} />
    </div>
  );
}
