import { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import SearchFilter from './components/SearchFilter';
import PromptCard from './components/PromptCard';
import PromptModal from './components/PromptModal';
import SharePromptModal from './components/SharePromptModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { useAuth } from './contexts/AuthContext';
import { apiFetch } from './utils/api';
import type { Prompt, Category, CategoryId, FilterState, ToastMessage } from './types';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    difficulty: 'all',
    sort: 'newest',
  });
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { user } = useAuth();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, promptRes] = await Promise.all([
          apiFetch('/api/data/categories'),
          apiFetch('/api/data/prompts')
        ]);
        
        if (catRes.ok && promptRes.ok) {
          const catData = await catRes.json();
          const promptData = await promptRes.json();
          setCategories(catData);
          setPrompts(promptData);
        } else {
          addToast('error', 'Failed to load prompt library data.');
        }
      } catch (err) {
        addToast('error', 'Network error while loading data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      const isInput = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (document.activeElement as HTMLElement)?.isContentEditable;
      if (e.key === '/' && !isInput) {
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
  }, [categories, prompts]);

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
  }, [filters, prompts]);

  // Get category for a prompt
  const getCategoryForPrompt = useCallback((prompt: Prompt) => {
    return categories.find(c => c.id === prompt.category);
  }, [categories]);

  const handleShareClick = () => {
    if (!user) {
      addToast('info', 'Please sign in to share a prompt.');
      setIsAuthModalOpen(true);
      return;
    }
    setIsShareModalOpen(true);
  };

  const handleShareSubmit = async (data: any) => {
    try {
      const res = await apiFetch('/api/data/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        addToast('success', 'Prompt shared successfully! Reloading...');
        setIsShareModalOpen(false);
        // Refresh prompts
        const promptRes = await apiFetch('/api/data/prompts');
        if (promptRes.ok) {
          setPrompts(await promptRes.json());
        }
      } else {
        const err = await res.json();
        addToast('error', err.error || 'Failed to share prompt');
      }
    } catch (err) {
      addToast('error', 'Network error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06060a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary font-medium tracking-wide">Loading AI Library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#06060a]">
      {/* Animated background mesh */}
      <div className="bg-mesh" />

      {/* Content */}
      <div className="relative z-10">
        <Header onShareClick={handleShareClick} />

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
              <p className="text-text-secondary max-w-2xl mx-auto">
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
                <h3 className="text-xl font-semibold mb-2 text-text-primary">No prompts found</h3>
                <p className="text-text-secondary">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => setFilters({ search: '', category: 'all', difficulty: 'all', sort: 'newest' })}
                  className="mt-6 px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-medium hover:opacity-90 transition-opacity cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple"
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

      <SharePromptModal
        categories={categories}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSubmit={handleShareSubmit}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Toasts */}
      <Toast messages={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
