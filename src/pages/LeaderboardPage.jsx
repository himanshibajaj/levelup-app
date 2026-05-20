import { motion } from "framer-motion";
import Layout from "../components/ui/Layout";
import { useAuth } from "../contexts/AuthContext";

const mockUsers = [
  { rank: 1, name: "Arjun Sharma", college: "IIT Delhi", xp: 2840, level: 5, streak: 21, badge: "🥇" },
  { rank: 2, name: "Priya Nair", college: "NIT Trichy", xp: 2210, level: 4, streak: 14, badge: "🥈" },
  { rank: 3, name: "Rohit Verma", college: "VIT Vellore", xp: 1980, level: 4, streak: 10, badge: "🥉" },
  { rank: 4, name: "Sana Khan", college: "BITS Pilani", xp: 1540, level: 3, streak: 8, badge: null },
  { rank: 5, name: "Kiran Patel", college: "DTU Delhi", xp: 1200, level: 3, streak: 5, badge: null },
  { rank: 6, name: "Meera Iyer", college: "Anna University", xp: 980, level: 2, streak: 7, badge: null },
  { rank: 7, name: "Dev Malhotra", college: "NSIT Delhi", xp: 760, level: 2, streak: 3, badge: null },
];

const rankColors = {
  1: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
  2: "from-gray-400/20 to-gray-500/20 border-gray-400/30",
  3: "from-orange-700/20 to-orange-800/20 border-orange-700/30",
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const myName = user?.displayName?.split(" ")[0] || "You";

  const myEntry = {
    rank: 8, name: myName,
    college: "Your College", xp: 0, level: 1, streak: 0, badge: null,
    isMe: true
  };

  const allUsers = [...mockUsers, myEntry];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-1">Leaderboard 🏆</h1>
        <p className="text-gray-400 text-sm">
          Weekly XP rankings — resets every Monday
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[mockUsers[1], mockUsers[0], mockUsers[2]].map((u, i) => {
          const heights = ["h-24", "h-32", "h-20"];
          const positions = ["2nd", "1st", "3rd"];
          return (
            <motion.div key={u.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${rankColors[u.rank]} border
                          rounded-2xl p-4 text-center relative overflow-hidden`}>
              <div className="text-3xl mb-2">{u.badge}</div>
              <div className="font-bold text-sm mb-0.5">{u.name.split(" ")[0]}</div>
              <div className="text-gray-400 text-xs mb-2">{u.college}</div>
              <div className="text-lg font-black text-purple-300">
                {u.xp.toLocaleString()} XP
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                Level {u.level} · 🔥{u.streak}d
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl
                      overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5">
          <h2 className="text-sm font-bold text-gray-300">
            Full Rankings
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {allUsers.map((u, i) => (
            <motion.div key={u.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 px-4 py-3.5
                          transition-all hover:bg-white/5
                          ${u.isMe
                            ? "bg-purple-500/8 border-l-2 border-purple-500"
                            : ""
                          }`}>

              {/* Rank */}
              <div className={`w-7 text-center font-black text-sm
                              ${u.rank === 1 ? "text-yellow-400"
                                : u.rank === 2 ? "text-gray-300"
                                : u.rank === 3 ? "text-orange-500"
                                : "text-gray-600"}`}>
                {u.badge || `#${u.rank}`}
              </div>

              {/* Avatar */}
              <div className={`w-9 h-9 rounded-xl flex items-center
                              justify-center font-bold text-sm flex-shrink-0
                              ${u.isMe
                                ? "bg-gradient-to-br from-purple-600 to-pink-600"
                                : "bg-gradient-to-br from-gray-700 to-gray-800"
                              }`}>
                {u.name[0]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {u.name}
                  </span>
                  {u.isMe && (
                    <span className="text-[10px] bg-purple-500/20
                                     text-purple-400 border border-purple-500/30
                                     px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{u.college}</div>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 text-xs
                              text-orange-400">
                🔥 {u.streak}d
              </div>

              {/* Level */}
              <div className="hidden sm:block text-xs text-purple-400
                              bg-purple-500/10 border border-purple-500/20
                              px-2 py-1 rounded-lg">
                Lv.{u.level}
              </div>

              {/* XP */}
              <div className="text-sm font-black text-purple-300">
                {u.xp.toLocaleString()} XP
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Motivational footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-gradient-to-r from-purple-600/10 to-pink-600/10
                   border border-purple-500/20 rounded-2xl p-5 text-center">
        <div className="text-2xl mb-2">💪</div>
        <div className="font-bold text-white mb-1">
          You're #{myEntry.rank} — keep grinding!
        </div>
        <div className="text-gray-400 text-sm">
          Solve 5 DSA questions today to jump 3 ranks
        </div>
      </motion.div>
    </Layout>
  );
}