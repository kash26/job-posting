import { findJobBySlug, jobOffers } from "@/lib/mock-data";

export type UserRole = "admin" | "recruiter";

export type JobOfferApiItem = {
  id?: number;
  slug: string;
  title: string;
  company: string;
  location: string;
  remote?: boolean;
  category: string;
  level?: string | null;
  salary?: string | null;
  type: string;
  status?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  tags?: string[];
  heroImageUrl?: string | null;
  mediaUrls?: string[];
  postedAt?: string | null;
  createdAt?: string | null;
};

export type AdminOffersQuery = {
  q?: string;
  status?: string;
  category?: string;
  type?: string;
  sortBy?: "created_at" | "updated_at" | "title" | "company" | "status";
  sortDir?: "asc" | "desc";
  page?: number;
  perPage?: number;
};

export type AdminOffersResponse = {
  data: JobOfferApiItem[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
  source: "api" | "mock";
};

function apiBase() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
  return base.replace(/\/$/, "");
}

function parseApiData<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const objectPayload = payload as Record<string, unknown>;

  if (Array.isArray(objectPayload.data)) {
    return objectPayload.data as T;
  }

  if (
    objectPayload.data &&
    typeof objectPayload.data === "object" &&
    Array.isArray((objectPayload.data as Record<string, unknown>).data)
  ) {
    return (objectPayload.data as Record<string, unknown>).data as T;
  }

  return null;
}

function mapMockOffer(
  offer: (typeof jobOffers)[number],
  status: string,
): JobOfferApiItem {
  return {
    slug: offer.slug,
    title: offer.title,
    company: offer.company,
    location: offer.location,
    remote: offer.remote,
    category: offer.category,
    level: offer.level,
    salary: offer.salary,
    type: offer.type,
    status,
    description: offer.description,
    responsibilities: offer.responsibilities,
    requirements: offer.requirements,
    benefits: offer.benefits,
    tags: offer.tags,
    heroImageUrl: offer.heroImageUrl ?? null,
    mediaUrls: offer.mediaUrls ?? [],
    postedAt: null,
    createdAt: null,
  };
}

function fallbackAdminOffers(query: AdminOffersQuery): AdminOffersResponse {
  const q = query.q?.trim().toLowerCase() ?? "";
  const status = query.status?.trim().toLowerCase() ?? "";
  const category = query.category?.trim().toLowerCase() ?? "";
  const type = query.type?.trim().toLowerCase() ?? "";
  const sortBy = query.sortBy ?? "created_at";
  const sortDir = query.sortDir ?? "desc";
  const currentPage = Math.max(1, query.page ?? 1);
  const perPage = Math.max(1, query.perPage ?? 10);

  const hydrated = jobOffers.map((offer, index) =>
    mapMockOffer(offer, index < 5 ? "published" : "draft"),
  );

  let filtered = hydrated.filter((offer) => {
    const searchable = [offer.title, offer.company, offer.location]
      .join(" ")
      .toLowerCase();
    const matchesQ = !q || searchable.includes(q);
    const matchesStatus =
      !status || (offer.status ?? "").toLowerCase() === status;
    const matchesCategory =
      !category || offer.category.toLowerCase() === category;
    const matchesType = !type || offer.type.toLowerCase() === type;
    return matchesQ && matchesStatus && matchesCategory && matchesType;
  });

  filtered = filtered.sort((left, right) => {
    const leftValue = String(
      left[
        sortBy === "created_at" || sortBy === "updated_at" ? "title" : sortBy
      ] ?? "",
    );
    const rightValue = String(
      right[
        sortBy === "created_at" || sortBy === "updated_at" ? "title" : sortBy
      ] ?? "",
    );
    const order = leftValue.localeCompare(rightValue);
    return sortDir === "asc" ? order : -order;
  });

  const total = filtered.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const offset = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(offset, offset + perPage);

  return {
    data: pageItems,
    meta: {
      currentPage,
      lastPage,
      perPage,
      total,
    },
    source: "mock",
  };
}

export async function fetchAdminOffers(
  query: AdminOffersQuery,
  role: UserRole,
): Promise<AdminOffersResponse> {
  const params = new URLSearchParams();

  if (query.q) params.set("q", query.q);
  if (query.status) params.set("status", query.status);
  if (query.category) params.set("category", query.category);
  if (query.type) params.set("type", query.type);
  if (query.sortBy) params.set("sort_by", query.sortBy);
  if (query.sortDir) params.set("sort_dir", query.sortDir);
  params.set("page", String(Math.max(1, query.page ?? 1)));
  params.set(
    "per_page",
    String(Math.max(1, Math.min(query.perPage ?? 10, 50))),
  );

  try {
    const response = await fetch(
      `${apiBase()}/v1/job-offers?${params.toString()}`,
      {
        cache: "no-store",
        headers: {
          "X-User-Role": role,
        },
      },
    );

    if (!response.ok) {
      return fallbackAdminOffers(query);
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const data = parseApiData<JobOfferApiItem[]>(payload) ?? [];
    const metaPayload =
      (payload.meta as Record<string, unknown> | undefined) ?? {};

    return {
      data,
      meta: {
        currentPage: Number(metaPayload.currentPage ?? query.page ?? 1),
        lastPage: Number(metaPayload.lastPage ?? 1),
        perPage: Number(metaPayload.perPage ?? query.perPage ?? 10),
        total: Number(metaPayload.total ?? data.length),
      },
      source: "api",
    };
  } catch {
    return fallbackAdminOffers(query);
  }
}

export async function fetchOfferBySlug(
  slug: string,
  role: UserRole,
): Promise<JobOfferApiItem | null> {
  try {
    const response = await fetch(`${apiBase()}/v1/job-offers/${slug}`, {
      cache: "no-store",
      headers: {
        "X-User-Role": role,
      },
    });

    if (!response.ok) {
      throw new Error("unavailable");
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const candidate =
      (payload.data as JobOfferApiItem | undefined) ??
      ((payload.data as Record<string, unknown> | undefined)?.data as
        | JobOfferApiItem
        | undefined);

    return candidate ?? null;
  } catch {
    const fallback = findJobBySlug(slug);
    if (!fallback) {
      return null;
    }

    return mapMockOffer(fallback, "draft");
  }
}

export type OfferMutationPayload = {
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
  heroImageUrl?: string | null;
  mediaUrls?: string[];
  status: "draft" | "published";
};

export async function createOffer(
  payload: OfferMutationPayload,
  role: UserRole,
): Promise<{ slug?: string }> {
  try {
    const response = await fetch(`${apiBase()}/v1/job-offers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Role": role,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      throw new Error(body?.message ?? "Unable to create offer");
    }

    const body = (await response.json()) as Record<string, unknown>;
    const data = body.data as Record<string, unknown> | undefined;

    return {
      slug: (data?.slug as string | undefined) ?? undefined,
    };
  } catch {
    return {
      slug:
        payload.title
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") || "new-offer",
    };
  }
}

export async function updateOffer(
  slug: string,
  payload: OfferMutationPayload,
  role: UserRole,
): Promise<void> {
  try {
    const response = await fetch(`${apiBase()}/v1/job-offers/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-User-Role": role,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      throw new Error(body?.message ?? "Unable to update offer");
    }
  } catch {
    return;
  }
}
