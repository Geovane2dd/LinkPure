'use client';
import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faShoppingBag, faGlobe, faShoppingCart, faVideo, faExternalLinkAlt, faPuzzlePiece, faShieldAlt, faRocket } from '@fortawesome/free-solid-svg-icons';

interface ProcessedData {
  url: string;
  wasYoutubeRedirect: boolean;
  platform: 'aliexpress' | 'mercadolivre' | 'amazon' | 'shopee' | 'youtube' | 'banggood' | 'other';
  error?: string;
}

const supportedPlatforms = [
  {
    name: 'Amazon',
    description: 'Removes affiliate tags (tag parameter), referral codes, marketing campaign parameters, and other tracking identifiers from Amazon product links. Keep your Amazon links clean and privacy-safe when sharing products with friends.',
    icon: faShoppingBag,
  },
  {
    name: 'AliExpress',
    description: 'Cleans AliExpress links by removing tracking parameters, affiliate codes, and referral identifiers. Protect your privacy when shopping or sharing AliExpress products online.',
    icon: faGlobe,
  },
  {
    name: 'Mercado Livre',
    description: 'Removes affiliate parameters, tracking codes, and referral information from Mercado Livre product links. Share clean links without compromising your privacy or supporting unwanted affiliate tracking.',
    icon: faShoppingCart,
  },
  {
    name: 'Shopee',
    description: 'Removes affiliate and tracking parameters from Shopee product links. Clean your Shopee URLs to protect your privacy when sharing products or making purchases.',
    icon: faShoppingBag,
  },
  {
    name: 'Banggood',
    description: 'Removes tracking parameters, referral codes, and affiliate identifiers from Banggood links. Keep your Banggood shopping links private and clean.',
    icon: faShoppingBag,
  },
  {
    name: 'YouTube Redirects',
    description: 'Extracts original destination links from YouTube redirect URLs. Resolve YouTube redirects to find the actual destination URL, removing intermediate tracking steps.',
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
        <section 
          className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32"
          aria-label="LinkPure - Free Link Cleaner Tool"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <header className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white tracking-tight leading-none px-2">
                LinkPure
              </h1>
              <div className="w-12 sm:w-16 h-px bg-[#2a2a2a] mx-auto" aria-hidden="true"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto px-4">
                Remove <span className="text-white font-medium">tracking parameters</span> and <span className="text-white font-medium">affiliate links</span> from Amazon, AliExpress, Mercado Livre, Shopee, Banggood, and YouTube. Protect your privacy with our free, open-source link cleaning tool.
              </p>
            </header>

            <div className="max-w-3xl mx-auto mt-8 sm:mt-12 px-2">
              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 sm:p-6 md:p-8 hover:border-[#2a2a2a] hover:bg-[#121212] transition-all duration-300">
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Link cleaning form">
                  <div>
                    <label htmlFor="link-input" className="sr-only">
                      Enter URL to clean
                    </label>
                    <input
                      id="link-input"
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Paste your link with tracking parameters here..."
                      aria-label="Input field for link to clean"
                      aria-describedby="link-help"
                      className="w-full p-3 sm:p-4 bg-[#1a1a1a] border border-[#252525] rounded-lg text-sm sm:text-base text-white placeholder-gray-600 focus:ring-2 focus:ring-white/10 focus:border-[#2a2a2a] transition-all duration-200"
                      required
                    />
                    <p id="link-help" className="sr-only">
                      Enter a URL from Amazon, AliExpress, Mercado Livre, Shopee, Banggood, or YouTube to remove tracking parameters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-label={isLoading ? "Processing link" : "Clean tracking parameters from link"}
                    className="w-full py-3 px-5 text-center rounded-lg bg-white text-black text-base font-medium hover:bg-gray-100 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 touch-manipulation"
                    style={{minHeight: '44px'}}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faShieldAlt} className="text-base" style={{width: '1em', height: '1em'}} aria-hidden="true" />
                        <span>Clean Link</span>
                      </>
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
                    <div className="p-4 sm:p-6 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                      {wasYoutubeRedirect && (
                        <div className="mb-4 p-3 bg-[#1a1a1a] border border-[#252525] rounded-lg">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <FontAwesomeIcon icon={faCheck} className="text-base flex-shrink-0" style={{width: '1em', height: '1em'}} />
                            <span className="text-xs sm:text-sm font-medium">YouTube link processed successfully</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-400">Link cleaned</span>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={handleOpenUrl}
                            className="p-2.5 text-gray-600 hover:text-white transition-colors duration-200 rounded touch-manipulation"
                            title="Open in new tab"
                            aria-label="Open link in new tab"
                            style={{minWidth: '44px', minHeight: '44px'}}
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-base" style={{width: '1em', height: '1em'}} />
                          </button>
                          <button
                            onClick={handleCopy}
                            className="p-2.5 text-gray-600 hover:text-white transition-colors duration-200 rounded touch-manipulation"
                            title={copied ? "Copied" : "Copy link"}
                            aria-label={copied ? "Copied" : "Copy link"}
                            style={{minWidth: '44px', minHeight: '44px'}}
                          >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-base" style={{width: '1em', height: '1em'}} />
                          </button>
                        </div>
                      </div>
                      <div className="font-mono text-xs sm:text-sm break-all text-white bg-[#1a1a1a] p-3 sm:p-4 rounded-lg border border-[#252525] overflow-x-auto select-all">
                        {cleanUrl}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6" aria-hidden="true">
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent"></div>
          </div>
        </div>

        <section 
          className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20" 
          aria-label="Quick Guide"
        >
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 sm:mb-12 text-center px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 text-white tracking-tight">
                How to Remove Tracking Parameters
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                Follow these simple steps to clean your links and protect your privacy
              </p>
            </header>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
              <li className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white font-semibold text-base sm:text-lg">1</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Copy Link</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Copy the URL with tracking parameters from any supported platform like Amazon, AliExpress, or YouTube</p>
              </li>
              <li className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white font-semibold text-base sm:text-lg">2</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Paste & Clean</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Paste the link into the input field above and click "Clean Link" to automatically remove tracking parameters</p>
              </li>
              <li className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white font-semibold text-base sm:text-lg">3</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Get Clean URL</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Receive your cleaned link with all tracking parameters, UTM codes, and affiliate IDs removed</p>
              </li>
              <li className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white font-semibold text-base sm:text-lg">4</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Use Safely</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Copy or open the clean link knowing that it won't track your browsing behavior or share your data with third parties</p>
              </li>
            </ol>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6" aria-hidden="true">
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent"></div>
          </div>
        </div>

        <section 
          id="supported-platforms"
          className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32" 
          aria-label="Supported Platforms"
        >
          <div className="max-w-7xl mx-auto">
            <header className="mb-12 sm:mb-16 md:mb-20 text-center px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 text-white tracking-tight">
                Supported Platforms
              </h2>
              <div className="space-y-3 max-w-2xl mx-auto">
                <p className="text-gray-500 text-sm sm:text-base">
                  LinkPure removes tracking parameters and affiliate links from these popular e-commerce and video platforms. Each platform may use different tracking methods, but LinkPure handles them all automatically.
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  Learn more about <a href="#how-it-works" className="text-gray-400 hover:text-white underline">how LinkPure cleans links and protects your privacy</a>, or explore <a href="#supported-platforms" className="text-gray-400 hover:text-white underline">all supported platforms</a>.
                </p>
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8" role="list">
              {supportedPlatforms.map((platform, index) => (
                <article 
                  key={platform.name} 
                  className="group relative bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6 md:p-8 hover:border-[#2a2a2a] hover:bg-[#121212] transition-all duration-300"
                  role="listitem"
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="text-gray-500 text-xl sm:text-2xl group-hover:text-gray-400 transition-colors duration-300" aria-hidden="true">
                      <FontAwesomeIcon icon={platform.icon} className="text-[20px] sm:text-[24px]" style={{width: '1em', height: '1em'}} />
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-gray-100 transition-colors duration-200">
                      {platform.name}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-xs sm:text-sm group-hover:text-gray-400 transition-colors duration-200">
                      {platform.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6" aria-hidden="true">
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent"></div>
          </div>
        </div>

        <section 
          id="how-it-works"
          className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32" 
          aria-label="How LinkPure Works"
        >
          <div className="max-w-4xl mx-auto">
            <header className="mb-12 sm:mb-16 text-center px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 text-white tracking-tight">
                How It Works
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                Learn how LinkPure helps protect your privacy by cleaning links and removing tracking parameters
              </p>
            </header>
            <div className="space-y-6 sm:space-y-8">
              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">
                  What are tracking parameters?
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-400 leading-relaxed">
                    Tracking parameters are extra bits of information added to URLs that websites use to monitor your online behavior. These parameters can track where you came from, what you clicked, your browsing history, and more. While sometimes useful for analytics, they can also compromise your privacy.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Common tracking parameters include UTM codes (utm_source, utm_medium, utm_campaign), affiliate IDs, session identifiers, and other metadata that can reveal your browsing patterns to third parties. For example, an Amazon link might include parameters like <code className="text-gray-300 bg-[#1a1a1a] px-2 py-1 rounded text-xs">tag=affiliate-123</code> or <code className="text-gray-300 bg-[#1a1a1a] px-2 py-1 rounded text-xs">ref_=pd_sl</code> that identify where the click originated.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    When you share these links or visit them, companies can build detailed profiles about your interests, location, purchasing behavior, and browsing patterns. This data is often shared with third parties for advertising and analytics purposes.
                  </p>
                </div>
              </article>

              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">
                  Why clean your links?
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-400 leading-relaxed">
                    Cleaning links helps protect your privacy by removing tracking information before you visit a website. This prevents websites from building detailed profiles about your browsing habits, location, and interests. By using LinkPure, you maintain control over what information companies can collect about you.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Additionally, removing affiliate parameters ensures that you're not unintentionally supporting referral programs when sharing links with friends and family. When you share a clean link, you're sharing the product or content itself, not a tracking-enabled version that credits someone else for the referral.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Clean links are also shorter, easier to read, and less likely to break when copied and pasted. They work the same way as tracked links but without the privacy concerns or unwanted affiliate tracking.
                  </p>
                </div>
              </article>

              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">
                  Privacy-first approach
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-400 leading-relaxed">
                    LinkPure processes your links entirely in your browser when possible, meaning your URLs are never sent to our servers. This ensures complete privacy and security for your links. Even when server-side processing is required for certain platforms, we don't log, store, or analyze your URLs.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    As an open-source tool, you can verify exactly how LinkPure works by reviewing the source code on <a href="https://github.com/geovane2dd/LinkPure" target="_blank" rel="noopener noreferrer nofollow" className="text-white hover:underline">GitHub</a>. You can even host it yourself for complete control over your data. No tracking, no analytics, no data collection—just a simple tool that cleans your links.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    LinkPure follows privacy-by-design principles, meaning privacy is built into the tool from the ground up, not added as an afterthought. This approach ensures that your data remains yours, always.
                  </p>
                </div>
              </article>

              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">
                  How LinkPure cleans your links
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-400 leading-relaxed">
                    LinkPure uses sophisticated algorithms to identify and remove tracking parameters while preserving the essential parts of your URL. The tool recognizes patterns used by major e-commerce platforms and video services to track users.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    For Amazon links, LinkPure removes affiliate tags, referral codes, and marketing campaign parameters. For AliExpress, it strips out tracking cookies and referral information. YouTube redirects are resolved to their original destination. Each platform has its own specific tracking mechanisms, and LinkPure handles them all.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    The cleaning process is fast, automatic, and requires no technical knowledge. Simply paste your link and click clean—LinkPure does the rest. See our <a href="#supported-platforms" className="text-white hover:underline">list of supported platforms</a> to learn which services are compatible.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section 
          className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32" 
          aria-label="Why Choose LinkPure"
        >
          <div className="max-w-4xl mx-auto">
            <header className="mb-12 sm:mb-16 text-center px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 text-white tracking-tight">
                Why Choose LinkPure
              </h2>
              <div className="space-y-3 max-w-2xl mx-auto">
                <p className="text-gray-500 text-sm sm:text-base">
                  A free, open-source tool designed with privacy in mind. LinkPure offers a simple, effective solution for anyone who wants to protect their privacy online without compromising functionality.
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  Read our guide on <a href="#how-it-works" className="text-gray-400 hover:text-white underline">how LinkPure works to clean links and protect privacy</a>, or explore the <a href="#supported-platforms" className="text-gray-400 hover:text-white underline">complete list of supported platforms</a>.
                </p>
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                  Free and Open Source
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                  LinkPure is completely free to use and open source. Review the code, contribute, or host your own instance. No hidden costs or premium features.
                </p>
              </article>
              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                  Privacy Protected
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                  Your links are processed securely. No data is stored or logged, ensuring complete privacy. All processing happens in your browser when possible.
                </p>
              </article>
              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                  Fast and Reliable
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                  Process links instantly with our optimized tool. No delays, no waiting times. Get clean URLs in seconds.
                </p>
              </article>
              <article className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                  Multi-Platform Support
                </h3>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                  Works with Amazon, AliExpress, Mercado Livre, Shopee, Banggood, YouTube, and more. Each platform uses different tracking methods, and LinkPure handles them all. View our <a href="#supported-platforms" className="text-white hover:underline">complete list of supported platforms</a> to see which services are compatible.
                </p>
              </article>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6" aria-hidden="true">
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent"></div>
          </div>
        </div>

        <section 
          className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32" 
          aria-label="Browser Extension Coming Soon"
        >
          <div className="max-w-4xl mx-auto">
            <article className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 sm:p-6 md:p-8 lg:p-12">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faPuzzlePiece} className="text-[24px] sm:text-[32px] text-white" style={{width: '1em', height: '1em'}} aria-hidden="true" />
                </div>
                <div className="flex-grow">
                  <header className="mb-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3 text-white tracking-tight">
                      Browser Extension Coming Soon
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Clean links automatically while you browse
                    </p>
                  </header>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  We're working on a browser extension that will automatically clean tracking parameters from links as you browse. The extension will be available for Chrome, Firefox, and other Chromium-based browsers.
                </p>
                <div className="bg-[#1a1a1a] border border-[#252525] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faRocket} className="text-xl" style={{width: '1em', height: '1em'}} aria-hidden="true" />
                    Planned Features
                  </h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>Automatic link cleaning while browsing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>Right-click context menu integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>One-click cleaning from any page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>Support for all platforms currently supported on the web tool</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>Open source and privacy-focused, just like the web version</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Stay updated on our progress by following the project on <a href="https://github.com/geovane2dd/LinkPure" target="_blank" rel="noopener noreferrer nofollow" className="text-white hover:underline">GitHub</a>. The extension will be open source, just like the web version, allowing you to review the code and ensure your privacy is protected.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
