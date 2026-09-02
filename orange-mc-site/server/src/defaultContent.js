// Default content used the very first time the server starts (no data/db.json yet).
// Every field here is editable later from /admin — nothing below is hard-coded
// into the React components; components only render whatever this object holds.

export const defaultContent = {
  branding: {
    siteName: "Orange MC",
    tagline: "A Minecraft network built for people who never want to log off.",
    logoImage: "",
    faviconImage: ""
  },

  hero: {
    eyebrow: "JAVA & BEDROCK · CROSS-PLAY ENABLED",
    title: "Orange MC",
    subtitle:
      "Your world doesn't pause when you log off. Survival, PvP, and an economy that keeps moving whether you're online or not — six years of builds, none of them wiped.",
    primaryCtaLabel: "Play Now",
    primaryCtaLink: "#server",
    secondaryCtaLabel: "Explore the Network",
    secondaryCtaLink: "#features",
    backgroundImage: ""
  },

  server: {
    javaIp: "orangemc.xyz",
    bedrockIp: "orangemc.xyz",
    bedrockPort: "19132",
    version: "1.21.x",
    status: "online",
    playersOnline: 128,
    maxPlayers: 500,
    uptimePercent: 99.8,
    pingMs: 32,
    useLiveStatus: false
  },

  servers: {
    heading: "Our Servers",
    subheading: "One network, four worlds to choose from.",
    items: [
      {
        id: "smp-1",
        name: "Origin SMP",
        description: "The flagship survival world. Land claims, no grief, seasonal resets.",
        gamemode: "SMP",
        version: "1.21.x",
        platform: "Java & Bedrock",
        status: "online",
        image: ""
      },
      {
        id: "lifesteal-1",
        name: "Lifesteal",
        description: "Lose a heart when you die. Win it back in the arena.",
        gamemode: "Lifesteal",
        version: "1.21.x",
        platform: "Java & Bedrock",
        status: "online",
        image: ""
      },
      {
        id: "skyblock-1",
        name: "Skyblock",
        description: "One island. One chance. Custom minions and an island-wide economy.",
        gamemode: "Skyblock",
        version: "1.21.x",
        platform: "Java & Bedrock",
        status: "online",
        image: ""
      },
      {
        id: "factions-1",
        name: "Factions",
        description: "Claim, raid, defend. Weekly faction wars with real stakes.",
        gamemode: "Factions",
        version: "1.20.x",
        platform: "Java",
        status: "online",
        image: ""
      }
    ]
  },

  features: {
    heading: "Everything You Need",
    subheading: "One network, endless ways to play.",
    items: [
      {
        id: "f1",
        icon: "coin",
        title: "An economy that outlives your play session",
        description:
          "Prices move with supply and demand across every shop on the network. Sell smart, not just often."
      },
      {
        id: "f2",
        icon: "sparkles",
        title: "Custom progression",
        description:
          "Skill trees for mining, combat, and farming that carry across every survival world."
      },
      {
        id: "f3",
        icon: "shield",
        title: "Player-built structures, protected",
        description:
          "Claim tooling that actually holds up against griefers, without locking down creativity."
      },
      {
        id: "f4",
        icon: "calendar",
        title: "Events every week",
        description:
          "From build battles to full faction wars — there is always something on the calendar."
      },
      {
        id: "f5",
        icon: "globe",
        title: "Full crossplay",
        description: "Java and Bedrock players share the same worlds, economy, and community."
      },
      {
        id: "f6",
        icon: "sword",
        title: "Six years, no wipes",
        description: "Builds and progress from years ago are still standing today."
      }
    ]
  },

  arena: {
    enabled: true,
    heading: "Ranked Arena",
    subheading: "Queue into a skill-matched 1v1 in under ten seconds.",
    description:
      "Climb the ELO ladder, unlock kits, and cash in seasonal rewards every time the season resets.",
    stats: [
      { id: "a1", label: "Ranked Modes", value: "6" },
      { id: "a2", label: "Custom Kits", value: "24" },
      { id: "a3", label: "Avg. Queue Time", value: "8s" }
    ],
    highlights: [
      "Ranked 1v1 — skill-based matchmaking with a live ELO leaderboard",
      "Bot Training — warm up against combat bots tuned to your rank",
      "Seasonal Rewards — cosmetics and titles reset and re-earned every season"
    ]
  },

  economy: {
    enabled: true,
    heading: "The Orange Exchange",
    subheading: "One currency, every server.",
    description:
      "Earn it in survival, spend it at the Auction House or the crate shop — never required to progress.",
    items: [
      { id: "e1", icon: "gavel", title: "Auction House", description: "List, bid, and buy across the whole network." },
      { id: "e2", icon: "box", title: "Crates & Keys", description: "Earn keys through play — never required to progress." },
      { id: "e3", icon: "shop", title: "Player Shops", description: "Rent a stall in the Origin SMP market district." }
    ]
  },

  events: {
    heading: "Events",
    subheading: "Something is always happening.",
    items: [
      {
        id: "ev1",
        title: "Faction Wars: Autumn Siege",
        description: "A full weekend of faction-vs-faction combat with territory on the line.",
        type: "PvP",
        date: "October 17, 2026",
        time: "18:00 EST",
        frequency: "Seasonal",
        rewards: "Exclusive banner, 50,000 coins",
        status: "upcoming",
        image: ""
      },
      {
        id: "ev2",
        title: "Build Battle: Skybound",
        description: "Themed build contest judged by the community and the staff team.",
        type: "Community",
        date: "September 5, 2026",
        time: "20:00 EST",
        frequency: "One-time",
        rewards: "Custom title, featured build tour",
        status: "upcoming",
        image: ""
      }
    ]
  },

  community: {
    heading: "Built by the people who play here",
    subheading:
      "Orange MC has been shaped by its community since day one — join where the conversation happens.",
    discordUrl: "https://discord.gg/orangemc",
    youtubeUrl: "https://youtube.com/@orangemc",
    instagramUrl: "https://instagram.com/orangemc",
    tiktokUrl: "",
    twitterUrl: "",
    stats: [
      { id: "c1", label: "Discord Members", value: "12,400+" },
      { id: "c2", label: "Builds Featured", value: "380" },
      { id: "c3", label: "Community Creators", value: "14" }
    ]
  },

  founders: {
    heading: "Founders",
    subheading: "The people who built Orange MC from the ground up.",
    members: [
      {
        id: "fo1",
        name: "Sayipbruhhh",
        role: "Founder & Network Director",
        description: "Started Orange MC in a spare bedroom and never let it get boring.",
        image: "",
        discord: "",
        twitter: "",
        youtube: ""
      },
      {
        id: "fo2",
        name: "Aexo",
        role: "Founder & Lead Developer",
        description: "Builds most of what runs under the hood, from the economy engine to the arena.",
        image: "",
        discord: "",
        twitter: "",
        youtube: ""
      },
      {
        id: "fo3",
        name: "Raler",
        role: "Founder & Community Lead",
        description: "Keeps the Discord alive and the events calendar full.",
        image: "",
        discord: "",
        twitter: "",
        youtube: ""
      }
    ]
  },

  staff: {
    heading: "Staff & Developer Team",
    subheading: "The team keeping the network running every day.",
    members: [
      { id: "s1", name: "Willow Hart", position: "Head Admin", description: "Placeholder staff profile.", image: "", discord: "", twitter: "" },
      { id: "s2", name: "Dez Marlow", position: "Senior Developer", description: "Placeholder staff profile.", image: "", discord: "", twitter: "" },
      { id: "s3", name: "Kian Ostro", position: "Moderator Lead", description: "Placeholder staff profile.", image: "", discord: "", twitter: "" },
      { id: "s4", name: "Ivy Roan", position: "Build Team Lead", description: "Placeholder staff profile.", image: "", discord: "", twitter: "" },
      { id: "s5", name: "Toma Reyes", position: "Event Coordinator", description: "Placeholder staff profile.", image: "", discord: "", twitter: "" }
    ]
  },

  rules: {
    heading: "Rules",
    subheading: "Keep it fair for everyone.",
    categories: [
      {
        id: "cat-1",
        category: "General Conduct",
        items: [
          { id: "r1", title: "No hate speech or harassment", description: "Zero tolerance, instant review.", severity: "high" },
          { id: "r2", title: "No cheating or exploits", description: "Includes X-ray, killaura, and duplication bugs.", severity: "high" }
        ]
      },
      {
        id: "cat-2",
        category: "Building & Land",
        items: [
          { id: "r3", title: "Respect claimed land", description: "Unclaimed builds may be reclaimed after 30 days of inactivity.", severity: "medium" }
        ]
      }
    ]
  },

  faq: {
    heading: "Frequently Asked Questions",
    subheading: "Everything you need to know before you join.",
    items: [
      { id: "q1", question: "Is Orange MC pay-to-win?", answer: "No. Every store purchase is cosmetic-only." },
      { id: "q2", question: "Does the server support Bedrock?", answer: "Yes, most servers on the network support Java and Bedrock cross-play." },
      { id: "q3", question: "How do I report a player?", answer: "Open a ticket in the #support channel on Discord." }
    ]
  },

  footer: {
    tagline: "A Minecraft network built for people who never want to log off.",
    copyrightText: "© {year} Orange MC. Not affiliated with Mojang or Microsoft.",
    columns: [
      {
        id: "col1",
        title: "Network",
        links: [
          { id: "l1", label: "Servers", href: "#servers" },
          { id: "l2", label: "Features", href: "#features" },
          { id: "l3", label: "Events", href: "#events" },
          { id: "l4", label: "Rules", href: "#rules" }
        ]
      },
      {
        id: "col2",
        title: "Community",
        links: [
          { id: "l5", label: "Discord", href: "https://discord.gg/orangemc" },
          { id: "l6", label: "YouTube", href: "https://youtube.com/@orangemc" },
          { id: "l7", label: "Instagram", href: "https://instagram.com/orangemc" }
        ]
      }
    ]
  },

  siteSettings: {
    metaTitle: "Orange MC — A Minecraft Network",
    metaDescription:
      "Survival, PvP, and an economy that keeps moving whether you're online or not.",
    maintenanceMode: false,
    // Optional external store link (e.g. Tebex/Buycraft). When set, a "Store"
    // button appears in the navbar linking out to it. Leave blank to hide it.
    storeUrl: ""
  }
};
