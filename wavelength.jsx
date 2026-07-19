import React, { useState, useRef, useEffect, useMemo } from "react";
import { Send, Search, Smile, ChevronLeft, Mail, Loader2 } from "lucide-react";

// ---- Mini provider marks (simplified, not official brand assets) -----
function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z"/>
      <path fill="#4CAF50" d="M24 44c5.4 0 10.4-2.1 14.2-5.5l-6.6-5.5C29.4 34.7 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.9 39.7 16.4 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.6 5.5C41.4 36.6 44 30.9 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
function FacebookMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.07C24 5.4 18.6 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
    </svg>
  );
}
function AppleMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 384 512" fill="#F5F3EF">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-57.7-90-57.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

function LoginScreen({ onLogin }) {
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState("");

  function handleProviderClick(provider) {
    setLoadingProvider(provider);
    // Simulated auth — a real build calls out to an OAuth provider here.
    setTimeout(() => onLogin(provider), 900);
  }

  return (
    <div
      className="w-full h-[640px] flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/5"
      style={{ background: "#0F0F16", color: "#F5F3EF", fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .display-font { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        @keyframes driftLogin {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        .aura-blob-login { animation: driftLogin 12s ease-in-out infinite; }
        .provider-btn:hover { background: #22222E !important; }
      `}</style>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aura-blob-login absolute rounded-full opacity-25" style={{ width: 420, height: 420, top: -140, left: -100, background: "linear-gradient(135deg, #FF6B5C, #9B7EDE)", filter: "blur(100px)" }} />
        <div className="aura-blob-login absolute rounded-full opacity-20" style={{ width: 360, height: 360, bottom: -120, right: -100, background: "linear-gradient(135deg, #4ECDC4, #FFC15E)", filter: "blur(100px)", animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 w-[320px]">
        <div className="text-center mb-8">
          <h1 className="display-font text-2xl font-semibold tracking-tight">Wavelength</h1>
          <p className="text-sm mt-2" style={{ color: "#8A8898" }}>messages that carry a mood</p>
        </div>

        {!emailMode ? (
          <div className="flex flex-col gap-2.5">
            {[
              { key: "google", label: "Continue with Google", icon: <GoogleMark /> },
              { key: "facebook", label: "Continue with Facebook", icon: <FacebookMark /> },
              { key: "apple", label: "Continue with Apple", icon: <AppleMark /> },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => handleProviderClick(p.key)}
                disabled={loadingProvider !== null}
                className="provider-btn w-full flex items-center justify-center gap-3 rounded-full py-2.5 text-sm font-medium transition-colors"
                style={{ background: "#1C1C25", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {loadingProvider === p.key ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  p.icon
                )}
                {loadingProvider === p.key ? "Connecting..." : p.label}
              </button>
            ))}

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <span className="text-[11px]" style={{ color: "#5F5D6B" }}>or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>

            <button
              onClick={() => setEmailMode(true)}
              className="provider-btn w-full flex items-center justify-center gap-3 rounded-full py-2.5 text-sm font-medium transition-colors"
              style={{ background: "#1C1C25", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Mail size={15} color="#8A8898" />
              Continue with email
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-[#5F5D6B]"
              style={{ background: "#1C1C25", border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <button
              onClick={() => handleProviderClick("email")}
              disabled={!email.trim() || loadingProvider !== null}
              className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold"
              style={{ background: "#F5F3EF", color: "#0F0F16", opacity: !email.trim() ? 0.5 : 1 }}
            >
              {loadingProvider === "email" ? <Loader2 size={15} className="animate-spin" /> : "Continue"}
            </button>
            <button
              onClick={() => setEmailMode(false)}
              className="text-xs mt-1"
              style={{ color: "#8A8898" }}
            >
              &larr; back to other options
            </button>
          </div>
        )}

        <p className="text-[11px] text-center mt-6" style={{ color: "#5F5D6B" }}>
          By continuing you agree to Wavelength's Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

// ---- Mood system -----------------------------------------------------
const MOODS = {
  calm: { label: "Calm", color: "#4ECDC4" },
  warm: { label: "Warm", color: "#FF6B5C" },
  excited: { label: "Excited", color: "#FFC15E" },
  deep: { label: "Deep", color: "#9B7EDE" },
  neutral: { label: "Neutral", color: "#6B7280" },
};
const MOOD_KEYS = Object.keys(MOODS);

function hexToRgb(hex) {
  const v = hex.replace("#", "");
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function blendMoods(moodKeys) {
  if (moodKeys.length === 0) return MOODS.neutral.color;
  const last = moodKeys.slice(-5);
  let r = 0, g = 0, b = 0;
  last.forEach((k) => {
    const [rr, gg, bb] = hexToRgb(MOODS[k].color);
    r += rr; g += gg; b += bb;
  });
  r = Math.round(r / last.length);
  g = Math.round(g / last.length);
  b = Math.round(b / last.length);
  return `rgb(${r}, ${g}, ${b})`;
}

// ---- Seed data ---------------------------------------------------------
const seedConversations = [
  {
    id: "c1",
    name: "Maya Chen",
    initials: "MC",
    messages: [
      { id: 1, from: "them", text: "okay but did you see the sunset today", mood: "warm" },
      { id: 2, from: "me", text: "I did!! it looked unreal from the roof", mood: "excited" },
      { id: 3, from: "them", text: "sending you the photo now", mood: "calm" },
      { id: 4, from: "me", text: "waiting patiently... kind of", mood: "excited" },
    ],
  },
  {
    id: "c2",
    name: "Theo Marks",
    initials: "TM",
    messages: [
      { id: 1, from: "them", text: "can we talk about the project timeline", mood: "neutral" },
      { id: 2, from: "me", text: "yeah, honestly I've been stressed about it", mood: "deep" },
      { id: 3, from: "them", text: "same. let's figure it out together tomorrow", mood: "calm" },
    ],
  },
  {
    id: "c3",
    name: "Priya + Sam",
    initials: "PS",
    messages: [
      { id: 1, from: "them", text: "trip planning starts now people", mood: "excited" },
      { id: 2, from: "me", text: "I'm in, where are we even going", mood: "excited" },
      { id: 3, from: "them", text: "still deciding, throwing out ideas", mood: "neutral" },
    ],
  },
  {
    id: "c4",
    name: "Dad",
    initials: "D",
    messages: [
      { id: 1, from: "them", text: "call me when you get a chance", mood: "neutral" },
      { id: 2, from: "me", text: "everything okay?", mood: "deep" },
      { id: 3, from: "them", text: "all good, just wanted to catch up", mood: "warm" },
    ],
  },
];

function ChatApp({ account, onLogout }) {
  const [conversations, setConversations] = useState(seedConversations);
  const [activeId, setActiveId] = useState("c1");
  const [draft, setDraft] = useState("");
  const [selectedMood, setSelectedMood] = useState("calm");
  const [mobileShowThread, setMobileShowThread] = useState(false);
  const scrollRef = useRef(null);

  const active = conversations.find((c) => c.id === activeId);

  const aura = useMemo(
    () => blendMoods(active.messages.map((m) => m.mood)),
    [active]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [active.messages.length, activeId]);

  function sendMessage() {
    if (!draft.trim()) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: Date.now(), from: "me", text: draft.trim(), mood: selectedMood },
              ],
            }
          : c
      )
    );
    setDraft("");
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        background: "#0F0F16",
        color: "#F5F3EF",
      }}
      className="w-full h-[640px] flex rounded-2xl overflow-hidden border border-white/5"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .display-font { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        @keyframes drift {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.08); }
        }
        .aura-blob { animation: drift 10s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
      `}</style>

      {/* Sidebar */}
      <div
        className={`w-full sm:w-[300px] shrink-0 flex-col border-r border-white/5 ${
          mobileShowThread ? "hidden sm:flex" : "flex"
        }`}
        style={{ background: "#131319" }}
      >
        <div className="px-5 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h1 className="display-font text-xl font-semibold tracking-tight">Wavelength</h1>
            <p className="text-xs mt-1" style={{ color: "#8A8898" }}>
              signed in via {account.provider}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="text-[11px] px-2.5 py-1 rounded-full mt-1"
            style={{ background: "#1C1C25", color: "#8A8898" }}
          >
            Sign out
          </button>
        </div>
        <div className="px-4 pb-3">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "#1C1C25" }}
          >
            <Search size={14} color="#8A8898" />
            <input
              placeholder="Search conversations"
              className="bg-transparent outline-none text-sm w-full placeholder:text-[#5F5D6B]"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          {conversations.map((c) => {
            const lastMsg = c.messages[c.messages.length - 1];
            const dotColor = MOODS[lastMsg.mood].color;
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveId(c.id);
                  setMobileShowThread(true);
                }}
                className="w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 mb-1 transition-colors"
                style={{
                  background: isActive ? "#1F1F29" : "transparent",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 display-font"
                  style={{ background: "#2A2A36", color: "#F5F3EF" }}
                >
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{c.name}</span>
                    <span
                      className="w-2 h-2 rounded-full shrink-0 ml-2"
                      style={{ background: dotColor }}
                    />
                  </div>
                  <p className="text-xs truncate mt-0.5" style={{ color: "#8A8898" }}>
                    {lastMsg.from === "me" ? "You: " : ""}
                    {lastMsg.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thread */}
      <div
        className={`flex-1 flex-col relative overflow-hidden ${
          mobileShowThread ? "flex" : "hidden sm:flex"
        }`}
      >
        {/* Aura backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aura-blob absolute rounded-full opacity-30"
            style={{
              width: 420,
              height: 420,
              top: -120,
              right: -100,
              background: aura,
              filter: "blur(90px)",
              transition: "background 1.2s ease",
            }}
          />
          <div
            className="aura-blob absolute rounded-full opacity-20"
            style={{
              width: 340,
              height: 340,
              bottom: -100,
              left: -80,
              background: aura,
              filter: "blur(100px)",
              animationDelay: "3s",
              transition: "background 1.2s ease",
            }}
          />
        </div>

        {/* Header */}
        <div
          className="relative z-10 flex items-center gap-3 px-5 py-4 border-b border-white/5"
          style={{ background: "rgba(15,15,22,0.6)", backdropFilter: "blur(8px)" }}
        >
          <button
            className="sm:hidden mr-1"
            onClick={() => setMobileShowThread(false)}
          >
            <ChevronLeft size={18} />
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold display-font"
            style={{ background: "#2A2A36" }}
          >
            {active.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium display-font">{active.name}</div>
            {/* Mood pulse: sequential trace of the conversation's emotional tone */}
            <div className="flex items-center gap-1 mt-1">
              {active.messages.slice(-10).map((m) => (
                <span
                  key={m.id}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: MOODS[m.mood].color }}
                  title={MOODS[m.mood].label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="relative z-10 flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-3"
        >
          {active.messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.from === "me" ? "self-end" : "self-start"
              }`}
              style={{
                background: m.from === "me" ? "#2A2A36" : "#1C1C25",
                borderLeft: m.from === "them" ? `3px solid ${MOODS[m.mood].color}` : "none",
                borderRight: m.from === "me" ? `3px solid ${MOODS[m.mood].color}` : "none",
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="relative z-10 px-5 py-4 border-t border-white/5" style={{ background: "rgba(15,15,22,0.6)" }}>
          <div className="flex items-center gap-1 mb-2.5 pl-1">
            <Smile size={13} color="#8A8898" className="mr-1" />
            {MOOD_KEYS.map((k) => (
              <button
                key={k}
                onClick={() => setSelectedMood(k)}
                title={MOODS[k].label}
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: MOODS[k].color,
                  outline: selectedMood === k ? "2px solid #F5F3EF" : "none",
                  outlineOffset: "2px",
                }}
              />
            ))}
            <span className="text-[11px] ml-2" style={{ color: "#8A8898" }}>
              sending as <strong style={{ color: MOODS[selectedMood].color }}>{MOODS[selectedMood].label}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Write something..."
              className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-[#5F5D6B]"
              style={{ background: "#1C1C25", border: "1px solid rgba(255,255,255,0.06)" }}
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: MOODS[selectedMood].color }}
            >
              <Send size={15} color="#0F0F16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Wavelength() {
  const [account, setAccount] = useState(null); // { provider: "google" | "facebook" | "apple" | "email" }

  if (!account) {
    return <LoginScreen onLogin={(provider) => setAccount({ provider })} />;
  }
  return <ChatApp account={account} onLogout={() => setAccount(null)} />;
}
