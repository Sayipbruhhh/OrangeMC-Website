// Declarative field schemas for every editable content section. The generic
// SectionEditor component (admin/components/SectionEditor.jsx) renders a form
// from one of these instead of a bespoke component per section — adding or
// changing an editable field only requires editing this file.
//
// Field types: "text" | "textarea" | "number" | "boolean" | "image" | "list"
// A "list" field edits an array of objects; `itemFields` describes each
// object's own fields (which may themselves include images, text, etc).
// A "stringList" field edits a plain array of short strings (e.g. bullet points).

export const schemas = {
  branding: {
    label: "Branding",
    fields: [
      { key: "siteName", label: "Site name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "logoImage", label: "Logo", type: "image" },
      { key: "faviconImage", label: "Favicon", type: "image" }
    ]
  },

  hero: {
    label: "Hero",
    fields: [
      { key: "eyebrow", label: "Eyebrow text", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "primaryCtaLabel", label: "Primary button label", type: "text" },
      { key: "primaryCtaLink", label: "Primary button link", type: "text" },
      { key: "secondaryCtaLabel", label: "Secondary button label", type: "text" },
      { key: "secondaryCtaLink", label: "Secondary button link", type: "text" },
      { key: "backgroundImage", label: "Background image", type: "image" }
    ]
  },

  server: {
    label: "Server Info",
    fields: [
      { key: "javaIp", label: "Java IP", type: "text" },
      { key: "bedrockIp", label: "Bedrock IP", type: "text" },
      { key: "bedrockPort", label: "Bedrock port", type: "text" },
      { key: "version", label: "Minecraft version", type: "text" },
      { key: "status", label: "Status", type: "select", options: ["online", "offline", "maintenance"] },
      { key: "playersOnline", label: "Players online", type: "number" },
      { key: "maxPlayers", label: "Max players", type: "number" },
      { key: "uptimePercent", label: "Uptime %", type: "number" },
      { key: "pingMs", label: "Ping (ms)", type: "number" },
      {
        key: "useLiveStatus",
        label: "Pull live status from a real server API (requires MC_SERVER_HOST configured on the backend)",
        type: "boolean"
      }
    ]
  },

  servers: {
    label: "Servers",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "items",
        label: "Server / game mode cards",
        type: "list",
        itemLabel: (item) => item.name || "New server",
        itemFields: [
          { key: "name", label: "Name", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "gamemode", label: "Game mode", type: "text" },
          { key: "version", label: "Minecraft version", type: "text" },
          { key: "platform", label: "Platform", type: "text" },
          { key: "status", label: "Status", type: "select", options: ["online", "offline", "maintenance"] },
          { key: "image", label: "Image", type: "image" }
        ],
        newItem: () => ({
          name: "New Server",
          description: "",
          gamemode: "",
          version: "1.21.x",
          platform: "Java & Bedrock",
          status: "online",
          image: ""
        })
      }
    ]
  },

  features: {
    label: "Features",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "items",
        label: "Feature cards",
        type: "list",
        itemLabel: (item) => item.title || "New feature",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          {
            key: "icon",
            label: "Icon",
            type: "select",
            options: ["sword", "shield", "coin", "sparkles", "globe", "calendar", "shop", "gavel", "box", "default"]
          }
        ],
        newItem: () => ({ title: "New Feature", description: "", icon: "default" })
      }
    ]
  },

  arena: {
    label: "Arena / PvP",
    fields: [
      { key: "enabled", label: "Show this section on the site", type: "boolean" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "stats",
        label: "Stat cards",
        type: "list",
        itemLabel: (item) => item.label || "New stat",
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" }
        ],
        newItem: () => ({ label: "New Stat", value: "0" })
      },
      { key: "highlights", label: "Highlight bullet points", type: "stringList" }
    ]
  },

  economy: {
    label: "Economy",
    fields: [
      { key: "enabled", label: "Show this section on the site", type: "boolean" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "items",
        label: "Economy cards",
        type: "list",
        itemLabel: (item) => item.title || "New item",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          {
            key: "icon",
            label: "Icon",
            type: "select",
            options: ["coin", "shop", "gavel", "box", "sparkles", "default"]
          }
        ],
        newItem: () => ({ title: "New Item", description: "", icon: "default" })
      }
    ]
  },

  events: {
    label: "Events",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "items",
        label: "Events",
        type: "list",
        itemLabel: (item) => item.title || "New event",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "type", label: "Event type", type: "text" },
          { key: "date", label: "Date", type: "text" },
          { key: "time", label: "Time", type: "text" },
          { key: "frequency", label: "Frequency", type: "text" },
          { key: "rewards", label: "Rewards", type: "text" },
          { key: "status", label: "Status", type: "select", options: ["upcoming", "live", "ended"] },
          { key: "image", label: "Event image", type: "image" }
        ],
        newItem: () => ({
          title: "New Event",
          description: "",
          type: "",
          date: "",
          time: "",
          frequency: "",
          rewards: "",
          status: "upcoming",
          image: ""
        })
      }
    ]
  },

  community: {
    label: "Community",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      { key: "discordUrl", label: "Discord URL", type: "text" },
      { key: "youtubeUrl", label: "YouTube URL", type: "text" },
      { key: "instagramUrl", label: "Instagram URL", type: "text" },
      { key: "tiktokUrl", label: "TikTok URL", type: "text" },
      { key: "twitterUrl", label: "Twitter / X URL", type: "text" },
      {
        key: "stats",
        label: "Stat cards",
        type: "list",
        itemLabel: (item) => item.label || "New stat",
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" }
        ],
        newItem: () => ({ label: "New Stat", value: "0" })
      }
    ]
  },

  founders: {
    label: "Founders",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "members",
        label: "Founders",
        type: "list",
        itemLabel: (item) => item.name || "New founder",
        itemFields: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Photo", type: "image" },
          { key: "discord", label: "Discord link", type: "text" },
          { key: "twitter", label: "Twitter link", type: "text" },
          { key: "youtube", label: "YouTube link", type: "text" }
        ],
        newItem: () => ({ name: "New Founder", role: "", description: "", image: "", discord: "", twitter: "", youtube: "" })
      }
    ]
  },

  staff: {
    label: "Staff & Developer Team",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "members",
        label: "Team members",
        type: "list",
        itemLabel: (item) => item.name || "New member",
        itemFields: [
          { key: "name", label: "Name", type: "text" },
          { key: "position", label: "Position", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Photo", type: "image" },
          { key: "discord", label: "Discord link", type: "text" },
          { key: "twitter", label: "Twitter link", type: "text" }
        ],
        newItem: () => ({ name: "New Member", position: "", description: "", image: "", discord: "", twitter: "" })
      }
    ]
  },

  rules: {
    label: "Rules",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "categories",
        label: "Rule categories",
        type: "list",
        itemLabel: (item) => item.category || "New category",
        itemFields: [
          { key: "category", label: "Category name", type: "text" },
          {
            key: "items",
            label: "Rules in this category",
            type: "list",
            itemLabel: (item) => item.title || "New rule",
            itemFields: [
              { key: "title", label: "Rule title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "severity", label: "Severity", type: "select", options: ["low", "medium", "high"] }
            ],
            newItem: () => ({ title: "New Rule", description: "", severity: "medium" })
          }
        ],
        newItem: () => ({ category: "New Category", items: [] })
      }
    ]
  },

  faq: {
    label: "FAQ",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
      {
        key: "items",
        label: "Questions",
        type: "list",
        itemLabel: (item) => item.question || "New question",
        itemFields: [
          { key: "question", label: "Question", type: "text" },
          { key: "answer", label: "Answer", type: "textarea" }
        ],
        newItem: () => ({ question: "New question", answer: "" })
      }
    ]
  },

  footer: {
    label: "Footer",
    fields: [
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "copyrightText", label: "Copyright text (use {year} for the current year)", type: "text" },
      {
        key: "columns",
        label: "Link columns",
        type: "list",
        itemLabel: (item) => item.title || "New column",
        itemFields: [
          { key: "title", label: "Column title", type: "text" },
          {
            key: "links",
            label: "Links",
            type: "list",
            itemLabel: (item) => item.label || "New link",
            itemFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "text" }
            ],
            newItem: () => ({ label: "New Link", href: "#" })
          }
        ],
        newItem: () => ({ title: "New Column", links: [] })
      }
    ]
  },

  siteSettings: {
    label: "Site Settings",
    fields: [
      { key: "metaTitle", label: "Browser tab title", type: "text" },
      { key: "metaDescription", label: "Meta description (SEO)", type: "textarea" },
      { key: "maintenanceMode", label: "Maintenance mode", type: "boolean" },
      {
        key: "storeUrl",
        label: "Store URL (e.g. your Tebex/Buycraft link) — leave blank to hide the Store button",
        type: "text"
      }
    ]
  }
};

export const sectionOrder = [
  "hero",
  "server",
  "servers",
  "features",
  "arena",
  "economy",
  "events",
  "community",
  "founders",
  "staff",
  "rules",
  "faq",
  "footer",
  "branding",
  "siteSettings"
];
