import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/ui/Layout";
import toast from "react-hot-toast";

const companies = [
  { id: "google", name: "Google", color: "from-blue-500 to-cyan-400", logo: "G", count: 8 },
  { id: "amazon", name: "Amazon", color: "from-orange-500 to-amber-400", logo: "A", count: 12 },
  { id: "microsoft", name: "Microsoft", color: "from-green-500 to-teal-400", logo: "M", count: 9 },
  { id: "flipkart", name: "Flipkart", color: "from-yellow-500 to-orange-400", logo: "F", count: 7 },
  { id: "infosys", name: "Infosys", color: "from-purple-500 to-violet-400", logo: "I", count: 15 },
  { id: "tcs", name: "TCS", color: "from-blue-600 to-indigo-500", logo: "T", count: 14 },
  { id: "wipro", name: "Wipro", color: "from-gray-500 to-gray-400", logo: "W", count: 11 },
  { id: "zomato", name: "Zomato", color: "from-red-500 to-rose-400", logo: "Z", count: 6 },
];

const pyqs = [
  // Google
  { id: 1, company: "google", year: 2024, round: "DSA Round", type: "Coding",
    question: "Given a list of meetings with start and end times, find the minimum number of conference rooms required.",
    difficulty: "Hard", topic: "Intervals", xp: 60, hint: "Think about sorting by start time and using a min-heap for end times.",
    asked: "3 months ago", frequency: "Very High" },
  { id: 2, company: "google", year: 2024, round: "DSA Round 1", type: "Coding",
    question: "Design a data structure that supports insert, delete, and getRandom in O(1) time.",
    difficulty: "Medium", topic: "Design", xp: 40, hint: "Combine HashMap with ArrayList cleverly.",
    asked: "Last month", frequency: "High" },
  { id: 3, company: "google", year: 2023, round: "System Design", type: "Design",
    question: "Design YouTube — focus on video upload, storage, and streaming at scale.",
    difficulty: "Hard", topic: "System Design", xp: 80, hint: "Think CDN, encoding pipeline, chunked upload, thumbnails.",
    asked: "6 months ago", frequency: "Very High" },

  // Amazon
  { id: 4, company: "amazon", year: 2024, round: "OA", type: "Coding",
    question: "Given an array, find the maximum sum subarray of length exactly K.",
    difficulty: "Easy", topic: "Sliding Window", xp: 20, hint: "Classic sliding window — maintain sum of K elements.",
    asked: "2 weeks ago", frequency: "Very High" },
  { id: 5, company: "amazon", year: 2024, round: "Technical", type: "LP",
    question: "Tell me about a time you disagreed with your manager. What did you do?",
    difficulty: "Medium", topic: "Leadership Principles", xp: 30, hint: "Use STAR format. Connect to 'Have Backbone; Disagree and Commit' LP.",
    asked: "Last month", frequency: "High" },
  { id: 6, company: "amazon", year: 2024, round: "Technical", type: "Coding",
    question: "LRU Cache — Design and implement a data structure for a Least Recently Used cache.",
    difficulty: "Medium", topic: "Design", xp: 40, hint: "Use HashMap + Doubly Linked List for O(1) operations.",
    asked: "3 weeks ago", frequency: "Very High" },

  // Microsoft
  { id: 7, company: "microsoft", year: 2024, round: "Round 1", type: "Coding",
    question: "Clone a linked list with random pointers.",
    difficulty: "Medium", topic: "Linked List", xp: 40, hint: "Two-pass solution or use HashMap to map original to clone.",
    asked: "Last month", frequency: "High" },
  { id: 8, company: "microsoft", year: 2024, round: "Round 2", type: "Coding",
    question: "Find the median of a data stream as integers are added one by one.",
    difficulty: "Hard", topic: "Heap", xp: 60, hint: "Maintain max-heap for lower half, min-heap for upper half.",
    asked: "2 months ago", frequency: "Medium" },

  // Flipkart
  { id: 9, company: "flipkart", year: 2024, round: "OA", type: "Coding",
    question: "You have N items with values and weights. Find max value you can carry in a bag of capacity W.",
    difficulty: "Medium", topic: "DP", xp: 40, hint: "Classic 0/1 Knapsack — think dp[i][w] states.",
    asked: "1 month ago", frequency: "High" },

  // Infosys
  { id: 10, company: "infosys", year: 2024, round: "Hackwithinfy", type: "Coding",
    question: "Given a string, find the longest palindromic substring.",
    difficulty: "Medium", topic: "Strings", xp: 35, hint: "Expand around center approach — O(n²) or Manacher's for O(n).",
    asked: "2 months ago", frequency: "Very High" },
  { id: 11, company: "infosys", year: 2024, round: "Aptitude", type: "Aptitude",
    question: "A train 150m long passes a pole in 15 seconds. How long will it take to pass a 300m platform?",
    difficulty: "Easy", topic: "Speed & Distance", xp: 10,
    hint: "Speed = 150/15 = 10 m/s. Distance to cover = 150+300 = 450m. Time = 45s.",
    asked: "Last month", frequency: "Very High" },

  // TCS
  { id: 12, company: "tcs", year: 2024, round: "NQT", type: "Aptitude",
    question: "In how many ways can the letters of 'PROGRAMMING' be arranged such that no two vowels are adjacent?",
    difficulty: "Medium", topic: "Permutations", xp: 25,
    hint: "Place consonants first, then fit vowels in gaps.",
    asked: "3 weeks ago", frequency: "High" },
  { id: 13, company: "tcs", year: 2024, round: "Coding", type: "Coding",
    question: "Find all prime numbers up to N using Sieve of Eratosthenes.",
    difficulty: "Easy", topic: "Math", xp: 20,
    hint: "Mark multiples of each prime as composite. O(n log log n).",
    asked: "Last month", frequency: "Very High" },
];

