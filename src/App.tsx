import { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { SearchFilter } from './components/SearchFilter';
import { PromptCard } from './components/PromptCard';
import { PromptModal } from './components/PromptModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { categories, prompts } from './data/prompts';
import type { Prompt, CategoryId, FilterState, ToastMessage } from './types';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    difficulty: 'all',
    sort: 'newest',
  });
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        document.getElementById('prompt-search')?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const addToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast('success', 'Prompt copied to clipboard!');
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      addToast('success', 'Prompt copied to clipboard!');
    }
  }, [addToast]);

  const handleSearchChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  }, []);

  const handleCategorySelect = useCallback((cat: CategoryId | 'all') => {
    setFilters(prev => ({ ...prev, category: cat }));
    // Scroll to prompts section
    setTimeout(() => {
      document.getElementById('prompts-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  // Compute prompt counts per category
  const promptCounts = useMemo(() => {
    const counts = {} as Record<CategoryId, number>;
    for (const cat of categories) {
      counts[cat.id] = prompts.filter(p => p.category === cat.id).length;
    }
    return counts;
  }, []);

  // Filter & sort prompts
  const filteredPrompts = useMemo(() => {
    let result = [...prompts];

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    // Difficulty filter
    if (filters.difficulty !== 'all') {
      result = result.filter(p => p.difficulty === filters.difficulty);
    }

    // Search filter
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (filters.sort) {
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // 'newest' — keep original order
        break;
    }

    return result;
  }, [filters]);

  // Get category for a prompt
  const getCategoryForPrompt = useCallback((prompt: Prompt) => {
    return categories.find(c => c.id === prompt.category);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Animated background mesh */}
      <div className="bg-mesh" />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main>
          {/* Hero Section */}
          <section id="home">
            <Hero
              totalPrompts={prompts.length}
              totalCategories={categories.length}
              searchValue={filters.search}
              onSearchChange={handleSearchChange}
            />
          </section>

          {/* Categories Section */}
          <section id="categories" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
            <CategoryGrid
              categories={categories}
              selectedCategory={filters.category}
              onSelectCategory={handleCategorySelect}
              promptCounts={promptCounts}
            />
          </section>

          {/* Prompts Section */}
          <section id="prompts-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="text-shimmer">All Prompts</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                Production-ready AI prompts designed for real-world development workflows
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <SearchFilter
                filters={filters}
                onFilterChange={setFilters}
                resultCount={filteredPrompts.length}
              />
            </div>

            {/* Prompt Grid */}
            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt, index) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    category={getCategoryForPrompt(prompt)!}
                    onSelect={setSelectedPrompt}
                    onCopy={handleCopy}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">No prompts found</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => setFilters({ search: '', category: 'all', difficulty: 'all', sort: 'newest' })}
                  className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] text-white font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>

      {/* Modal */}
      <PromptModal
        prompt={selectedPrompt}
        category={selectedPrompt ? getCategoryForPrompt(selectedPrompt) : undefined}
        onClose={() => setSelectedPrompt(null)}
        onCopy={handleCopy}
      />

      {/* Toasts */}
      <Toast messages={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
