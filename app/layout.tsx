/*
 * LinkPure - A modern tool to clean tracking parameters from links
 * Copyright (C) 2024 GeovaneDD
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
  display: "block",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "block",
  preload: true,
});

const siteUrl = 'https://linkpure.geovanedd.me';
const siteName = 'LinkPure';
const defaultTitle = 'LinkPure - Remove Tracking Parameters from Links | Free Privacy Tool';
const defaultDescription = 'Remove tracking parameters and affiliate links from Amazon, AliExpress, Mercado Livre, Shopee, Banggood, and YouTube. Free, open-source tool to clean URLs and protect your privacy online. No data collection, no tracking.';

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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is LinkPure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LinkPure is a free, open-source tool that removes tracking parameters and affiliate links from URLs. It helps protect your privacy by cleaning links from platforms like Amazon, AliExpress, Mercado Livre, Shopee, Banggood, and YouTube before you visit them.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does LinkPure work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LinkPure processes your links by removing tracking parameters (like UTM codes), affiliate IDs, and other metadata from URLs. Simply paste your link into the tool, click "Clear link", and get a clean URL without tracking information.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is LinkPure free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, LinkPure is completely free and open source. You can use it without any restrictions, review the source code, or even host your own instance.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does LinkPure store my links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, LinkPure does not store or log your links. When possible, links are processed entirely in your browser for complete privacy. Your data stays private.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which platforms does LinkPure support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LinkPure supports Amazon, AliExpress, Mercado Livre, Shopee, Banggood, YouTube redirects, and many other platforms with tracking parameters.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are tracking parameters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tracking parameters are extra bits of information added to URLs that websites use to monitor your online behavior. They can track where you came from, what you clicked, your browsing history, and more. Common examples include UTM codes (utm_source, utm_medium, utm_campaign) and affiliate IDs.'
        }
      }
    ]
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Clean Links with LinkPure',
    description: 'Step-by-step guide to remove tracking parameters from links using LinkPure',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy the link you want to clean',
        text: 'Copy the URL that contains tracking parameters or affiliate links from platforms like Amazon, AliExpress, Mercado Livre, Shopee, Banggood, or YouTube.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste the link into LinkPure',
        text: 'Paste the copied link into the input field on the LinkPure homepage.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Click "Clear link"',
        text: 'Click the "Clear link" button to process and clean your URL.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Copy or open the clean link',
        text: 'Once processed, copy the clean link to your clipboard or open it directly in a new tab. The cleaned link will have all tracking parameters and affiliate IDs removed.',
      }
    ]
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
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#0a0a0a] text-[#e5e5e5] min-h-screen flex flex-col antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
