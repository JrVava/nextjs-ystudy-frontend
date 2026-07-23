"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import "./tools.css";

interface Question {
  q: string;
  opts: string[];
  correct: number;
}

const fallbackTests: Record<string, { title: string; pill: string; questions: Question[] }> = {
  b1: {
    title: "B1 Intermediate Interview Check",
    pill: "B1 · Intermediate",
    questions: [
      { q: "I ___ interested in studying Business Management.", opts: ["am", "is", "are", "be"], correct: 0 },
      { q: "She ___ to college twice a week.", opts: ["go", "goes", "going", "gone"], correct: 1 },
      { q: "Choose the best sentence.", opts: ["I have five years of experience in retail.", "I has five years experience.", "I am five years experience.", "I experience five years."], correct: 0 },
      { q: "What does “deadline” mean?", opts: ["A final date to complete something", "A place to study", "A type of loan", "A job title"], correct: 0 },
      { q: "Choose the correct question.", opts: ["Where you live?", "Where do you live?", "Where does you live?", "Where living you?"], correct: 1 },
      { q: "I want to study because ___.", opts: ["I want improve my future", "I want to improve my future", "I wants improving future", "I future improve"], correct: 1 },
      { q: "“The course includes lectures, workshops and assessments.” What does it include?", opts: ["Only exams", "Lectures, workshops and assessments", "Only online videos", "Only work placement"], correct: 1 },
      { q: "Choose the polite interview answer.", opts: ["I do not know anything.", "I am interested and willing to learn.", "This is boring.", "I want money only."], correct: 1 },
      { q: "I worked there ___ 2020 to 2024.", opts: ["from", "at", "on", "by"], correct: 0 },
      { q: "What is “experience”?", opts: ["Something you have done or learned", "A university building", "A payment", "A test room"], correct: 0 },
      { q: "Choose the best sentence.", opts: ["I can attend classes two days per week.", "I can attending classes.", "I can attends class.", "I can to attend class."], correct: 0 },
      { q: "“Applicants may be invited to an interview.” What may happen?", opts: ["They may have an interview", "They automatically fail", "They get funding immediately", "They must travel abroad"], correct: 0 },
      { q: "If I am accepted, I ___ start in September.", opts: ["will", "was", "did", "have"], correct: 0 },
      { q: "Choose the best word: I am ___ for a new opportunity.", opts: ["looking", "look", "looked", "looks"], correct: 0 },
      { q: "The opposite of “increase” is ___.", opts: ["reduce", "create", "arrive", "explain"], correct: 0 },
      { q: "Choose the correct form: My previous job ___ very busy.", opts: ["was", "were", "are", "be"], correct: 0 },
      { q: "What does “evidence” mean?", opts: ["Documents or proof", "A subject name", "A room number", "A salary"], correct: 0 },
      { q: "I need help ___ my application.", opts: ["with", "to", "on", "for to"], correct: 0 },
      { q: "Choose the best interview phrase.", opts: ["I have developed communication skills.", "I developing communication skill.", "I develop yesterday communication.", "I am communication."], correct: 0 },
      { q: "“Attendance is expected every week.” What does it mean?", opts: ["You should attend weekly", "You can attend once a year", "Attendance is not important", "Only online study is allowed"], correct: 0 }
    ],
  },
  b2: {
    title: "B2 Upper-Intermediate Interview Check",
    pill: "B2 · Upper-intermediate",
    questions: [
      { q: "Choose the best sentence.", opts: ["Although I work full-time, I can organise my study schedule.", "Although I working full-time, I can organise.", "I can organise although full-time working.", "Although work full-time I organised."], correct: 0 },
      { q: "The word “relevant” means ___.", opts: ["connected to the topic", "very expensive", "difficult to pronounce", "not allowed"], correct: 0 },
      { q: "If I had more time, I ___ more research before applying.", opts: ["would do", "will did", "do", "would done"], correct: 0 },
      { q: "“The provider offers additional academic support during the first term.” What is offered?", opts: ["Extra study support", "A guaranteed job", "A rent discount", "A shorter course"], correct: 0 },
      { q: "Choose the most formal phrase.", opts: ["I would like to explain my motivation.", "I wanna say why.", "I tell you my reason.", "My reason is this yeah."], correct: 0 },
      { q: "The course is suitable for students ___ have work experience.", opts: ["who", "which", "where", "when"], correct: 0 },
      { q: "I want to study business ___ it matches my management experience.", opts: ["because", "although", "unless", "despite"], correct: 0 },
      { q: "What does “assessment” mean?", opts: ["A task used to judge learning", "A bank payment", "A class timetable", "A phone interview only"], correct: 0 },
      { q: "Choose the best answer: “Why this course?”", opts: ["It links to my experience and future career goals.", "Because my friend said.", "I don’t know exactly.", "It is easy maybe."], correct: 0 },
      { q: "Which sentence is clearest?", opts: ["I managed stock, trained new staff and solved customer issues.", "I do many things in job and stuff.", "I was doing working there things.", "My job is good."], correct: 0 },
      { q: "The report must be submitted ___ Friday.", opts: ["by", "at", "in", "from"], correct: 0 },
      { q: "“Students are expected to analyse case studies.” What skill is needed?", opts: ["Understanding and explaining examples", "Only memorising names", "Driving to campus", "Paying fees"], correct: 0 },
      { q: "Choose the correct passive form.", opts: ["The application is reviewed by the admissions team.", "The application reviews by team.", "The application reviewed team.", "The application is review."], correct: 0 },
      { q: "What does “eligible” mean?", opts: ["Meeting the conditions", "Being late", "Being older than 30", "Having a job only"], correct: 0 },
      { q: "Choose the best sentence.", opts: ["My goal is to move into project coordination.", "My goal move project.", "I moving into goal project.", "Project is my goal move."], correct: 0 },
      { q: "“However” is used to ___.", opts: ["show contrast", "give a date", "ask a question", "show ownership"], correct: 0 },
      { q: "I have been working in hospitality ___ six years.", opts: ["for", "since", "during", "from"], correct: 0 },
      { q: "“The interview explores motivation, experience and study readiness.” What is discussed?", opts: ["Why you want to study, your background and readiness", "Only your age", "Only your income", "Only your passport"], correct: 0 },
      { q: "Choose the strongest phrase.", opts: ["I can give examples from my work experience.", "I have some things maybe.", "Examples are not needed.", "I cannot say."], correct: 0 },
      { q: "What does “progression route” mean?", opts: ["A path to the next study or career step", "A bus route", "A payment schedule", "A lecture room"], correct: 0 }
    ],
  },
  adv: {
    title: "Advanced C1/C2 Confidence Check",
    pill: "Advanced · C1/C2",
    questions: [
      { q: "Choose the most precise sentence.", opts: ["My professional experience has strengthened my ability to evaluate problems and communicate solutions.", "My job made me better with things.", "I know problems and talking.", "Experience is good for me."], correct: 0 },
      { q: "“Nevertheless” is closest in meaning to ___.", opts: ["however", "therefore", "because", "for example"], correct: 0 },
      { q: "The phrase “critically evaluate” means ___.", opts: ["judge strengths and weaknesses using evidence", "copy information exactly", "describe only personal opinion", "write a short list"], correct: 0 },
      { q: "Choose the best academic phrase.", opts: ["This suggests a connection between experience and career motivation.", "This says me job good.", "I think because yes.", "It is nice and important."], correct: 0 },
      { q: "If the evidence were stronger, the conclusion ___ more convincing.", opts: ["would be", "will be", "was be", "is being"], correct: 0 },
      { q: "“Applicants are expected to justify their course choice.” What should they do?", opts: ["Explain clear reasons", "Pay a deposit", "Choose randomly", "Avoid examples"], correct: 0 },
      { q: "Choose the correct sentence.", opts: ["Having worked in management, I understand the importance of clear planning.", "Having work management, I understand.", "I having worked and understand planning.", "Worked in management planning clear."], correct: 0 },
      { q: "The word “substantial” means ___.", opts: ["large or important", "temporary", "unclear", "optional"], correct: 0 },
      { q: "Which sentence is strongest for an interview?", opts: ["I can link my work experience to the modules and career outcomes of the course.", "I like course because maybe good.", "I want study and then see.", "Modules are there."], correct: 0 },
      { q: "“The policy may have implications for part-time students.” What are implications?", opts: ["Possible effects or consequences", "Lecture rooms", "Exam marks only", "Application forms"], correct: 0 },
      { q: "Choose the best connector: ___ the course is demanding, I am prepared to manage my time.", opts: ["Although", "Because of", "So that", "Unless"], correct: 0 },
      { q: "What does “coherent” mean?", opts: ["Clear and logically connected", "Very short", "Informal", "Copied"], correct: 0 },
      { q: "Choose the best sentence.", opts: ["My long-term aim is to progress into a management role where I can apply analytical and leadership skills.", "Long future role good management things.", "I want job better because course.", "Management is future and skill."], correct: 0 },
      { q: "“To what extent” questions ask you to ___.", opts: ["consider how far something is true", "give only one example", "write a definition", "ignore evidence"], correct: 0 },
      { q: "Choose the correct form.", opts: ["The skills I have developed are transferable to higher education.", "The skills I developed is transferable.", "My skills transferring to education.", "I transferable skills education."], correct: 0 },
      { q: "“Robust evidence” means evidence that is ___.", opts: ["strong and reliable", "short and easy", "new but irrelevant", "personal only"], correct: 0 },
      { q: "Choose the best phrase.", opts: ["I would welcome the opportunity to discuss my suitability in an interview.", "Give me place please.", "I need interview now.", "Interview is okay for me maybe."], correct: 0 },
      { q: "The opposite of “ambiguous” is ___.", opts: ["clear", "formal", "difficult", "academic"], correct: 0 },
      { q: "“Students must synthesise ideas from multiple sources.” This means ___.", opts: ["combine ideas from different sources", "memorise one sentence", "avoid reading", "write only opinions"], correct: 0 },
      { q: "Choose the best closing interview statement.", opts: ["I am motivated, realistic about the demands of study, and ready to take the next step with support.", "I finish now.", "I hope it is fine.", "This course yes."], correct: 0 }
    ],
  },
};

