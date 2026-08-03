export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type JobOffer = {
  slug: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  category: "Technology" | "Design" | "Marketing" | "Finance" | "Health";
  level: "Junior" | "Mid" | "Senior" | "Lead";
  salary: string;
  postedAt: string;
  type: JobType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
  heroImageUrl?: string;
  mediaUrls?: string[];
};

export const jobOffers: JobOffer[] = [
  {
    slug: "senior-product-designer",
    title: "Senior Product Designer",
    company: "Mekari",
    location: "Kinshasa, CD",
    remote: true,
    category: "Design",
    level: "Senior",
    salary: "$120k - $160k",
    postedAt: "2d",
    type: "Full-time",
    description:
      "Lead end-to-end design for products used by fast-growing teams across Africa. You will collaborate with product and engineering to shape impactful workflows.",
    responsibilities: [
      "Drive discovery and UX strategy for core platform flows.",
      "Translate business objectives into polished UI systems.",
      "Coach junior designers and improve design operations.",
    ],
    requirements: [
      "5+ years in product design for SaaS or marketplace platforms.",
      "Strong portfolio with UX rationale and shipped outcomes.",
      "Figma expertise and comfort working with design systems.",
    ],
    benefits: [
      "Remote-first with quarterly team retreats",
      "Learning budget and mentorship support",
      "Private healthcare and wellness stipend",
    ],
    tags: ["Figma", "Design System", "UX Research"],
  },
  {
    slug: "frontend-lead-engineer",
    title: "Frontend Lead Engineer",
    company: "CloudSync",
    location: "Remote",
    remote: true,
    category: "Technology",
    level: "Lead",
    salary: "EUR90k - EUR130k",
    postedAt: "1d",
    type: "Full-time",
    description:
      "Build and scale a high-performance web platform with modern React architecture and strong product collaboration.",
    responsibilities: [
      "Define frontend architecture and engineering standards.",
      "Lead implementation of critical user journeys.",
      "Partner with design and backend teams for reliable delivery.",
    ],
    requirements: [
      "7+ years building production React applications.",
      "Strong TypeScript and performance optimization experience.",
      "Experience mentoring engineers and leading reviews.",
    ],
    benefits: [
      "Stock options and performance bonus",
      "Flexible working hours",
      "Top-tier hardware and home office support",
    ],
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    slug: "growth-marketing-manager",
    title: "Growth Marketing Manager",
    company: "Vantage Media",
    location: "Abidjan, CI",
    remote: false,
    category: "Marketing",
    level: "Senior",
    salary: "GBP70k - GBP95k",
    postedAt: "3d",
    type: "Full-time",
    description:
      "Own multi-channel growth strategies, lifecycle campaigns, and conversion optimization initiatives for a regional media product.",
    responsibilities: [
      "Plan and execute acquisition campaigns.",
      "Optimize funnels across web and mobile channels.",
      "Lead experimentation and reporting cadences.",
    ],
    requirements: [
      "4+ years in growth or performance marketing.",
      "Hands-on with analytics, attribution, and CRM workflows.",
      "Excellent communication and stakeholder management.",
    ],
    benefits: [
      "Annual bonus based on growth targets",
      "Conference budget and certifications",
      "Hybrid policy with flexible office days",
    ],
    tags: ["Analytics", "SEO", "Lifecycle"],
  },
  {
    slug: "financial-analyst-fintech",
    title: "Financial Analyst - Fintech",
    company: "NovaPay",
    location: "Lagos, NG",
    remote: true,
    category: "Finance",
    level: "Mid",
    salary: "$65k - $88k",
    postedAt: "5d",
    type: "Full-time",
    description:
      "Support financial planning, product unit economics, and business reporting in a fast-scaling fintech environment.",
    responsibilities: [
      "Build monthly and quarterly financial models.",
      "Track KPI performance and forecast scenarios.",
      "Collaborate with product and operations teams.",
    ],
    requirements: [
      "3+ years in financial analysis or FP&A.",
      "Advanced spreadsheet and BI tooling skills.",
      "Experience in fintech or digital payments preferred.",
    ],
    benefits: [
      "Equity participation",
      "Transport and internet allowance",
      "Healthcare and paid family leave",
    ],
    tags: ["FP&A", "SQL", "Power BI"],
  },
  {
    slug: "clinical-data-specialist",
    title: "Clinical Data Specialist",
    company: "BioHealth Labs",
    location: "Nairobi, KE",
    remote: false,
    category: "Health",
    level: "Mid",
    salary: "$58k - $80k",
    postedAt: "1w",
    type: "Full-time",
    description:
      "Ensure high-quality health data pipelines and compliance for biotech studies and platform operations.",
    responsibilities: [
      "Maintain data quality and audit trails.",
      "Coordinate with clinical and engineering stakeholders.",
      "Produce weekly quality reports for leadership.",
    ],
    requirements: [
      "Experience with healthcare or clinical datasets.",
      "Strong documentation and process discipline.",
      "Comfort with data tooling and collaboration workflows.",
    ],
    benefits: [
      "Health plan with family coverage",
      "Annual wellbeing and fitness grant",
      "Structured career progression plan",
    ],
    tags: ["Clinical Ops", "Data Quality", "Compliance"],
  },
  {
    slug: "junior-ui-designer",
    title: "Junior UI Designer",
    company: "Talent RDC Express",
    location: "Kinshasa, CD",
    remote: false,
    category: "Design",
    level: "Junior",
    salary: "$24k - $36k",
    postedAt: "4d",
    type: "Internship",
    description:
      "Join our in-house team to craft intuitive interfaces and improve candidate experience across web and mobile.",
    responsibilities: [
      "Support UI production for core feature releases.",
      "Create components and visual assets.",
      "Work closely with product and frontend engineers.",
    ],
    requirements: [
      "Solid visual design fundamentals.",
      "Portfolio with at least two shipped projects.",
      "Willingness to learn in a fast-paced environment.",
    ],
    benefits: [
      "Mentorship from senior designers",
      "Training budget and growth plan",
      "Potential full-time conversion",
    ],
    tags: ["UI", "Figma", "Prototyping"],
  },
  {
    slug: "backend-engineer-laravel",
    title: "Backend Engineer - Laravel",
    company: "BridgeStack",
    location: "Remote",
    remote: true,
    category: "Technology",
    level: "Senior",
    salary: "$95k - $125k",
    postedAt: "6h",
    type: "Contract",
    description:
      "Develop reliable API services and optimize critical backend workflows for recruitment at scale.",
    responsibilities: [
      "Design robust REST endpoints and domain services.",
      "Improve query performance and caching strategy.",
      "Implement observability and incident response practices.",
    ],
    requirements: [
      "5+ years with PHP and Laravel in production.",
      "Strong SQL modeling and performance tuning skills.",
      "Experience with Redis, queues, and API security.",
    ],
    benefits: [
      "Flexible contract cycles",
      "Remote collaboration stipend",
      "Access to premium engineering tools",
    ],
    tags: ["Laravel", "MySQL", "Redis"],
  },
  {
    slug: "talent-partnership-lead",
    title: "Talent Partnership Lead",
    company: "RDC Hiring Alliance",
    location: "Kinshasa, CD",
    remote: false,
    category: "Marketing",
    level: "Lead",
    salary: "$72k - $98k",
    postedAt: "2d",
    type: "Full-time",
    description:
      "Build strategic relationships with enterprise employers and drive high-quality hiring campaigns on the platform.",
    responsibilities: [
      "Manage enterprise pipeline and partnership deals.",
      "Coordinate cross-functional launch plans.",
      "Track partner outcomes and retention metrics.",
    ],
    requirements: [
      "5+ years in B2B partnerships or recruitment sales.",
      "Strong negotiation and account management skills.",
      "Data-driven approach to growth and retention.",
    ],
    benefits: [
      "Performance incentives",
      "Regional travel opportunities",
      "Leadership development track",
    ],
    tags: ["Partnerships", "B2B", "Hiring"],
  },
];

