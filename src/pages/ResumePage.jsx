import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/ui/Layout";
import toast from "react-hot-toast";

const resumeTips = [
  { id: 1, category: "Format", icon: "📐", tip: "Keep resume to 1 page only", priority: "High", done: false },
  { id: 2, category: "Format", icon: "🔤", tip: "Use standard fonts — Arial, Calibri, Times New Roman", priority: "High", done: false },
  { id: 3, category: "Content", icon: "💪", tip: "Start every bullet with an action verb — Built, Designed, Improved", priority: "High", done: false },
  { id: 4, category: "Content", icon: "📊", tip: "Add numbers — 'Improved performance by 40%' not 'Improved performance'", priority: "High", done: false },
  { id: 5, category: "Projects", icon: "🔗", tip: "Add GitHub and Live link to every project", priority: "High", done: false },
  { id: 6, category: "Projects", icon: "⚡", tip: "Mention tech stack used in each project", priority: "Medium", done: false },
  { id: 7, category: "Skills", icon: "🎯", tip: "Add keywords from job descriptions — React, Node.js, SQL", priority: "High", done: false },
  { id: 8, category: "Skills", icon: "❌", tip: "Remove soft skills like 'hardworking', 'team player' — everyone says this", priority: "Medium", done: false },
  { id: 9, category: "Education", icon: "🏫", tip: "Mention CGPA only if above 7.0", priority: "Low", done: false },
  { id: 10, category: "ATS", icon: "🤖", tip: "Avoid tables, columns, headers/footers — ATS can't read them", priority: "High", done: false },
  { id: 11, category: "ATS", icon: "📝", tip: "Use simple section names: Experience, Projects, Skills, Education", priority: "Medium", done: false },
  { id: 12, category: "Links", icon: "💼", tip: "Add LinkedIn profile with custom URL", priority: "Medium", done: false },
];

const scoreMetrics = [
  { name: "Action Verbs", weight: 20, color: "#22c55e" },
  { name: "Quantified Results", weight: 25, color: "#f59e0b" },
  { name: "ATS Keywords", weight: 25, color: "#8b5cf6" },
  { name: "Formatting", weight: 15, color: "#38bdf8" },
  { name: "Projects Section", weight: 15, color: "#f472b6" },
];

const atsKeywords = [
  "React", "Node.js", "Python", "JavaScript", "TypeScript",
  "SQL", "MongoDB", "REST API", "Git", "Agile",
  "Data Structures", "Algorithms", "System Design",
  "Machine Learning", "AWS", "Docker",
];

const resumeTemplates = [
  { name: "SDE Fresher", desc: "Best for software engineering roles", recommended: true },
  { name: "Data Analyst", desc: "For data/analytics focused roles", recommended: false },
  { name: "Full Stack", desc: "Shows both frontend & backend", recommended: false },
];

