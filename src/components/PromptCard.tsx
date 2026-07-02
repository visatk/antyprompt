import { memo } from 'react';
import { Eye, Copy, Crown } from 'lucide-react';
import type { Prompt, Category } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  category: Category;
  onSelect: (prompt: Prompt) => void;
  onCopy: (text: string) => void;
  index: number;
}

const PromptCard = memo(function PromptCard({ prompt, category, onSelect, onCopy, index }: PromptCardProps) {
  return (
    <div
      className="glass-morph rounded-2xl p-5 flex flex-col gap-3 card-animate transition-all duration-300 hover:bg-bg-card-hover group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Top row: category + difficulty + pro */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-xs font-medium text-text-secondary">
            <span>{category.emoji}</span>
            {category.name}
          </span>
          <span className={`badge-${prompt.difficulty} px-2.5 py-1 rounded-full text-xs font-medium capitalize`}>
            {prompt.difficulty}
          </span>
        </div>
        {prompt.isPro && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/25 text-xs font-semibold">
            <Crown className="w-3 h-3" />
            PRO
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary leading-snug group-hover:text-accent-purple-light transition-colors">
        {prompt.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
        {prompt.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md glass text-xs text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-border-subtle">
        <button
          onClick={() => onSelect(prompt)}
          aria-label={`View details for ${prompt.title}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple"
        >
          <Eye className="w-4 h-4" />
          View Prompt
        </button>
        <button
          onClick={() => onCopy(prompt.promptTemplate)}
          className="p-2.5 rounded-lg glass hover:bg-bg-glass-hover transition-all duration-200 hover:scale-110 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple"
          title="Copy prompt template"
          aria-label="Copy prompt template"
        >
          <Copy className="w-4 h-4 text-text-secondary hover:text-text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
});

export default PromptCard;