export interface EnglishLevelWidgetProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
    card?: {
      title?: string;
      description?: string;
      cards?: string[];
    };
    cards?: Array<{
      badge: string;
      title: string;
      description: string;
      buttonName: string;
      questions?: Array<{
        question: string;
        options: string[];
        correct_answer: number;
      }>;
    }>;
  };
  section3Data?: {
    status?: boolean;
    cards?: Array<{
      title: string;
      description: string;
      link?: string;
    }>;
  };
}

export function EnglishLevelWidget({ sectionData, section3Data }: EnglishLevelWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Map tests dynamically from CMS data, falling back to static questions
  const tests = useMemo(() => {
    if (sectionData?.cards && Array.isArray(sectionData.cards)) {
      const res: Record<string, { title: string; pill: string; questions: Question[] }> = {};
      sectionData.cards.forEach((c) => {
        const key = (c.badge || "").toLowerCase().trim();
        const levelKey = key === "c1" || key === "adv" ? "adv" : key;
        if (levelKey) {
          res[levelKey] = {
            title: c.title,
            pill: `${c.badge} · ${c.title.replace(" check", "").replace(" Check", "")}`,
            questions: (c.questions || []).map((q) => ({
              q: q.question,
              opts: q.options,
              correct: q.correct_answer,
            })),
          };
        }
      });
      return res;
    }
    return fallbackTests;
  }, [sectionData]);

  const startTest = (level: string) => {
    setActiveLevel(level);
    setCurrent(0);
    const qCount = tests[level]?.questions?.length || 0;
    setAnswers(Array(qCount).fill(-1));
    setShowResult(false);

    // Smooth scroll to test app anchor
    const el = document.getElementById("english-test-app");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnswerSelect = (ansIdx: number) => {
    const updated = [...answers];
    updated[current] = ansIdx;
    setAnswers(updated);
  };

  const activeTest = activeLevel ? tests[activeLevel] : null;
  const currentQ = activeTest ? activeTest.questions[current] : null;

  const handleNext = () => {
    if (!activeTest) return;
    if (answers[current] === -1) {
      alert("Please choose an answer before continuing.");
      return;
    }
    if (current < activeTest.questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResult(true);
      setTimeout(() => {
        if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
          (window as any).ystudySaveCurrentTool();
        }
      }, 120);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const score = useMemo(() => {
    if (!activeTest) return 0;
    let s = 0;
    activeTest.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) s++;
    });
    return s;
  }, [activeTest, answers]);

  // Determine feedback content matching mockup logic
  const feedback = useMemo(() => {
    if (!activeLevel) return null;
    let title = "";
    let text = "";
    let levelText = "";
    let bullets: string[] = [];

    if (activeLevel === "b1") {
      levelText = score >= 15 ? "Strong B1 confidence" : score >= 10 ? "B1 developing confidence" : "Adviser review recommended";
      title = score >= 10 ? "Likely ready to discuss course options" : "Speak to an adviser before choosing";
      text = score >= 10
        ? "Good news. Your result suggests you may be able to handle many university interview questions, especially for foundation-year or flexible routes."
        : "Some answers were difficult, but this does not mean you cannot study. The safest next step is to speak with an adviser about suitable interviews and course routes.";
      bullets = [
        "Use this result as guidance, not a final decision.",
        "Foundation-year and flexible routes may still be suitable.",
        "Speak to YStudy before self-rejecting."
      ];
    } else if (activeLevel === "b2") {
      levelText = score >= 15 ? "B2 interview confidence" : score >= 10 ? "B1/B2 confidence" : "Adviser review recommended";
      title = score >= 10 ? "Good interview confidence" : "Course guidance recommended";
      text = score >= 10
        ? "Your answers suggest strong potential for many undergraduate interviews, depending on the university, course and evidence required."
        : "You may still have course options. A YStudy adviser can help identify providers with realistic interview expectations.";
      bullets = [
        "B2-style confidence is useful for many interviews.",
        "Check each provider before applying.",
        "Save or send your result to an adviser for guidance."
      ];
    } else {
      levelText = score >= 15 ? "Advanced C1/C2 confidence" : score >= 10 ? "Upper-intermediate to advanced confidence" : "Adviser review recommended";
      title = score >= 10 ? "Strong academic English confidence" : "Review the right route with an adviser";
      text = score >= 10
        ? "Your result suggests confidence with advanced wording, academic reading and interview expression. Focus now on choosing the right degree and funding route."
        : "Some advanced questions were challenging, but you may still be suitable for many routes. Use adviser guidance rather than self-rejecting.";
      bullets = [
        "Advanced scores help with essays and interviews.",
        "Course choice and funding are now the key decisions.",
        "An adviser can connect this result to degree options."
      ];
    }

    return { title, text, levelText, bullets };
  }, [activeLevel, score]);

  const levelChoiceBadge = sectionData?.badge || "Built for mature students";
  const levelChoiceTitle = sectionData?.title || "Choose the right English check.";
  const levelChoiceDesc = sectionData?.description || "Most students should start with B1 or B2. The result is not a rejection — it helps decide whether to apply now, choose a flexible route, or speak to an adviser before the interview.";

  const sidebarTitle = sectionData?.card?.title || "This is not a rejection tool.";
  const sidebarDesc = sectionData?.card?.description || "English requirements vary by university, course and interview. Lower scores should not make a student self-reject.";
  const sidebarList = sectionData?.card?.cards || [
    "B1/B2: often enough to start exploring foundation-year and flexible routes.",
    "A1/A2 or unsure: speak to an adviser to identify realistic interviews and course options.",
    "Advanced: focus on choosing the right degree, funding and application route."
  ];

  const afterGridCards = section3Data?.cards || [
    { title: "What do universities expect?", description: "Different universities and courses ask different questions. Your result is a starting point for choosing the safest route." },
    { title: "B1 can be enough for many routes", description: "Many mature students progress through foundation-year, CertHE or flexible routes. The adviser checks which interviews are realistic." },
    { title: "Need course guidance?", description: "Do not self-reject. Use your result to discuss courses, foundation routes and interview expectations with YStudy." }
  ];

  return (
    <>
      <span className="anchor-target" id="test"></span>
      <section className="english-v607-wrap" id="english-test-app">
        <div className="container">

          {/* LEVEL SELECTION SCREEN */}
          {!activeLevel && (
            <div className="english-choice-shell" id="levelChoice">
              <div className="english-choice-head">
                <div>
                  <span className="pill">{levelChoiceBadge}</span>
                  <h2>{levelChoiceTitle}</h2>
                  <p>{levelChoiceDesc}</p>
                </div>
                <Link className="btn btn-white" href="/tools/degree-match">
                  Find course options
                </Link>
              </div>
              <div className="english-level-grid">
                <button className="english-level-card" onClick={() => startTest("b1")} type="button">
                  <span className="level-code">B1</span>
                  <h3>Intermediate interview check</h3>
                  <p>For students who can handle everyday English and want to check simple interview, grammar and reading confidence.</p>
                  <span className="start-line">Start B1 test →</span>
                </button>
                <button className="english-level-card" onClick={() => startTest("b2")} type="button">
                  <span className="level-code">B2</span>
                  <h3>Upper-intermediate check</h3>
                  <p>For students who can explain opinions, work experience and goals and want to check degree interview readiness.</p>
                  <span className="start-line">Start B2 test →</span>
                </button>
                <button className="english-level-card" onClick={() => startTest("adv")} type="button">
                  <span className="level-code">C1</span>
                  <h3>Advanced confidence check</h3>
                  <p>For confident speakers checking advanced vocabulary, academic reading and professional interview expression.</p>
                  <span className="start-line">Start advanced test →</span>
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE TEST AND RESULT VIEW GRID */}
          {activeLevel && (
            <div className="english-tool-grid">
              <div>

                {/* ACTIVE TEST CARD */}
                {!showResult && currentQ && activeTest && (
                  <div className="english-test-box" id="testCard">
                    <div className="test-head">
                      <div>
                        <span className="pill" id="testLevelPill">{activeTest.pill}</span>
                        <h2 id="testTitle">Question {current + 1}</h2>
                      </div>
                      <button className="btn btn-white" onClick={() => setActiveLevel(null)} type="button">
                        Change test
                      </button>
                    </div>
                    <div className="test-progress">
                      <div className="test-progress-track">
                        <i id="progressFill" style={{ width: `${((current + 1) / activeTest.questions.length) * 100}%` }}></i>
                      </div>
                      <div className="test-count" id="progressText">
                        {current + 1} / {activeTest.questions.length}
                      </div>
                    </div>
                    <div className="question-card" id="questionStage">
                      <h3>{currentQ.q}</h3>
                      <div className="answers">
                        {currentQ.opts.map((opt, oIdx) => {
                          const isSelected = answers[current] === oIdx;
                          return (
                            <button
                              key={oIdx}
                              className={`answer-btn ${isSelected ? "selected" : ""}`}
                              type="button"
                              onClick={() => handleAnswerSelect(oIdx)}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="test-actions">
                      <button
                        className="btn btn-white"
                        id="prevBtn"
                        type="button"
                        style={{ visibility: current === 0 ? "hidden" : "visible" }}
                        onClick={handlePrev}
                      >
                        ← Previous
                      </button>
                      <button className="btn btn-orange" id="nextBtn" type="button" onClick={handleNext}>
                        {current === activeTest.questions.length - 1 ? "See my result →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* RESULT CARD */}
                {showResult && activeTest && feedback && (
                  <div className="english-result-box" id="resultCard">
                    <div className="result-banner">
                      <span className="pill" id="resultPill">{activeTest.pill}</span>
                      <h2 id="resultTitle">{feedback.title}</h2>
                      <p id="resultText">{feedback.text}</p>
                      <div className="result-score">
                        <strong id="scoreText">{score}/{activeTest.questions.length}</strong>
                        <span id="levelText">{feedback.levelText}</span>
                      </div>
                      <div className="btnrow">
                        <Link className="btn btn-orange" href="/lead/adviser-call">
                          Talk to adviser
                        </Link>
                        <button className="btn btn-white" onClick={() => setShowModal(true)} type="button">
                          Save result
                        </button>
                        <button className="btn btn-white" onClick={() => startTest(activeLevel)} type="button">
                          Retake
                        </button>
                      </div>
                    </div>
                    <div className="result-detail-card">
                      <h3>Safest next step</h3>
                      <ul id="resultBullets">
                        {feedback.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* ASIDE SIDEBAR */}
              <aside className="english-side-box dark">
                <h3>{sidebarTitle}</h3>
                <p>{sidebarDesc}</p>
                <ul className="side-list">
                  {sidebarList.map((item, idx) => {
                    const colonIdx = item.indexOf(":");
                    if (colonIdx !== -1) {
                      const boldPart = item.substring(0, colonIdx + 1);
                      const normPart = item.substring(colonIdx + 1);
                      return (
                        <li key={idx}>
                          <b>{boldPart}</b>{normPart}
                        </li>
                      );
                    }
                    return <li key={idx}>{item}</li>;
                  })}
                </ul>
                <div className="btnrow" style={{ marginTop: "24px" }}>
                  <Link className="btn btn-orange" href="/lead/adviser-call">
                    Book Adviser Call
                  </Link>
                </div>
              </aside>
            </div>
          )}

          {/* EXTRA INFO AFTER CARDS GRID */}
          <div className="english-after-grid">
            {afterGridCards.map((card, idx) => (
              <div key={idx} className="after-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {card.title.includes("guidance") && (
                  <Link className="btn btn-blue" href="/tools/degree-match" style={{ marginTop: "12px" }}>
                    Open Degree Match
                  </Link>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ACCOUNT MODAL */}
      <div className={`account-modal ${showModal ? "is-open" : ""}`} id="accountModal">
        <div className="account-card">
          <span className="pill">Free YStudy account</span>
          <h2>Save your English result.</h2>
          <p>Create a free account to save your result, send it to an adviser and continue your application later.</p>
          <div className="btnrow" style={{ marginTop: "20px" }}>
            <Link className="btn btn-orange" href="/login">
              Create free account
            </Link>
            <button className="btn btn-white" onClick={() => setShowModal(false)}>
              Not now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnglishLevelWidget;
