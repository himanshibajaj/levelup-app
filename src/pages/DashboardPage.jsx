import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/ui/Layout";
import toast from "react-hot-toast";

// Notification data
const initialNotifications = [
  { id: 1, icon: "⚡", text: "Welcome to LevelUp! You earned +10 XP", time: "Just now", read: false, xp: 10 },
  { id: 2, icon: "🔥", text: "Daily streak started! Keep logging in", time: "Today", read: false, xp: 0 },
  { id: 3, icon: "🏅", text: "Badge unlocked — First Login 🚀", time: "Today", read: false, xp: 0 },
];

const greetings = [
  { text: "Good Morning", icon: "🌅", condition: (h) => h >= 5 && h < 12 },
  { text: "Good Afternoon", icon: "☀️", condition: (h) => h >= 12 && h < 17 },
  { text: "Good Evening", icon: "🌆", condition: (h) => h >= 17 && h < 21 },
  { text: "Hey Night Owl", icon: "🌙", condition: (h) => h >= 21 || h < 5 },
];

const motivationalQuotes = [
  "Every expert was once a beginner. Keep going! 💪",
  "Your future self will thank you for grinding today 🚀",
  "One question a day keeps the rejection away 😄",
  "Consistency beats talent when talent doesn't work hard ⚡",
  "You're closer to your dream job than yesterday 🎯",
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifs, setShowNotifs] = useState(false);
  const [quests, setQuests] = useState([
    { id: 1, icon: "💻", title: "Solve 1 DSA question", xp: 25, done: false, desc: "Go to DSA Practice" },
    { id: 2, icon: "🔥", title: "Keep your daily streak", xp: 15, done: false, desc: "You're on a roll!" },
    { id: 3, icon: "🎓", title: "Read 1 alumni story", xp: 10, done: false, desc: "Learn from seniors" },
    { id: 4, icon: "📄", title: "Update your resume", xp: 20, done: false, desc: "Use Resume Scorer" },
    { id: 5, icon: "🤝", title: "Message a mentor", xp: 10, done: false, desc: "Get guidance" },
  ]);
  const [totalXP, setTotalXP] = useState(10);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [quote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  const hour = new Date().getHours();
  const greeting = greetings.find((g) => g.condition(hour));
  const firstName = user?.displayName?.split(" ")[0] ||
                    user?.email?.split("@")[0] || "Player";
  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (icon, text, xp = 0) => {
    const newNotif = {
      id: Date.now(),
      icon, text, xp,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Show bell animation hint
    setTimeout(() => {
      toast(
        (t) => (
          <div className="flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <div>
              <div className="text-sm font-medium">{text}</div>
              {xp > 0 && (
                <div className="text-xs text-purple-400">+{xp} XP added!</div>
              )}
            </div>
          </div>
        ),
        { duration: 3000 }
      );
    }, 300);
  };

  const completeQuest = (quest) => {
    if (quest.done) return;
    setQuests((prev) =>
      prev.map((q) => q.id === quest.id ? { ...q, done: true } : q)
    );
    setTotalXP((prev) => prev + quest.xp);
    addNotification("⚡", `Quest done: "${quest.title}"`, quest.xp);

    // Check level up at 100 XP
    if (totalXP + quest.xp >= 100 && totalXP < 100) {
      setTimeout(() => setShowLevelUp(true), 800);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const doneCount = quests.filter((q) => q.done).length;
  const xpPercent = Math.min((totalXP / 500) * 100, 100);

  return (
    <Layout>

      {/* ===== LEVEL UP MODAL ===== */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50
                       flex items-center justify-center px-4"
            onClick={() => setShowLevelUp(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-[#111118] border border-purple-500/40
                         rounded-3xl p-8 text-center max-w-sm w-full
                         shadow-2xl shadow-purple-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-black text-white mb-2">
                Level Up!
              </h2>
              <p className="text-purple-400 font-bold text-lg mb-1">
                Level 2 — Hustler ⚡
              </p>
              <p className="text-gray-400 text-sm mb-6">
                You're on fire {firstName}! Keep going!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLevelUp(false)}
                  className="flex-1 bg-gradient-to-r from-purple-600
                             to-pink-600 text-white rounded-2xl py-3
                             font-bold text-sm hover:shadow-lg
                             transition-all"
                >
                  Let's Go! 🚀
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TOP NAVBAR ROW ===== */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {/* Time-based greeting */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-gray-400 text-sm mb-1"
          >
            <span>{greeting?.icon}</span>
            <span>{greeting?.text}</span>
          </motion.div>

          {/* Big personalized hello */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-black text-white"
          >
            Hello,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400
                             bg-clip-text text-transparent">
              {firstName}! 👋
            </span>
          </motion.h1>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative w-11 h-11 bg-white/5 border border-white/10
                       rounded-2xl flex items-center justify-center
                       hover:border-purple-500/40 transition"
          >
            {/* Bell icon */}
            <motion.span
              animate={unreadCount > 0
                ? { rotate: [0, -15, 15, -10, 10, 0] }
                : {}}
              transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
              className="text-lg"
            >
              🔔
            </motion.span>

            {/* Unread badge */}
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500
                           rounded-full flex items-center justify-center
                           text-[10px] font-black text-white border-2
                           border-[#07070f]"
              >
                {unreadCount}
              </motion.div>
            )}
          </motion.button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute right-0 top-14 w-80 bg-[#111118]/98
                           backdrop-blur-xl border border-white/10
                           rounded-2xl shadow-2xl shadow-black/60 z-50
                           overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3
                                border-b border-white/5">
                  <span className="text-sm font-bold text-white">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-purple-400
                                 hover:text-purple-300 transition"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notif List */}
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-600
                                    text-sm">
                      No notifications yet
                    </div>
                  ) : notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-3 px-4 py-3
                                  border-b border-white/5 transition
                                  hover:bg-white/5
                                  ${!n.read ? "bg-purple-500/5" : ""}`}
                    >
                      <span className="text-xl flex-shrink-0 mt-0.5">
                        {n.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-relaxed
                                       ${!n.read ? "text-white" : "text-gray-400"}`}>
                          {n.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-gray-600">
                            {n.time}
                          </span>
                          {n.xp > 0 && (
                            <span className="text-[10px] text-purple-400
                                             bg-purple-500/10 px-1.5 py-0.5
                                             rounded-full font-bold">
                              +{n.xp} XP
                            </span>
                          )}
                        </div>
                      </div>
                      {!n.read && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full
                                        flex-shrink-0 mt-1.5" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 border-t border-white/5
                                text-center">
                  <span className="text-[11px] text-gray-600">
                    Complete tasks to get more notifications ⚡
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== WELCOME BANNER ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative overflow-hidden bg-gradient-to-r
                   from-purple-600/20 via-pink-600/10 to-blue-600/10
                   border border-purple-500/20 rounded-3xl p-5 mb-6"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full
                        bg-purple-500/10 blur-2xl pointer-events-none" />
        <div className="absolute right-16 bottom-0 w-16 h-16 rounded-full
                        bg-pink-500/10 blur-xl pointer-events-none" />

        {/* Quote */}
        <div className="relative flex items-start gap-3">
          <span className="text-2xl">💬</span>
          <div>
            <p className="text-gray-300 text-sm italic leading-relaxed mb-3">
              "{quote}"
            </p>

            {/* Daily goal bar */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs whitespace-nowrap">
                Daily Goal
              </span>
              <div className="flex-1 h-2 bg-white/10 rounded-full
                              overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(doneCount / quests.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500
                             to-pink-500 rounded-full"
                />
              </div>
              <span className="text-gray-400 text-xs whitespace-nowrap">
                {doneCount}/{quests.length} tasks
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: "⚡", label: "Total XP", value: totalXP,
            sub: `+${quests.filter(q=>q.done).reduce((s,q)=>s+q.xp,0)} today`,
            color: "text-yellow-400",
            bg: "from-yellow-500/20 to-orange-500/20",
            border: "border-yellow-500/20" },
          { icon: "🔥", label: "Day Streak",
            value: doneCount > 0 ? "1" : "0",
            sub: doneCount > 0 ? "Active today!" : "Start today!",
            color: "text-red-400",
            bg: "from-red-500/20 to-pink-500/20",
            border: "border-red-500/20" },
          { icon: "🏆", label: "Rank", value: "#—",
            sub: "Solve to rank",
            color: "text-purple-400",
            bg: "from-purple-500/20 to-violet-500/20",
            border: "border-purple-500/20" },
          { icon: "✅", label: "Tasks Done",
            value: doneCount,
            sub: `${quests.length - doneCount} remaining`,
            color: "text-green-400",
            bg: "from-green-500/20 to-teal-500/20",
            border: "border-green-500/20" },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className={`bg-gradient-to-br ${s.bg} border ${s.border}
                        rounded-2xl p-4 cursor-default`}
          >
            <div className="text-xl mb-2">{s.icon}</div>
            <div className={`text-2xl font-black mb-0.5 ${s.color}`}>
              {s.value}
            </div>
            <div className="text-gray-400 text-xs">{s.label}</div>
            <div className="text-gray-600 text-[10px] mt-0.5">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* ===== XP LEVEL BAR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/[0.04] border border-white/10 rounded-2xl
                   p-5 mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="font-bold text-sm">Level 1 — Fresher 🐣</span>
            <div className="text-gray-500 text-xs mt-0.5">
              Next: Level 2 — Hustler ⚡
            </div>
          </div>
          <div className="text-right">
            <span className="text-purple-400 font-black text-lg">
              {totalXP}
            </span>
            <span className="text-gray-500 text-sm"> / 500 XP</span>
          </div>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500
                       via-violet-400 to-pink-500 rounded-full relative"
          >
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r
                            from-transparent via-white/20 to-transparent
                            rounded-full animate-pulse" />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2">
          {["Fresher", "Hustler", "Coder", "Pro", "Placed!"].map((l, i) => (
            <span key={l}
              className={`text-[10px] ${i === 0 ? "text-purple-400" : "text-gray-700"}`}>
              {l}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ===== TODAY'S QUESTS — INTERACTIVE ===== */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black">Today's Quests 🎯</h2>
          <span className="text-xs text-gray-500 bg-white/5 border
                           border-white/10 px-2.5 py-1 rounded-full">
            {doneCount}/{quests.length} done
          </span>
        </div>

        <div className="space-y-2">
          {quests.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              onClick={() => completeQuest(q)}
              className={`flex items-center gap-4 rounded-xl px-4 py-3.5
                          cursor-pointer transition-all border group
                          ${q.done
                            ? "bg-green-500/5 border-green-500/20 opacity-60"
                            : "bg-white/[0.04] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.07]"
                          }`}
            >
              {/* Checkbox */}
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`w-6 h-6 rounded-lg border-2 flex items-center
                            justify-center flex-shrink-0 transition-all
                            ${q.done
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-600 group-hover:border-purple-500"
                            }`}
              >
                {q.done && (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    className="w-3.5 h-3.5"
                    fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={3}
                  >
                    <motion.path
                      strokeLinecap="round" strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </motion.div>

              <span className="text-lg">{q.icon}</span>

              <div className="flex-1">
                <div className={`text-sm font-medium
                                 ${q.done ? "line-through text-gray-500"
                                          : "text-white"}`}>
                  {q.title}
                </div>
                <div className="text-xs text-gray-600">{q.desc}</div>
              </div>

              {/* XP Badge */}
              <motion.span
                animate={q.done ? { scale: [1, 1.3, 1] } : {}}
                className={`text-xs font-bold px-2.5 py-1 rounded-xl
                            border whitespace-nowrap
                            ${q.done
                              ? "bg-green-500/15 text-green-400 border-green-500/20"
                              : "bg-purple-500/15 text-purple-400 border-purple-500/20"
                            }`}
              >
                {q.done ? "✓ Done" : `+${q.xp} XP`}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* All done message */}
        <AnimatePresence>
          {doneCount === quests.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-green-500/10 border border-green-500/20
                         rounded-2xl p-4 text-center"
            >
              <div className="text-2xl mb-1">🎉</div>
              <div className="font-bold text-green-400 text-sm">
                All quests done! Amazing work {firstName}!
              </div>
              <div className="text-gray-500 text-xs mt-1">
                Come back tomorrow for new quests
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <h2 className="text-lg font-black mb-4">Quick Actions 🚀</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: "💻", title: "DSA Practice", desc: "Solve & earn XP", xp: "+30 XP", path: "/dsa", color: "hover:border-blue-500/40" },
          { icon: "🎯", title: "PYQ Practice", desc: "Company-wise questions", xp: "+40 XP", path: "/pyq", color: "hover:border-yellow-500/40" },
          { icon: "🎓", title: "Alumni Stories", desc: "Learn from seniors", xp: "+10 XP", path: "/alumni", color: "hover:border-green-500/40" },
          { icon: "🤝", title: "Mentors", desc: "Message a senior", xp: "+10 XP", path: "/mentors", color: "hover:border-pink-500/40" },
          { icon: "🏆", title: "Leaderboard", desc: "See top rankers", xp: "View", path: "/leaderboard", color: "hover:border-orange-500/40" },
          { icon: "🏅", title: "My Badges", desc: "Achievements", xp: "View", path: "/badges", color: "hover:border-purple-500/40" },
        ].map((item, i) => (
          <motion.div key={item.title}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.07 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              addNotification("⚡", `Opened ${item.title}`, 0);
              window.location.href = item.path;
            }}
            className={`bg-white/[0.04] border border-white/10 rounded-2xl
                        p-5 cursor-pointer transition-all ${item.color}
                        relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-br
                            from-purple-600/0 to-pink-600/0
                            group-hover:from-purple-600/5
                            group-hover:to-pink-600/5 transition-all" />
            <div className="relative">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-bold text-sm mb-1">{item.title}</div>
              <div className="text-gray-500 text-xs mb-3">{item.desc}</div>
              <span className="text-xs bg-purple-500/15 text-purple-400
                               border border-purple-500/20 px-2 py-1
                               rounded-full font-medium">
                {item.xp}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </Layout>
  );
}