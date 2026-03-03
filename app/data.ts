export const TOPICS = [
  "All",
  "Safety",
  "Housing",
  "Transit",
  "Parks",
  "Education",
  "Environment",
];

export const MAP_LEVELS = [
  { label: "National", issues: 1240 },
  { label: "California", issues: 347 },
  { label: "San Francisco", issues: 89 },
  { label: "Mission District", issues: 14 },
];

export const USERS = [
  {
    name: "Maria G.",
    handle: "@mariag_mission",
    seed: "mariag",
    mod: true,
    modTopic: "Safety",
  },
  { name: "James T.", handle: "@jamest_sf", seed: "jamest", mod: false },
  {
    name: "Priya K.",
    handle: "@priyak_d9",
    seed: "priyak",
    mod: true,
    modTopic: "Housing",
  },
  { name: "DeShawn W.", handle: "@deshawnw", seed: "deshawnw", mod: false },
  {
    name: "Sofia R.",
    handle: "@sofiar_excelsior",
    seed: "sofiar",
    mod: true,
    modTopic: "Transit",
  },
  { name: "Tom L.", handle: "@toml_sf", seed: "toml", mod: false },
  { name: "Ana V.", handle: "@anav_mission", seed: "anav", mod: false },
  { name: "Kevin P.", handle: "@kevinp_sf", seed: "kevinp", mod: false },
];

export const DISCUSSIONS: Record<
  number,
  Array<{
    id: string;
    user: (typeof USERS)[number];
    text: string;
    score: number;
    time: string;
    replies: Array<{
      id: string;
      user: (typeof USERS)[number];
      text: string;
      score: number;
      time: string;
      replies: never[];
    }>;
  }>
> = {
  1: [
    {
      id: "c1",
      user: USERS[1],
      text: "I almost got hit here last Tuesday. No signal, cars don't even slow down.",
      score: 34,
      time: "1h",
      replies: [
        {
          id: "c1r1",
          user: USERS[3],
          text: "Same intersection. SFMTA has been ignoring this for years.",
          score: 18,
          time: "45m",
          replies: [],
        },
      ],
    },
    {
      id: "c2",
      user: USERS[6],
      text: "Tagged the city on Twitter with video evidence. Zero response.",
      score: 22,
      time: "2h",
      replies: [],
    },
  ],
  2: [
    {
      id: "c3",
      user: USERS[2],
      text: "The vote is Tuesday — call your supervisor if you rent pre-2000.",
      score: 61,
      time: "30m",
      replies: [
        {
          id: "c3r1",
          user: USERS[5],
          text: "My landlord threatened to sell if this passes. Scared of what happens next.",
          score: 44,
          time: "20m",
          replies: [],
        },
      ],
    },
  ],
  3: [
    {
      id: "c4",
      user: USERS[4],
      text: "Night shift workers in my building are calling Lyft at $30 a ride. This is a pay cut.",
      score: 55,
      time: "45m",
      replies: [
        {
          id: "c4r1",
          user: USERS[3],
          text: "This is a safety issue too — waiting alone at night on unlit streets.",
          score: 29,
          time: "30m",
          replies: [],
        },
      ],
    },
  ],
  4: [
    {
      id: "c5",
      user: USERS[0],
      text: "47 blocks. That's not an oversight, that's a policy failure.",
      score: 38,
      time: "3h",
      replies: [],
    },
  ],
};

export const VIEWPOINTS: Record<
  number,
  Array<{
    label: string;
    pct: number;
    summary: string;
    users: (typeof USERS)[number][];
  }>
