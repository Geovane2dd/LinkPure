'use client';
import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faShoppingBag, faGlobe, faShoppingCart, faVideo, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface ProcessedData {
  url: string;
  wasYoutubeRedirect: boolean;
  platform: 'aliexpress' | 'mercadolivre' | 'amazon' | 'shopee' | 'youtube' | 'banggood' | 'other';
  error?: string;
}

const supportedPlatforms = [
  {
    name: 'Amazon',
    description: 'Removes tracking and affiliate parameters from Amazon links',
    icon: faShoppingBag,
  },
  {
    name: 'AliExpress',
    description: 'Cleans AliExpress links by removing tracking parameters',
    icon: faGlobe,
  },
  {
    name: 'Mercado Livre',
    description: 'Removes affiliate parameters from Mercado Livre links',
    icon: faShoppingCart,
  },
  {
    name: 'Shopee',
    description: 'Removes affiliate and tracking parameters from Shopee links',
    icon: faShoppingBag,
  },
  {
    name: 'Banggood',
    description: 'Removes tracking parameters from Banggood links',
    icon: faShoppingBag,
  },
  {
    name: 'YouTube Redirects',
    description: 'Extracts original links from YouTube redirects',
    icon: faVideo,
  },
];

export default function Home() {
  const [inputUrl, setInputUrl] = useState('');
  const [cleanUrl, setCleanUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [wasYoutubeRedirect, setWasYoutubeRedirect] = useState(false);
  const [platform, setPlatform] = useState<'aliexpress' | 'mercadolivre' | 'amazon' | 'shopee' | 'youtube' | 'banggood' | 'other' | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setCleanUrl('');
    setWasYoutubeRedirect(false);
    setPlatform(null);

    try {
      const response = await fetch('/api/unaffiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data: ProcessedData = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process URL');
      }

      setCleanUrl(data.url);
      setWasYoutubeRedirect(data.wasYoutubeRedirect);
      setPlatform(data.platform);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleOpenUrl = () => {
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#e5e5e5]">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section 
          className="container mx-auto px-6 py-24 sm:py-32"
          aria-label="Introduction"
        >
          <div className="max-w-4xl mx-auto text-center space-y-12 animate-fadeIn">
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold text-white tracking-tight leading-none">
                LinkPure
              </h1>
              <div className="w-16 h-px bg-[#2a2a2a] mx-auto" aria-hidden="true"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                Clear <span className="text-white">tracking parameters</span> and <span className="text-white">affiliate links</span> from your favorite platforms.
              </p>
            </div>

            {/* Tool Section - Logo abaixo do texto */}
            <div className="max-w-3xl mx-auto mt-12">
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-8 hover:border-[#2a2a2a] hover:bg-[#121212] transition-all duration-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Paste the link you want to optimize..."
                      className="w-full p-4 bg-[#1a1a1a] border border-[#252525] rounded-lg text-sm text-white placeholder-gray-600 focus:ring-2 focus:ring-white/10 focus:border-[#2a2a2a] transition-all duration-200"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-5 text-center rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-100 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Clear link</span>
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {cleanUrl && (
                  <div ref={resultRef} className="mt-6 space-y-4">
                    <div className="p-6 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                      {wasYoutubeRedirect && (
                        <div className="mb-4 p-3 bg-[#1a1a1a] border border-[#252525] rounded-lg">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                            <span className="text-sm font-medium">YouTube link processed successfully</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-400">Link cleaned</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleOpenUrl}
                            className="p-2 text-gray-600 hover:text-white transition-colors duration-200 rounded"
                            title="Open in new tab"
                            aria-label="Open link in new tab"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCopy}
                            className="p-2 text-gray-600 hover:text-white transition-colors duration-200 rounded"
                            title={copied ? "Copied" : "Copy link"}
                            aria-label={copied ? "Copied" : "Copy link"}
                          >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="font-mono text-sm break-all text-white bg-[#1a1a1a] p-4 rounded-lg border border-[#252525]">
                        {cleanUrl}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container mx-auto px-6" aria-hidden="true">
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent"></div>
          </div>
        </div>

        {/* Supported Platforms Section */}
        <section 
          className="container mx-auto px-6 py-24 sm:py-32" 
          aria-label="Supported Platforms"
        >
          <div className="max-w-7xl mx-auto">
            <header className="mb-20 text-center">
              <h2 className="text-4xl sm:text-5xl font-semibold mb-4 text-white tracking-tight">
                Supported Platforms
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                Clean tracking parameters and affiliate links from these platforms
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
              {supportedPlatforms.map((platform, index) => (
                <article 
                  key={platform.name} 
                  className="group relative bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-8 hover:border-[#2a2a2a] hover:bg-[#121212] transition-all duration-300 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role="listitem"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-gray-500 text-2xl group-hover:text-gray-400 transition-colors duration-300" aria-hidden="true">
                      <FontAwesomeIcon icon={platform.icon} className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-gray-100 transition-colors duration-200">
                      {platform.name}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-[15px] group-hover:text-gray-400 transition-colors duration-200">
                      {platform.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
