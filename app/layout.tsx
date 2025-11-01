import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

config.autoAddCss = false;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const siteUrl = 'https://linkpure.geovanedd.me';
const siteName = 'LinkPure';
const defaultTitle = 'LinkPure - Clean tracking from your links | Privacy first';
const defaultDescription = 'Free tool to remove tracking and affiliate parameters from Amazon, AliExpress, Mercado Livre, Shopee, Banggood, and YouTube links. Protect your online privacy with our open-source link cleaning tool.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`
  },
  description: defaultDescription,
  keywords: [
    'link cleaner',
    'remove tracking',
    'amazon',
    'aliexpress',
    'mercado livre',
    'shopee',
    'banggood',
    'youtube',
    'privacy',
    'remove affiliate links',
    'tracking parameters',
    'link optimization',
    'privacy tool',
    'open source',
    'self-hosted',
    'web tool',
    'URL cleaner',
    'affiliate link remover'
  ],
  authors: [
    { 
      name: 'GeovaneDD', 
      url: 'https://github.com/geovane2dd' 
    }
  ],
  creator: 'GeovaneDD',
  publisher: 'GeovaneDD',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
      'pt-BR': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    url: siteUrl,
    siteName: siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LinkPure - Clean tracking from your links',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.png`],
  },
  verification: {
    // Adicione suas verificações quando disponíveis
  },
  category: 'Web Tool',
  classification: 'Privacy Tool',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Person',
      name: 'GeovaneDD',
      url: 'https://github.com/geovane2dd'
    },
    codeRepository: 'https://github.com/geovane2dd/LinkPure',
    featureList: [
      'Remove tracking parameters from links',
      'Remove affiliate links',
      'Support for Amazon, AliExpress, Mercado Livre, Shopee, Banggood, YouTube',
      'Privacy-focused',
      'Open source'
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    publisher: {
      '@type': 'Person',
      name: 'GeovaneDD',
      url: 'https://github.com/geovane2dd'
    },
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#0a0a0a] text-[#e5e5e5] min-h-screen flex flex-col antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