export default function ResumePage() {
  const [tips, setTips] = useState(resumeTips);
  const [scores, setScores] = useState({ 0: 75, 1: 45, 2: 60, 3: 90, 4: 50 });
  const [activeTab, setActiveTab] = useState("checker");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [foundKeywords, setFoundKeywords] = useState([]);
  const [missingKeywords] = useState(["TypeScript", "Docker", "AWS", "Agile", "System Design"]);

  const doneTips = tips.filter((t) => t.done).length;
  const totalScore = Math.round(
    scoreMetrics.reduce((sum, m, i) => sum + (scores[i] / 100) * m.weight, 0)
  );

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return { text: "Strong ✅", color: "text-green-400" };
    if (score >= 60) return { text: "Good 🔶", color: "text-yellow-400" };
    return { text: "Needs Work ⚠️", color: "text-red-400" };
  };

  const toggleTip = (id) => {
    setTips((prev) =>
      prev.map((t) => t.id === id ? { ...t, done: !t.done } : t)
    );
    const tip = tips.find((t) => t.id === id);
    if (!tip.done) {
      toast.success("+5 XP — Tip applied! 📄");
    }
  };

  const analyzeResume = () => {
    setAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setFoundKeywords(["React", "JavaScript", "Python", "Git", "SQL", "MongoDB"]);
      setScores({ 0: 75, 1: 45, 2: 60, 3: 90, 4: 50 });
      toast.success("Resume analyzed! Score: " + totalScore + "/100 📄");
    }, 2500);
  };

  const tabs = [
    { id: "checker", label: "Resume Checker", icon: "✅" },
    { id: "score", label: "ATS Score", icon: "📊" },
    { id: "tips", label: "Improvement Tips", icon: "💡" },
    { id: "templates", label: "Templates", icon: "📄" },
  ];

  return (
    <Layout>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-1">Resume Builder 📄</h1>
        <p className="text-gray-400 text-sm">
          Get ATS score, fix mistakes, and make your resume
          recruiter-ready
        </p>
      </div>

      {/* Score Preview Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20
                     border border-purple-500/20 rounded-2xl p-5 text-center"
        >
          <div className={`text-4xl font-black mb-1 ${getScoreColor(totalScore)}`}>
            {analyzed ? totalScore : "--"}
          </div>
          <div className="text-gray-400 text-xs">ATS Score / 100</div>
          {analyzed && (
            <div className={`text-xs mt-1 font-medium ${getScoreLabel(totalScore).color}`}>
              {getScoreLabel(totalScore).text}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/15 to-teal-500/15
                     border border-green-500/20 rounded-2xl p-5 text-center"
        >
          <div className="text-4xl font-black mb-1 text-green-400">
            {doneTips}
          </div>
          <div className="text-gray-400 text-xs">Tips Applied</div>
          <div className="text-xs text-gray-600 mt-1">
            of {tips.length} total
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/15 to-cyan-500/15
                     border border-blue-500/20 rounded-2xl p-5 text-center"
        >
          <div className="text-4xl font-black mb-1 text-blue-400">
            {analyzed ? foundKeywords.length : "--"}
          </div>
          <div className="text-gray-400 text-xs">Keywords Found</div>
          <div className="text-xs text-gray-600 mt-1">
            {analyzed ? `${missingKeywords.length} missing` : "Analyze first"}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6 bg-white/[0.03]
                      border border-white/10 rounded-2xl p-1.5">
        {tabs.map((tab) => (
          <button key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                        text-xs font-semibold transition-all flex-1
                        justify-center
                        ${activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "text-gray-400 hover:text-white"
                        }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ===== TAB 1 — RESUME CHECKER ===== */}
      {activeTab === "checker" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {!analyzed ? (
            <>
              {/* Upload Zone */}
              <div
                onClick={analyzeResume}
                className="border-2 border-dashed border-purple-500/30
                           rounded-3xl p-12 text-center cursor-pointer
                           hover:border-purple-500/60 hover:bg-purple-500/5
                           transition-all mb-6 group"
              >
                <AnimatePresence mode="wait">
                  {analyzing ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="text-5xl mb-4 inline-block"
                      >
                        ⚙️
                      </motion.div>
                      <div className="text-white font-bold mb-2">
                        Analyzing your resume...
                      </div>
                      <div className="text-gray-500 text-sm">
                        Checking ATS compatibility, keywords, format
                      </div>
                      {/* Loading bar */}
                      <div className="w-48 h-1.5 bg-white/10 rounded-full
                                      mx-auto mt-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.5 }}
                          className="h-full bg-gradient-to-r from-purple-500
                                     to-pink-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="upload">
                      <div className="text-5xl mb-4">📎</div>
                      <div className="text-white font-bold text-lg mb-2">
                        Drop your resume here
                      </div>
                      <div className="text-gray-500 text-sm mb-4">
                        PDF or DOCX supported
                      </div>
                      <div className="inline-flex items-center gap-2
                                      bg-gradient-to-r from-purple-600
                                      to-pink-600 text-white px-6 py-2.5
                                      rounded-xl text-sm font-bold
                                      group-hover:shadow-lg transition-all">
                        📤 Upload & Analyze
                      </div>
                      <div className="text-gray-600 text-xs mt-4">
                        Or click anywhere to simulate analysis
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick tips before upload */}
              <div className="bg-blue-500/5 border border-blue-500/15
                              rounded-2xl p-5">
                <h3 className="font-bold text-sm mb-3 text-blue-400">
                  📌 Before you upload — quick checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {["File is PDF format",
                    "No photos or tables",
                    "Standard font used",
                    "File size under 2MB"].map((c) => (
                    <div key={c}
                      className="flex items-center gap-2 text-xs
                                 text-gray-400">
                      <span className="text-green-400">✓</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* After Analysis */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Score Circle */}
              <div className="bg-white/[0.04] border border-white/10
                              rounded-3xl p-6 mb-6 text-center relative
                              overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br
                                from-purple-500/5 to-pink-500/5
                                pointer-events-none" />
                <div className={`text-6xl font-black mb-2
                                 ${getScoreColor(totalScore)}`}>
                  {totalScore}
                </div>
                <div className="text-gray-300 font-bold text-lg mb-1">
                  out of 100
                </div>
                <div className={`text-sm font-medium mb-4
                                 ${getScoreLabel(totalScore).color}`}>
                  {getScoreLabel(totalScore).text}
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full
                                overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalScore}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-purple-500
                               to-pink-500 rounded-full"
                  />
                </div>
                <p className="text-gray-400 text-sm">
                  Fix the suggestions below to reach 85+ score
                </p>
              </div>

              {/* Re-analyze button */}
              <button
                onClick={() => setAnalyzed(false)}
                className="w-full bg-white/5 border border-white/10
                           text-gray-300 rounded-xl py-2.5 text-sm
                           font-medium hover:border-purple-500/40
                           transition mb-6"
              >
                📎 Upload Different Resume
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ===== TAB 2 — ATS SCORE ===== */}
      {activeTab === "score" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score Breakdown */}
          <div className="bg-white/[0.04] border border-white/10
                          rounded-2xl p-6">
            <h2 className="font-black text-base mb-5">
              Score Breakdown 📊
            </h2>
            <div className="space-y-4">
              {scoreMetrics.map((m, i) => (
                <div key={m.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">{m.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        weight: {m.weight}%
                      </span>
                      <span className="text-sm font-bold"
                        style={{ color: m.color }}>
                        {scores[i]}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full
                                  overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scores[i]}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Found */}
          <div className="bg-white/[0.04] border border-white/10
                          rounded-2xl p-6">
            <h2 className="font-black text-base mb-4">
              🔍 ATS Keyword Analysis
            </h2>

            <div className="mb-4">
              <div className="text-xs text-green-400 font-bold mb-2 uppercase tracking-wider">
                ✅ Found in your resume ({foundKeywords.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {foundKeywords.map((k) => (
                  <span key={k}
                    className="px-3 py-1.5 bg-green-500/10 border
                               border-green-500/20 text-green-400 text-xs
                               rounded-xl font-medium">
                    ✓ {k}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-red-400 font-bold mb-2
                              uppercase tracking-wider">
                ❌ Missing — Add These ({missingKeywords.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((k) => (
                  <span key={k}
                    className="px-3 py-1.5 bg-red-500/10 border
                               border-red-500/20 text-red-400 text-xs
                               rounded-xl font-medium">
                    + {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Top Improvements */}
          <div className="bg-white/[0.04] border border-white/10
                          rounded-2xl p-6">
            <h2 className="font-black text-base mb-4">
              ⚠️ Top 3 Issues to Fix
            </h2>
            <div className="space-y-3">
              {[
                { issue: "No quantified results", fix: "Add numbers like 'Reduced load time by 30%'", impact: "High" },
                { issue: "Missing keywords", fix: "Add TypeScript, Docker, Agile to skills", impact: "High" },
                { issue: "Weak project descriptions", fix: "Add GitHub links and tech stack to all projects", impact: "Medium" },
              ].map((item, i) => (
                <div key={i}
                  className="flex gap-4 bg-orange-500/5 border
                             border-orange-500/15 rounded-xl p-4">
                  <span className="text-orange-400 text-lg mt-0.5">⚠️</span>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">
                      {item.issue}
                    </div>
                    <div className="text-xs text-gray-400">{item.fix}</div>
                    <span className={`inline-block mt-2 text-[10px]
                                     font-bold px-2 py-0.5 rounded-full
                                     ${item.impact === "High"
                                       ? "bg-red-500/15 text-red-400 border border-red-500/20"
                                       : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                                     }`}>
                      {item.impact} Impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== TAB 3 — IMPROVEMENT TIPS ===== */}
      {activeTab === "tips" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">
              Tick each tip as you apply it — earn +5 XP each!
            </p>
            <span className="text-xs bg-purple-500/15 text-purple-400
                             border border-purple-500/20 px-3 py-1
                             rounded-full font-bold">
              {doneTips}/{tips.length} done
            </span>
          </div>

          {/* Group by category */}
          {["Format", "Content", "Projects", "Skills", "ATS", "Links",
            "Education"].map((cat) => {
            const catTips = tips.filter((t) => t.category === cat);
            if (!catTips.length) return null;
            return (
              <div key={cat} className="mb-6">
                <div className="text-xs font-black text-gray-500 uppercase
                                tracking-wider mb-3">
                  {cat}
                </div>
                <div className="space-y-2">
                  {catTips.map((tip) => (
                    <motion.div
                      key={tip.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleTip(tip.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl
                                  border cursor-pointer transition-all
                                  ${tip.done
                                    ? "bg-green-500/5 border-green-500/15 opacity-60"
                                    : "bg-white/[0.04] border-white/10 hover:border-purple-500/30"
                                  }`}
                    >
                      <div className={`w-6 h-6 rounded-lg border-2
                                       flex items-center justify-center
                                       flex-shrink-0 transition-all
                                       ${tip.done
                                         ? "bg-green-500 border-green-500"
                                         : "border-gray-600"
                                       }`}>
                        {tip.done && (
                          <svg className="w-3 h-3 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-lg">{tip.icon}</span>
                      <div className="flex-1">
                        <span className={`text-sm ${tip.done
                          ? "line-through text-gray-500" : "text-white"}`}>
                          {tip.tip}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1
                                        rounded-lg border whitespace-nowrap
                                        ${tip.priority === "High"
                                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                                          : tip.priority === "Medium"
                                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                                        }`}>
                        {tip.priority}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* ===== TAB 4 — TEMPLATES ===== */}
      {activeTab === "templates" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-400 text-sm mb-6">
            ATS-friendly resume templates — proven to get shortlisted
          </p>
          <div className="space-y-4">
            {resumeTemplates.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.04] border border-white/10
                           rounded-2xl p-5 flex items-center gap-5
                           hover:border-purple-500/30 transition-all"
              >
                <div className="w-16 h-20 bg-white/10 rounded-xl
                                flex items-center justify-center
                                text-3xl flex-shrink-0">
                  📄
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{t.name}</span>
                    {t.recommended && (
                      <span className="text-[10px] bg-green-500/15
                                       text-green-400 border border-green-500/20
                                       px-2 py-0.5 rounded-full font-bold">
                        ⭐ Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 text-xs mb-3">{t.desc}</div>
                  <div className="flex flex-wrap gap-2">
                    {["ATS Friendly", "1 Page", "Clean Format"].map((tag) => (
                      <span key={tag}
                        className="text-[10px] bg-white/5 border border-white/10
                                   text-gray-400 px-2 py-0.5 rounded-full">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => toast.success("Template downloading... 📄")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600
                             text-white px-4 py-2.5 rounded-xl text-xs
                             font-bold hover:shadow-lg transition-all
                             hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Download
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pro Tips */}
          <div className="mt-6 bg-blue-500/5 border border-blue-500/15
                          rounded-2xl p-5">
            <h3 className="font-bold text-sm text-blue-400 mb-3">
              🎯 Pro Resume Tips
            </h3>
            <div className="space-y-2">
              {[
                "Use Jake's Resume template from GitHub — most popular for tech",
                "Save as PDF always — never send .docx",
                "File name: FirstName_LastName_Resume.pdf",
                "Tailor keywords for each company you apply to",
              ].map((tip, i) => (
                <div key={i}
                  className="flex gap-2 text-xs text-gray-400">
                  <span className="text-blue-400 mt-0.5">→</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </Layout>
  );
}