> = {
  1: [
    {
      label: "Frustrated residents",
      pct: 68,
      summary:
        "Most neighbors feel SFMTA has ignored repeated complaints. Several near-misses reported.",
      users: [USERS[1], USERS[3], USERS[6]],
    },
    {
      label: "Want city action",
      pct: 24,
      summary:
        "Calls for emergency signal installation before someone is seriously injured.",
      users: [USERS[0], USERS[7]],
    },
    {
      label: "Skeptical it'll change",
      pct: 8,
      summary:
        "Some feel the city won't act without media pressure or legal action.",
      users: [USERS[5]],
    },
  ],
  3: [
    {
      label: "Workers most impacted",
      pct: 71,
      summary:
        "Night shift and service industry workers bearing the brunt — added $30+ in nightly ride costs.",
      users: [USERS[4], USERS[3]],
    },
    {
      label: "Safety concern",
      pct: 22,
      summary:
        "Late night waiting puts riders in unsafe situations on dark streets.",
      users: [USERS[1]],
    },
    {
      label: "Demand full restoration",
      pct: 7,
      summary:
        "Small group calling for full 24/7 service, not just partial fix.",
      users: [USERS[6]],
    },
  ],
};

export const COMMUNITY_QUESTIONS: Record<
  number,
  { question: string; upvotes: number; mod: (typeof USERS)[number] }
> = {
  1: {
    question:
      "What specific action will you take to install a traffic signal at 16th & Valencia, and by when?",
    upvotes: 189,
    mod: USERS[0],
  },
  3: {
    question:
      "Will you commit to restoring 14R night service within 90 days and how will you fund it?",
    upvotes: 247,
    mod: USERS[4],
  },
};

export const FORUMS = [
  {
    id: "f1",
    title: "District 9 Voter Forum",
    date: "March 14, 2026",
    time: "6:00 PM",
    location: "Virtual · Zoom",
    status: "upcoming",
    topics: ["Housing", "Transit", "Safety"],
    mod: USERS[4],
    issueIds: [3, 1],
    attendees: 312,
    description:
      "Citizens will question candidates for City Supervisor District 9 on top community-surfaced issues.",
    topIssues: [
      "14R night service cuts",
      "16th & Valencia crosswalk",
      "Rent stabilization enforcement",
    ],
    questions: [
      {
        user: USERS[4],
        text: "Will you commit to restoring 14R night service within 90 days?",
        upvotes: 247,
      },
      {
        user: USERS[0],
        text: "What will you do about 16th & Valencia — and by when?",
        upvotes: 189,
      },
      {
        user: USERS[2],
        text: "How will you enforce Measure C if it passes?",
        upvotes: 134,
      },
    ],
    howToParticipate: [
      "Submit a question below — top-voted go to candidates",
      "Watch live on March 14 at 6PM",
      "Answers become part of your voting guide",
    ],
  },
  {
    id: "f2",
    title: "SF Housing Forum",
    date: "Feb 12, 2026",
    time: "7:00 PM",
    location: "Virtual · Zoom",
    status: "past",
    topics: ["Housing"],
    mod: USERS[2],
    issueIds: [2],
    attendees: 428,
    description:
      "Citizens questioned candidates on rent stabilization, shelter capacity, and eviction policy.",
    candidatesAttended: ["Jordan Lee", "Alex Nguyen"],
    stats: {
      questions: 18,
      questionsAnswered: 16,
      avgResponseTime: "2 min",
      watchTime: "1h 22m",
    },
    highlight: {
      quote:
        "I authored Measure C. Displacement is the defining crisis of our generation.",
      speaker: "Jordan Lee",
      context: "On rent stabilization",
    },
    questions: [
      {
        user: USERS[2],
        text: "Will you vote yes on Measure C?",
        upvotes: 312,
      },
      {
        user: USERS[6],
        text: "What's your plan for the Tenderloin shelter crisis?",
        upvotes: 201,
      },
    ],
    candidates: [
      {
        name: "Jordan Lee",
        answer:
          "I authored Measure C. Displacement is the defining crisis of our generation and this is the most direct tool we have.",
      },
      {
        name: "Alex Nguyen",
        answer:
          "I support tenant protections but believe this measure needs stronger enforcement mechanisms before I can back it fully.",
      },
    ],
  },
  {
    id: "f3",
    title: "SF Transit & Safety Forum",
    date: "Jan 28, 2026",
    time: "6:30 PM",
    location: "Virtual · Zoom",
    status: "past",
    topics: ["Transit", "Safety"],
    mod: USERS[0],
    issueIds: [3, 1],
    attendees: 391,
    description:
      "Candidates faced tough questions on Muni cuts, pedestrian safety, and Vision Zero progress.",
    candidatesAttended: ["Jordan Lee", "Yuki Tanaka"],
    stats: {
      questions: 22,
      questionsAnswered: 19,
      avgResponseTime: "3 min",
      watchTime: "1h 48m",
    },
    highlight: {
      quote:
        "Vision Zero has been all vision and no zero. We've had 11 pedestrian fatalities since January.",
      speaker: "Yuki Tanaka",
      context: "On pedestrian safety",
    },
    questions: [
      {
        user: USERS[4],
        text: "Why has the 14R been cut with no community notice?",
        upvotes: 334,
      },
      {
        user: USERS[1],
        text: "How many more pedestrians have to die before we get signals at dangerous intersections?",
        upvotes: 278,
      },
    ],
    candidates: [
      {
        name: "Jordan Lee",
        answer:
          "The 14R cuts were made without community input and I will reverse them. Night service is not optional for working families.",
      },
      {
        name: "Yuki Tanaka",
        answer:
          "We need to stop calling pedestrian deaths 'accidents.' These are preventable. I'll push for 20mph zones citywide in my first 100 days.",
      },
    ],
  },
];

