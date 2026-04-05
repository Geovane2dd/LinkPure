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

"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, Close, GitHub } from '@mui/icons-material';

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
                className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1a1a1a] shadow-lg"
                aria-label="Main navigation"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <Link
                            href="/"
                            className="text-xl sm:text-2xl font-bold text-white transition-opacity duration-200 hover:opacity-80 active:opacity-70 touch-manipulation"
                            onClick={closeMenu}
                        >
                            LinkPure
                        </Link>

                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="https://geovanedd.me"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="btn-secondary text-sm"
                            >
                                <span>Website</span>
                            </a>
                            <a
                                href="https://github.com/geovane2dd/LinkPure"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="flex items-center gap-2 btn-secondary text-sm"
                            >
                                <GitHub className="text-base" />
                                <span className="hidden lg:inline">GitHub</span>
                                <span className="lg:hidden">Git</span>
                            </a>
                        </div>

                        <button
                            ref={buttonRef}
                            onClick={toggleMenu}
                            className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-[#1a1a1a] hover:bg-[#252525] active:bg-[#1a1a1a] border border-[#252525] transition-all duration-200 touch-manipulation"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <Close className="text-xl text-gray-300 transition-transform duration-200" />
                            ) : (
                                <Menu className="text-xl text-gray-300 transition-transform duration-200" />
                            )}
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
                <div className="container mx-auto px-4 sm:px-6 py-6 space-y-2">
                    <a 
                        href="https://geovanedd.me"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center gap-3 px-4 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a] active:bg-[#252525] rounded-xl transition-all duration-200 touch-manipulation border border-transparent hover:border-[#252525]"
                        onClick={closeMenu}
                    >
                        <span>Website</span>
                    </a>
                    <a 
                        href="https://github.com/geovane2dd/LinkPure"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center gap-3 px-4 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a] active:bg-[#252525] rounded-xl transition-all duration-200 touch-manipulation border border-transparent hover:border-[#252525]"
                        onClick={closeMenu}
                    >
                        <GitHub className="text-lg" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </>
    );
}
