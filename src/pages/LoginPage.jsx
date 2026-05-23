import { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mobile redirect result handle karo
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          toast.success("Welcome to LevelUp! 🚀");
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Mobile pe redirect
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Desktop pe popup
        await signInWithPopup(auth, googleProvider);
        toast.success("Welcome to LevelUp! 🚀");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Login failed. Try again!");
      setLoading(false);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      toast.success("Let's go! 🎮");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#07070f] flex overflow-hidden
                    relative">

      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full
                        bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full
                        bg-pink-500/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full
                        bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px,
                              transparent 1px),
                              linear-gradient(90deg,
                              rgba(255,255,255,.5) 1px,transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* LEFT SIDE — Desktop only */}
      <div className="hidden lg:flex flex-1 flex-col justify-center
                      px-16 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl flex items-center
                            justify-center text-white font-black text-xl
                            bg-gradient-to-br from-purple-500 to-pink-500">
              L
            </div>
            <span className="text-white font-bold text-xl">LevelUp</span>
          </div>

          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Your placement
            <span className="block bg-gradient-to-r from-purple-400
                             via-pink-400 to-blue-400 bg-clip-text
                             text-transparent">
              journey starts here
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            Turn boring placement prep into an
            <span className="text-purple-400 font-medium"> addictive game.</span>
            {" "}Earn XP, unlock levels, beat the leaderboard.
          </p>

          <div className="flex gap-8 mb-12">
            {[
              { num: "2.4K+", label: "Students" },
              { num: "50K+", label: "XP Earned" },
              { num: "340+", label: "Jobs Landed" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black bg-gradient-to-r
                                from-purple-400 to-pink-400 bg-clip-text
                                text-transparent mb-1">
                  {s.num}
                </div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {["🎮 XP & Levels", "🔥 Daily Streaks", "🏆 Leaderboard",
              "🧠 AI Mock Interviews", "📄 Resume Scorer"].map((f) => (
              <span key={f}
                className="px-4 py-2 rounded-full text-sm font-medium
                           bg-white/5 border border-white/10 text-gray-300">
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE — Login Form */}
      <div className="flex-1 flex items-center justify-center
                      px-6 lg:px-16 relative">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3
                            flex items-center justify-center
                            text-white font-black text-2xl
                            bg-gradient-to-br from-purple-500 to-pink-500
                            shadow-lg shadow-purple-500/40">
              L
            </div>
            <h1 className="text-2xl font-black text-white">LevelUp</h1>
            <p className="text-gray-500 text-sm mt-1">
              Gamified placement prep 🎮
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/[0.04] backdrop-blur-xl
                          border border-white/10 rounded-3xl p-8
                          shadow-2xl shadow-black/50">

            {/* Tab Toggle */}
            <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold
                            transition-all duration-200
                            ${isLogin
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                              : "text-gray-400 hover:text-white"
                            }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold
                            transition-all duration-200
                            ${!isLogin
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                              : "text-gray-400 hover:text-white"
                            }`}
              >
                Sign Up
              </button>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-white text-2xl font-black mb-1">
                {isLogin ? "Welcome back 👋" : "Join the grind 🚀"}
              </h2>
              <p className="text-gray-500 text-sm">
                {isLogin
                  ? "Your streak is waiting for you!"
                  : "Create your free account in 30 seconds"}
              </p>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full bg-white text-gray-800 rounded-2xl py-3.5
                         font-semibold text-sm flex items-center
                         justify-center gap-3 hover:bg-gray-50
                         transition-all duration-200 mb-4 shadow-lg
                         hover:shadow-xl hover:-translate-y-0.5
                         active:translate-y-0 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-400
                                border-t-gray-800 rounded-full animate-spin" />
              ) : (
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5" alt="Google"
                />
              )}
              {loading ? "Redirecting..." : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-600 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleEmail} className="space-y-3">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10
                               rounded-2xl px-4 py-3.5 text-white text-sm
                               placeholder-gray-600 focus:outline-none
                               focus:border-purple-500/60 transition"
                    required
                  />
                </motion.div>
              )}

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10
                           rounded-2xl px-4 py-3.5 text-white text-sm
                           placeholder-gray-600 focus:outline-none
                           focus:border-purple-500/60 transition"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10
                           rounded-2xl px-4 py-3.5 text-white text-sm
                           placeholder-gray-600 focus:outline-none
                           focus:border-purple-500/60 transition"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600
                           via-purple-500 to-pink-500 text-white
                           rounded-2xl py-3.5 font-bold text-sm
                           transition-all duration-200
                           hover:shadow-lg hover:shadow-purple-500/40
                           hover:-translate-y-0.5 active:translate-y-0
                           disabled:opacity-50 mt-1"
              >
                {loading
                  ? "Loading..."
                  : isLogin ? "Login & Level Up →" : "Create Account →"}
              </button>
            </form>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4
                            mt-6 pt-6 border-t border-white/5">
              <span className="text-gray-600 text-xs">🔒 Secure</span>
              <span className="text-gray-600 text-xs">⚡ Free forever</span>
              <span className="text-gray-600 text-xs">🎓 For students</span>
            </div>
          </div>

          <p className="text-center text-gray-600 text-xs mt-4">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}