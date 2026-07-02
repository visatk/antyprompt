import { useState } from 'react';
import { Sparkles, Menu, X, Star } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Prompts', href: '#prompts' },
    { label: 'Categories', href: '#categories' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong rounded-none px-6 py-3">
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
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            <Star className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg glass hover:bg-bg-glass-hover transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-text-primary" />
          ) : (
            <Menu className="w-5 h-5 text-text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden mt-3 pt-3 border-t border-border-subtle flex flex-col gap-3 pb-2">
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
        </nav>
      )}
    </header>
  );
}