// Forum highlight reel - count of clips per forum (past forums only; gray boxes with play buttons)
export const FORUM_HIGHLIGHTS: Record<string, number> = {
  f2: 3,
  f3: 4,
};

export const FEED_ITEMS = [
  {
    id: 1,
    type: "video",
    live: true,
    category: "Safety",
    caption:
      "Filmed this on my way to work. No signal, no warning. Someone's going to get hurt soon at 16th & Valencia — 3rd near-miss this week.",
    location: "Mission District",
    votes: 247,
    time: "LIVE",
    emoji: "🚦",
    user: USERS[0],
    forumId: "f1",
  },
  {
    id: 8,
    type: "list",
    live: false,
    category: "Housing",
    caption: "Top housing issues in SF this week",
    location: "San Francisco",
    votes: 891,
    time: "2h",
    emoji: "🏘️",
    user: null,
    system: true,
    listItems: [
      "Rent stabilization vote — Tuesday",
      "Tenderloin shelter at 98% capacity",
      "Mission eviction notices up 34%",
      "Short-term rental crackdown proposed",
    ],
    forumId: "f2",
  },
  {
    id: 2,
    type: "video",
    live: false,
    category: "Homelessness",
    caption:
      "Tent encampment on Division St doubled overnight. No outreach workers in sight — families walking around this every morning.",
    location: "SoMa",
    votes: 678,
    time: "2h",
    emoji: "⛺",
    user: USERS[2],
  },
  {
    id: 9,
    type: "topic_card",
    category: "Housing",
    topic: "Housing",
    emoji: "🏘️",
    headline:
      "1 in 4 Mission renters received a rent increase notice this month",
    prompt:
      "What's your experience with housing costs in SF? Has your rent increased this year?",
    votes: 412,
    time: "4h",
  },
  {
    id: 3,
    type: "video",
    live: false,
    category: "Transit",
    caption:
      "Third night in a row with no 14R after 10pm. Waited 45 mins, nothing came. Had to split a Lyft with coworkers — again.",
    location: "Excelsior",
    votes: 334,
    time: "3h",
    emoji: "🚌",
    user: USERS[4],
    forumId: "f1",
  },
  {
    id: 7,
    type: "forum_promo",
    category: "Housing",
    forumId: "f1",
  },
  {
    id: 3,
    type: "video",
    live: false,
    category: "Transit",
    caption:
      "Third night in a row with no 14R after 10pm. Waited 45 mins, nothing came. Had to split a Lyft with coworkers — again.",
    location: "Excelsior",
    votes: 334,
    time: "3h",
    emoji: "🚌",
    user: USERS[4],
    forumId: "f1",
  },
  {
    id: 4,
    type: "video",
    live: false,
    category: "Safety",
    caption:
      "47 blocks between SoMa and Tenderloin with broken streetlights. Walked home in the dark last night — this is not okay.",
    location: "SoMa",
    votes: 223,
    time: "6h",
    emoji: "🔦",
    user: USERS[1],
  },
  {
    id: 5,
    type: "video",
    live: false,
    category: "Parks",
    caption:
      "Dolores Park bathrooms still padlocked — week 7. No sign, no ETA from the city. Checked again this morning.",
    location: "Dolores Park",
    votes: 189,
    time: "5h",
    emoji: "🌳",
    user: USERS[3],
  },
  {
    id: 6,
    type: "video",
    live: false,
    category: "Homelessness",
    caption:
      "Navigation center on 7th St at capacity again. Turned away 23 people last night according to staff.",
    location: "Tenderloin",
    votes: 678,
    time: "8h",
    emoji: "🏠",
    user: USERS[5],
  },
];

