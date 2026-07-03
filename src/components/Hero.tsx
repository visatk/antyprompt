import { useEffect, useRef, useState } from 'react';
import { Search, Zap, FolderOpen, Gift } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface HeroProps {
  totalPrompts: number;
  totalCategories: number;
  searchValue: string;
  onSearchChange: (val: string) => void;
}

export default function Hero({ totalPrompts, totalCategories, searchValue, onSearchChange }: HeroProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Local state for immediate typing feedback
  const [localSearch, setLocalSearch] = useState(searchValue);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Sync debounced value up to parent
  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  // Sync external changes down to local state (e.g. clear filters)
  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const activeTag = document.activeElement?.tagName;
        const isInput = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (document.activeElement as HTMLElement)?.isContentEditable;
        if (!isInput) {
          e.preventDefault();
          searchRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Floating decorative orbs */}
      <div aria-hidden="true" className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-accent-purple/20 to-transparent blur-3xl float-animation pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-40 right-[5%] w-96 h-96 rounded-full bg-gradient-to-bl from-accent-cyan/15 to-transparent blur-3xl float-animation pointer-events-none"
        style={{ animationDelay: '2s' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-[30%] w-64 h-64 rounded-full bg-gradient-to-tr from-accent-pink/10 to-transparent blur-3xl float-animation pointer-events-none"
        style={{ animationDelay: '4s' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-purple/20 via-accent-cyan/10 to-accent-pink/20 border border-accent-purple/30 text-sm text-accent-purple-light mb-8">
          <span>✨</span>
          <span className="font-medium">Powered by Antigravity 2+</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
          <span className="text-gradient-premium">AI Prompt Library</span>
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold text-text-primary mb-6">
          for Elite Developers
        </p>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Curated collection of battle-tested AI prompts designed to supercharge your development workflow.
          Copy, customize, and ship faster.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3">
            <Zap className="w-5 h-5 text-accent-purple-light" />
            <div className="text-left">
              <div className="text-xl font-bold text-text-primary">{totalPrompts}+</div>
              <div className="text-xs text-text-muted">Prompts</div>
            </div>
          </div>
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3">
            <FolderOpen className="w-5 h-5 text-accent-cyan-light" />
            <div className="text-left">
              <div className="text-xl font-bold text-text-primary">{totalCategories}</div>
              <div className="text-xs text-text-muted">Categories</div>
            </div>
          </div>
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3">
            <Gift className="w-5 h-5 text-accent-green" />
            <div className="text-left">
              <div className="text-xl font-bold text-text-primary">Free</div>
              <div className="text-xs text-text-muted">& Open</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
          <input
            id="prompt-search"
            ref={searchRef}
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search prompts by title, tag, or keyword..."
            aria-label="Search prompts"
            className="w-full pl-14 pr-6 py-4 rounded-2xl glass text-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all"
          />
          <p className="mt-3 text-xs text-text-muted">
            Press <kbd className="px-1.5 py-0.5 rounded bg-bg-glass border border-border-subtle text-text-secondary font-mono text-[11px]">/</kbd> to focus
          </p>
        </div>
      </div>
    </section>
  );
}
