"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && 
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed w-full transition-all duration-300 z-50 ${
            scrolled 
                ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1a1a1a]' 
                : 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a1a1a]/50'
        }`}>
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    <Link 
                        href="/" 
                        className="text-xl font-semibold text-white transition-opacity duration-200 hover:opacity-80"
                    >
                        LinkPure
                    </Link>

                    <div className="hidden md:flex items-center space-x-10">
                        <a 
                            href="https://github.com/geovane2dd/LinkPure" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1a1a1a] hover:bg-[#252525] border border-[#252525] hover:border-[#2a2a2a] rounded-lg transition-all duration-200"
                        >
                            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <button 
                        ref={buttonRef}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#252525] transition-all duration-200"
                        aria-label="Toggle menu"
                    >
                        <FontAwesomeIcon 
                            icon={isMobileMenuOpen ? faTimes : faBars}
                            className="w-4 h-4 text-gray-400"
                        />
                    </button>
                </div>

                <div 
                    ref={menuRef}
                    className={`md:hidden fixed left-0 right-0 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#1a1a1a] transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen 
                            ? "opacity-100 translate-y-0" 
                            : "opacity-0 -translate-y-full pointer-events-none"
                    }`}
                >
                    <div className="container mx-auto px-6 py-6 space-y-2">
                        <a 
                            href="https://github.com/geovane2dd/LinkPure"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