export const RACES = [
  {
    id: "r1",
    title: "City Supervisor — District 9",
    candidates: [
      {
        id: 1,
        name: "Jordan Lee",
        seed: "jordanlee",
        incumbent: false,
        recommended: true,
        match: 91,
        tags: ["Strong on Housing", "Backs 14R fix", "Safe Streets yes"],
        summary:
          "Authored rent stabilization and has committed to restoring 14R night service — directly addressing your top two issues.",
        forumStats: {
          forumsAttended: 3,
          questionsAddressed: 41,
          communityComments: 128,
        },
        topQuote:
          "The 14R cuts were a mistake. Restoring night service is my first priority — 334 families depend on it.",
        quoteForum: "District 9 Voter Forum · Mar 14",
        forumQuestion: {
          text: "Will you commit to restoring 14R night service within 90 days?",
          askedBy: USERS[4],
          forum: "District 9 Voter Forum",
          date: "Mar 14, 2026",
        },
        forumAnswer:
          "The 14R cuts were a mistake. Restoring night service is my first priority — 334 families depend on it. I will fund it by reallocating the SFMTA administrative budget.",
        positions: [
          {
            topic: "Housing",
            stance:
              "Authored rent stabilization. Strong yes on Measure C.",
            score: 5,
          },
          {
            topic: "Transit",
            stance:
              "Committed to restoring 14R night service within 90 days.",
            score: 4,
          },
          {
            topic: "Safety",
            stance:
              "Co-sponsored Safe Streets. Wants 20mph zones citywide.",
            score: 5,
          },
        ],
        endorsements: [
          {
            type: "citizen",
            user: USERS[0],
            text: "Jordan showed up the week after I posted the Valencia video.",
          },
          {
            type: "citizen",
            user: USERS[6],
            text: "Came to our tenant meeting. Actually listened.",
          },
          { type: "org", name: "SF Tenants Union", logo: "🏢" },
          { type: "org", name: "SEIU Local 1021", logo: "✊" },
        ],
      },
      {
        id: 2,
        name: "Alex Nguyen",
        seed: "alexnguyen",
        incumbent: true,
        recommended: false,
        match: 64,
        tags: ["Incumbent", "Cautious on housing", "Audit first"],
        summary:
          "Long-term incumbent with a cautious record on housing reform. Supports transit audits before new funding commitments.",
        forumStats: {
          forumsAttended: 2,
          questionsAddressed: 22,
          communityComments: 47,
        },
        topQuote:
          "My record shows a balanced long-term approach. I support restoration but want an independent audit of SFMTA first.",
        quoteForum: "District 9 Voter Forum · Mar 14",
        forumQuestion: {
          text: "Will you commit to restoring 14R night service within 90 days?",
          askedBy: USERS[4],
          forum: "District 9 Voter Forum",
          date: "Mar 14, 2026",
        },
        forumAnswer:
          "I understand the frustration. My record shows a balanced long-term approach. I support restoration but want an independent audit of SFMTA first.",
        positions: [
          {
            topic: "Housing",
            stance:
              "Voted against similar measures in 2022. Prefers means-tested approach.",
            score: 2,
          },
          {
            topic: "Transit",
            stance:
              "Supports Measure D but wants independent audit first.",
            score: 3,
          },
          {
            topic: "Safety",
            stance:
              "Backs Safe Streets but prioritizes schools over intersections.",
            score: 3,
          },
        ],
        endorsements: [
          {
            type: "citizen",
            user: USERS[7],
            text: "Alex has been in District 9 for 12 years. He knows the history.",
          },
          { type: "org", name: "SF Chronicle", logo: "📰" },
        ],
      },
    ],
  },
  {
    id: "r2",
    title: "SF Mayor",
    candidates: [
      {
        id: 3,
        name: "Yuki Tanaka",
        seed: "yukitanaka",
        incumbent: false,
        recommended: true,
        match: 87,
        tags: ["Pedestrian safety", "Navigation centers", "Muni reform"],
        summary:
          "Former transit planner pushing for pedestrian safety overhaul and navigation center expansion — aligned with your Safety and Homelessness priorities.",
        forumStats: {
          forumsAttended: 4,
          questionsAddressed: 58,
          communityComments: 203,
        },
        topQuote:
          "Vision Zero has been all vision and no zero. I'll mandate 20mph zones near schools and shelters in my first 100 days.",
        quoteForum: "SF Transit & Safety Forum · Jan 28",
        forumQuestion: {
          text: "How many more pedestrians have to die before we act?",
          askedBy: USERS[1],
          forum: "SF Transit & Safety Forum",
          date: "Jan 28, 2026",
        },
        forumAnswer:
          "Vision Zero has been all vision and no zero. I'll mandate 20mph zones near schools and shelters in my first 100 days.",
        positions: [
          {
            topic: "Safety",
            stance:
              "Mandating 20mph zones, expanding Vision Zero funding.",
            score: 5,
          },
          {
            topic: "Homelessness",
            stance: "Plans 800 new navigation center beds in year one.",
            score: 4,
          },
          {
            topic: "Transit",
            stance:
              "Committed to Muni reliability audit and night service restoration.",
            score: 4,
          },
        ],
        endorsements: [
          {
            type: "citizen",
            user: USERS[4],
            text: "She actually knows how buses work. Rare for a politician.",
          },
          { type: "org", name: "SF Bicycle Coalition", logo: "🚲" },
          { type: "org", name: "League of Women Voters", logo: "🗳️" },
        ],
      },
      {
        id: 4,
        name: "Marcus Webb",
        seed: "marcuswebb",
        incumbent: false,
        recommended: false,
        match: 58,
        tags: [
          "Pro-business",
          "Market-rate housing",
          "Skeptical of Muni spending",
        ],
        summary:
          "Business-focused candidate with a mixed record on housing. Strong on economic development but hasn't committed to Muni funding.",
        forumStats: {
          forumsAttended: 1,
          questionsAddressed: 11,
          communityComments: 29,
        },
        topQuote:
          "We can't tax our way to affordability. We need to grow the economic pie first.",
        quoteForum: "SF Housing Forum · Feb 12",
        forumQuestion: {
          text: "Will you fund navigation center expansion?",
          askedBy: USERS[2],
          forum: "SF Housing Forum",
          date: "Feb 12, 2026",
        },
        forumAnswer:
          "We can't tax our way to affordability. We need to grow the economic pie first before we can fund new shelter capacity.",
        positions: [
          {
            topic: "Housing",
            stance:
              "Prefers market-rate solutions. Skeptical of rent control.",
            score: 2,
          },
          {
            topic: "Safety",
            stance:
              "Supports police staffing increase as primary safety strategy.",
            score: 3,
          },
          {
            topic: "Transit",
            stance: "No specific Muni commitments made.",
            score: 2,
          },
        ],
        endorsements: [
          { type: "org", name: "SF Chamber of Commerce", logo: "🏛️" },
          { type: "org", name: "SF Realtors Assoc.", logo: "🏠" },
        ],
      },
    ],
  },
  {
    id: "r3",
    title: "SF District Attorney",
    candidates: [
      {
        id: 5,
        name: "Priya Mehta",
        seed: "priyamehta",
        incumbent: false,
        recommended: true,
        match: 82,
        tags: [
          "Diversion programs",
          "Homelessness reform",
          "Tenant fraud enforcement",
        ],
        summary:
          "Civil rights attorney focused on community-based safety and reducing repeat offenses — resonates with your Safety issue engagement.",
        forumStats: {
          forumsAttended: 2,
          questionsAddressed: 33,
          communityComments: 91,
        },
        topQuote:
          "Prosecuting our way out of homelessness and mental illness isn't justice — it's just expensive failure.",
        quoteForum: "SF Housing Forum · Feb 12",
        forumQuestion: {
          text: "How do you address crime near encampments without criminalizing homelessness?",
          askedBy: USERS[5],
          forum: "SF Housing Forum",
          date: "Feb 12, 2026",
        },
        forumAnswer:
          "Prosecuting our way out of homelessness and mental illness isn't justice — it's just expensive failure. We need DA-led diversion programs.",
        positions: [
          {
            topic: "Safety",
            stance:
              "Diversion programs over incarceration for low-level offenses.",
            score: 4,
          },
          {
            topic: "Homelessness",
            stance:
              "DA-led outreach to avoid criminalizing unhoused residents.",
            score: 5,
          },
          {
            topic: "Housing",
            stance:
              "Focus on landlord fraud and illegal eviction enforcement.",
            score: 4,
          },
        ],
        endorsements: [
          {
            type: "citizen",
            user: USERS[3],
            text: "Finally a DA candidate who sees the full picture.",
          },
          { type: "org", name: "ACLU of Northern CA", logo: "⚖️" },
          { type: "org", name: "SF Public Defender", logo: "🏛️" },
        ],
      },
    ],
  },
];

