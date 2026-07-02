import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-6">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-purple to-transparent mb-16" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left: branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-purple-light" />
              <span className="text-xl font-bold text-shimmer">PromptForge</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-md">
              A curated collection of premium AI prompts designed to accelerate your development workflow.
              Free, open, and continuously updated.
            </p>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-accent-purple-light">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green pulse-dot" />
              Built for Antigravity 2+
            </span>
          </div>

          {/* Right: links */}
          <div className="md:text-right">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Resources
            </h4>
            <nav className="flex flex-col gap-2.5">
              <a href="#home" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Home
              </a>
              <a href="#categories" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Browse Categories
              </a>
              <a href="#prompts" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                All Prompts
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                GitHub Repository
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Contributing Guide
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="h-px bg-border-subtle mb-6" />
        <p className="text-center text-xs text-text-muted">
          © 2026 PromptForge. Crafted with care for the developer community.
        </p>
      </div>
    </footer>
  );
}
