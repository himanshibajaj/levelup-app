import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/ui/Layout";
import toast from "react-hot-toast";

const alumni = [
  {
    id: 1,
    name: "Rahul Gupta",
    avatar: "R",
    color: "from-blue-500 to-cyan-500",
    company: "Google",
    companyColor: "text-blue-400",
    role: "SDE-1",
    college: "IIT Delhi",
    batch: "2024",
    package: "45 LPA",
    cgpa: "7.8",
    timeToPlace: "6 months prep",
    story: "I failed Google twice before cracking it. The third attempt, I completely changed my approach — focused on problem-solving patterns instead of memorizing solutions. The key was solving 300+ questions with full understanding, not just AC submissions.",
    tips: [
      "Revise the same question after 3 days — spaced repetition works",
      "Mock interviews weekly — even if embarrassing",
      "System design is 40% of the interview — don't ignore it",
      "Your attitude matters as much as your code",
    ],
    resources: ["NeetCode 150", "Striver's SDE Sheet", "Grokking System Design"],
    rounds: ["Online Assessment", "DSA Round 1", "DSA Round 2", "System Design", "Behavioural"],
    likes: 234,
    category: "FAANG",
    tags: ["DSA", "System Design", "Failed & Bounced Back"],
  },
  {
    id: 2,
    name: "Anjali Sharma",
    avatar: "A",
    color: "from-pink-500 to-rose-500",
    company: "Microsoft",
    companyColor: "text-green-400",
    role: "SDE-1",
    college: "NIT Trichy",
    batch: "2023",
    package: "33 LPA",
    cgpa: "8.2",
    timeToPlace: "4 months prep",
    story: "Coming from a Tier-2 college, I was always told FAANG isn't for people like me. I proved them wrong. The secret? I treated my preparation like a product — tracked metrics, iterated, improved. Solved 250 problems but made sure I could explain every single one.",
    tips: [
      "Tier of college doesn't matter — your skills do",
      "Track your weak topics weekly in a spreadsheet",
      "Read editorial AFTER you've tried for 45 minutes",
      "Do mock interviews with strangers — friends are too kind",
    ],
    resources: ["Love Babbar DSA Sheet", "InterviewBit", "Pramp for mocks"],
    rounds: ["OA — 3 coding problems", "Technical Round 1", "Technical Round 2", "HR"],
    likes: 189,
    category: "FAANG",
    tags: ["Tier-2 College", "Women in Tech", "Consistency"],
  },
  {
    id: 3,
    name: "Dev Malhotra",
    avatar: "D",
    color: "from-orange-500 to-amber-500",
    company: "Zomato",
    companyColor: "text-red-400",
    role: "Full Stack Engineer",
    college: "VIT Vellore",
    batch: "2024",
    package: "18 LPA",
    cgpa: "6.9",
    timeToPlace: "3 months prep",
    story: "Low CGPA, no competitive programming background — but I built 4 real projects and could talk about every line of code. Zomato loved that. Build things people actually use. My projects had real users which impressed the panel more than leetcode.",
    tips: [
      "Projects > DSA for product companies like Zomato/Swiggy",
      "Deploy everything — GitHub green squares matter",
      "Know your projects inside out — they WILL grill you",
      "Low CGPA? Compensate with exceptional projects",
    ],
    resources: ["Full Stack Open", "CS50", "The Odin Project"],
    rounds: ["Resume Shortlist", "Technical Project Discussion", "Coding Round", "HR"],
    likes: 156,
    category: "Product",
    tags: ["Low CGPA", "Projects", "Full Stack"],
  },
  {
    id: 4,
    name: "Meera Iyer",
    avatar: "M",
    color: "from-purple-500 to-violet-500",
    company: "Deloitte",
    companyColor: "text-purple-400",
    role: "Analyst",
    college: "Anna University",
    batch: "2024",
    package: "8 LPA",
    cgpa: "8.9",
    timeToPlace: "2 months prep",
    story: "Mass recruiter but don't underestimate it. Aptitude, verbal and coding all matter equally. I scored in top 5% of OA which got me direct HR skip. For service companies, communication and attitude are everything in HR round.",
    tips: [
      "Aptitude practice is different from DSA — practice specifically",
      "Communication > Code for service companies",
      "Research the company before HR — they notice",
      "Group discussion practice helps a LOT",
    ],
    resources: ["IndiaBix for aptitude", "RS Agarwal", "Previous placement papers"],
    rounds: ["Online Assessment", "Group Discussion", "Technical Interview", "HR"],
    likes: 98,
    category: "Service",
    tags: ["Mass Recruiter", "Aptitude", "HR Focused"],
  },
  {
    id: 5,
    name: "Kiran Patel",
    avatar: "K",
    color: "from-green-500 to-teal-500",
    company: "Startup (Series B)",
    companyColor: "text-yellow-400",
    role: "Backend Engineer",
    college: "DTU Delhi",
    batch: "2024",
    package: "22 LPA + ESOPs",
    cgpa: "7.4",
    timeToPlace: "Ongoing",
    story: "Chose a startup over Infosys offer. The learning curve is 10x steeper. In 6 months I've done what would take 3 years in a service company. ESOPs could be life-changing if they scale. For those considering startups — the risk is real but so is the reward.",
    tips: [
      "Research the startup's funding, team, and product carefully",
      "Ask about tech stack in interview — if it's outdated, think twice",
      "ESOPs only matter if the company is on a growth path",
      "Startup culture is intense — be honest with yourself about fit",
    ],
    resources: ["AngelList", "LinkedIn", "YC startup school"],
    rounds: ["Technical Assignment (1 week)", "System Design Discussion", "Founder Call"],
    likes: 112,
    category: "Startup",
    tags: ["Startup vs FAANG", "ESOPs", "High Growth"],
  },
  {
    id: 6,
    name: "Priya Nair",
    avatar: "P",
    color: "from-yellow-500 to-orange-400",
    company: "Amazon",
    companyColor: "text-orange-400",
    role: "SDE-1",
    college: "BITS Pilani",
    batch: "2023",
    package: "38 LPA",
    cgpa: "7.6",
    timeToPlace: "5 months prep",
    story: "Amazon's leadership principles are NOT just HR fluff — they test you on them technically too. Every answer needs to connect back to a principle. I made a spreadsheet mapping my experiences to each of the 16 LPs and practiced until they felt natural.",
    tips: [
      "Amazon = DSA + Leadership Principles — prepare both equally",
      "STAR format for every behavioural answer",
      "Map your college projects to LPs before the interview",
      "Bar raiser round is toughest — they look for red flags",
    ],
    resources: ["Amazon LP guide on Reddit", "14 Leadership Principles PDF", "LeetCode Amazon tag"],
    rounds: ["OA (2 coding)", "LP + Technical Round 1", "Technical Round 2", "Bar Raiser", "HR"],
    likes: 201,
    category: "FAANG",
    tags: ["Amazon LPs", "Behavioural", "Detailed Prep"],
  },
];

