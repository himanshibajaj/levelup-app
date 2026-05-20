import { motion } from "framer-motion";
import Layout from "../components/ui/Layout";

const badges = [
  // Earned
  { id: 1, emoji: "🚀", name: "First Login", desc: "Joined LevelUp", xp: 10, earned: true, category: "Starter" },
  { id: 2, emoji: "🔥", name: "Week Warrior", desc: "7 day streak", xp: 50, earned: true, category: "Streak" },
  { id: 3, emoji: "💻", name: "DSA Starter", desc: "Solved first question", xp: 25, earned: true, category: "DSA" },
  { id: 4, emoji: "🎯", name: "Quest Seeker", desc: "Completed 5 quests", xp: 30, earned: true, category: "Quests" },
  { id: 5, emoji: "💬", name: "Mentor Connect", desc: "Messaged a senior", xp: 15, earned: true, category: "Social" },
  // Locked
  { id: 6, emoji: "🧠", name: "DSA Pro", desc: "Solve 50 questions", xp: 200, earned: false, category: "DSA", progress: "23/50" },
  { id: 7, emoji: "🏆", name: "Top 3", desc: "Reach top 3 leaderboard", xp: 300, earned: false, category: "Rank", progress: "#8 now" },
  { id: 8, emoji: "📄", name: "Resume Ready", desc: "Score 80+ on resume", xp: 100, earned: false, category: "Resume", progress: "0/80" },
  { id: 9, emoji: "⚡", name: "Level 5", desc: "Reach Level 5", xp: 150, earned: false, category: "Level", progress: "Lv.1 now" },
  { id: 10, emoji: "🔥", name: "30 Day Streak", desc: "30 consecutive days", xp: 500, earned: false, category: "Streak", progress: "0/30 days" },
  { id: 11, emoji: "🤝", name: "Helper", desc: "Help 5 juniors", xp: 100, earned: false, category: "Social", progress: "0/5" },
  { id: 12, emoji: "💯", name: "Century", desc: "Solve 100 questions", xp: 400, earned: false, category: "DSA", progress: "23/100" },
  { id: 13, emoji: "🧪", name: "Mock Master", desc: "10 mock interviews", xp: 200, earned: false, category: "Interview", progress: "0/10" },
  { id: 14, emoji: "🎤", name: "Confident Speaker", desc: "Complete HR mock", xp: 75, earned: false, category: "Interview", progress: "0/1" },
  { id: 15, emoji: "🌟", name: "Placement Ready", desc: "Reach Level 7", xp: 1000, earned: false, category: "Level", progress: "Lv.1 now" },
  { id: 16, emoji: "🏅", name: "Placed!", desc: "Land your first offer", xp: 2000, earned: false, category: "Ultimate", progress: "Keep going!" },
];

const categories = ["All", "Starter", "DSA", "Streak", "Rank",
                    "Resume", "Social", "Interview", "Level", "Ultimate"];

export default function BadgesPage() {
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);
  const totalXP = earned.reduce((sum, b) => sum + b.xp, 0);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-1">Achievements 🏅</h1>
        <p className="text-gray-400 text-sm">
          Earn badges by completing challenges — show them off!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: "🏅", value: earned.length, label: "Earned", color: "text-yellow-400",
            bg: "from-yellow-500/15 to-orange-500/15", border: "border-yellow-500/20" },
          { icon: "🔒", value: locked.length, label: "Locked", color: "text-gray-400",
            bg: "from-gray-500/10 to-gray-500/5", border: "border-gray-500/20" },
          { icon: "⚡", value: `${totalXP} XP`, label: "From Badges", color: "text-purple-400",
            bg: "from-purple-500/15 to-pink-500/15", border: "border-purple-500/20" },
        ].map((s) => (
          <div key={s.label}
            className={`bg-gradient-to-br ${s.bg} border ${s.border}
                        rounded-2xl p-5 text-center`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Earned Section */}
      <div className="mb-8">
        <h2 className="text-sm font-black text-gray-300 uppercase
                       tracking-wider mb-4 flex items-center gap-2">
          ✅ Earned ({earned.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                        lg:grid-cols-5 gap-3">
          {earned.map((b, i) => (
            <motion.div key={b.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-gradient-to-br from-purple-600/15 to-pink-600/10
                         border border-purple-500/25 rounded-2xl p-4
                         text-center cursor-pointer relative overflow-hidden
                         group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br
                              from-purple-500/0 to-pink-500/0
                              group-hover:from-purple-500/10
                              group-hover:to-pink-500/10 transition-all" />

              <div className="text-3xl mb-2 relative">{b.emoji}</div>
              <div className="text-xs font-bold text-white mb-1 relative">
                {b.name}
              </div>
              <div className="text-[10px] text-gray-500 mb-2 relative">
                {b.desc}
              </div>
              <div className="text-[10px] font-bold text-purple-400
                              bg-purple-500/15 border border-purple-500/20
                              px-2 py-0.5 rounded-full relative">
                +{b.xp} XP
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked Section */}
      <div>
        <h2 className="text-sm font-black text-gray-500 uppercase
                       tracking-wider mb-4 flex items-center gap-2">
          🔒 Locked — Keep Going! ({locked.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                        lg:grid-cols-5 gap-3">
          {locked.map((b, i) => (
            <motion.div key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/[0.02] border border-white/8
                         rounded-2xl p-4 text-center relative
                         overflow-hidden group cursor-default"
            >
              {/* Blur overlay */}
              <div className="absolute inset-0 backdrop-blur-[1px]
                              bg-black/20 rounded-2xl" />

              <div className="text-3xl mb-2 relative grayscale opacity-40">
                {b.emoji}
              </div>
              <div className="text-xs font-bold text-gray-600 mb-1 relative">
                {b.name}
              </div>
              <div className="text-[10px] text-gray-700 mb-2 relative">
                {b.desc}
              </div>

              {/* Progress */}
              {b.progress && (
                <div className="text-[10px] text-gray-600
                                bg-white/5 border border-white/10
                                px-2 py-0.5 rounded-full relative">
                  {b.progress}
                </div>
              )}

              {/* XP reward */}
              <div className="text-[10px] font-bold text-gray-700 mt-1
                              relative">
                +{b.xp} XP
              </div>

              {/* Lock icon */}
              <div className="absolute top-2 right-2 text-gray-700
                              text-xs">🔒</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10
                   border border-purple-500/20 rounded-2xl p-5 text-center"
      >
        <div className="text-3xl mb-2">💪</div>
        <div className="font-bold text-white mb-1">
          {locked.length} badges left to unlock!
        </div>
        <div className="text-gray-400 text-sm">
          Solve DSA questions and maintain your streak to earn more badges
        </div>
      </motion.div>
    </Layout>
  );
}