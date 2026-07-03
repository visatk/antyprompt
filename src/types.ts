export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type CategoryId =
  | 'project-planning'
  | 'code-review'
  | 'performance'
  | 'security'
  | 'seo'
  | 'bug-fixing'
  | 'testing'
  | 'documentation'
  | 'refactoring'
  | 'devops'
  | 'subagents'
  | 'custom-agents'
  | 'permissions'
  | 'browser'
  | 'artifacts'
  | 'ui-ux'
  | 'config';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  difficulty: Difficulty;
  tags: string[];
  promptTemplate: string;
  useCase: string;
  expectedOutput: string;
  isPro: boolean;
  authorName?: string | null;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  emoji: string;
  description: string;
  gradient: string;
  count?: number; // Backend provided count
}

export interface FilterState {
  search: string;
  category: CategoryId | 'all';
  difficulty: Difficulty | 'all';
  sort: 'newest' | 'az' | 'za';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
