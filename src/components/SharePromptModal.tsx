import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import type { Category } from '../types';

interface SharePromptModalProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export default function SharePromptModal({ categories, isOpen, onClose, onSubmit }: SharePromptModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: categories[0]?.id || '',
    difficulty: 'intermediate',
    tags: '',
    promptTemplate: '',
    useCase: '',
    expectedOutput: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert comma separated tags to array
    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    await onSubmit({
      ...formData,
      tags: tagsArray.length > 0 ? tagsArray : ['community'],
    });
    
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-bg-glass-hover text-text-muted hover:text-text-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent-purple outline-none z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 id="share-modal-title" className="text-2xl font-bold text-text-primary mb-2">
            Share Your Prompt
          </h2>
          <p className="text-text-secondary mb-6">
            Contribute to the community by sharing your most effective AI prompts.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1">Title</label>
              <input
                id="title"
                required
                minLength={3}
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. React Performance Optimizer"
                className="w-full px-4 py-2.5 rounded-xl glass text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1">Description</label>
              <input
                id="description"
                required
                minLength={10}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="A brief explanation of what this prompt does."
                className="w-full px-4 py-2.5 rounded-xl glass text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-text-primary mb-1">Category</label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={e => setFormData({ ...formData, categoryId: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl glass text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple appearance-none"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id} className="bg-bg-primary">{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-text-primary mb-1">Difficulty</label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple appearance-none"
                >
                  <option value="beginner" className="bg-bg-primary">Beginner</option>
                  <option value="intermediate" className="bg-bg-primary">Intermediate</option>
                  <option value="advanced" className="bg-bg-primary">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="promptTemplate" className="block text-sm font-medium text-text-primary mb-1">Prompt Template</label>
              <textarea
                id="promptTemplate"
                required
                minLength={10}
                rows={5}
                value={formData.promptTemplate}
                onChange={e => setFormData({ ...formData, promptTemplate: e.target.value })}
                placeholder="Write your prompt here... use [BRACKETS] for variables."
                className="w-full px-4 py-2.5 rounded-xl glass text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple font-mono text-sm resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="useCase" className="block text-sm font-medium text-text-primary mb-1">When to use</label>
                <input
                  id="useCase"
                  required
                  minLength={5}
                  value={formData.useCase}
                  onChange={e => setFormData({ ...formData, useCase: e.target.value })}
                  placeholder="e.g. Before merging a PR"
                  className="w-full px-4 py-2.5 rounded-xl glass text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </div>
              <div>
                <label htmlFor="expectedOutput" className="block text-sm font-medium text-text-primary mb-1">Expected Output</label>
                <input
                  id="expectedOutput"
                  required
                  minLength={5}
                  value={formData.expectedOutput}
                  onChange={e => setFormData({ ...formData, expectedOutput: e.target.value })}
                  placeholder="e.g. A bulleted list of issues"
                  className="w-full px-4 py-2.5 rounded-xl glass text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-text-primary mb-1">Tags (comma separated)</label>
              <input
                id="tags"
                required
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                placeholder="react, typescript, performance"
                className="w-full px-4 py-2.5 rounded-xl glass text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-text-secondary hover:text-text-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent-purple outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent-cyan outline-none"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Share <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
