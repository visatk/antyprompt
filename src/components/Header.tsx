import { useState, useRef } from 'react';
import { Sparkles, Menu, X, Star, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useClickOutside } from '../hooks/useClickOutside';
import AuthModal from './AuthModal';

interface HeaderProps {
  onShareClick: () => void;
}

export default function Header({ onShareClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => {
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  });

  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Prompts', href: '#prompts' },
    { label: 'Categories', href: '#categories' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-strong rounded-none px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-accent-purple-light group-hover:text-accent-cyan-light transition-colors" />
            <span className="text-xl font-bold text-shimmer">PromptForge</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent-purple after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onShareClick}
              className="gradient-border flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-medium text-text-primary hover:text-accent-cyan-light transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-accent-purple" />
              Share Prompt
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-border flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <Star className="w-4 h-4" />
              Star on GitHub
            </a>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full glass hover:bg-bg-glass-hover transition-colors border border-accent-purple/30 focus-visible:ring-2 focus-visible:ring-accent-purple outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-text-primary">{user.name.split(' ')[0]}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl overflow-hidden shadow-xl border border-border-subtle py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-border-subtle mb-2">
                      <p className="text-sm font-medium text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors flex items-center gap-2">
                      <UserIcon className="w-4 h-4" /> Profile
                    </button>
                    <button 
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-accent-red hover:bg-accent-red/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {!user && (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-medium"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg glass hover:bg-bg-glass-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent-purple outline-none"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-border-subtle flex flex-col gap-3 pb-2">
            {user && (
              <div className="px-2 pb-3 mb-2 border-b border-border-subtle flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-muted truncate">{user.email}</p>
                  </div>
              </div>
            )}
            
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-bg-glass-hover"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <Star className="w-4 h-4" />
              Star on GitHub
            </a>

            <button
              onClick={() => {
                setMobileOpen(false);
                onShareClick();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm font-medium text-accent-cyan hover:bg-bg-glass-hover transition-colors text-left"
            >
              <Sparkles className="w-4 h-4" />
              Share Prompt
            </button>

            {user && (
              <button 
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 mt-2 rounded-lg glass border-accent-red/20 text-sm font-medium text-accent-red hover:bg-accent-red/10 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            )}
          </nav>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
