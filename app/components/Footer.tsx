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

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#e5e5e5] border-t border-[#1a1a1a]">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">LinkPure</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              A professional tool for link optimization and cleaning, removing tracking parameters and helping you protect your online privacy.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#how-it-works"
                  className="text-sm text-gray-500 hover:text-white transition-colors duration-200 inline-block"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#supported-platforms"
                  className="text-sm text-gray-500 hover:text-white transition-colors duration-200 inline-block"
                >
                  Supported Platforms
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/geovane2dd/LinkPure"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-sm text-gray-500 hover:text-white transition-colors duration-200 inline-block"
                >
                  Source Code
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/geovane2dd/LinkPure/issues"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-sm text-gray-500 hover:text-white transition-colors duration-200 inline-block"
                >
                  Report a Bug
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://geovanedd.me"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#1a1a1a] hover:bg-[#252525] border border-[#252525] hover:border-[#2a2a2a] rounded-lg transition-all duration-200"
                style={{minHeight: '44px'}}
              >
                <span>Website</span>
              </a>
              <a
                href="https://github.com/geovane2dd"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#1a1a1a] hover:bg-[#252525] border border-[#252525] hover:border-[#2a2a2a] rounded-lg transition-all duration-200"
                style={{minHeight: '44px'}}
              >
                <FontAwesomeIcon icon={faGithub} className="text-base" style={{width: '1em', height: '1em'}} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1a1a1a]">
          <div className="text-xs text-gray-600 text-center space-y-2">
            <p>
              &copy; {new Date().getFullYear()} LinkPure. Copyright (C) {new Date().getFullYear()} GeovaneDD
            </p>
            <p className="text-gray-500 leading-relaxed max-w-3xl mx-auto px-4">
              This program is free software: you can redistribute it and/or modify it under the terms of the{' '}
              <a
                href="https://www.gnu.org/licenses/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 underline"
              >
                GNU General Public License
              </a>
              {' '}as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
            </p>
            <p className="text-gray-500 leading-relaxed max-w-3xl mx-auto px-4">
              This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
            </p>
            <p className="text-gray-600 mt-4">
              Developed by{' '}
              <a
                href="https://geovanedd.me"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                GeovaneDD
              </a>
              {' · '}
              <a
                href="https://github.com/geovane2dd"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
