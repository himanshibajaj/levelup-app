import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const navItems = [
  { icon: "⚡", label: "Dashboard",   path: "/dashboard" },
  { icon: "💻", label: "DSA",         path: "/dsa" },
  { icon: "🎯", label: "PYQs",        path: "/pyq" },
  { icon: "🎓", label: "Alumni",      path: "/alumni" },
  { icon: "🤝", label: "Mentors",     path: "/mentors" },
  { icon: "📄", label: "Resume",      path: "/resume" },
  { icon: "🏆", label: "Leaderboard", path: "/leaderboard" },
  { icon: "🏅", label: "Badges",      path: "/badges" },
];

const bottomNav = navItems.slice(0, 4);

export default function Layout({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("See you soon! 👋");
    navigate("/login");
    setDrawerOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const active = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#07070f] text-white">

      {/* ===== BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
                        rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full
                        bg-pink-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full
                        bg-blue-500/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:`linear-gradient(rgba(255,255,255,.6) 1px,
              transparent 1px),linear-gradient(90deg,
              rgba(255,255,255,.6) 1px,transparent 1px)`,
            backgroundSize:"40px 40px"
          }}
        />
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:flex h-screen overflow-hidden relative z-10">

        {/* Desktop Sidebar */}
        <aside className="w-56 flex-shrink-0 flex flex-col
                          bg-black/40 backdrop-blur-xl
                          border-r border-white/5 h-screen
                          sticky top-0">

          {/* Logo */}
          <div className="px-5 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br
                              from-purple-500 to-pink-500
                              flex items-center justify-center
                              font-black text-lg shadow-lg
                              shadow-purple-500/30">
                L
              </div>
              <div>
                <div className="font-black text-sm">LevelUp</div>
                <div className="text-[10px] text-gray-500">
                  Placement Prep
                </div>
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex justify-between mb-1.5">
              <span className="text-[11px] text-gray-400">
                Level 1 · Fresher 🐣
              </span>
              <span className="text-[10px] text-purple-400 font-bold">
                0 XP
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full
                            overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r
                              from-purple-500 to-pink-500 rounded-full" />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-3 px-3 py-2.5
                            rounded-xl text-sm font-medium transition-all
                            text-left border
                            ${active(item.path)
                              ? "bg-purple-600/20 border-purple-500/30 text-white"
                              : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
              >
                <span className="text-base w-5 text-center">
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {active(item.path) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Bottom User */}
          <div className="px-3 py-4 border-t border-white/5 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-1.5
                              bg-orange-500/10 border border-orange-500/20
                              rounded-xl px-2.5 py-1.5">
                <span className="text-sm">🔥</span>
                <span className="text-orange-400 text-xs font-bold">
                  0 streak
                </span>
              </div>
              <div className="flex-1 flex items-center gap-1.5
                              bg-yellow-500/10 border border-yellow-500/20
                              rounded-xl px-2.5 py-1.5">
                <span className="text-sm">⚡</span>
                <span className="text-yellow-400 text-xs font-bold">
                  0 XP
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5
                            rounded-xl px-3 py-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br
                              from-purple-600 to-pink-600
                              flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate">
                  {user?.displayName?.split(" ")[0] || "Player"}
                </div>
                <div className="text-[10px] text-gray-500 truncate">
                  {user?.email}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-400 transition
                           text-sm opacity-0 group-hover:opacity-100"
              >
                🚪
              </button>
            </div>
          </div>
        </aside>

        {/* Desktop Main Content */}
        <main className="flex-1 overflow-y-auto h-screen">
          <div className="max-w-5xl mx-auto px-6 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="md:hidden flex flex-col min-h-screen relative z-10">

        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-40 flex items-center
                           justify-between px-4 py-3
                           bg-[#07070f]/90 backdrop-blur-xl
                           border-b border-white/5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br
                            from-purple-500 to-pink-500
                            flex items-center justify-center
                            font-black text-sm shadow-md
                            shadow-purple-500/30">
              L
            </div>
            <span className="font-black text-base">LevelUp</span>
          </div>

          {/* Right pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-500/10
                            border border-yellow-500/20 rounded-full
                            px-2.5 py-1">
              <span className="text-xs">⚡</span>
              <span className="text-yellow-400 text-xs font-bold">
                0 XP
              </span>
            </div>
            <div className="flex items-center gap-1 bg-orange-500/10
                            border border-orange-500/20 rounded-full
                            px-2.5 py-1">
              <span className="text-xs">🔥</span>
              <span className="text-orange-400 text-xs font-bold">0</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDrawerOpen(true)}
              className="w-8 h-8 bg-white/5 border border-white/10
                         rounded-xl flex items-center justify-center
                         text-gray-300 hover:border-purple-500/40
                         transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </header>

        {/* Mobile Page Content */}
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="px-4 py-4">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-40
                        bg-[#0a0a0f]/95 backdrop-blur-xl
                        border-t border-white/8
                        safe-area-inset-bottom">
          <div className="flex items-center justify-around px-1 pt-2 pb-3">
            {bottomNav.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center gap-1
                           px-3 py-1 rounded-2xl transition-all
                           relative flex-1"
              >
                {/* Active background */}
                {active(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-600/15
                               rounded-2xl border border-purple-500/20"
                  />
                )}
                <span className={`text-xl relative transition-transform
                                  ${active(item.path) ? "scale-110" : ""}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] font-medium relative
                                  ${active(item.path)
                                    ? "text-purple-300"
                                    : "text-gray-600"}`}>
                  {item.label}
                </span>
              </motion.button>
            ))}

            {/* More Button */}
            <motion.button
              onClick={() => setDrawerOpen(true)}
              whileTap={{ scale: 0.85 }}
              className="flex flex-col items-center gap-1
                         px-3 py-1 rounded-2xl flex-1"
            >
              <span className="text-xl">⋯</span>
              <span className="text-[10px] font-medium text-gray-600">
                More
              </span>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="md:hidden fixed inset-0 bg-black/70
                         backdrop-blur-sm z-50"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="md:hidden fixed right-0 top-0 bottom-0 w-72
                         bg-[#0e0e16] border-l border-white/10
                         z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer Top */}
              <div className="flex items-center justify-between
                              px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br
                                  from-purple-500 to-pink-500
                                  flex items-center justify-center
                                  font-black shadow-md shadow-purple-500/30">
                    L
                  </div>
                  <div>
                    <div className="font-black text-sm">LevelUp</div>
                    <div className="text-[10px] text-gray-500">
                      Placement Prep
                    </div>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 bg-white/5 border border-white/10
                             rounded-xl flex items-center justify-center
                             text-gray-400 hover:text-white transition"
                >
                  ✕
                </motion.button>
              </div>

              {/* User Card */}
              <div className="px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-3 bg-white/5
                                border border-white/8 rounded-2xl p-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br
                                  from-purple-600 to-pink-600
                                  flex items-center justify-center
                                  flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor"
                      strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate text-white">
                      {user?.displayName || "Player"}
                    </div>
                    <div className="text-gray-500 text-xs truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>

                {/* XP + Streak */}
                <div className="flex gap-2 mt-2">
                  <div className="flex-1 flex items-center gap-1.5
                                  bg-yellow-500/10 border border-yellow-500/20
                                  rounded-xl px-3 py-1.5">
                    <span>⚡</span>
                    <span className="text-yellow-400 text-xs font-bold">
                      0 XP
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-1.5
                                  bg-orange-500/10 border border-orange-500/20
                                  rounded-xl px-3 py-1.5">
                    <span>🔥</span>
                    <span className="text-orange-400 text-xs font-bold">
                      0 streak
                    </span>
                  </div>
                </div>
              </div>

              {/* All Nav Items */}
              <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
                <div className="text-[10px] text-gray-600 font-bold
                                uppercase tracking-widest px-3 mb-2">
                  Navigation
                </div>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => goTo(item.path)}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center gap-3 px-4 py-3
                                rounded-xl text-sm font-medium
                                transition-all text-left border
                                ${active(item.path)
                                  ? "bg-purple-600/20 border-purple-500/30 text-white"
                                  : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                  >
                    <span className="text-lg w-6 text-center">
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {active(item.path) && (
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Logout */}
              <div className="px-4 py-4 border-t border-white/5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3
                             rounded-xl text-red-400 hover:bg-red-500/10
                             transition text-sm font-medium border
                             border-transparent hover:border-red-500/20"
                >
                  <span className="text-lg">🚪</span>
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}