const PLACEHOLDER_HERO_IMAGES = [
  "https://picsum.photos/id/1011/1600/900",
  "https://picsum.photos/id/1015/1600/900",
  "https://picsum.photos/id/1018/1600/900",
  "https://picsum.photos/id/1020/1600/900",
  "https://picsum.photos/id/1024/1600/900",
  "https://picsum.photos/id/1027/1600/900",
  "https://picsum.photos/id/1031/1600/900",
  "https://picsum.photos/id/1033/1600/900",
  "https://picsum.photos/id/1035/1600/900",
  "https://picsum.photos/id/1036/1600/900",
  "https://picsum.photos/id/1037/1600/900",
  "https://picsum.photos/id/1040/1600/900",
  "https://picsum.photos/id/1041/1600/900",
  "https://picsum.photos/id/1042/1600/900",
  "https://picsum.photos/id/1043/1600/900",
  "https://picsum.photos/id/1044/1600/900",
  "https://picsum.photos/id/1045/1600/900",
  "https://picsum.photos/id/1050/1600/900",
  "https://picsum.photos/id/1051/1600/900",
  "https://picsum.photos/id/1052/1600/900",
  "https://picsum.photos/id/1053/1600/900",
  "https://picsum.photos/id/1055/1600/900",
  "https://picsum.photos/id/1056/1600/900",
  "https://picsum.photos/id/1057/1600/900",
  "https://picsum.photos/id/1060/1600/900",
  "https://picsum.photos/id/1062/1600/900",
  "https://picsum.photos/id/1063/1600/900",
  "https://picsum.photos/id/1067/1600/900",
  "https://picsum.photos/id/1070/1600/900",
  "https://picsum.photos/id/1074/1600/900",
];

type OfferMediaInput = {
  slug: string;
  heroImageUrl?: string | null;
  mediaUrls?: string[] | null;
};

function isValidUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function isVideoUrl(value: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(value);
}

function isImageUrl(value: string) {
  return /\.(jpg|jpeg|png|webp|gif|avif|svg)(\?.*)?$/i.test(value);
}

function normalizeMediaUrls(mediaUrls?: string[] | null) {
  if (!mediaUrls) {
    return [];
  }

  return mediaUrls.map((item) => item.trim()).filter(isValidUrl);
}

function hashSlug(slug: string) {
  let hash = 0;
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash << 5) - hash + slug.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getPlaceholderHeroImage(slug: string) {
  const placeholderIndex = hashSlug(slug) % PLACEHOLDER_HERO_IMAGES.length;
  return PLACEHOLDER_HERO_IMAGES[placeholderIndex];
}

export function getPrimaryOfferImage(offer: OfferMediaInput) {
  const heroImage = offer.heroImageUrl?.trim();
  if (heroImage && isValidUrl(heroImage) && isImageUrl(heroImage)) {
    return heroImage;
  }

  const firstMediaImage = normalizeMediaUrls(offer.mediaUrls).find(isImageUrl);
  if (firstMediaImage) {
    return firstMediaImage;
  }

  return getPlaceholderHeroImage(offer.slug);
}

export function getOfferVideoUrls(offer: OfferMediaInput) {
  return normalizeMediaUrls(offer.mediaUrls).filter(isVideoUrl);
}
