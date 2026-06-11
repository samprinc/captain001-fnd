export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  icon: string;
};

export const services: Service[] = [
  {
    id: "production",
    title: "Cinematic Production",
    tagline: "Visual storytelling, engineered.",
    description:
      "From concept to color grade. We produce commercial films, brand documentaries, and editorial visuals shot in 4K with cinema-grade direction.",
    image:
      "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1600",
    icon: "fa-solid fa-clapperboard",
    deliverables: [
      "Brand Films & Commercials (4K / 6K)",
      "Documentary & Editorial Shoots",
      "Pre-production, Crew & Locations",
      "Color Grading & Post-production",
      "Sound Design & Original Score",
      "Behind-the-scenes Stills Package",
    ],
  },
  {
    id: "branding",
    title: "Brand Architecture",
    tagline: "Identities built to outlast trends.",
    description:
      "We design brand systems with the rigor of a magazine and the discipline of a tech platform. Strategy, identity, and the rules that hold them together.",
    image:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1600",
    icon: "fa-solid fa-pen-nib",
    deliverables: [
      "Brand Strategy & Positioning",
      "Visual Identity Systems",
      "Typography & Editorial Voice",
      "Brand Guidelines (Print + Digital)",
      "Packaging & Collateral",
      "Launch Campaign Direction",
    ],
  },
  {
    id: "digital-pr",
    title: "Digital PR & Press",
    tagline: "Earn the room. Own the headline.",
    description:
      "Targeted press strategy, editorial placements, and founder PR. We turn brands into newsworthy stories — and stories into measurable reach.",
    image:
      "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1600",
    icon: "fa-solid fa-tower-broadcast",
    deliverables: [
      "Press Strategy & Media Lists",
      "Tier-1 Publication Outreach",
      "Founder & Executive Profiling",
      "Editorial Placements & Features",
      "Crisis & Reputation Management",
      "Monthly Coverage Reporting",
    ],
  },
];

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  cover: string;
  tags: string[];
};

const longBody = `The work of building a brand has never been louder, and yet rarely has it felt more quiet. The discipline now lives in the gap between what a company says and what a culture is willing to repeat about it. That gap is the entire job.

We design for that gap. We write for it. We film for it. The brands that move in the next decade will not be the ones with the loudest channels — they will be the ones with the cleanest signal.

Editorial thinking is the unlock. Treat every touchpoint like a cover story: a clear point of view, a single visual idea, a sentence a stranger could repeat at dinner. When the work survives a reader's attention, it survives the algorithm.

The studios doing this well are quietly rewriting what "agency" means. Less deck, more direction. Less performance, more press. Less brand book, more body of work.`;

