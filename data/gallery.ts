export const gallerySectionCopy = {
  eyecatch: "VISUAL ARCHIVE",
  heading: "Gallery",
  subtitle: "Academics · Creations · Moments",
  backLabel: "Back to Home",
}

export const spanClasses: Record<string, string> = {
  square: "col-span-1 row-span-1",
  vertical: "col-span-1 row-span-2",
  horizontal: "col-span-2 row-span-1",
  large: "col-span-2 row-span-2",
}

// "large" is a manual curation choice (it can't be inferred from aspect
// ratio alone), but square/vertical/horizontal are derived from the
// photo's actual dimensions so authors don't have to pick a span by hand.
export function getGallerySpan(image: {
  width?: number
  height?: number
  span?: string
}): keyof typeof spanClasses {
  if (image.span === "large") return "large"
  if (image.width && image.height) {
    const ratio = image.width / image.height
    if (ratio > 1.2) return "horizontal"
    if (ratio < 0.83) return "vertical"
    return "square"
  }
  return "square"
}

export const galleryCategoryColors: Record<string, string> = {
  Academics: "#00D9FF",
  Creations: "#8B5CF6",
  Moments: "#FFD700",
}
