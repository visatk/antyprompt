import { useEffect, useState, useRef } from 'react';
import { X, Copy, Check, Crown, Lightbulb, Target } from 'lucide-react';
import type { Prompt, Category } from '../types';

interface PromptModalProps {
  prompt: Prompt | null;
  category: Category | undefined;
  onClose: () => void;
  onCopy: (text: string) => void;
}

export default function PromptModal({ prompt, category, onClose, onCopy }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!prompt) return;
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Focus the first element on mount
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector('button') as HTMLElement;
      if (closeBtn) closeBtn.focus();
    }, 10);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [onClose, prompt]);

  if (!prompt) return null;

  const handleCopyTemplate = () => {
    onCopy(prompt.promptTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-strong rounded-2xl modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg glass hover:bg-bg-glass-hover transition-colors cursor-pointer z-10 focus-visible:ring-2 focus-visible:ring-accent-purple"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-text-secondary hover:text-text-primary transition-colors" />
        </button>

        <div className="p-8">
          {/* Header meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm font-medium text-text-secondary">
                <span>{category.emoji}</span>
                {category.name}
              </span>
            )}
            <span className={`badge-${prompt.difficulty} px-3 py-1.5 rounded-full text-sm font-medium capitalize`}>
              {prompt.difficulty}
            </span>
            {prompt.isPro && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/25 text-sm font-semibold">
                <Crown className="w-4 h-4" />
                PRO
              </span>
            )}
          </div>

          {/* Title */}
          <div className="mb-3">
            <h2 id="modal-title" className="text-2xl font-bold text-text-primary">
              {prompt.title}
            </h2>
            {prompt.authorName && (
              <p className="text-sm text-text-muted mt-1">Shared by {prompt.authorName}</p>
            )}
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-8">
            {prompt.description}
          </p>

          {/* Prompt Template */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
              Prompt Template
            </h3>
            <div className="relative group">
              <button
                onClick={handleCopyTemplate}
                className="absolute top-3 right-3 p-2 rounded-lg glass hover:bg-bg-glass-hover transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple"
                title="Copy template"
                aria-label="Copy prompt template text"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-accent-green copy-success" />
                ) : (
                  <Copy className="w-4 h-4 text-text-secondary hover:text-text-primary transition-colors" />
                )}
              </button>
              <pre className="bg-black/40 rounded-xl p-6 font-mono text-sm text-text-primary whitespace-pre-wrap leading-relaxed overflow-x-auto border border-border-subtle hover:border-border-glow transition-colors">
                {prompt.promptTemplate}
              </pre>
            </div>
          </div>

          {/* Use Case */}
          <div className="mb-8">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
              <Lightbulb className="w-4 h-4 text-accent-yellow" />
              Use Case
            </h3>
            <p className="text-text-secondary leading-relaxed pl-6 border-l-2 border-accent-purple/30">
              {prompt.useCase}
            </p>
          </div>

          {/* Expected Output */}
          <div className="mb-8">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
              <Target className="w-4 h-4 text-accent-cyan" />
              Expected Output
            </h3>
            <p className="text-text-secondary leading-relaxed pl-6 border-l-2 border-accent-cyan/30">
              {prompt.expectedOutput}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg glass text-xs text-text-muted font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
