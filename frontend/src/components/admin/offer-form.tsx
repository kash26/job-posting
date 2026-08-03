"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import {
  createOffer,
  type OfferMutationPayload,
  type UserRole,
  updateOffer,
} from "@/lib/job-offers-api";

type OfferFormMode = "create" | "edit";

type OfferFormData = {
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  heroImageUrl: string;
  mediaUrls: string;
  description: string;
  responsibilities: string;
  requirements: string;
};

type OfferFormProps = {
  locale: Locale;
  isFr: boolean;
  role: UserRole;
  mode: OfferFormMode;
  slug?: string;
  initialData?: Partial<OfferFormData>;
};

export function OfferForm({
  locale,
  isFr,
  role,
  mode,
  slug,
  initialData,
}: OfferFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<OfferFormData>({
    title: initialData?.title ?? "",
    company: initialData?.company ?? "",
    location: initialData?.location ?? "",
    salary: initialData?.salary ?? "",
    category: initialData?.category ?? "Technology",
    type: initialData?.type ?? "Full-time",
    heroImageUrl: initialData?.heroImageUrl ?? "",
    mediaUrls: initialData?.mediaUrls ?? "",
    description: initialData?.description ?? "",
    responsibilities: initialData?.responsibilities ?? "",
    requirements: initialData?.requirements ?? "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof OfferFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const categories = ["Technology", "Design", "Marketing", "Finance", "Health"];
  const contractTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  const labels = useMemo(
    () => ({
      title: isFr ? "Intitule du poste" : "Job title",
      company: isFr ? "Entreprise" : "Company",
      location: isFr ? "Localisation" : "Location",
      salary: isFr ? "Salaire" : "Salary",
      category: isFr ? "Categorie" : "Category",
      type: isFr ? "Type de contrat" : "Contract type",
      heroImageUrl: isFr ? "Image principale (URL)" : "Primary image (URL)",
      mediaUrls: isFr
        ? "Medias (URLs images/videos, une ligne par media)"
        : "Media URLs (images/videos, one per line)",
      description: isFr ? "Description" : "Description",
      responsibilities: isFr ? "Responsabilites" : "Responsibilities",
      requirements: isFr ? "Exigences" : "Requirements",
      saveDraft: isFr ? "Sauvegarder brouillon" : "Save draft",
      publish: isFr ? "Publier l'offre" : "Publish offer",
      save: isFr ? "Enregistrer" : "Save changes",
      archive: isFr ? "Archiver" : "Archive",
      required: isFr ? "Champ obligatoire" : "Required field",
      apiError: isFr
        ? "Impossible de sauvegarder l'offre pour le moment."
        : "Unable to save this offer right now.",
    }),
    [isFr],
  );

  function setField<K extends keyof OfferFormData>(
    key: K,
    value: OfferFormData[K],
  ) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof OfferFormData, string>> = {};
    const requiredFields: Array<keyof OfferFormData> = [
      "title",
      "company",
      "location",
      "salary",
      "description",
      "responsibilities",
      "requirements",
    ];

    requiredFields.forEach((field) => {
      if (!values[field].trim()) {
        nextErrors[field] = labels.required;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function buildPayload(status: "draft" | "published"): OfferMutationPayload {
    return {
      title: values.title.trim(),
      company: values.company.trim(),
      location: values.location.trim(),
      salary: values.salary.trim(),
      category: values.category,
      type: values.type,
      heroImageUrl: values.heroImageUrl.trim() || null,
      mediaUrls: values.mediaUrls
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      description: values.description.trim(),
      responsibilities: values.responsibilities
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      requirements: values.requirements
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      benefits: [],
      tags: [],
      status,
    };
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "create") {
        await createOffer(buildPayload("published"), role);
      } else if (slug) {
        await updateOffer(slug, buildPayload("published"), role);
      }

      const status = mode === "create" ? "created" : "updated";
      router.push(`/${locale}/admin/jobs?status=${status}`);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : labels.apiError;
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-outline/40 bg-surface p-6"
    >
      {formError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {formError}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={labels.title}
          value={values.title}
          onChange={(value) => setField("title", value)}
          error={errors.title}
          placeholder="Senior Product Designer"
        />
        <Field
          label={labels.company}
          value={values.company}
          onChange={(value) => setField("company", value)}
          error={errors.company}
          placeholder="Talent RDC Express"
        />
        <Field
          label={labels.location}
          value={values.location}
          onChange={(value) => setField("location", value)}
          error={errors.location}
          placeholder="Kinshasa, CD"
        />
        <Field
          label={labels.salary}
          value={values.salary}
          onChange={(value) => setField("salary", value)}
          error={errors.salary}
          placeholder="$80k - $100k"
        />
        <SelectField
          label={labels.category}
          value={values.category}
          onChange={(value) => setField("category", value)}
          options={categories}
        />
        <SelectField
          label={labels.type}
          value={values.type}
          onChange={(value) => setField("type", value)}
          options={contractTypes}
        />
        <Field
          label={labels.heroImageUrl}
          value={values.heroImageUrl}
          onChange={(value) => setField("heroImageUrl", value)}
          placeholder="https://example.com/hero.jpg"
        />
      </div>

      <TextAreaField
        label={labels.mediaUrls}
        value={values.mediaUrls}
        onChange={(value) => setField("mediaUrls", value)}
      />

      <TextAreaField
        label={labels.description}
        value={values.description}
        onChange={(value) => setField("description", value)}
        error={errors.description}
      />
      <TextAreaField
        label={labels.responsibilities}
        value={values.responsibilities}
        onChange={(value) => setField("responsibilities", value)}
        error={errors.responsibilities}
      />
      <TextAreaField
        label={labels.requirements}
        value={values.requirements}
        onChange={(value) => setField("requirements", value)}
        error={errors.requirements}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          {mode === "edit" ? (
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700"
            >
              {labels.archive}
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-xl border border-outline/70 bg-white px-4 text-sm font-semibold text-foreground"
            disabled={isSubmitting}
          >
            {labels.saveDraft}
          </button>
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isFr
                ? "Enregistrement..."
                : "Saving..."
              : mode === "create"
                ? labels.publish
                : labels.save}
          </button>
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
};

function Field({ label, value, onChange, error, placeholder }: FieldProps) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <label htmlFor={inputId} className="space-y-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <input
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
      {error ? (
        <p className="text-xs font-semibold text-red-700">{error}</p>
      ) : null}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <label htmlFor={inputId} className="space-y-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <select
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

function TextAreaField({ label, value, onChange, error }: TextAreaFieldProps) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <label htmlFor={inputId} className="space-y-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <textarea
        id={inputId}
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-outline/50 bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
      {error ? (
        <p className="text-xs font-semibold text-red-700">{error}</p>
      ) : null}
    </label>
  );
}