export const posts: Post[] = [
  {
    id: "editorial-is-the-new-marketing",
    title: "Editorial Is the New Marketing",
    excerpt:
      "Why the brands of the next decade will be built like magazines — and run like newsrooms.",
    content: longBody,
    category: "Brand Strategy",
    author: "Stephen Ndemo Jr.",
    date: "Mar 12, 2025",
    readTime: "7 min read",
    cover:
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Editorial", "Strategy", "Brand"],
  },
  {
    id: "the-quiet-power-of-monochrome",
    title: "The Quiet Power of Monochrome",
    excerpt:
      "Color is loud. Restraint is louder. A field note on designing identities that age in public.",
    content: longBody,
    category: "Design",
    author: "Stephen Ndemo Jr.",
    date: "Mar 04, 2025",
    readTime: "5 min read",
    cover:
      "https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Design", "Identity"],
  },
  {
    id: "press-is-a-product",
    title: "Press Is a Product",
    excerpt:
      "Stop pitching. Start packaging. The new mechanics of earning a Tier-1 placement.",
    content: longBody,
    category: "Digital PR",
    author: "Stephen Ndemo Jr.",
    date: "Feb 22, 2025",
    readTime: "6 min read",
    cover:
      "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["PR", "Media"],
  },
  {
    id: "shot-list-as-strategy",
    title: "The Shot List Is a Strategy Document",
    excerpt:
      "How production planning quietly decides whether a brand film actually moves a market.",
    content: longBody,
    category: "Production",
    author: "Stephen Ndemo Jr.",
    date: "Feb 14, 2025",
    readTime: "8 min read",
    cover:
      "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Production", "Film"],
  },
  {
    id: "founders-on-the-cover",
    title: "Founders Belong on the Cover",
    excerpt:
      "Why executive profiling outperforms paid acquisition in the trust economy.",
    content: longBody,
    category: "Digital PR",
    author: "Stephen Ndemo Jr.",
    date: "Feb 02, 2025",
    readTime: "5 min read",
    cover:
      "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["PR", "Founders"],
  },
  {
    id: "type-as-architecture",
    title: "Typography Is Architecture",
    excerpt: "A field note on building identities that read like buildings stand.",
    content: longBody,
    category: "Design",
    author: "Stephen Ndemo Jr.",
    date: "Jan 21, 2025",
    readTime: "4 min read",
    cover:
      "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Typography", "Design"],
  },
  {
    id: "the-newsroom-model",
    title: "Run Your Brand Like a Newsroom",
    excerpt:
      "Editorial calendars, beats, and the org chart shift no marketing team is talking about.",
    content: longBody,
    category: "Brand Strategy",
    author: "Stephen Ndemo Jr.",
    date: "Jan 08, 2025",
    readTime: "6 min read",
    cover:
      "https://images.pexels.com/photos/3201588/pexels-photo-3201588.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Strategy", "Editorial"],
  },
  {
    id: "kenya-creative-export",
    title: "Kenya Is a Creative Export",
    excerpt:
      "Notes from Nairobi on why East African studios are quietly reshaping global production.",
    content: longBody,
    category: "Industry",
    author: "Stephen Ndemo Jr.",
    date: "Dec 18, 2024",
    readTime: "7 min read",
    cover:
      "https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Industry", "Nairobi"],
  },
  {
    id: "the-pitch-is-the-product",
    title: "The Pitch Is the Product",
    excerpt: "What we learned shipping 40 brand decks in a year — and burning half of them.",
    content: longBody,
    category: "Brand Strategy",
    author: "Stephen Ndemo Jr.",
    date: "Dec 02, 2024",
    readTime: "5 min read",
    cover:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Strategy", "Pitching"],
  },
  {
    id: "ai-and-the-art-director",
    title: "AI and the Art Director",
    excerpt:
      "Generative tools are not replacing taste. They are exposing who never had it.",
    content: longBody,
    category: "Design",
    author: "Stephen Ndemo Jr.",
    date: "Nov 19, 2024",
    readTime: "6 min read",
    cover:
      "https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["AI", "Design"],
  },
  {
    id: "the-stills-package",
    title: "Ship the Stills Package",
    excerpt:
      "The deliverable most production companies forget — and the one PR teams beg for.",
    content: longBody,
    category: "Production",
    author: "Stephen Ndemo Jr.",
    date: "Nov 04, 2024",
    readTime: "4 min read",
    cover:
      "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Production", "PR"],
  },
  {
    id: "luxury-is-restraint",
    title: "Luxury Is Restraint",
    excerpt: "On the discipline of leaving things out — in design, in copy, in client work.",
    content: longBody,
    category: "Design",
    author: "Stephen Ndemo Jr.",
    date: "Oct 21, 2024",
    readTime: "5 min read",
    cover:
      "https://images.pexels.com/photos/1693650/pexels-photo-1693650.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Design", "Luxury"],
  },
  {
    id: "the-founder-interview",
    title: "Anatomy of a Founder Interview",
    excerpt: "How to prep a founder for press without coaching the soul out of them.",
    content: longBody,
    category: "Digital PR",
    author: "Stephen Ndemo Jr.",
    date: "Oct 07, 2024",
    readTime: "6 min read",
    cover:
      "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["PR", "Interviews"],
  },
  {
    id: "the-quiet-rebrand",
    title: "The Quiet Rebrand",
    excerpt: "How three of our clients rebranded without a single press release. And won.",
    content: longBody,
    category: "Brand Strategy",
    author: "Stephen Ndemo Jr.",
    date: "Sep 24, 2024",
    readTime: "7 min read",
    cover:
      "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tags: ["Brand", "Rebrand"],
  },
];

export const portfolio = [
  "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1601090/pexels-photo-1601090.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=1200",
];
