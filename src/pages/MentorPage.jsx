import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/ui/Layout";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const mentors = [
  {
    id: 1,
    name: "Aakash Mehta",
    role: "SDE @ Google",
    batch: "2023",
    college: "IIT Bombay",
    avatar: "A",
    color: "from-blue-500 to-cyan-500",
    skills: ["DSA", "System Design", "Resume Review"],
    rating: 4.9,
    helped: 48,
    bio: "Cracked Google in 3rd attempt. Happy to guide juniors on DSA strategy and interview prep. DM anytime!",
    available: true,
    responseTime: "~2 hrs",
  },
  {
    id: 2,
    name: "Neha Gupta",
    role: "SDE-2 @ Microsoft",
    batch: "2022",
    college: "NIT Trichy",
    avatar: "N",
    color: "from-purple-500 to-violet-500",
    skills: ["Interview Prep", "CP", "Internships"],
    rating: 4.8,
    helped: 62,
    bio: "From tier-2 college to Microsoft. I know how hard it is — let me help you navigate placements!",
    available: true,
    responseTime: "~4 hrs",
  },
  {
    id: 3,
    name: "Ravi Shankar",
    role: "SDE-1 @ Amazon",
    batch: "2024",
    college: "VIT Vellore",
    avatar: "R",
    color: "from-orange-500 to-amber-500",
    skills: ["DSA", "Behavioural", "OA Prep"],
    rating: 4.7,
    helped: 35,
    bio: "Just placed last year — remember everything fresh. Best person to ask about current placement trends!",
    available: false,
    responseTime: "~1 day",
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Frontend @ Flipkart",
    batch: "2023",
    college: "DTU Delhi",
    avatar: "P",
    color: "from-pink-500 to-rose-500",
    skills: ["React", "Frontend", "Resume", "LinkedIn"],
    rating: 4.9,
    helped: 71,
    bio: "Frontend specialist. Can review your projects, portfolio and LinkedIn profile to make them recruiter-ready!",
    available: true,
    responseTime: "~3 hrs",
  },
  {
    id: 5,
    name: "Arjun Das",
    role: "Backend @ Zomato",
    batch: "2023",
    college: "BITS Pilani",
    avatar: "A",
    color: "from-green-500 to-teal-500",
    skills: ["Node.js", "System Design", "Startups"],
    rating: 4.6,
    helped: 29,
    bio: "Chose startup over FAANG — happy to explain both paths and help you decide what's right for you.",
    available: true,
    responseTime: "~5 hrs",
  },
  {
    id: 6,
    name: "Sneha Kulkarni",
    role: "Data Analyst @ Paytm",
    batch: "2024",
    college: "COEP Pune",
    avatar: "S",
    color: "from-yellow-500 to-orange-500",
    skills: ["SQL", "Python", "Data", "Non-Tech"],
    rating: 4.8,
    helped: 44,
    bio: "For those who want data/analytics roles instead of SDE. SQL, Python, case studies — I've got you!",
    available: true,
    responseTime: "~2 hrs",
  },
];

// Simple chat messages
const defaultMessages = {
  1: [{ from: "mentor", text: "Hey! I'm Aakash. How can I help you with your placement prep? 😊", time: "2:30 PM" }],
  2: [{ from: "mentor", text: "Hi! Happy to help. What's your biggest challenge right now?", time: "11:00 AM" }],
  4: [{ from: "mentor", text: "Hey! Send me your portfolio link and I'll give feedback 🙌", time: "Yesterday" }],
};

