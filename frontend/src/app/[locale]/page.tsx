import { CommunitySection } from "@/components/home/community-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedJobsSection } from "@/components/home/featured-jobs-section";
import { HeroSection } from "@/components/home/hero-section";
import { JobCategoriesSection } from "@/components/home/job-categories-section";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="flex flex-col bg-background">
      <HeroSection locale={locale} content={dictionary.home} />
      <CommunitySection content={dictionary.home} />
      <JobCategoriesSection locale={locale} content={dictionary.home} />
      <FeaturedJobsSection locale={locale} content={dictionary.home} />
      <CtaSection locale={locale} content={dictionary.home} />
    </div>
  );
}