const diffColors = {
  Easy: "bg-green-500/15 text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  Hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

const typeColors = {
  Coding: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Design: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  LP: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  Aptitude: "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

export default function PYQPage() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [expandedQ, setExpandedQ] = useState(null);
  const [solved, setSolved] = useState([]);
  const [diffFilter, setDiffFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const companyQs = pyqs.filter((q) =>
    q.company === selectedCompany?.id &&
    (diffFilter === "All" || q.difficulty === diffFilter) &&
    (typeFilter === "All" || q.type === typeFilter)
  );

  const handleSolve = (q) => {
    if (solved.includes(q.id)) return;
    setSolved([...solved, q.id]);
    toast.success(`+${q.xp} XP — PYQ marked solved! 🎯`);
  };

  return (
    <Layout>
      {!selectedCompany ? (
        <>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-black mb-1">
              PYQs & Practice 🎯
            </h1>
            <p className="text-gray-400 text-sm">
              Real questions asked in campus placements —
              company-wise, year-wise
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: "❓", val: "80+", label: "Questions" },
              { icon: "🏢", val: "8", label: "Companies" },
              { icon: "📅", val: "2024", label: "Latest Year" },
            ].map((s) => (
              <div key={s.label}
                className="bg-white/[0.04] border border-white/10
                           rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-black text-purple-300">
                  {s.val}
                </div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Company Grid */}
          <h2 className="text-sm font-black text-gray-400 uppercase
                         tracking-wider mb-4">
            Choose Company
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companies.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.04, y: -3 }}
                onClick={() => setSelectedCompany(c)}
                className="bg-white/[0.04] border border-white/10
                           rounded-2xl p-5 text-center cursor-pointer
                           hover:border-purple-500/30 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br
                                ${c.color} flex items-center justify-center
                                text-2xl font-black text-white mx-auto mb-3
                                shadow-lg`}>
                  {c.logo}
                </div>
                <div className="font-bold text-sm mb-1">{c.name}</div>
                <div className="text-gray-500 text-xs">
                  {c.count} questions
                </div>
                <div className="mt-2 text-[10px] bg-purple-500/10
                               border border-purple-500/15 text-purple-400
                               px-2 py-0.5 rounded-full">
                  View PYQs →
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips Banner */}
          <div className="mt-8 bg-gradient-to-r from-blue-600/10
                          to-purple-600/10 border border-blue-500/20
                          rounded-2xl p-5">
            <h3 className="font-bold mb-3">
              💡 How to use PYQs effectively
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Don't just read — solve each question yourself first",
                "Note the pattern — same pattern repeats across years",
                "Time yourself — aim to solve Easy in 15 min",
                "After solving, read the editorial to find optimal approach",
              ].map((tip, i) => (
                <div key={i}
                  className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* ===== COMPANY QUESTIONS ===== */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Back + Header */}
          <button
            onClick={() => { setSelectedCompany(null); setExpandedQ(null); }}
            className="flex items-center gap-2 text-gray-400
                       hover:text-white transition mb-6 group">
            <span className="group-hover:-translate-x-1 transition">←</span>
            All Companies
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br
                            ${selectedCompany.color} flex items-center
                            justify-center text-xl font-black text-white`}>
              {selectedCompany.logo}
            </div>
            <div>
              <h1 className="text-2xl font-black">
                {selectedCompany.name} PYQs
              </h1>
              <p className="text-gray-400 text-sm">
                {selectedCompany.count} questions ·
                Asked in real campus placements
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium
                            transition-all border
                            ${diffFilter === d
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/5 border-white/10 text-gray-400"
                            }`}>
                {d}
              </button>
            ))}
            <div className="w-px bg-white/10 mx-1" />
            {["All", "Coding", "Design", "LP", "Aptitude"].map((t) => (
              <button key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium
                            transition-all border
                            ${typeFilter === t
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/5 border-white/10 text-gray-400"
                            }`}>
                {t}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {companyQs.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No questions match this filter
              </div>
            ) : companyQs.map((q, i) => (
              <motion.div key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`bg-white/[0.04] border rounded-2xl
                            transition-all
                            ${solved.includes(q.id)
                              ? "border-green-500/20 opacity-70"
                              : "border-white/10 hover:border-purple-500/30"
                            }`}>

                {/* Question Header */}
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => setExpandedQ(
                    expandedQ === q.id ? null : q.id
                  )}
                >
                  {/* Solve btn */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSolve(q); }}
                    className={`w-7 h-7 rounded-lg border-2 flex items-center
                                justify-center flex-shrink-0 transition-all
                                ${solved.includes(q.id)
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "border-gray-600 hover:border-purple-500"
                                }`}>
                    {solved.includes(q.id) && (
                      <svg className="w-3.5 h-3.5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor"
                        strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium mb-1
                                    ${solved.includes(q.id)
                                      ? "line-through text-gray-500"
                                      : "text-white"}`}>
                      {q.question.length > 80
                        ? q.question.substring(0, 80) + "..."
                        : q.question}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-gray-500">
                        {q.round}
                      </span>
                      <span className="text-[10px] text-gray-600">·</span>
                      <span className="text-[10px] text-gray-500">
                        {q.asked}
                      </span>
                      <span className="text-[10px] text-gray-600">·</span>
                      <span className={`text-[10px] ${q.frequency === "Very High" ? "text-red-400" : "text-yellow-400"}`}>
                        {q.frequency} frequency
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-medium px-2 py-1
                                     rounded-lg border
                                     ${typeColors[q.type]}`}>
                      {q.type}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-1
                                     rounded-lg border
                                     ${diffColors[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] text-purple-400
                                     bg-purple-500/10 border border-purple-500/20
                                     px-2 py-1 rounded-lg font-bold">
                      +{q.xp}XP
                    </span>
                  </div>

                  {/* Expand arrow */}
                  <span className={`text-gray-500 transition-transform
                                   text-sm
                                   ${expandedQ === q.id ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedQ === q.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-white/5
                                      pt-4 space-y-4">
                        {/* Full question */}
                        <div className="bg-white/[0.03] rounded-xl p-4">
                          <div className="text-xs text-gray-500 mb-2
                                          font-medium uppercase tracking-wider">
                            Full Question
                          </div>
                          <p className="text-sm text-gray-200 leading-relaxed">
                            {q.question}
                          </p>
                        </div>

                        {/* Hint */}
                        <div className="bg-yellow-500/5 border
                                        border-yellow-500/15 rounded-xl p-4">
                          <div className="text-xs text-yellow-400 mb-2
                                          font-medium flex items-center gap-1">
                            💡 Hint
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {q.hint}
                          </p>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-white/5 text-gray-400
                                           border border-white/10 px-3 py-1
                                           rounded-full">
                            📅 Year {q.year}
                          </span>
                          <span className="text-xs bg-white/5 text-gray-400
                                           border border-white/10 px-3 py-1
                                           rounded-full">
                            🏷 {q.topic}
                          </span>
                          <span className="text-xs bg-white/5 text-gray-400
                                           border border-white/10 px-3 py-1
                                           rounded-full">
                            🔄 {q.round}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSolve(q)}
                            disabled={solved.includes(q.id)}
                            className={`flex-1 py-2.5 rounded-xl text-xs
                                        font-bold transition-all
                                        ${solved.includes(q.id)
                                          ? "bg-green-500/20 text-green-400 border border-green-500/20"
                                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                                        }`}>
                            {solved.includes(q.id)
                              ? "✅ Solved!" : "Mark as Solved"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </Layout>
  );
}