export function findJobBySlug(slug: string) {
  return jobOffers.find((job) => job.slug === slug);
}

export function filterJobs(params: {
  q?: string;
  location?: string;
  category?: string;
  type?: string;
}) {
  const query = params.q?.trim().toLowerCase() ?? "";
  const location = params.location?.trim().toLowerCase() ?? "";
  const category = params.category?.trim().toLowerCase() ?? "";
  const type = params.type?.trim().toLowerCase() ?? "";

  return jobOffers.filter((job) => {
    const searchable = [job.title, job.company, ...job.tags]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesLocation =
      !location || job.location.toLowerCase().includes(location);
    const matchesCategory =
      !category || job.category.toLowerCase() === category;
    const matchesType = !type || job.type.toLowerCase() === type;

    return matchesQuery && matchesLocation && matchesCategory && matchesType;
  });
}

export const adminPipeline = [
  { stage: "Draft", count: 6 },
  { stage: "Review", count: 9 },
  { stage: "Published", count: 18 },
  { stage: "Expired", count: 3 },
];

export const adminKpis = [
  { label: "Active offers", value: "18", delta: "+4 this week" },
  { label: "New applications", value: "246", delta: "+18%" },
  { label: "Time to hire", value: "14 days", delta: "-2 days" },
  { label: "Qualified profiles", value: "72%", delta: "+6 pts" },
];
