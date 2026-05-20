import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/ui/Layout";
import toast from "react-hot-toast";

const questions = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", xp: 20, solved: false, link: "https://leetcode.com/problems/two-sum" },
  { id: 2, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", xp: 20, solved: false, link: "https://leetcode.com/problems/valid-parentheses" },
  { id: 3, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", xp: 20, solved: false, link: "https://leetcode.com/problems/reverse-linked-list" },
  { id: 4, title: "Best Time to Buy Stock", difficulty: "Easy", topic: "Arrays", xp: 20, solved: false, link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock" },
  { id: 5, title: "Longest Substring Without Repeating", difficulty: "Medium", topic: "Strings", xp: 35, solved: false, link: "https://leetcode.com/problems/longest-substring-without-repeating-characters" },
  { id: 6, title: "Container With Most Water", difficulty: "Medium", topic: "Arrays", xp: 35, solved: false, link: "https://leetcode.com/problems/container-with-most-water" },
  { id: 7, title: "3Sum", difficulty: "Medium", topic: "Arrays", xp: 35, solved: false, link: "https://leetcode.com/problems/3sum" },
  { id: 8, title: "Binary Tree Level Order", difficulty: "Medium", topic: "Trees", xp: 35, solved: false, link: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
  { id: 9, title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Linked List", xp: 60, solved: false, link: "https://leetcode.com/problems/merge-k-sorted-lists" },
  { id: 10, title: "Trapping Rain Water", difficulty: "Hard", topic: "Arrays", xp: 60, solved: false, link: "https://leetcode.com/problems/trapping-rain-water" },
  { id: 11, title: "Word Ladder", difficulty: "Hard", topic: "Graphs", xp: 60, solved: false, link: "https://leetcode.com/problems/word-ladder" },
  { id: 12, title: "Climbing Stairs", difficulty: "Easy", topic: "DP", xp: 20, solved: false, link: "https://leetcode.com/problems/climbing-stairs" },
  { id: 13, title: "Coin Change", difficulty: "Medium", topic: "DP", xp: 35, solved: false, link: "https://leetcode.com/problems/coin-change" },
  { id: 14, title: "Number of Islands", difficulty: "Medium", topic: "Graphs", xp: 35, solved: false, link: "https://leetcode.com/problems/number-of-islands" },
  { id: 15, title: "Maximum Subarray", difficulty: "Medium", topic: "DP", xp: 35, solved: false, link: "https://leetcode.com/problems/maximum-subarray" },
];

const topics = ["All", "Arrays", "Strings", "Linked List", "Trees", "Graphs", "DP", "Stack"];
const difficultyColors = {
  Easy: "bg-green-500/15 text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  Hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

export default function DSAPage() {
  const [solved, setSolved] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDiff, setSelectedDiff] = useState("All");
  const [totalXP, setTotalXP] = useState(0);

  const filtered = questions.filter((q) => {
    const topicMatch = selectedTopic === "All" || q.topic === selectedTopic;
    const diffMatch = selectedDiff === "All" || q.difficulty === selectedDiff;
    return topicMatch && diffMatch;
  });

  const handleSolve = (q) => {
    if (solved.includes(q.id)) return;
    setSolved([...solved, q.id]);
    setTotalXP((prev) => prev + q.xp);
    toast.success(`+${q.xp} XP — "${q.title}" solved! 🧠`, {
      icon: "✅",
      style: {
        background: "#1a1a24",
        color: "#f0eeff",
        border: "1px solid rgba(34,197,94,0.3)",
      },
    });
  };

  const totalSolved = solved.length;
  const easyDone = solved.filter(id => questions.find(q => q.id === id)?.difficulty === "Easy").length;
  const medDone = solved.filter(id => questions.find(q => q.id === id)?.difficulty === "Medium").length;
  const hardDone = solved.filter(id => questions.find(q => q.id === id)?.difficulty === "Hard").length;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-1">DSA Practice 🧠</h1>
        <p className="text-gray-400 text-sm">
          Solve questions → earn XP → level up!
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Solved", value: totalSolved, icon: "✅", color: "text-green-400", bg: "from-green-500/15 to-teal-500/15", border: "border-green-500/20" },
          { label: "XP Earned", value: `${totalXP} XP`, icon: "⚡", color: "text-yellow-400", bg: "from-yellow-500/15 to-orange-500/15", border: "border-yellow-500/20" },
          { label: "Easy Done", value: easyDone, icon: "🟢", color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/15" },
          { label: "Hard Done", value: hardDone, icon: "🔴", color: "text-red-400", bg: "from-red-500/10 to-red-500/5", border: "border-red-500/15" },
        ].map((s) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${s.bg} border ${s.border}
                        rounded-2xl p-4`}>
            <div className="text-xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-gray-500 text-xs">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex gap-1.5 flex-wrap">
          {topics.map((t) => (
            <button key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium
                          transition-all border
                          ${selectedTopic === t
                            ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                          }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button key={d}
              onClick={() => setSelectedDiff(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium
                          transition-all border
                          ${selectedDiff === d
                            ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                          }`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl
                      p-4 mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Overall Progress</span>
          <span>{totalSolved} / {questions.length} solved</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalSolved / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500
                       rounded-full"
          />
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-2">
        {filtered.map((q, i) => {
          const isSolved = solved.includes(q.id);
          return (
            <motion.div key={q.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-4 bg-white/[0.04] border
                          rounded-xl px-4 py-3.5 transition-all group
                          ${isSolved
                            ? "border-green-500/20 bg-green-500/5 opacity-60"
                            : "border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06]"
                          }`}>

              {/* Solve checkbox */}
              <button
                onClick={() => handleSolve(q)}
                disabled={isSolved}
                className={`w-7 h-7 rounded-lg border-2 flex items-center
                            justify-center flex-shrink-0 transition-all
                            ${isSolved
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-600 hover:border-purple-500"
                            }`}>
                {isSolved && (
                  <svg className="w-3.5 h-3.5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium
                                  ${isSolved ? "line-through text-gray-500" : "text-white"}`}>
                  {q.title}
                </span>
              </div>

              {/* Topic */}
              <span className="hidden sm:block text-xs text-gray-500
                               bg-white/5 px-2 py-1 rounded-lg">
                {q.topic}
              </span>

              {/* XP */}
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10
                               border border-purple-500/20 px-2 py-1 rounded-lg">
                +{q.xp} XP
              </span>

              {/* Difficulty */}
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg
                                border ${difficultyColors[q.difficulty]}`}>
                {q.difficulty}
              </span>

              {/* Leetcode link */}
              <a href={q.link} target="_blank" rel="noreferrer"
                className="text-gray-600 hover:text-purple-400 transition
                           text-xs hidden sm:block">
                Open ↗
              </a>
            </motion.div>
          );
        })}
      </div>
    </Layout>
  );
}