import type { Category, FeaturedJob } from "@/components/home/types";

export const popularSearches = [
  "UI/UX Designer",
  "Product Manager",
  "Frontend Dev",
  "Marketing Expert",
];

export const categories: Category[] = [
  {
    title: "Technology & Software",
    description:
      "Lead the digital revolution with roles in AI, cloud, and engineering.",
    jobsLabel: "2,450 Jobs",
    icon: "code",
    featured: true,
  },
  {
    title: "Creative Design",
    description: "1,200+ active listings",
    jobsLabel: "1,200 Jobs",
    icon: "spark",
  },
  {
    title: "Marketing & Sales",
    description: "850+ active listings",
    jobsLabel: "850 Jobs",
    icon: "trend",
  },
  {
    title: "Finance & Fintech",
    description: "600+ active listings",
    jobsLabel: "600 Jobs",
    icon: "finance",
  },
  {
    title: "Health & Biotech",
    description: "450+ active listings",
    jobsLabel: "450 Jobs",
    icon: "health",
  },
];

export const featuredJobs: FeaturedJob[] = [
  {
    title: "Senior Product Designer",
    company: "Mekari",
    location: "Jakarta · Remote",
    salary: "$120k - $160k",
    badge: "New",
    skills: ["Figma", "UX Research"],
    initials: "Me",
  },
  {
    title: "Frontend Lead Engineer",
    company: "CloudSync",
    location: "Berlin, DE",
    salary: "€90k - €130k",
    badge: "Remote",
    skills: ["React", "Tailwind"],
    initials: "Cl",
  },
  {
    title: "Growth Marketing Manager",
    company: "Vantage Media",
    location: "London, UK",
    salary: "£70k - £95k",
    badge: "Contract",
    skills: ["Analytics", "SEO/SEM"],
    initials: "Va",
  },
];

export const trustedCompanies = ["Vodacom", "Rawbank", "Orange", "Equity BCDC"];