export const MEASURES = [
  {
    id: "c",
    letter: "C",
    title: "Rent Stabilization Act",
    category: "Housing",
    summary:
      "Extends rent control to buildings built before 2000. Affects ~40,000 SF units.",
    communitySignal: 891,
    match: 87,
    recommendation: "yes",
    modUser: USERS[2],
    modNote:
      "Mission moderators broadly supportive. Concerns about enforcement.",
    forPoints: [
      "Protects long-term tenants from displacement",
      "Addresses #1 issue in your feed",
    ],
    againstPoints: [
      "May reduce new housing supply",
      "Enforcement costs unclear",
    ],
  },
  {
    id: "d",
    letter: "D",
    title: "Transit Safety Bond",
    category: "Transit",
    summary:
      "$400M bond to fund Muni upgrades, night service expansion, and SoMa lighting.",
    communitySignal: 556,
    match: 82,
    recommendation: "yes",
    modUser: USERS[4],
    modNote:
      "Night service expansion directly addresses 14R issue flagged by 334 neighbors.",
    forPoints: [
      "Directly funds 14R night service",
      "Addresses SoMa lighting outages",
    ],
    againstPoints: ["Adds to city debt", "Timeline unclear"],
  },
  {
    id: "e",
    letter: "E",
    title: "Safe Streets Initiative",
    category: "Safety",
    summary:
      "Requires traffic signals at 12 high-incident intersections including 16th & Valencia.",
    communitySignal: 247,
    match: 78,
    recommendation: "yes",
    modUser: USERS[0],
    modNote:
      "Directly responsive to the viral 16th & Valencia video. Strong community consensus.",
    forPoints: [
      "Targets exact intersections in your feed",
      "Low cost, high impact",
    ],
    againstPoints: ["Doesn't address root cause of speeding"],
  },
];

