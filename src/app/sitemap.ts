import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://suggestion.pe";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas principales
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portafolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Páginas de servicios
  const servicios = [
    "marketing-digital",
    "marketing-redes-sociales",
    "publicidad-digital",
    "seo-posicionamiento",
    "branding-diseno",
    "desarrollo-web",
    "consultoria-marketing",
    "crm-automatizacion",
    "produccion-audiovisual",
    "investigacion-mercado",
    "merchandising",
    "imprenta-corporativa",
    "estructuras-publicitarias",
    "publicidad-movil",
    "btl-activaciones",
    "material-pop",
  ];

  const servicePages: MetadataRoute.Sitemap = servicios.map((slug) => ({
    url: `${SITE_URL}/servicios/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...mainPages, ...servicePages];
}
