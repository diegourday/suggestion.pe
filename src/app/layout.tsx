import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandsSection from "@/components/sections/BrandsSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://suggestion.pe";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Suggestion | Agencia de Marketing Digital en Perú",
    template: "%s | Suggestion - Agencia de Marketing Digital",
  },
  description:
    "Agencia de marketing digital en Perú. Transformamos tu presencia online en resultados reales: SEO, redes sociales, publicidad digital, branding y desarrollo web. ¡Cotiza gratis!",
  keywords: [
    "agencia de marketing digital",
    "agencia de marketing digital Perú",
    "marketing digital",
    "SEO Perú",
    "redes sociales",
    "publicidad digital",
    "branding",
    "desarrollo web",
    "Google Ads",
    "Meta Ads",
    "community manager",
    "diseño web",
  ],
  authors: [{ name: "Suggestion", url: SITE_URL }],
  creator: "Suggestion",
  publisher: "Suggestion",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Suggestion | Agencia de Marketing Digital en Perú",
    description:
      "Transformamos tu presencia online en resultados reales. SEO, redes sociales, publicidad digital, branding y más.",
    url: SITE_URL,
    siteName: "Suggestion",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suggestion | Agencia de Marketing Digital en Perú",
    description:
      "Transformamos tu presencia online en resultados reales. SEO, redes sociales, publicidad digital, branding y más.",
    creator: "@suggestion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* JSON-LD: Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Suggestion",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.ico`,
              description:
                "Agencia de marketing digital en Perú. SEO, redes sociales, publicidad digital, branding y desarrollo web.",
              sameAs: [
                // Añadir URLs reales de redes sociales
                // "https://www.facebook.com/suggestion",
                // "https://www.instagram.com/suggestion",
                // "https://www.linkedin.com/company/suggestion",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["Spanish"],
              },
              areaServed: {
                "@type": "Country",
                name: "Peru",
              },
            }),
          }}
        />
        {/* JSON-LD: WebSite Schema (habilita Sitelinks Search Box en Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Suggestion",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <BrandsSection />
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