export default function MentorPage() {
  const { user } = useAuth();
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const allSkills = ["All", "DSA", "System Design", "Resume", "Frontend",
                     "Interview Prep", "CP", "Data", "Internships"];

  const filtered = mentors.filter((m) => {
    const skillMatch = filter === "All" ||
                       m.skills.some(s => s.includes(filter));
    const searchMatch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.role.toLowerCase().includes(search.toLowerCase()) ||
                        m.skills.some(s =>
                          s.toLowerCase().includes(search.toLowerCase()));
    return skillMatch && searchMatch;
  });

  const sendMessage = () => {
    if (!input.trim() || !selectedMentor) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit", minute: "2-digit"
    });
    const newMsg = { from: "me", text: input.trim(), time: now };
    setMessages((prev) => ({
      ...prev,
      [selectedMentor.id]: [...(prev[selectedMentor.id] || []), newMsg],
    }));
    setInput("");
    toast.success("+10 XP — Message sent! 💬");

    // Auto reply after 1.5s
    setTimeout(() => {
      const replies = [
        "Great question! Let me think and get back to you 😊",
        "Sure! I'll share some resources for this.",
        "That's a common challenge. Here's what worked for me...",
        "DM me your resume too — happy to review!",
        "Focus on fundamentals first. Which topic do you need help with?",
      ];
      const reply = {
        from: "mentor",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit", minute: "2-digit"
        }),
      };
      setMessages((prev) => ({
        ...prev,
        [selectedMentor.id]: [...(prev[selectedMentor.id] || []), reply],
      }));
    }, 1500);
  };

  return (
    <Layout>
      {!selectedMentor ? (
        <>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-black mb-1">
              Senior Mentors 🤝
            </h1>
            <p className="text-gray-400 text-sm">
              Get guidance from seniors who've been placed —
              real advice, not textbooks
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: "👥", value: "6", label: "Active Mentors" },
              { icon: "💬", value: "284", label: "Students Helped" },
              { icon: "⭐", value: "4.8", label: "Avg Rating" },
            ].map((s) => (
              <div key={s.label}
                className="bg-white/[0.04] border border-white/10
                           rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-black text-purple-300">
                  {s.value}
                </div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2
                             text-gray-500 text-sm">
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, or skill..."
              className="w-full bg-white/[0.04] border border-white/10
                         rounded-xl pl-10 pr-4 py-3 text-sm text-white
                         placeholder-gray-600 focus:outline-none
                         focus:border-purple-500/50 transition"
            />
          </div>

          {/* Skill Filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            {allSkills.map((s) => (
              <button key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium
                            transition-all border
                            ${filter === s
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                            }`}>
                {s}
              </button>
            ))}
          </div>

          {/* Mentor Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((m, i) => (
              <motion.div key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.04] border border-white/10
                           rounded-2xl p-5 hover:border-purple-500/30
                           transition-all group"
              >
                {/* Top row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br
                                  ${m.color} flex items-center justify-center
                                  text-xl font-black text-white flex-shrink-0
                                  shadow-lg`}>
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base">{m.name}</span>
                      {m.available ? (
                        <span className="flex items-center gap-1 text-[10px]
                                         bg-green-500/10 border border-green-500/20
                                         text-green-400 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-400
                                           rounded-full" />
                          Online
                        </span>
                      ) : (
                        <span className="text-[10px] bg-gray-500/10
                                         border border-gray-500/20 text-gray-500
                                         px-2 py-0.5 rounded-full">
                          Away
                        </span>
                      )}
                    </div>
                    <div className="text-purple-400 text-sm font-medium">
                      {m.role}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {m.college} · Batch {m.batch}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-yellow-400 text-sm font-bold">
                      ⭐ {m.rating}
                    </div>
                    <div className="text-gray-600 text-[10px]">
                      {m.helped} helped
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  "{m.bio}"
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {m.skills.map((s) => (
                    <span key={s}
                      className="text-[10px] bg-white/5 border border-white/10
                                 text-gray-400 px-2 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-600">
                    ⏱ Replies in {m.responseTime}
                  </span>
                  <button
                    onClick={() => setSelectedMentor(m)}
                    className={`bg-gradient-to-r ${m.color} text-white
                                rounded-xl px-4 py-2 text-xs font-bold
                                hover:shadow-lg transition-all
                                hover:-translate-y-0.5`}>
                    💬 Message
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        /* ===== CHAT VIEW ===== */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-[calc(100vh-120px)]"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-4 bg-white/[0.04]
                          border border-white/10 rounded-2xl p-4 mb-4">
            <button
              onClick={() => setSelectedMentor(null)}
              className="text-gray-400 hover:text-white transition
                         bg-white/5 rounded-xl p-2">
              ← Back
            </button>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br
                            ${selectedMentor.color} flex items-center
                            justify-center font-black text-white`}>
              {selectedMentor.avatar}
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">{selectedMentor.name}</div>
              <div className="text-xs text-gray-400">
                {selectedMentor.role}
              </div>
            </div>
            {selectedMentor.available && (
              <span className="flex items-center gap-1.5 text-xs
                               text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full
                                 animate-pulse" />
                Online
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
            {/* Context banner */}
            <div className="text-center">
              <span className="text-[10px] bg-white/5 text-gray-500
                               px-3 py-1 rounded-full border border-white/10">
                🔒 Keep conversations respectful and professional
              </span>
            </div>

            {(messages[selectedMentor.id] || []).map((msg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === "me"
                              ? "justify-end" : "justify-start"}`}>
                {msg.from === "mentor" && (
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br
                                  ${selectedMentor.color} flex items-center
                                  justify-center text-xs font-bold
                                  mr-2 flex-shrink-0 mt-auto`}>
                    {selectedMentor.avatar}
                  </div>
                )}
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5
                                 text-sm leading-relaxed
                                 ${msg.from === "me"
                                   ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-md"
                                   : "bg-white/[0.07] border border-white/10 text-gray-200 rounded-bl-md"
                                 }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1
                                  ${msg.from === "me"
                                    ? "text-white/50" : "text-gray-600"}`}>
                    {msg.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="flex gap-2 flex-wrap mb-3">
            {[
              "How to start DSA? 🧠",
              "Resume review please? 📄",
              "How was your interview? 💼",
              "Best resources? 📚",
            ].map((q) => (
              <button key={q}
                onClick={() => setInput(q)}
                className="text-[11px] bg-white/5 border border-white/10
                           text-gray-400 hover:text-white hover:border-purple-500/40
                           px-3 py-1.5 rounded-xl transition">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${selectedMentor.name}...`}
              className="flex-1 bg-white/[0.04] border border-white/10
                         rounded-2xl px-4 py-3 text-sm text-white
                         placeholder-gray-600 focus:outline-none
                         focus:border-purple-500/50 transition"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-600 to-pink-600
                         text-white rounded-2xl px-5 py-3 font-bold
                         text-sm hover:shadow-lg hover:shadow-purple-500/30
                         transition-all hover:-translate-y-0.5">
              Send ↑
            </button>
          </div>
        </motion.div>
      )}
    </Layout>
  );
}