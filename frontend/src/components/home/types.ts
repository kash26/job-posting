export type Category = {
  title: string;
  description: string;
  jobsLabel: string;
  icon: "code" | "spark" | "trend" | "finance" | "health";
  featured?: boolean;
};

export type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  salary: string;
  badge: string;
  skills: string[];
  initials: string;
};
