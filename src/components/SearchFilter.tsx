import { memo } from 'react';
import type { FilterState, Difficulty } from '../types';

interface SearchFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

const difficulties: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const difficultyColors: Record<string, string> = {
  all: 'bg-accent-purple/20 text-accent-purple-light',
  beginner: 'bg-accent-green/20 text-accent-green',
  intermediate: 'bg-accent-yellow/20 text-accent-yellow',
  advanced: 'bg-accent-red/20 text-accent-red',
};

const SearchFilter = memo(function SearchFilter({ filters, onFilterChange, resultCount }: SearchFilterProps) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Difficulty pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {difficulties.map((d) => {
            const isActive = filters.difficulty === d.value;
            return (
              <button
                key={d.value}
                onClick={() => onFilterChange({ ...filters, difficulty: d.value })}
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple outline-none ${
                  isActive
                    ? difficultyColors[d.value]
                    : 'glass text-text-muted hover:text-text-secondary hover:bg-bg-glass-hover'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <label htmlFor="sort-select" className="sr-only">Sort by</label>
        <select
          id="sort-select"
          value={filters.sort}
          onChange={(e) => onFilterChange({ ...filters, sort: e.target.value as FilterState['sort'] })}
          aria-label="Sort prompts"
          className="ml-auto px-4 py-1.5 rounded-lg glass text-sm text-text-secondary bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-accent-purple/30 cursor-pointer appearance-none dropdown-glass hover:bg-bg-glass-hover transition-colors"
        >
          <option value="newest">Newest</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>

        {/* Result count */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg glass text-xs font-medium text-text-muted">
          {resultCount} prompt{resultCount !== 1 ? 's' : ''} found
        </span>
      </div>
    </div>
  );
});

export default SearchFilter;
