import { memo } from 'react';
import type { Category, CategoryId } from '../types';

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  promptCounts: Record<CategoryId, number>;
}

const CategoryGrid = memo(function CategoryGrid({ categories, selectedCategory, onSelectCategory, promptCounts }: CategoryGridProps) {
  const totalCount = Object.values(promptCounts).reduce((sum, c) => sum + c, 0);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-text-primary mb-3">Browse by Category</h2>
          <p className="text-text-secondary">Find the perfect prompt for your development needs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* All button */}
          <button
            onClick={() => onSelectCategory('all')}
            aria-pressed={selectedCategory === 'all'}
            aria-label="View all categories"
            className={`glass-morph glow-hover rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.03] cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple outline-none ${
              selectedCategory === 'all'
                ? 'ring-2 ring-accent-purple ring-offset-2 ring-offset-[#06060a] bg-bg-card-hover'
                : ''
            }`}
          >
            <div className="text-2xl mb-2">🔮</div>
            <div className="text-sm font-semibold text-text-primary mb-1">All</div>
            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-purple/15 text-accent-purple-light text-xs font-medium">
              {totalCount}
            </div>
          </button>

          {/* Category cards */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              aria-label={`Filter by ${cat.name} category`}
              className={`glass-morph glow-hover rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.03] cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple outline-none ${
                selectedCategory === cat.id
                  ? 'ring-2 ring-accent-purple ring-offset-2 ring-offset-[#06060a] bg-bg-card-hover'
                  : ''
              }`}
            >
              <div className="text-2xl mb-2">{cat.emoji}</div>
              <div className="text-sm font-semibold text-text-primary mb-1">{cat.name}</div>
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-purple/15 text-accent-purple-light text-xs font-medium">
                {promptCounts[cat.id] ?? 0}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default CategoryGrid;
