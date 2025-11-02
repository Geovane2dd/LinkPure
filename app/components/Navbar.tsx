"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;
            if (
                menuRef.current && 
                buttonRef.current &&
                navRef.current &&
                !menuRef.current.contains(target) &&
                !buttonRef.current.contains(target) &&
                !navRef.current.contains(target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobileMenuOpen]);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav 
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1a1a1a]"
                aria-label="Main navigation"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <Link 
                            href="/" 
                            className="text-lg sm:text-xl font-semibold text-white transition-opacity duration-200 hover:opacity-80 active:opacity-70 touch-manipulation"
                            onClick={closeMenu}
                        >
                            LinkPure
                        </Link>

                        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                            <a 
                                href="https://geovanedd.me" 
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1a1a1a] hover:bg-[#252525] border border-[#252525] hover:border-[#2a2a2a] rounded-lg transition-all duration-200 active:scale-[0.98] touch-manipulation"
                                style={{minHeight: '40px'}}
                            >
                                <span>Website</span>
                            </a>
                            <a 
                                href="https://github.com/geovane2dd/LinkPure" 
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1a1a1a] hover:bg-[#252525] border border-[#252525] hover:border-[#2a2a2a] rounded-lg transition-all duration-200 active:scale-[0.98] touch-manipulation"
                                style={{minHeight: '40px'}}
                            >
                                <FontAwesomeIcon icon={faGithub} className="text-base" style={{width: '1em', height: '1em'}} />
                                <span className="hidden lg:inline">GitHub</span>
                                <span className="lg:hidden">Git</span>
                            </a>
                        </div>

                        <button 
                            ref={buttonRef}
                            onClick={toggleMenu}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a1a1a] hover:bg-[#252525] active:bg-[#1a1a1a] border border-[#252525] transition-all duration-200 touch-manipulation"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                            style={{minWidth: '44px', minHeight: '44px'}}
                        >
                            <FontAwesomeIcon 
                                icon={isMobileMenuOpen ? faTimes : faBars}
                                className="text-lg text-gray-300 transition-transform duration-200"
                                style={{width: '1em', height: '1em'}}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            <div 
                ref={menuRef}
                className={`md:hidden fixed top-16 sm:top-20 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#1a1a1a] shadow-2xl transition-all duration-300 ease-out ${
                    isMobileMenuOpen 
                        ? "opacity-100 translate-y-0 visible" 
                        : "opacity-0 -translate-y-4 invisible"
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
            >
                <div className="container mx-auto px-4 sm:px-6 py-4 space-y-1">
                    <a 
                        href="https://geovanedd.me"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a] active:bg-[#252525] rounded-lg transition-all duration-200 touch-manipulation border border-transparent hover:border-[#252525]"
                        onClick={closeMenu}
                        style={{minHeight: '48px'}}
                    >
                        <span>Website</span>
                    </a>
                    <a 
                        href="https://github.com/geovane2dd/LinkPure"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a] active:bg-[#252525] rounded-lg transition-all duration-200 touch-manipulation border border-transparent hover:border-[#252525]"
                        onClick={closeMenu}
                        style={{minHeight: '48px'}}
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-lg" style={{width: '1em', height: '1em'}} />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </>
    );
}