export const CVG_ISSUES = [
  {
    id: "i1",
    topic: "Housing",
    issue: "Rent stabilization & tenant protections",
    upvotes: 891,
    summary:
      "Community wants candidates who will protect long-term renters from displacement. Key asks: enforce Measure C, expand rent control to pre-2000 buildings, and increase eviction protections.",
    candidates: [
      {
        name: "Jordan Lee",
        seed: "jordanlee",
        alignment: 94,
        reason:
          "Authored Measure C. Has a 5-year plan to protect 40,000 tenants in older buildings.",
      },
      {
        name: "Alex Nguyen",
        seed: "alexnguyen",
        alignment: 41,
        reason:
          "Voted against similar measures in 2022. Prefers voluntary landlord agreements.",
      },
    ],
    measureRec: {
      letter: "C",
      title: "Rent Stabilization Act",
      rec: "YES",
      reason:
        "Directly enacts what the community asked for — extends rent control to pre-2000 buildings and adds eviction protections.",
    },
  },
  {
    id: "i2",
    topic: "Transit",
    issue: "Muni night service restoration",
    upvotes: 334,
    summary:
      "Night shift and service workers are being stranded after 10pm. Community demands 14R restoration within 90 days with guaranteed funding and accountability.",
    candidates: [
      {
        name: "Jordan Lee",
        seed: "jordanlee",
        alignment: 89,
        reason:
          "Committed publicly to restoring 14R within 90 days. Named a specific funding mechanism.",
      },
      {
        name: "Alex Nguyen",
        seed: "alexnguyen",
        alignment: 48,
        reason:
          "Supports restoration in principle but wants SFMTA audit first — no timeline committed.",
      },
    ],
    measureRec: {
      letter: "D",
      title: "Transit Safety Bond",
      rec: "YES",
      reason:
        "$400M bond directly funds 14R night service restoration and Muni upgrades the community is demanding.",
    },
  },
  {
    id: "i3",
    topic: "Safety",
    issue: "Pedestrian safety at high-incident intersections",
    upvotes: 247,
    summary:
      "Neighbors are filing 311 reports and filming near-misses. Community wants emergency signals at the 12 most dangerous intersections, starting with 16th & Valencia.",
    candidates: [
      {
        name: "Jordan Lee",
        seed: "jordanlee",
        alignment: 91,
        reason:
          "Co-sponsored the Safe Streets Initiative. Has identified all 12 intersections by name.",
      },
      {
        name: "Alex Nguyen",
        seed: "alexnguyen",
        alignment: 62,
        reason:
          "Backs Safe Streets but wants to prioritize school zones first. No commitment on 16th & Valencia timeline.",
      },
    ],
    measureRec: {
      letter: "E",
      title: "Safe Streets Initiative",
      rec: "YES",
      reason:
        "Mandates signals at the exact intersections the community flagged — including 16th & Valencia.",
    },
  },
  {
    id: "i4",
    topic: "Homelessness",
    issue: "Navigation center expansion & outreach",
    upvotes: 678,
    summary:
      "Community wants visible, immediate action — more beds, more outreach workers, and a clear plan for encampment support rather than sweeps.",
    candidates: [
      {
        name: "Yuki Tanaka",
        seed: "yukitanaka",
        alignment: 88,
        reason:
          "Plans 800 new navigation center beds in year one. Has a named outreach coordinator plan.",
      },
      {
        name: "Marcus Webb",
        seed: "marcuswebb",
        alignment: 29,
        reason:
          "Prefers market-rate solutions and opposes new shelter funding without private match.",
      },
    ],
    measureRec: null,
  },
];
