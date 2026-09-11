import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Radio, Alert } from "antd";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import { chapters, getChapter } from "./course";
import Lab from "./Lab";
import { localized, useLanguage } from "./i18n";
const copy = {
  zh: {
    listEyebrow: "LEARN BY DOING",
    listTitle: "把理解，变成你的能力。",
    listText: "先动手实验，再用一道问题检验自己的理解。",
    challenge: "挑战",
    intro: "先动手实验，再用一道问题检验自己的理解。",
    pending: "待挑战",
    done: "已完成",
    missing: "练习不存在",
    back: "返回练习中心",
    eyebrow: "CHAPTER CHALLENGE",
    question: "理解自测 · 单选",
    submit: "提交答案",
    correct: "回答正确，已记录学习进度",
    wrong: "再想一想，可以在下方实验中验证",
    review: "回顾本章知识",
  },
  en: {
    listEyebrow: "LEARN BY DOING",
    listTitle: "Turn understanding into ability.",
    listText: "Experiment first, then test your understanding with a question.",
    challenge: "Challenge",
    intro: "Experiment first, then test your understanding with a question.",
    pending: "To do",
    done: "Completed",
    missing: "Practice not found",
    back: "Back to practice",
    eyebrow: "CHAPTER CHALLENGE",
    question: "Knowledge check · Single choice",
    submit: "Submit answer",
    correct: "Correct. Progress has been saved.",
    wrong: "Think again, then verify in the demo below.",
    review: "Review chapter knowledge",
  },
};
export function PracticeList({ progress }) {
  const { lang } = useLanguage();
  const t = copy[lang];
  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">{t.listEyebrow}</span>
        <h1>{t.listTitle}</h1>
        <p>{t.listText}</p>
      </div>
      <div className="practice-list">
        {chapters.map((chapter, index) => (
          <Link to={"/practice/" + chapter.id} key={chapter.id}>
            <span className="practice-number" style={{ color: chapter.color }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>
                {localized(chapter.title, lang)}
                {t.challenge}
              </h3>
              <p>{localized(chapter.intro, lang)}</p>
            </div>
            <span className="practice-state">
              {progress.includes(chapter.id) ? (
                <>
                  <CheckCircle2 size={18} />
                  {t.done}
                </>
              ) : (
                <>
                  <FlaskConical size={18} />
                  {t.pending}
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
  const chapter = getChapter(id);
  const { lang } = useLanguage();
  const t = copy[lang];
  return chapter ? (
    <Challenge key={id + lang} chapter={chapter} complete={complete} />
  ) : (
    <div className="empty">
      <h1>{t.missing}</h1>
      <Link to="/practice">{t.back}</Link>
    </div>
  );
}
function Challenge({ chapter: chapter, complete }) {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = answer === chapter.question.answer;
  return (
    <div className="page">
      <div className="crumb">
        <Link to="/practice">{t.back}</Link>
        <span>/</span>
        {localized(chapter.title, lang)}
      </div>
      <div className="page-heading">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>
          {localized(chapter.title, lang)}
          {t.challenge}
        </h1>
        <p>{localized(chapter.intro, lang)}</p>
      </div>
      <section className="question">
        <span className="eyebrow">{t.question}</span>
        <h2>{localized(chapter.question.text, lang)}</h2>
        <Radio.Group
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setSubmitted(false);
          }}
        >
          {chapter.question.options.map((option, index) => (
            <Radio key={option.zh} value={index}>
              <span className="answer-letter">
                {String.fromCharCode(65 + index)}
              </span>
              {localized(option, lang)}
            </Radio>
          ))}
        </Radio.Group>
        <Button
          type="primary"
          disabled={answer === null}
          onClick={() => {
            setSubmitted(true);
            if (correct) complete(chapter.id);
          }}
        >
          {t.submit}
        </Button>
        {submitted && (
          <Alert
            showIcon
            type={correct ? "success" : "warning"}
            message={correct ? t.correct : t.wrong}
            description={
              correct
                ? localized(chapter.question.explanation, lang)
                : lang === "en"
                  ? "Review the concept or adjust the demo, then try again."
                  : "回到知识点或调整实验参数，再试一次。"
            }
          />
        )}
        <Link to={"/course/" + chapter.id + "/knowledge"}>
          {t.review}
          <ArrowRight size={14} />
        </Link>
      </section>
      <Lab chapter={chapter} />
    </div>
  );
}
