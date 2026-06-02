"use client";

import { useState, useRef, useEffect } from "react";
import {
  TOPICS,
  MAP_LEVELS,
  USERS,
  DISCUSSIONS,
  VIEWPOINTS,
  COMMUNITY_QUESTIONS,
  FORUMS,
  FEED_ITEMS,
  RACES,
  MEASURES,
  CVG_ISSUES,
  FORUM_HIGHLIGHTS,
} from "../data";

type User = (typeof USERS)[number];
type Forum = (typeof FORUMS)[number];
type FeedItem = (typeof FEED_ITEMS)[number];
type Candidate = (typeof RACES)[number]["candidates"][number];

function AvatarImg({
  seed,
  size,
}: {
  seed: string;
  size: number;
}) {
  return (
    <img
      src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=64748b,475569&textColor=ffffff`}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        border: "1.5px solid #ddd",
        background: "#f5f5f5",
        display: "block",
      }}
      alt=""
    />
  );
}

function Avatar({ user, size = 32 }: { user: User; size?: number }) {
  return (
    <div className="avatar-wrap">
      <AvatarImg seed={user.seed} size={size} />
      {user.mod && <div className="mod-badge">M</div>}
    </div>
  );
}

function RingAvatar({
  seed,
  size = 52,
  pct,
  label,
}: {
  seed: string;
  size?: number;
  pct: number;
  label?: "Yes" | "No";
}) {
  const st = 3;
  const r = (size + st * 2) / 2;
  const norm = r - st / 2;
  const circ = 2 * Math.PI * norm;
  const dash = (pct / 100) * circ;
  return (
    <div
      style={{
        position: "relative",
        width: size + st * 2,
        height: size + st * 2,
        flexShrink: 0,
      }}
    >
      <svg
        width={size + st * 2}
        height={size + st * 2}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)",
        }}
      >
        <circle
          cx={r}
          cy={r}
          r={norm}
          fill="none"
          stroke="#eee"
          strokeWidth={st}
        />
        <circle
          cx={r}
          cy={r}
          r={norm}
          fill="none"
          stroke="#111"
          strokeWidth={st}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      {label ? (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: st,
            left: st,
            background: label === "Yes" ? "#111" : "#64748b",
            color: "#fff",
            fontSize: size * 0.32,
            fontWeight: 900,
          }}
        >
          {label}
        </div>
      ) : (
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=64748b,475569&textColor=ffffff`}
          width={size}
          height={size}
          style={{
            borderRadius: "50%",
            display: "block",
            position: "absolute",
            top: st,
            left: st,
            background: "#f5f5f5",
          }}
          alt=""
        />
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          background: "#111",
          color: "#fff",
          fontSize: 9,
          fontWeight: 800,
          borderRadius: 10,
          padding: "1px 5px",
          border: "1.5px solid #fff",
        }}
      >
        {pct}%
      </div>
    </div>
  );
}

function LiveDot() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((p) => !p), 750);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: on ? "#fff" : "rgba(255,255,255,0.3)",
        transition: "background 0.3s",
      }}
    />
  );
}

function BackBtn({
  onBack,
  label = "Back",
}: {
  onBack: () => void;
  label?: string;
}) {
  return (
    <button className="back-btn" onClick={onBack}>
      <span>←</span>
      <span>{label}</span>
    </button>
  );
}

function VideoThumb({
  item,
  featured,
}: {
  item: { id: number; emoji: string; category: string; location: string; time: string; live?: boolean };
  featured?: boolean;
}) {
  return (
    <div
      style={{
        aspectRatio: featured ? "16/9" : "1/1",
        background: "#e8e8e8",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <pattern
            id={`h${item.id}`}
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="#ddd" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#h${item.id})`} />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.65) 100%)",
        }}
      />
      {item.live && (
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#e00",
            borderRadius: 4,
            padding: "2px 7px",
          }}
        >
          <LiveDot />
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: 0.5,
            }}
          >
            LIVE
          </span>
        </div>
      )}
      <div style={{ position: "absolute", top: 8, right: 8 }}>
        <span className="tag tag-cat">{item.category}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        ▶
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 6,
          left: 8,
          right: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.9)",
            fontWeight: 600,
          }}
        >
          📍 {item.location}
        </span>
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
          }}
        >
          {item.time}
        </span>
      </div>
    </div>
  );
}

function SketchMap({ level }: { level: number }) {
  const dots = [
    { x: 20, y: 30, n: 12 },
    { x: 50, y: 22, n: 19 },
    { x: 74, y: 38, n: 8 },
    { x: 33, y: 60, n: 14 },
    { x: 65, y: 65, n: 9 },
    { x: 82, y: 20, n: 6 },
    { x: 14, y: 72, n: 4 },
    { x: 55, y: 48, n: 22 },
  ];
  const baseR = [8, 9, 7, 8, 7, 6, 6, 9];
  const scale = [0.6, 0.75, 1, 1.15][Math.min(level, 3)];
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="100" height="100" fill="#f9f9f9" />
      {[20, 40, 60, 80].map((v) => (
        <g key={v}>
          <line
            x1={v}
            y1="0"
            x2={v}
            y2="100"
            stroke="#ddd"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
          <line
            x1="0"
            y1={v}
            x2="100"
            y2={v}
            stroke="#ddd"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        </g>
      ))}
      {[
        [8, 8, 16, 10],
        [32, 6, 14, 10],
        [55, 12, 18, 8],
        [76, 8, 12, 12],
        [6, 32, 14, 10],
        [46, 36, 16, 10],
        [68, 26, 12, 10],
        [18, 52, 12, 12],
        [42, 58, 16, 8],
        [66, 52, 12, 10],
      ].map(([x, y, w, h], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          fill="#eee"
          stroke="#ccc"
          strokeWidth="0.5"
          rx="0.5"
        />
      ))}
      {dots.map((d, i) => {
        const r = baseR[i] * scale;
        const fs = Math.max(4.5, r * 0.75);
        return (
          <g key={i}>
            <circle
              cx={d.x}
              cy={d.y}
              r={r + 2.5}
              fill="#000"
              opacity={0.07}
            />
            <circle
              cx={d.x}
              cy={d.y}
              r={r}
              fill="#fff"
              stroke="#111"
              strokeWidth="1.2"
            />
            <text
              x={d.x}
              y={d.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fs}
              fontWeight="800"
              fill="#111"
            >
              {d.n}
            </text>
          </g>
        );
      })}
      <circle
        cx="50"
        cy="50"
        r="5"
        fill="#2563eb"
        fillOpacity="0.3"
        className="pd"
      />
      <circle cx="50" cy="50" r="3" fill="#1d4ed8" fillOpacity="0.7" />
      <circle
        cx="50"
        cy="50"
        r="10"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        strokeOpacity="0.25"
        className="pr"
      />
    </svg>
  );
}