const categories = ["All", "FAANG", "Product", "Service", "Startup"];

export default function AlumniPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const filtered = alumni.filter((a) => {
    const catMatch = filter === "All" || a.category === filter;
    const searchMatch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return catMatch && searchMatch;
  });

  const handleLike = (id) => {
    if (liked.includes(id)) return;
    setLiked([...liked, id]);
    toast.success("Saved to your inspiration list! ⭐");
  };

  return (
    <Layout>
      {!selected ? (
        <>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-black mb-1">
              Alumni Stories 🎓
            </h1>
            <p className="text-gray-400 text-sm">
              Real experiences from placed seniors —
              learn from their journey, not just their success
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: "🎓", val: "6+", label: "Alumni Stories" },
              { icon: "🏢", val: "FAANG+", label: "Companies Covered" },
              { icon: "📖", val: "Real", label: "Unfiltered Advice" },
            ].map((s) => (
              <div key={s.label}
                className="bg-white/[0.04] border border-white/10
                           rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-lg font-black text-purple-300">
                  {s.val}
                </div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Banner — Share Your Story */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/10
                          border border-purple-500/20 rounded-2xl p-4 mb-6
                          flex items-center gap-4">
            <div className="text-3xl">✍️</div>
            <div className="flex-1">
              <div className="font-bold text-sm mb-0.5">
                Recently placed? Share your story!
              </div>
              <div className="text-gray-400 text-xs">
                Help juniors by sharing your placement experience
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                toast.success("Feature coming soon! We'll notify you 🔔");
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600
                         text-white text-xs font-bold px-4 py-2.5
                         rounded-xl hover:shadow-lg transition-all
                         hover:-translate-y-0.5 whitespace-nowrap">
              Share Story →
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2
                             text-gray-500">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company, college, or topic..."
              className="w-full bg-white/[0.04] border border-white/10
                         rounded-xl pl-10 pr-4 py-3 text-sm text-white
                         placeholder-gray-600 focus:outline-none
                         focus:border-purple-500/50 transition"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {categories.map((c) => (
              <button key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium
                            transition-all border
                            ${filter === c
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                            }`}>
                {c}
              </button>
            ))}
          </div>

          {/* Story Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((a, i) => (
              <motion.div key={a.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.04] border border-white/10
                           rounded-2xl p-5 hover:border-purple-500/30
                           transition-all group cursor-pointer"
                onClick={() => setSelected(a)}
              >
                {/* Top */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br
                                  ${a.color} flex items-center justify-center
                                  text-lg font-black text-white flex-shrink-0`}>
                    {a.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold">{a.name}</span>
                      <span className={`text-xs font-bold ${a.companyColor}
                                        bg-white/5 px-2 py-0.5 rounded-lg
                                        border border-white/10`}>
                        @ {a.company}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {a.college} · Batch {a.batch}
                    </div>
                    <div className="text-green-400 text-xs font-bold mt-0.5">
                      💰 {a.package}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-gray-600 mb-1">
                      {a.category}
                    </div>
                    <div className="text-[10px] text-gray-600">
                      CGPA {a.cgpa}
                    </div>
                  </div>
                </div>

                {/* Story preview */}
                <p className="text-gray-400 text-xs leading-relaxed mb-4
                              line-clamp-3">
                  "{a.story.substring(0, 150)}..."
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {a.tags.map((t) => (
                    <span key={t}
                      className="text-[10px] bg-purple-500/10
                                 border border-purple-500/15 text-purple-400
                                 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(a.id); }}
                    className={`flex items-center gap-1.5 text-xs transition
                                ${liked.includes(a.id)
                                  ? "text-pink-400" : "text-gray-500 hover:text-pink-400"}`}>
                    {liked.includes(a.id) ? "❤️" : "🤍"}
                    {a.likes + (liked.includes(a.id) ? 1 : 0)} inspired
                  </button>
                  <button
                    className="text-xs text-purple-400 hover:text-purple-300
                               transition font-medium">
                    Read full story →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        /* ===== FULL STORY VIEW ===== */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Back */}
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-gray-400
                       hover:text-white transition mb-6 group">
            <span className="group-hover:-translate-x-1 transition">←</span>
            Back to Alumni Stories
          </button>

          {/* Hero */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/10
                          border border-purple-500/20 rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br
                              ${selected.color} flex items-center justify-center
                              text-2xl font-black text-white shadow-lg`}>
                {selected.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-black mb-1">{selected.name}</h1>
                <div className={`text-base font-bold ${selected.companyColor}`}>
                  {selected.role} @ {selected.company}
                </div>
                <div className="text-gray-400 text-sm">
                  {selected.college} · Batch {selected.batch}
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-black text-xl">
                  {selected.package}
                </div>
                <div className="text-gray-500 text-xs">Package</div>
                <div className="text-gray-400 text-xs mt-1">
                  {selected.timeToPlace}
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "CGPA", value: selected.cgpa },
              { label: "Category", value: selected.category },
              { label: "Prep Time", value: selected.timeToPlace },
            ].map((s) => (
              <div key={s.label}
                className="bg-white/[0.04] border border-white/10
                           rounded-xl p-3 text-center">
                <div className="font-bold text-sm text-white">
                  {s.value}
                </div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Full Story */}
          <div className="bg-white/[0.04] border border-white/10
                          rounded-2xl p-6 mb-6">
            <h2 className="font-black text-base mb-3 flex items-center gap-2">
              📖 My Story
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              "{selected.story}"
            </p>
          </div>

          {/* Interview Rounds */}
          <div className="bg-white/[0.04] border border-white/10
                          rounded-2xl p-6 mb-6">
            <h2 className="font-black text-base mb-4">
              🔄 Interview Rounds
            </h2>
            <div className="flex flex-wrap gap-3">
              {selected.rounds.map((r, i) => (
                <div key={r}
                  className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-600/30
                                  border border-purple-500/30 flex items-center
                                  justify-center text-xs font-bold text-purple-300">
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-300">{r}</span>
                  {i < selected.rounds.length - 1 && (
                    <span className="text-gray-700">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/[0.04] border border-white/10
                          rounded-2xl p-6 mb-6">
            <h2 className="font-black text-base mb-4">
              💡 Top Tips from {selected.name.split(" ")[0]}
            </h2>
            <div className="space-y-3">
              {selected.tips.map((tip, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-green-500/15
                                  border border-green-500/20 flex items-center
                                  justify-center text-xs text-green-400
                                  flex-shrink-0 mt-0.5 font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {tip}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white/[0.04] border border-white/10
                          rounded-2xl p-6 mb-6">
            <h2 className="font-black text-base mb-4">
              📚 Resources Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {selected.resources.map((r) => (
                <span key={r}
                  className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20
                             text-blue-400 text-xs rounded-xl font-medium">
                  📌 {r}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selected.tags.map((t) => (
              <span key={t}
                className="px-3 py-1.5 bg-purple-500/10 border
                           border-purple-500/20 text-purple-400 text-xs
                           rounded-xl">
                #{t.replace(/ /g, "")}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                toast.success("Opening Mentors page... 🤝");
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600
                         text-white rounded-2xl py-3 font-bold text-sm
                         hover:shadow-lg transition-all hover:-translate-y-0.5">
              💬 Message {selected.name.split(" ")[0]}
            </button>
            <button
              onClick={() => {
                handleLike(selected.id);
              }}
              className="bg-white/5 border border-white/10 text-white
                         rounded-2xl py-3 font-bold text-sm
                         hover:border-pink-500/40 transition">
              {liked.includes(selected.id) ? "❤️ Saved!" : "🤍 Save Story"}
            </button>
          </div>
        </motion.div>
      )}
    </Layout>
  );
}