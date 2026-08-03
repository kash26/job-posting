export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export type NavItem = {
  label: string;
  href: string;
};

export type Category = {
  title: string;
  description: string;
  jobsLabel: string;
  icon: "code" | "spark" | "trend" | "finance" | "health";
  featured?: boolean;
  href: string;
};

export type FeaturedJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  badge: string;
  skills: string[];
  initials: string;
};

export type CommunityHighlight = {
  title: string;
  subtitle: string;
  stat: string;
};

export type ActivityItem = {
  name: string;
  role: string;
  action: string;
  time: string;
};

export type Dictionary = {
  localeLabel: string;
  switchLocaleLabel: string;
  header: {
    nav: NavItem[];
    authCta: string;
    postJobCta: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    description: string;
    productTitle: string;
    companyTitle: string;
    productLinks: string[];
    companyLinks: string[];
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    bottomLinks: string[];
  };
  home: {
    heroPill: string;
    heroTitleStart: string;
    heroTitleAccent: string;
    heroTitleEnd: string;
    heroDescription: string;
    searchKeywordPlaceholder: string;
    searchLocationPlaceholder: string;
    searchButton: string;
    popularLabel: string;
    popularSearches: string[];
    trustedByLabel: string;
    trustedCompanies: string[];
    communityTitle: string;
    communityDescription: string;
    highlights: CommunityHighlight[];
    activityTitle: string;
    activityItems: ActivityItem[];
    categoriesTitle: string;
    categoriesDescription: string;
    categoriesAction: string;
    categories: Category[];
    featuredTitle: string;
    featuredDescription: string;
    featuredAction: string;
    featuredJobs: FeaturedJob[];
    detailsLabel: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaCommunity: string;
    ctaStatTitle: string;
    ctaStatGain: string;
    ctaStats: Array<{ label: string; value: string }>;
  };
  pages: {
    jobs: {
      title: string;
      subtitle: string;
      queryLabel: string;
      locationLabel: string;
      emptyTitle: string;
      emptyDescription: string;
    };
    about: {
      title: string;
      description: string;
    };
    careers: {
      title: string;
      description: string;
    };
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    localeLabel: "FR",
    switchLocaleLabel: "Changer la langue",
    header: {
      nav: [
        { label: "Accueil", href: "/" },
        { label: "Offres", href: "/jobs" },
        { label: "A propos", href: "/about" },
        { label: "Carrieres", href: "/careers" },
      ],
      authCta: "Connexion / Inscription",
      postJobCta: "Publier une offre",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    footer: {
      description:
        "Nous aidons les talents a trouver des opportunites fiables et les entreprises a recruter plus vite.",
      productTitle: "Produit",
      companyTitle: "Entreprise",
      productLinks: [
        "Recherche d'offres",
        "Solutions de recrutement",
        "Base de talents",
        "Tendances salariales",
      ],
      companyLinks: ["A propos", "Carrieres", "Confidentialite", "Conditions"],
      newsletterTitle: "Restez informes",
      newsletterDescription:
        "Recevez chaque semaine des offres verifiees et des conseils de carriere.",
      newsletterPlaceholder: "Adresse e-mail",
      newsletterButton: "Envoyer",
      bottomLinks: ["Cookies", "Plan du site", "Contact"],
    },
    home: {
      heroPill: "Le reseau emploi qui accelere votre carriere",
      heroTitleStart: "Trouvez le",
      heroTitleAccent: "poste ideal",
      heroTitleEnd: "avec une experience moderne et sociale.",
      heroDescription:
        "Explorez des offres verifiees, suivez les activites de recrutement et connectez-vous a une communaute professionnelle active.",
      searchKeywordPlaceholder: "Poste, entreprise ou competence",
      searchLocationPlaceholder: "Ville ou remote",
      searchButton: "Rechercher",
      popularLabel: "Recherches populaires",
      popularSearches: [
        "UI/UX Designer",
        "Product Manager",
        "Frontend Developer",
        "Data Analyst",
      ],
      trustedByLabel: "Entreprises actives",
      trustedCompanies: ["Vodacom", "Rawbank", "Orange", "Equity BCDC"],
      communityTitle: "Le marche bouge en direct",
      communityDescription:
        "Suivez les mouvements du marche, les recrutements recents et les competences les plus demandees.",
      highlights: [
        {
          title: "Nouvelles offres aujourd'hui",
          subtitle: "Toutes categories",
          stat: "+128",
        },
        { title: "Talents en ligne", subtitle: "Dernieres 24h", stat: "3 900" },
        {
          title: "Entreprises actives",
          subtitle: "Cette semaine",
          stat: "246",
        },
      ],
      activityTitle: "Activite recente",
      activityItems: [
        {
          name: "Merveille K.",
          role: "Product Designer",
          action: "a postule a Senior Product Designer",
          time: "il y a 3 min",
        },
        {
          name: "CloudSync",
          role: "Entreprise",
          action: "a publie 4 nouvelles offres remote",
          time: "il y a 12 min",
        },
        {
          name: "Sarah M.",
          role: "Data Analyst",
          action: "a complete son profil a 95%",
          time: "il y a 27 min",
        },
      ],
      categoriesTitle: "Explorer par categories",
      categoriesDescription:
        "Accedez rapidement aux secteurs qui recrutent le plus.",
      categoriesAction: "Voir toutes les categories",
      categories: [
        {
          title: "Technologie & Logiciel",
          description: "Cloud, IA, ingenierie et produits digitaux.",
          jobsLabel: "2 450 offres",
          icon: "code",
          featured: true,
          href: "/jobs?category=technology",
        },
        {
          title: "Design Creatif",
          description: "1 200+ offres actives",
          jobsLabel: "1 200",
          icon: "spark",
          href: "/jobs?category=design",
        },
        {
          title: "Marketing & Vente",
          description: "850+ offres actives",
          jobsLabel: "850",
          icon: "trend",
          href: "/jobs?category=marketing",
        },
        {
          title: "Finance & Fintech",
          description: "600+ offres actives",
          jobsLabel: "600",
          icon: "finance",
          href: "/jobs?category=finance",
        },
        {
          title: "Sante & Biotech",
          description: "450+ offres actives",
          jobsLabel: "450",
          icon: "health",
          href: "/jobs?category=health",
        },
      ],
      featuredTitle: "Offres mises en avant",
      featuredDescription: "Une selection qualifiee d'opportunites premium.",
      featuredAction: "Voir toutes les offres",
      featuredJobs: [
        {
          id: "senior-product-designer",
          title: "Senior Product Designer",
          company: "Mekari",
          location: "Jakarta · Remote",
          salary: "$120k - $160k",
          badge: "Nouveau",
          skills: ["Figma", "UX Research"],
          initials: "Me",
        },
        {
          id: "frontend-lead-engineer",
          title: "Frontend Lead Engineer",
          company: "CloudSync",
          location: "Berlin, DE",
          salary: "EUR90k - EUR130k",
          badge: "Remote",
          skills: ["React", "Tailwind"],
          initials: "Cl",
        },
        {
          id: "growth-marketing-manager",
          title: "Growth Marketing Manager",
          company: "Vantage Media",
          location: "London, UK",
          salary: "GBP70k - GBP95k",
          badge: "Contrat",
          skills: ["Analytics", "SEO/SEM"],
          initials: "Va",
        },
      ],
      detailsLabel: "Details",
      ctaTitle: "Rejoignez l'ecosysteme Talent RDC Express",
      ctaDescription:
        "Creez votre profil, activez des alertes intelligentes et soyez visible par les meilleurs recruteurs.",
      ctaPrimary: "Creer mon profil",
      ctaSecondary: "Decouvrir la plateforme",
      ctaCommunity: "50k+ professionnels nous font confiance",
      ctaStatTitle: "Cette semaine",
      ctaStatGain: "+18%",
      ctaStats: [
        { label: "Vues de profil", value: "128" },
        { label: "Matchs pertinents", value: "24" },
        { label: "Invitations entretien", value: "6" },
      ],
    },
    pages: {
      jobs: {
        title: "Offres d'emploi",
        subtitle: "Trouvez des opportunites pertinentes selon vos competences.",
        queryLabel: "Mot-cle",
        locationLabel: "Localisation",
        emptyTitle: "Resultats en preparation",
        emptyDescription:
          "Le moteur de recherche complet arrive. Cette page est deja connectee au formulaire d'accueil.",
      },
      about: {
        title: "A propos de Talent RDC Express",
        description:
          "Nous construisons une plateforme de recrutement moderne, inclusive et orientee impact pour la RDC.",
      },
      careers: {
        title: "Carrieres",
        description:
          "Consultez nos opportunites internes et construisez l'avenir de l'emploi digital en Afrique centrale.",
      },
    },
  },
  en: {
    localeLabel: "EN",
    switchLocaleLabel: "Switch language",
    header: {
      nav: [
        { label: "Home", href: "/" },
        { label: "Jobs", href: "/jobs" },
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
      ],
      authCta: "Sign in / Sign up",
      postJobCta: "Post a job",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    footer: {
      description:
        "We help talent discover trusted opportunities and companies hire faster with confidence.",
      productTitle: "Product",
      companyTitle: "Company",
      productLinks: [
        "Job search",
        "Hiring solutions",
        "Talent database",
        "Salary trends",
      ],
      companyLinks: ["About", "Careers", "Privacy", "Terms"],
      newsletterTitle: "Stay informed",
      newsletterDescription:
        "Get weekly verified jobs and practical career insights.",
      newsletterPlaceholder: "Email address",
      newsletterButton: "Send",
      bottomLinks: ["Cookies", "Sitemap", "Contact"],
    },
    home: {
      heroPill: "A social-first hiring network for modern careers",
      heroTitleStart: "Find your",
      heroTitleAccent: "next role",
      heroTitleEnd: "with a high-trust social experience.",
      heroDescription:
        "Explore verified jobs, follow recruitment activity in real time, and grow inside an active professional community.",
      searchKeywordPlaceholder: "Role, company, or skill",
      searchLocationPlaceholder: "City or remote",
      searchButton: "Search",
      popularLabel: "Popular searches",
      popularSearches: [
        "UI/UX Designer",
        "Product Manager",
        "Frontend Developer",
        "Data Analyst",
      ],
      trustedByLabel: "Active employers",
      trustedCompanies: ["Vodacom", "Rawbank", "Orange", "Equity BCDC"],
      communityTitle: "Live market momentum",
      communityDescription:
        "Track hiring signals, new openings, and the most requested skills in one glance.",
      highlights: [
        {
          title: "New jobs today",
          subtitle: "Across categories",
          stat: "+128",
        },
        { title: "Online talent", subtitle: "Last 24 hours", stat: "3,900" },
        { title: "Active employers", subtitle: "This week", stat: "246" },
      ],
      activityTitle: "Recent activity",
      activityItems: [
        {
          name: "Merveille K.",
          role: "Product Designer",
          action: "applied to Senior Product Designer",
          time: "3m ago",
        },
        {
          name: "CloudSync",
          role: "Company",
          action: "published 4 new remote jobs",
          time: "12m ago",
        },
        {
          name: "Sarah M.",
          role: "Data Analyst",
          action: "completed profile to 95%",
          time: "27m ago",
        },
      ],
      categoriesTitle: "Explore categories",
      categoriesDescription:
        "Jump directly into sectors with the highest hiring velocity.",
      categoriesAction: "View all categories",
      categories: [
        {
          title: "Technology & Software",
          description: "Cloud, AI, engineering, and product opportunities.",
          jobsLabel: "2,450 jobs",
          icon: "code",
          featured: true,
          href: "/jobs?category=technology",
        },
        {
          title: "Creative Design",
          description: "1,200+ active openings",
          jobsLabel: "1,200",
          icon: "spark",
          href: "/jobs?category=design",
        },
        {
          title: "Marketing & Sales",
          description: "850+ active openings",
          jobsLabel: "850",
          icon: "trend",
          href: "/jobs?category=marketing",
        },
        {
          title: "Finance & Fintech",
          description: "600+ active openings",
          jobsLabel: "600",
          icon: "finance",
          href: "/jobs?category=finance",
        },
        {
          title: "Health & Biotech",
          description: "450+ active openings",
          jobsLabel: "450",
          icon: "health",
          href: "/jobs?category=health",
        },
      ],
      featuredTitle: "Featured opportunities",
      featuredDescription:
        "A curated selection of premium positions from trusted teams.",
      featuredAction: "View all jobs",
      featuredJobs: [
        {
          id: "senior-product-designer",
          title: "Senior Product Designer",
          company: "Mekari",
          location: "Jakarta · Remote",
          salary: "$120k - $160k",
          badge: "New",
          skills: ["Figma", "UX Research"],
          initials: "Me",
        },
        {
          id: "frontend-lead-engineer",
          title: "Frontend Lead Engineer",
          company: "CloudSync",
          location: "Berlin, DE",
          salary: "EUR90k - EUR130k",
          badge: "Remote",
          skills: ["React", "Tailwind"],
          initials: "Cl",
        },
        {
          id: "growth-marketing-manager",
          title: "Growth Marketing Manager",
          company: "Vantage Media",
          location: "London, UK",
          salary: "GBP70k - GBP95k",
          badge: "Contract",
          skills: ["Analytics", "SEO/SEM"],
          initials: "Va",
        },
      ],
      detailsLabel: "Details",
      ctaTitle: "Join the Talent RDC Express ecosystem",
      ctaDescription:
        "Build your profile, activate smart alerts, and become visible to top recruiters.",
      ctaPrimary: "Create my profile",
      ctaSecondary: "Explore platform",
      ctaCommunity: "Trusted by 50k+ professionals",
      ctaStatTitle: "This week",
      ctaStatGain: "+18%",
      ctaStats: [
        { label: "Profile views", value: "128" },
        { label: "Relevant matches", value: "24" },
        { label: "Interview invites", value: "6" },
      ],
    },
    pages: {
      jobs: {
        title: "Job opportunities",
        subtitle: "Discover relevant roles based on your skills.",
        queryLabel: "Keyword",
        locationLabel: "Location",
        emptyTitle: "Results coming soon",
        emptyDescription:
          "The full search engine is next. This page is already connected to the home search form.",
      },
      about: {
        title: "About Talent RDC Express",
        description:
          "We are building a modern, inclusive, and impact-driven recruitment platform for the DRC.",
      },
      careers: {
        title: "Careers",
        description:
          "Explore internal opportunities and help shape the future of digital hiring in Central Africa.",
      },
    },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
