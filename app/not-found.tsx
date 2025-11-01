'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#e5e5e5]">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold text-white tracking-tight leading-none">
                404
              </h1>
              <div className="w-16 h-px bg-[#2a2a2a] mx-auto" aria-hidden="true"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                The page you're looking for may have been removed, renamed, or is temporarily unavailable.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
