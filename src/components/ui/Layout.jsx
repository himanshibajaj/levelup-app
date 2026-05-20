import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const navItems = [
  { icon: "⚡", label: "Dashboard",    path: "/dashboard" },
  { icon: "💻", label: "DSA Practice", path: "/dsa" },
  { icon: "🎯", label: "PYQs",         path: "/pyq" },
  { icon: "🎓", label: "Alumni",       path: "/alumni" },
  { icon: "🤝", label: "Mentors",      path: "/mentors" },
  { icon: "📄", label: "Resume",       path: "/resume" },
  { icon: "🏆", label: "Leaderboard",  path: "/leaderboard" },
  { icon: "🏅", label: "Badges",       path: "/badges" },
];

export default function Layout({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("See you soon! 👋");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#07070f] text-white flex
                    overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
                        rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full
                        bg-pink-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full
                        bg-blue-500/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,
                              transparent 1px),
                              linear-gradient(90deg,
                              rgba(255,255,255,.6) 1px,transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-56 bg-black/30
                        backdrop-blur-xl border-r border-white/5
                        relative z-10 flex-shrink-0">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br
                            from-purple-500 to-pink-500 flex items-center
                            justify-center font-black text-lg
                            shadow-lg shadow-purple-500/30">
              L
            </div>
            <div>
              <div className="font-black text-base">LevelUp</div>
              <div className="text-[10px] text-gray-500">Placement Prep</div>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-gray-400 font-medium">
              Level 1 · Fresher 🐣
            </span>
            <span className="text-[10px] text-purple-400 font-bold">
              0 XP
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-purple-500
                            to-pink-500 rounded-full" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5
                            rounded-xl text-sm font-medium transition-all
                            duration-200 text-left
                            ${isActive
                              ? "bg-purple-600/20 border border-purple-500/30 text-white"
                              : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                            }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full
                                  bg-purple-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Streak + User Bottom */}
        <div className="px-4 py-4 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-orange-500/10
                            border border-orange-500/20 rounded-xl
                            px-3 py-1.5">
              <span className="text-sm">🔥</span>
              <span className="text-orange-400 text-xs font-bold">
                0 streak
              </span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-500/10
                            border border-yellow-500/20 rounded-xl
                            px-3 py-1.5">
              <span className="text-sm">⚡</span>
              <span className="text-yellow-400 text-xs font-bold">
                0 XP
              </span>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-white/5
                          rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br
                            from-purple-600 to-pink-600 flex items-center
                            justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
            <button onClick={handleLogout}
              className="text-gray-600 hover:text-red-400 transition text-xs">
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 relative z-10 overflow-y-auto h-screen">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between
                        px-4 py-3 border-b border-white/5 bg-black/20
                        backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br
                            from-purple-500 to-pink-500 flex items-center
                            justify-center font-black">
              L
            </div>
            <span className="font-bold">LevelUp</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400">
            ☰
          </button>
        </div>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300 }} animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 w-56 bg-[#0e0e16]
                         border-r border-white/10 z-50 p-4 md:hidden"
            >
              <nav className="space-y-1 mt-4">
                {navItems.map((item) => (
                  <button key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5
                               rounded-xl text-sm text-gray-400
                               hover:bg-white/5 hover:text-white transition">
                    <span>{item.icon}</span>{item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}