type Comment = {
  id: string;
  user: User;
  text: string;
  score: number;
  time: string;
  replies: Comment[];
};

function RedditComment({ c, depth = 0 }: { c: Comment; depth?: number }) {
  const [votes, setVotes] = useState(c.score);
  const [vote, setVote] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  function doVote(dir: number) {
    if (vote === dir) {
      setVote(0);
      setVotes(c.score);
    } else {
      setVote(dir);
      setVotes(c.score + dir);
    }
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <div className="vote-col">
          <button
            className={`vote-arrow ${vote === 1 ? "active" : ""}`}
            onClick={() => doVote(1)}
          >
            ▲
          </button>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>
            {votes}
          </span>
          <button
            className={`vote-arrow ${vote === -1 ? "active" : ""}`}
            onClick={() => doVote(-1)}
          >
            ▼
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 3,
            }}
          >
            <AvatarImg seed={c.user.seed} size={20} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>
              {c.user.name}
            </span>
            {c.user.mod && (
              <span className="tag tag-mod" style={{ fontSize: 8 }}>
                MOD
              </span>
            )}
            <span style={{ fontSize: 10, color: "#bbb" }}>{c.time}</span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#333",
              lineHeight: 1.55,
              marginBottom: 6,
            }}
          >
            {c.text}
          </div>
          <button
            onClick={() => setCollapsed((p) => !p)}
            style={{
              fontSize: 10,
              color: "#888",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontWeight: 600,
            }}
          >
            {c.replies?.length > 0
              ? collapsed
                ? `▶ ${c.replies.length} repl${c.replies.length > 1 ? "ies" : "y"}`
                : "▼ collapse"
              : ""}
          </button>
        </div>
      </div>
      {!collapsed && c.replies?.length > 0 && (
        <div
          className="reddit-comment"
          style={{ marginTop: 6, marginLeft: 16 }}
        >
          {c.replies.map((r) => (
            <RedditComment key={r.id} c={r} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentsSheet({
  item,
  onClose,
}: {
  item: FeedItem;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const comments = DISCUSSIONS[item.id as number] || [];
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle">
          <div className="handle-bar" />
        </div>
        <div
          style={{
            padding: "6px 16px 12px",
            borderBottom: "1px solid #eee",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
            Discussion · {comments.length} threads
          </span>
        </div>
        <div className="scroll-area" style={{ padding: "12px 16px" }}>
          {comments.map((c) => (
            <RedditComment key={c.id} c={c} />
          ))}
        </div>
        <div
          style={{
            padding: "10px 16px 32px",
            borderTop: "1px solid #eee",
            flexShrink: 0,
          }}
        >
          <div className="input-row">
            <Avatar user={USERS[0]} size={28} />
            <input
              className="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add to the discussion..."
            />
            <button className="btn-send">↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IssueDetail({
  item,
  onBack,
  onOpenForum,
}: {
  item: FeedItem;
  onBack: () => void;
  onOpenForum: (f: Forum) => void;
}) {
  const [text, setText] = useState("");
  const comments = DISCUSSIONS[item.id as number] || [];
  const viewpoints = VIEWPOINTS[item.id as number] || [];
  const cq = COMMUNITY_QUESTIONS[item.id as number];
  const linkedForum = item.forumId
    ? FORUMS.find((f) => f.id === item.forumId)
    : null;
  const itemWithEmoji = "emoji" in item ? item : { ...item, emoji: "📌" };
  return (
    <div className="screen">
      <div
        style={{
          padding: "10px 16px",
          flexShrink: 0,
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <BackBtn onBack={onBack} />
        <span
          className="tag tag-cat"
          style={{ marginLeft: "auto", background: "#111", color: "#fff" }}
        >
          {item.category}
        </span>
      </div>
      <div className="scroll-area" style={{ padding: "0 0 24px" }}>
        <div
          style={{
            aspectRatio: "16/9",
            background: "#e8e8e8",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <pattern id="hdd" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#ddd" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hdd)" />
          </svg>
          <span style={{ fontSize: 52, opacity: 0.15, position: "relative" }}>{itemWithEmoji.emoji}</span>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(to top,rgba(0,0,0,0.7),transparent)",
              pointerEvents: "none",
            }}
          />
          {item.live && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "#e00",
                borderRadius: 4,
                padding: "2px 8px",
              }}
            >
              <LiveDot />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: 0.5,
                }}
              >
                LIVE
              </span>
            </div>
          )}
          <div style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
            <span className="tag tag-cat">{item.category}</span>
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: "#fff",
              zIndex: 2,
            }}
          >
            ▶
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 12,
              right: 12,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.9)",
                fontWeight: 600,
              }}
            >
              📍 {item.location}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
              }}
            >
              {item.time}
            </span>
          </div>
        </div>
        <div style={{ padding: "14px 16px 0" }}>
          {item.user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <Avatar user={item.user} size={32} />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#111" }}
                  >
                    {item.user.name}
                  </span>
                  {item.user.mod && <span className="tag tag-mod">MOD</span>}
                </div>
                <span style={{ fontSize: 11, color: "#aaa" }}>
                  {item.user.handle}
                </span>
              </div>
            </div>
          )}
          <div
            style={{
              fontSize: 14,
              color: "#333",
              lineHeight: 1.6,
              marginBottom: 14,
            }}
          >
            {item.caption}
          </div>

          {linkedForum && (
            <button
              onClick={() => onOpenForum(linkedForum)}
              style={{
                width: "100%",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                marginBottom: 14,
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 20 }}>🎙</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 11, fontWeight: 800, color: "#111" }}
                >
                  {linkedForum.title}
                </div>
                <div style={{ fontSize: 10, color: "#888" }}>
                  This issue is going to the forum · {linkedForum.date}
                </div>
              </div>
              <span style={{ color: "#aaa", fontSize: 14 }}>›</span>
            </button>
          )}

          {viewpoints.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div className="section-label">COMMUNITY VIEWPOINTS</div>
              {viewpoints.map((v, i) => (
                <div
                  key={i}
                  className="inset-box"
                  style={{ marginBottom: 8 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#111",
                      }}
                    >
                      {v.label}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#555",
                      }}
                    >
                      {v.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: "#eee",
                      borderRadius: 2,
                      marginBottom: 7,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${v.pct}%`,
                        background: "#111",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#555",
                      lineHeight: 1.5,
                      marginBottom: 7,
                    }}
                  >
                    {v.summary}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {v.users.map((u, j) => (
                      <AvatarImg key={j} seed={u.seed} size={20} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {cq && (
            <div style={{ marginBottom: 16 }}>
              <div className="section-label">
                COMMUNITY QUESTION · GOING TO THE FORUM
              </div>
              <div
                style={{
                  background: "#f5f5f5",
                  border: "1.5px solid #111",
                  borderRadius: 12,
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1.4,
                    marginBottom: 8,
                  }}
                >
                  &quot;{cq.question}&quot;
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Avatar user={cq.mod} size={22} />
                    <div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#111",
                        }}
                      >
                        {cq.mod.name}
                      </span>
                      <span
                        className="tag tag-mod"
                        style={{ marginLeft: 5 }}
                      >
                        MOD
                      </span>
                      <div style={{ fontSize: 10, color: "#888" }}>
                        will ask this at the forum
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#111",
                    }}
                  >
                    ▲ {cq.upvotes}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <div className="section-label">
              DISCUSSION · {comments.length} THREADS
            </div>
            <div style={{ marginBottom: 12 }}>
              {comments.map((c) => (
                <RedditComment key={c.id} c={c} />
              ))}
            </div>
            <div className="input-row">
              <Avatar user={USERS[0]} size={28} />
              <input
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add your voice..."
              />
              <button className="btn-send">↑</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForumDetail({
  forum,
  onBack,
}: {
  forum: Forum;
  onBack: () => void;
}) {
  const [qText, setQText] = useState("");
  const isPast = forum.status === "past";
  const pastForum = forum as Forum & {
    candidatesAttended?: string[];
    stats?: Record<string, unknown>;
    highlight?: { quote: string; speaker: string; context: string };
    candidates?: { name: string; answer: string }[];
  };
  return (
    <div className="screen">
      <div
        style={{
          padding: "10px 16px",
          flexShrink: 0,
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <BackBtn onBack={onBack} />
        <span
          className="tag"
          style={{
            marginLeft: "auto",
            background: isPast ? "#eee" : "#111",
            color: isPast ? "#666" : "#fff",
          }}
        >
          {isPast ? "RECORDED" : "UPCOMING"}
        </span>
      </div>
      <div className="scroll-area" style={{ padding: "16px 16px 32px" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#111", marginBottom: 4 }}>
          {forum.title}
        </div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
          📅 {forum.date} · {forum.time} · {forum.location}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {forum.topics.map((t) => (
            <span key={t} className="tag tag-forum">{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>
          {forum.description}
        </div>

        {isPast && FORUM_HIGHLIGHTS[forum.id] && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-label">VIDEO HIGHLIGHTS</div>
            <div className="carousel-wrap" style={{ marginTop: 8 }}>
              {Array.from({ length: FORUM_HIGHLIGHTS[forum.id] }).map((_, i) => (
                <div key={i} style={{ flexShrink: 0, width: 160, height: 90, borderRadius: 10, overflow: "hidden", border: "1px solid #e0e0e0", background: "#e8e8e8", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff" }}>▶</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 8px", background: "#f5f5f5", fontSize: 10, color: "#666", fontWeight: 600 }}>Highlight {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isPast && pastForum.candidatesAttended && (
          <>
            <div style={{ marginBottom: 14 }}>
              <div className="section-label">CANDIDATES IN ATTENDANCE</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {pastForum.candidatesAttended.map((n) => (
                  <div
                    key={n}
                    style={{
                      background: "#f5f5f5",
                      border: "1px solid #ddd",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#111",
                    }}
                  >
                    {n} ✓
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div className="section-label">FORUM STATS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["Questions submitted", pastForum.stats?.questions],
                  ["Questions answered", pastForum.stats?.questionsAnswered],
                  ["Avg response time", pastForum.stats?.avgResponseTime],
                  ["Total watch time", pastForum.stats?.watchTime],
                ].map(([l, v]) => (
                  <div key={String(l)} className="inset-box" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#111" }}>{String(v)}</div>
                    <div style={{ fontSize: 9, color: "#888", fontWeight: 700, marginTop: 2 }}>
                      {String(l).toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div className="section-label">TOP MOMENT</div>
              <div style={{ background: "#111", borderRadius: 14, padding: "14px" }}>
                <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.6, fontStyle: "italic", marginBottom: 8 }}>
                  &quot;{pastForum.highlight?.quote}&quot;
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                  {pastForum.highlight?.speaker} · {pastForum.highlight?.context}
                </div>
              </div>
            </div>
          </>
        )}

        {!isPast && "howToParticipate" in forum && (
          <div style={{ marginBottom: 14 }}>
            <div className="section-label">HOW TO PARTICIPATE</div>
            {(forum as Forum & { howToParticipate: string[] }).howToParticipate.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#111",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5, paddingTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <div className="section-label">FORUM MODERATOR</div>
          <div className="inset-box" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar user={forum.mod} size={36} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{forum.mod.name}</span>
                <span className="tag tag-mod">MOD</span>
              </div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                Elected by the community · carries your questions to candidates
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div className="section-label">HOW THIS SHAPES YOUR GUIDE</div>
          <div style={{ background: "#f5f5f5", border: "1px solid #ddd", borderRadius: 12, padding: "12px" }}>
            <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6 }}>
              Candidate answers from this forum are pulled directly into your <strong>Voting Guide</strong> — attributed,
              timestamped, and linked to the original question from your community.
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "#888" }}>
              Top questions by your neighbors become the record candidates are judged on at election time.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div className="section-label">
            {isPast ? "QUESTIONS ASKED" : "SUBMIT & VOTE ON QUESTIONS"}
          </div>
          {forum.questions.map((q, i) => (
            <div
              key={i}
              style={{
                background: "#fafafa",
                border: "1px solid #eee",
                borderRadius: 10,
                padding: "10px 12px",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <Avatar user={q.user} size={26} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111", lineHeight: 1.4, marginBottom: 4 }}>
                  &quot;{q.text}&quot;
                </div>
                <div style={{ fontSize: 10, color: "#aaa" }}>{q.user.name}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                {!isPast && (
                  <button className="btn-vote unvoted" style={{ padding: "2px 8px", fontSize: 11 }}>
                    ▲
                  </button>
                )}
                <span style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>{q.upvotes}</span>
              </div>
            </div>
          ))}
          {!isPast && (
            <div className="input-row" style={{ marginTop: 10 }}>
              <Avatar user={USERS[0]} size={28} />
              <input
                className="text-input"
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                placeholder="Submit a question for candidates..."
              />
              <button className="btn-send">↑</button>
            </div>
          )}
        </div>

        {isPast && pastForum.candidates && (
          <div style={{ marginBottom: 14 }}>
            <div className="section-label">CANDIDATE ANSWERS · IN YOUR GUIDE</div>
            {pastForum.candidates.map((c, i) => (
              <div key={i} className="inset-box" style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#111", marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#444", lineHeight: 1.5, fontStyle: "italic", marginBottom: 6 }}>
                  &quot;{c.answer}&quot;
                </div>
                <div style={{ fontSize: 10, color: "#aaa" }}>
                  🎙 Appears in your Voting Guide → civic.app/forum/{forum.id}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isPast && (
          <button
            style={{
              width: "100%",
              background: "#111",
              border: "none",
              borderRadius: 12,
              padding: "13px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Attend Virtual Forum · {forum.date}
          </button>
        )}
      </div>
    </div>
  );
}

function ForumsScreen({
  onOpenForum,
}: {
  onOpenForum: (f: Forum) => void;
}) {
  const upcoming = FORUMS.filter((f) => f.status === "upcoming");
  const past = FORUMS.filter((f) => f.status === "past");
  return (
    <div className="screen">
      <div className="scroll-area" style={{ padding: "12px 16px 32px" }}>
        <div style={{ marginBottom: 16 }}>
          <div className="section-label">UPCOMING · PARTICIPATE NOW</div>
          {upcoming.map((f) => (
            <button
              key={f.id}
              onClick={() => onOpenForum(f)}
              style={{
                width: "100%",
                background: "#fff",
                border: "1.5px solid #111",
                borderRadius: 14,
                padding: "14px",
                marginBottom: 10,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#111", lineHeight: 1.3, flex: 1, paddingRight: 8 }}>
                  {f.title}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, background: "#111", color: "#fff", borderRadius: 20, padding: "3px 10px", flexShrink: 0 }}>
                  UPCOMING
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>📅 {f.date} · {f.time}</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                {f.topics.map((t) => (
                  <span key={t} className="tag tag-forum">{t}</span>
                ))}
              </div>
              <div style={{ background: "#f5f5f5", borderRadius: 10, padding: "8px 10px", marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#888", marginBottom: 5 }}>TOP ISSUES ON THE AGENDA</div>
                {(f as { topIssues?: string[] }).topIssues?.map((s, i) => (
                  <div key={i} style={{ fontSize: 11, color: "#333", marginBottom: 2 }}>· {s}</div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Avatar user={f.mod} size={22} />
                  <span style={{ fontSize: 11, color: "#555" }}>Moderated by <strong>{f.mod.name}</strong></span>
                </div>
                <span style={{ fontSize: 11, color: "#888" }}>{f.attendees} attending</span>
              </div>
            </button>
          ))}
        </div>
        <div>
          <div className="section-label">PAST FORUMS · WATCH RECORDINGS</div>
          {past.map((f) => {
            const pf = f as typeof f & { candidatesAttended?: string[]; stats?: { questions: number; questionsAnswered: number; watchTime: string }; highlight?: { quote: string; speaker: string } };
            return (
              <button
                key={f.id}
                onClick={() => onOpenForum(f)}
                style={{ width: "100%", background: "#fafafa", border: "1px solid #ddd", borderRadius: 14, padding: "14px", marginBottom: 10, textAlign: "left", cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#111", flex: 1, paddingRight: 8 }}>{f.title}</div>
                  <span className="tag tag-system">RECORDED</span>
                </div>
                <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>{f.date} · {f.attendees} attended</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                  {f.topics.map((t) => (
                    <span key={t} className="tag tag-forum">{t}</span>
                  ))}
                </div>
                {pf.candidatesAttended && (
                  <>
                    <div className="section-label">CANDIDATES IN ATTENDANCE</div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                      {pf.candidatesAttended.map((n) => (
                        <span key={n} style={{ fontSize: 10, background: "#eee", borderRadius: 20, padding: "2px 8px", fontWeight: 700, color: "#333" }}>{n} ✓</span>
                      ))}
                    </div>
                  </>
                )}
                {FORUM_HIGHLIGHTS[f.id] && (
                  <div className="carousel-wrap" style={{ marginBottom: 10 }}>
                    {Array.from({ length: FORUM_HIGHLIGHTS[f.id] }).map((_, i) => (
                      <div key={i} style={{ flexShrink: 0, width: 100, height: 56, borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", background: "#e8e8e8", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff" }}>▶</div>
                      </div>
                    ))}
                  </div>
                )}
                {pf.highlight && (
                  <div style={{ background: "#111", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: "#fff", lineHeight: 1.5, fontStyle: "italic", marginBottom: 4 }}>&quot;{pf.highlight.quote.slice(0, 90)}…&quot;</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>{pf.highlight.speaker}</div>
                  </div>
                )}
                {pf.stats && (
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 10, color: "#888" }}>✅ {pf.stats.questionsAnswered}/{pf.stats.questions} questions answered</span>
                    <span style={{ fontSize: 10, color: "#888" }}>▶ {pf.stats.watchTime}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AlignmentBar({ pct }: { pct: number }) {
  const color = pct >= 80 ? "#111" : pct >= 55 ? "#555" : "#bbb";
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: 0.3 }}>COMMUNITY ALIGNMENT</span>
        <span style={{ fontSize: 10, fontWeight: 900, color }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: "#eee", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function CitizensVoterGuide({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const totalVotes = CVG_ISSUES.reduce((a, i) => a + i.upvotes, 0);
  return (
    <div className="screen">
      <div style={{ padding: "10px 16px", flexShrink: 0, borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: 12 }}>
        <BackBtn onBack={onBack} label="Guide" />
        <span style={{ fontSize: 12, fontWeight: 800, color: "#111", marginLeft: "auto" }}>CITIZEN&apos;S VOTER GUIDE</span>
      </div>
      <div className="scroll-area" style={{ padding: "0 0 32px" }}>
        <div style={{ background: "#111", padding: "20px 16px 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: 0.7, marginBottom: 6 }}>CO-CREATED BY YOUR COMMUNITY</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: 10 }}>What SF voters actually want — and who delivers.</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 14 }}>
            Built from {totalVotes.toLocaleString()} community upvotes and AI analysis of candidate records, commitments, and voter forum responses. Not a poll — a people-powered accountability tool.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["🗳️", totalVotes.toLocaleString(), "voices"], ["📋", "4", "top issues"], ["🤖", "AI", "scored"]].map(([icon, val, lbl]) => (
              <div key={String(lbl)} style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 0", textAlign: "center" }}>
                <div style={{ fontSize: 13 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#fff" }}>{val}</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>{String(lbl).toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "16px 16px 0" }}>
          <div className="section-label">ISSUES RANKED BY COMMUNITY UPVOTES</div>
          {CVG_ISSUES.map((issue, idx) => {
            const topC = issue.candidates.reduce((a, b) => (a.alignment > b.alignment ? a : b));
            return (
              <div key={issue.id} className="card" style={{ marginBottom: 12 }}>
                <div style={{ padding: "13px 14px", cursor: "pointer" }} onClick={() => setExpanded((p) => (p === issue.id ? null : issue.id))}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <div style={{ flexShrink: 0, width: 80, height: 60, borderRadius: 8, background: "#e8e8e8", border: "1px solid #e0e0e0", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff" }}>▶</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>{idx + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "#aaa", marginBottom: 1 }}>{issue.topic.toUpperCase()}</div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: "#111", lineHeight: 1.3 }}>{issue.issue}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 800, color: "#111" }}>▲ {issue.upvotes}</div>
                          <div style={{ fontSize: 9, color: "#aaa" }}>votes</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>{issue.summary}</div>
                    </div>
                  </div>
                  <div style={{ background: "#f5f5f5", borderRadius: 10, padding: "8px 10px", marginBottom: 8 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: "#888", marginBottom: 5 }}>COMMUNITY RECOMMENDS</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: issue.measureRec ? 6 : 0 }}>
                      <AvatarImg seed={topC.seed} size={22} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>{topC.name}</span>
                        <span style={{ fontSize: 10, color: "#aaa" }}> · {topC.alignment}% aligned</span>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 800, background: "#111", color: "#fff", borderRadius: 4, padding: "2px 6px" }}>CANDIDATE</span>
                    </div>
                    {issue.measureRec && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 6, borderTop: "1px solid #eee" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>{issue.measureRec.letter}</div>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>Measure {issue.measureRec.letter}</span>
                          <span style={{ fontSize: 10, color: "#aaa" }}> · {issue.measureRec.title}</span>
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 800, background: "#111", color: "#fff", borderRadius: 4, padding: "2px 6px" }}>{issue.measureRec.rec}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, color: "#888" }}>See full alignment breakdown</span>
                    <span style={{ color: "#ccc", fontSize: 13 }}>{expanded === issue.id ? "▲" : "▼"}</span>
                  </div>
                </div>
                {expanded === issue.id && (
                  <div style={{ borderTop: "1px solid #eee", padding: "12px 14px", background: "#fafafa" }}>
                    <div className="section-label" style={{ marginBottom: 10 }}>CANDIDATE ALIGNMENT</div>
                    {[...issue.candidates].sort((a, b) => b.alignment - a.alignment).map((c, i) => (
                      <div key={i} style={{ background: "#fff", border: i === 0 ? "1.5px solid #111" : "1px solid #eee", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                          <AvatarImg seed={c.seed} size={26} />
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: 12, fontWeight: 800, color: "#111" }}>{c.name}</span>
                            {i === 0 && <span style={{ fontSize: 8, fontWeight: 800, background: "#111", color: "#fff", borderRadius: 4, padding: "1px 5px", marginLeft: 6 }}>TOP PICK</span>}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5, marginBottom: 6 }}>{c.reason}</div>
                        <AlignmentBar pct={c.alignment} />
                      </div>
                    ))}
                    {issue.measureRec && (
                      <>
                        <div className="section-label" style={{ marginTop: 12, marginBottom: 8 }}>MEASURE RECOMMENDATION</div>
                        <div style={{ background: "#fff", border: "1.5px solid #111", borderRadius: 10, padding: "10px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, flexShrink: 0 }}>{issue.measureRec.letter}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, fontWeight: 800, color: "#111" }}>{issue.measureRec.title}</div>
                              <div style={{ fontSize: 9, color: "#aaa" }}>Measure {issue.measureRec.letter}</div>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 900, background: "#111", color: "#fff", borderRadius: 6, padding: "3px 10px" }}>{issue.measureRec.rec}</span>
                          </div>
                          <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{issue.measureRec.reason}</div>
                        </div>
                      </>
                    )}
                    <div style={{ fontSize: 10, color: "#aaa", marginTop: 10, lineHeight: 1.5 }}>
                      🤖 Alignment scored by AI based on voting record, public commitments, and voter forum responses — weighted against community upvotes on this issue.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CandidateDetail({
  candidate: c,
  raceName,
  onBack,
}: {
  candidate: Candidate;
  raceName: string;
  onBack: () => void;
}) {
  return (
    <div className="screen">
      <div style={{ padding: "10px 16px", flexShrink: 0, borderBottom: "1px solid #eee" }}>
        <BackBtn onBack={onBack} label="Guide" />
      </div>
      <div className="scroll-area" style={{ padding: "16px 16px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <RingAvatar seed={c.seed} size={56} pct={c.match} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>{c.name}</span>
              {c.incumbent && <span className="tag tag-inc">INCUMBENT</span>}
              {c.recommended && <span className="tag tag-mod">⭐ TOP MATCH</span>}
            </div>
            <div style={{ fontSize: 11, color: "#888" }}>{raceName}</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div className="section-label">CIVIC ENGAGEMENT</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              ["Forums", c.forumStats.forumsAttended, "attended"],
              ["Questions", c.forumStats.questionsAddressed, "addressed"],
              ["Comments", c.forumStats.communityComments, "responded to"],
            ].map(([l, v, sub]) => (
              <div key={String(l)} className="inset-box" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#111" }}>{String(v)}</div>
                <div style={{ fontSize: 8, color: "#888", fontWeight: 700, marginTop: 1, lineHeight: 1.3 }}>
                  {String(l).toUpperCase()}
                  <br />
                  {String(sub).toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div className="section-label">POSITIONS ON YOUR ISSUES</div>
          {c.positions.map((p, i) => (
            <div key={i} className="inset-box" style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#111", marginBottom: 3 }}>{p.topic}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{p.stance}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div className="section-label">FROM THE VOTER FORUM</div>
          <div className="inset-box">
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #eee" }}>
              <Avatar user={c.forumQuestion.askedBy} size={26} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>{c.forumQuestion.askedBy.name}</span>
                  <span className="tag tag-mod">MOD</span>
                </div>
                <div style={{ fontSize: 10, color: "#888" }}>{c.forumQuestion.forum} · {c.forumQuestion.date}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Asked:</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111", lineHeight: 1.4, marginBottom: 8, fontStyle: "italic" }}>&quot;{c.forumQuestion.text}&quot;</div>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{c.name} responded:</div>
            <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6, fontStyle: "italic", marginBottom: 8 }}>&quot;{c.forumAnswer}&quot;</div>
            <div style={{ fontSize: 10, color: "#aaa" }}>🎙 Watch full exchange → civic.app/forum</div>
          </div>
        </div>
        <div>
          <div className="section-label">ENDORSEMENTS · {c.endorsements.length} TOTAL</div>
          {c.endorsements.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #f0f0f0", alignItems: "flex-start" }}>
              {e.type === "org" ? (
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f5f5f5", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{e.logo}</div>
              ) : (
                "user" in e && e.user ? <Avatar user={e.user} size={32} /> : null
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{e.type === "org" ? e.name : e.user?.name ?? ""}</span>
                  <span className="tag" style={{ background: e.type === "org" ? "#f0f0f0" : "#eee", color: "#555" }}>{e.type === "org" ? "OFFICIAL" : "CITIZEN"}</span>
                </div>
                {e.text && <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5, fontStyle: "italic" }}>&quot;{e.text}&quot;</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IssuesScreen({
  votes,
  setVotes,
  onOpenIssue,
  onOpenForum,
}: {
  votes: Record<number, boolean>;
  setVotes: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  onOpenIssue: (item: FeedItem) => void;
  onOpenForum: (f: Forum) => void;
}) {
  const [activeTopic, setActiveTopic] = useState("All");
  const [mapLevel, setMapLevel] = useState(2);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const [commentItem, setCommentItem] = useState<FeedItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop > 40 && !mapCollapsed) setMapCollapsed(true);
    if (el.scrollTop < 10 && mapCollapsed) setMapCollapsed(false);
  }

  const filtered = activeTopic === "All" ? FEED_ITEMS : FEED_ITEMS.filter((i) => i.category === activeTopic);

  function CardFooter({ item }: { item: FeedItem }) {
    const voted = !!votes[item.id as number];
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <button className="btn-comment" onClick={(e) => { e.stopPropagation(); setCommentItem(item); }}>💬 {(DISCUSSIONS[item.id as number] || []).length}</button>
        <button className={`btn-vote ${voted ? "voted" : "unvoted"}`} onClick={(e) => { e.stopPropagation(); setVotes((p) => ({ ...p, [item.id]: !p[item.id as number] })); }}>▲ {(item.votes ?? 0) + (voted ? 1 : 0)}</button>
      </div>
    );
  }

  return (
    <div className="screen">
      {commentItem && <CommentsSheet item={commentItem} onClose={() => setCommentItem(null)} />}
      <div style={{ flexShrink: 0, margin: "10px 16px 0", borderRadius: 14, border: "1px solid #ddd", overflow: "hidden", height: mapCollapsed ? 40 : 186, transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <div onClick={() => setMapCollapsed((p) => !p)} style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", cursor: "pointer", background: "#fff", borderBottom: mapCollapsed ? "none" : "1px solid #eee" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 13 }}>🗺️</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{MAP_LEVELS[mapLevel].label}</span>
            <span style={{ fontSize: 11, color: "#aaa" }}>· {MAP_LEVELS[mapLevel].issues} issues</span>
          </div>
          <span style={{ color: "#aaa", fontSize: 11, display: "inline-block", transform: mapCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s" }}>▲</span>
        </div>
        <div style={{ height: 146, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0 }}><SketchMap level={mapLevel} /></div>
          <div style={{ position: "absolute", bottom: 8, right: 8 }}>
            <button onClick={(e) => { e.stopPropagation(); setMapLevel((p) => Math.min(p + 1, 3)); }} style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #ccc", borderRadius: "50%", width: 28, height: 28, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>+</button>
            <button onClick={(e) => { e.stopPropagation(); setMapLevel((p) => Math.max(p - 1, 0)); }} style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #ccc", borderRadius: "50%", width: 28, height: 28, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
          </div>
        </div>
      </div>
      <div className="pill-row">
        {TOPICS.map((t) => (
          <button key={t} className={`pill ${activeTopic === t ? "active" : ""}`} onClick={() => setActiveTopic(t)}>{t}</button>
        ))}
      </div>
      <div className="divider" />
      <div className="scroll-area" ref={scrollRef} onScroll={handleScroll} style={{ padding: "12px 16px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {filtered.map((item, idx) => {
            if (item.type === "forum_promo") {
              const forum = FORUMS.find((f) => f.id === item.forumId);
              if (!forum) return null;
              return (
                <div key={`${item.id}-${idx}`} style={{ gridColumn: "span 1" }} onClick={() => onOpenForum(forum)}>
                  <div className="card" style={{ background: "#1a1a2e", cursor: "pointer", height: "100%" }}>
                    <div style={{ padding: "12px", display: "flex", flexDirection: "column", minHeight: 180 }}>
                      <div style={{ fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5, marginBottom: 6 }}>BECAUSE YOU FOLLOW HOUSING</div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 4 }}>{forum.title}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>📅 {forum.date}</div>
                      <div style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, marginBottom: 10 }}>Your neighbors are submitting questions. Top-voted go to candidates.</div>
                      <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12 }}>✍️</span>
                        <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>Submit a question →</span>
                      </div>
                    </div>
                    <div style={{ padding: "7px 10px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{forum.attendees} attending</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>Forums tab →</span>
                    </div>
                  </div>
                </div>
              );
            }
            if (item.type === "list") {
              const listItem = item as FeedItem & { listItems?: string[] };
              return (
                <div key={`${item.id}-${idx}`} className="card" style={{ gridColumn: "span 2" }} onClick={() => onOpenIssue(item)}>
                  <div style={{ padding: "11px 13px 9px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: 9 }}>
                    <div className="system-avatar" style={{ width: 28, height: 28, flexShrink: 0, fontSize: 13 }}>⚡</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>{item.caption}</div>
                      <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>📍 {item.location} · {item.time}</div>
                    </div>
                  </div>
                  {(listItem.listItems || []).map((li, i) => (
                    <div key={i} style={{ padding: "8px 13px", display: "flex", alignItems: "center", gap: 10, borderBottom: i < (listItem.listItems?.length ?? 0) - 1 ? "1px solid #f0f0f0" : "none", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#111", minWidth: 18 }}>#{i + 1}</span>
                      <span style={{ fontSize: 12, color: "#333", lineHeight: 1.4 }}>{li}</span>
                    </div>
                  ))}
                  <div style={{ padding: "9px 13px", borderTop: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="tag tag-cat" style={{ background: "#111", color: "#fff" }}>{item.category}</span>
                    <CardFooter item={item} />
                  </div>
                </div>
              );
            }
            if (item.type === "topic_card") {
              const tc = item as FeedItem & { topic?: string; headline?: string; prompt?: string };
              return (
                <div key={`${item.id}-${idx}`} className="card" style={{ gridColumn: "span 1", display: "flex", flexDirection: "column" }} onClick={() => {}}>
                  <div style={{ background: "#111", padding: "12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 180 }}>
                    <div>
                      <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", marginBottom: 8, display: "inline-flex" }}>{tc.emoji} {tc.topic}</span>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.4, marginBottom: 8 }}>{tc.headline}</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 8 }}>{tc.prompt}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <input style={{ flex: 1, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "5px 10px", fontSize: 11, color: "#fff", outline: "none" }} placeholder="Share your experience..." onClick={(e) => e.stopPropagation()} />
                        <button style={{ background: "#fff", border: "none", borderRadius: 16, padding: "5px 10px", fontSize: 11, fontWeight: 700, color: "#111", cursor: "pointer" }} onClick={(e) => e.stopPropagation()}>↑</button>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "7px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #eee" }}>
                    <span style={{ fontSize: 10, color: "#aaa" }}>{item.votes} voices · {item.time}</span>
                    <CardFooter item={item} />
                  </div>
                </div>
              );
            }
            const featured = idx === 0;
            const itemWithUser = item as FeedItem & { user?: User; emoji?: string };
            const CAP = 80;
            const long = item.caption && item.caption.length > CAP;
            const videoItem = { ...item, emoji: itemWithUser.emoji || "📌", live: item.live ?? false, caption: item.caption ?? "", location: item.location ?? "", time: item.time ?? "", votes: item.votes ?? 0 };
            return (
              <div key={`${item.id}-${idx}`} className="card" style={{ gridColumn: featured ? "span 2" : "span 1" }} onClick={() => onOpenIssue(item)}>
                <VideoThumb item={videoItem} featured={featured} />
                <div style={{ padding: "9px 12px 0", display: "flex", alignItems: "center", gap: 8 }}>
                  {itemWithUser.user && <Avatar user={itemWithUser.user} size={28} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {itemWithUser.user && (
                      <>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{itemWithUser.user.name}</span>
                        {itemWithUser.user.mod && <span className="tag tag-mod" style={{ marginLeft: 5 }}>MOD</span>}
                      </>
                    )}
                  </div>
                </div>
                <div style={{ padding: "5px 12px 3px" }}>
                  <div style={{ fontSize: featured ? 12 : 11, color: "#555", lineHeight: 1.45 }}>{long ? item.caption?.slice(0, CAP) + "…" : item.caption}</div>
                </div>
                <div style={{ padding: "5px 12px 10px" }}><CardFooter item={item} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GuideScreen({
  onOpenCandidate,
  onOpenForum,
  onOpenCVG,
}: {
  onOpenCandidate: (c: Candidate, rn: string) => void;
  onOpenForum: (f: Forum) => void;
  onOpenCVG: () => void;
}) {
  const [expandedMeasure, setExpandedMeasure] = useState<string | null>(null);
  const [ballotFilter, setBallotFilter] = useState("All");
  const allFilters = ["All", "Housing", "Transit", "Safety", "Homelessness"];

  const filteredRaces = ballotFilter === "All" ? RACES : RACES.filter((r) => r.candidates.some((c) => c.positions.some((p) => p.topic === ballotFilter)));
  const filteredMeasures = ballotFilter === "All" ? MEASURES : MEASURES.filter((m) => m.category === ballotFilter);

  return (
    <div className="screen">
      <div style={{ margin: "10px 16px 0", background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 14, padding: "12px 14px", flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: 0.5, marginBottom: 6 }}>YOUR GUIDE · SF NOVEMBER ELECTION</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.4, marginBottom: 10 }}>
          Built from your 23 interactions on{" "}
          {["Housing", "Transit", "Safety"].map((t, i, a) => (
            <span key={t}><span style={{ borderBottom: "2px solid #111" }}>{t}</span>{i < a.length - 1 ? ", " : ""}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["▲ 8 upvotes", "backed"], ["💬 6 comments", "joined"], ["👁 9 issues", "followed"]].map(([v, l]) => (
            <div key={String(v)} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 20, padding: "5px 10px", display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>{v}</span>
              <span style={{ fontSize: 10, color: "#999" }}>· {l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pill-row">
        {allFilters.map((f) => (
          <button key={f} className={`pill ${ballotFilter === f ? "active" : ""}`} onClick={() => setBallotFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="divider" />
      <div className="scroll-area" style={{ padding: "0 0 24px" }}>
        <div style={{ padding: "16px 16px 0 16px" }}>
          {filteredRaces.map((race) => (
            <div key={race.id} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111", marginBottom: 8 }}>{race.title}</div>
              <div className="carousel-wrap">
                {[...race.candidates].sort((a, b) => b.match - a.match).map((c) => {
                  const isCVGPick = CVG_ISSUES.some((iss) => iss.candidates[0]?.name === c.name && iss.candidates.reduce((a, b) => (a.alignment > b.alignment ? a : b)).name === c.name);
                  return (
                    <div key={c.id} style={{ width: 260, flexShrink: 0, background: "#fff", border: c.recommended ? "1.5px solid #111" : "1px solid #ddd", borderRadius: 14, overflow: "hidden", cursor: "pointer" }} onClick={() => onOpenCandidate(c, race.title)}>
                      <div style={{ padding: "12px 12px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <RingAvatar seed={c.seed} size={44} pct={c.match} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginBottom: 2 }}>
                              <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>{c.name}</span>
                              <span style={{ fontSize: 13, color: "#bbb" }}>›</span>
                              {c.incumbent && <span className="tag tag-inc">INC</span>}
                            </div>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {c.recommended && <span style={{ fontSize: 10, fontWeight: 800, background: "#111", color: "#fff", borderRadius: 20, padding: "3px 9px" }}>⭐ Best Match</span>}
                              {isCVGPick && <span style={{ fontSize: 10, fontWeight: 800, background: "#2f4f9e", color: "#fff", borderRadius: 20, padding: "3px 9px" }}>🗳️ Citizen Guide Top Pick</span>}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                          {c.tags.map((t) => <span key={t} style={{ fontSize: 9, fontWeight: 700, background: "#f0f0f0", color: "#444", borderRadius: 4, padding: "2px 7px" }}>{t}</span>)}
                        </div>
                        <div style={{ fontSize: 12, color: "#444", lineHeight: 1.5, marginBottom: 8 }}>{c.summary}</div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                          {[["🎙", c.forumStats.forumsAttended, "forums"], ["✅", c.forumStats.questionsAddressed, "answered"], ["👍", c.endorsements.length, "endorsements"]].map(([icon, val, lbl]) => (
                            <div key={String(lbl)} style={{ flex: 1, background: "#f5f5f5", borderRadius: 8, padding: "5px 0", textAlign: "center" }}>
                              <div style={{ fontSize: 12 }}>{icon}</div>
                              <div style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>{val}</div>
                              <div style={{ fontSize: 8, color: "#888", fontWeight: 700 }}>{String(lbl).toUpperCase()}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ background: "#f9f9f9", borderRadius: 8, padding: "8px 10px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ flexShrink: 0, width: 64, height: 48, borderRadius: 6, background: "#e8e8e8", border: "1px solid #e0e0e0", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>▶</div>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 9, color: "#aaa", fontWeight: 700, marginBottom: 3 }}>AT THE {c.quoteForum.toUpperCase()}</div>
                            <div style={{ fontSize: 11, color: "#333", lineHeight: 1.4, fontStyle: "italic" }}>&quot;{c.topQuote.slice(0, 85)}…&quot;</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 10, color: "#aaa", marginTop: 4, textAlign: "center" }}>← Swipe to compare →</div>
            </div>
          ))}
          {filteredMeasures.length > 0 && (() => {
            const m = filteredMeasures[0];
            const rec = (m.recommendation || "yes").toLowerCase();
            const matchYes = "match" in m ? (m as typeof m & { match: number }).match : 85;
            const matchNo = 100 - matchYes;
            const renderCard = (vote: "Yes" | "No", match: number, isRec: boolean) => (
              <div key={vote} style={{ width: 260, flexShrink: 0, background: "#fff", border: isRec ? "1.5px solid #111" : "1px solid #ddd", borderRadius: 14, overflow: "hidden", cursor: "pointer" }} onClick={() => setExpandedMeasure((p) => (p === m.id ? null : m.id))}>
                <div style={{ padding: "12px 12px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <RingAvatar seed={`${m.id}-${vote}`} size={44} pct={match} label={vote} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>Measure {m.letter}</span>
                        <span style={{ fontSize: 13, color: "#bbb" }}>›</span>
                      </div>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {isRec && <span style={{ fontSize: 10, fontWeight: 800, background: "#111", color: "#fff", borderRadius: 20, padding: "3px 9px" }}>⭐ Best Match</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, background: "#f0f0f0", color: "#444", borderRadius: 4, padding: "2px 7px" }}>{m.category}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#444", lineHeight: 1.5, marginBottom: 8 }}>{m.summary}</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    {[["📊", m.communitySignal, "signals"], ["✅", m.forPoints.length, "reasons"]].map(([icon, val, lbl]) => (
                      <div key={String(lbl)} style={{ flex: 1, background: "#f5f5f5", borderRadius: 8, padding: "5px 0", textAlign: "center" }}>
                        <div style={{ fontSize: 12 }}>{icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>{val}</div>
                        <div style={{ fontSize: 8, color: "#888", fontWeight: 700 }}>{String(lbl).toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#f9f9f9", borderRadius: 8, padding: "8px 10px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, width: 64, height: 48, borderRadius: 6, background: "#e8e8e8", border: "1px solid #e0e0e0", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>▶</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 9, color: "#aaa", fontWeight: 700, marginBottom: 3 }}>MODERATOR NOTE</div>
                      <div style={{ fontSize: 11, color: "#333", lineHeight: 1.4 }}>{m.modNote}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
            return (
              <div key={m.id} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#111", marginBottom: 8 }}>{m.title}</div>
                <div className="carousel-wrap">
                  {renderCard("Yes", matchYes, rec === "yes")}
                  {renderCard("No", matchNo, rec === "no")}
                </div>
                {expandedMeasure === m.id && (
                  <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 12, padding: "12px 14px", marginTop: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div><div style={{ fontSize: 9, fontWeight: 800, color: "#111", marginBottom: 5 }}>FOR</div>{m.forPoints.map((p, i) => <div key={i} style={{ fontSize: 10, color: "#333", lineHeight: 1.5, marginBottom: 4, paddingLeft: 6, borderLeft: "2px solid #111" }}>{p}</div>)}</div>
                      <div><div style={{ fontSize: 9, fontWeight: 800, color: "#888", marginBottom: 5 }}>AGAINST</div>{m.againstPoints.map((p, i) => <div key={i} style={{ fontSize: 10, color: "#555", lineHeight: 1.5, marginBottom: 4, paddingLeft: 6, borderLeft: "2px solid #ddd" }}>{p}</div>)}</div>
                    </div>
                  </div>
                )}
                <div style={{ fontSize: 10, color: "#aaa", marginTop: 4, textAlign: "center" }}>← Swipe to compare Yes vs No · Tap for details →</div>
              </div>
            );
          })()}
          <div onClick={onOpenCVG} style={{ background: "#111", borderRadius: 14, padding: "14px", cursor: "pointer", marginTop: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: 0.7, marginBottom: 4 }}>2,150 SF VOTERS · AI ANALYZED</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: "#fff", marginBottom: 5 }}>See the Citizen&apos;s Voter Guide</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, marginBottom: 10 }}>Your guide is personalized to you. The Citizen&apos;s Guide shows what the whole community wants — and scores every candidate against it. See where they agree, and where they don&apos;t.</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {CVG_ISSUES.map((iss) => {
                const top = iss.candidates.reduce((a, b) => (a.alignment > b.alignment ? a : b));
                return (
                  <div key={iss.id} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
                    <div style={{ width: "100%", aspectRatio: "16/9", maxHeight: 44, borderRadius: 6, background: "rgba(255,255,255,0.15)", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff" }}>▶</div>
                    </div>
                    <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{iss.topic.toUpperCase()}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>{top.name.split(" ")[0]}</div>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.45)" }}>{top.alignment}% aligned</div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>View Citizen&apos;s Voter Guide →</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>4 issues</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CivicApp() {
  const [activeNav, setActiveNav] = useState("issues");
  const [votes, setVotes] = useState<Record<number, boolean>>({});
  const [stack, setStack] = useState<Array<{ type: string; item?: FeedItem; forum?: Forum; candidate?: Candidate; raceName?: string }>>([]);

  const push = (s: typeof stack[0]) => setStack((p) => [...p, s]);
  const pop = () => setStack((p) => p.slice(0, -1));
  const top = stack.length > 0 ? stack[stack.length - 1] : null;

  function renderTop() {
    if (!top) return null;
    if (top.type === "issue" && top.item) return <IssueDetail item={top.item} onBack={pop} onOpenForum={(f) => push({ type: "forum", forum: f })} />;
    if (top.type === "forum" && top.forum) return <ForumDetail forum={top.forum} onBack={pop} />;
    if (top.type === "candidate" && top.candidate && top.raceName) return <CandidateDetail candidate={top.candidate} raceName={top.raceName} onBack={pop} />;
    if (top.type === "cvg") return <CitizensVoterGuide onBack={pop} />;
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="app">
        {top ? (
          renderTop()
        ) : (
          <>
            <div className="status-bar"><span>9:41</span><span>●●● 🔋</span></div>
            <div className="header">
              <span className="wordmark">civic</span>
              <Avatar user={USERS[0]} size={32} />
            </div>
            {activeNav === "issues" && <IssuesScreen votes={votes} setVotes={setVotes} onOpenIssue={(item) => push({ type: "issue", item })} onOpenForum={(f) => push({ type: "forum", forum: f })} />}
            {activeNav === "forums" && <ForumsScreen onOpenForum={(f) => push({ type: "forum", forum: f })} />}
            {activeNav === "guide" && <GuideScreen onOpenCandidate={(c, rn) => push({ type: "candidate", candidate: c, raceName: rn })} onOpenForum={(f) => push({ type: "forum", forum: f })} onOpenCVG={() => push({ type: "cvg" })} />}
            <div className="nav">
              {[["🏠", "Issues", "issues"], ["🎙", "Forums", "forums"], ["🗳️", "Guide", "guide"]].map(([icon, label, key]) => (
                <button key={String(key)} className="nav-btn" onClick={() => setActiveNav(String(key))}>
                  <span className="nav-icon">{icon}</span>
                  <span className={`nav-label ${activeNav === key ? "active" : ""}`}>{label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
