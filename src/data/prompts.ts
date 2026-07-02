import type { Category, Prompt } from '../types';

export const categories: Category[] = [
  {
    id: 'project-planning',
    name: 'Project Planning',
    icon: 'LayoutDashboard',
    emoji: '🎯',
    description: 'Architecture design, tech stack selection, sprint planning',
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    id: 'code-review',
    name: 'Code Review',
    icon: 'SearchCode',
    emoji: '🔍',
    description: 'Code quality, best practices, anti-pattern detection',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'Zap',
    emoji: '⚡',
    description: 'Optimization, profiling, lazy loading, caching',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'security',
    name: 'Security',
    icon: 'Shield',
    emoji: '🛡️',
    description: 'Vulnerability scanning, auth patterns, OWASP',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: 'TrendingUp',
    emoji: '📈',
    description: 'Meta tags, Core Web Vitals, structured data',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'bug-fixing',
    name: 'Bug Fixing',
    icon: 'Bug',
    emoji: '🐛',
    description: 'Debugging strategies, error analysis, root cause',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    icon: 'TestTube2',
    emoji: '🧪',
    description: 'Unit tests, integration tests, E2E, TDD',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'documentation',
    name: 'Documentation',
    icon: 'FileText',
    emoji: '📝',
    description: 'API docs, READMEs, JSDoc, changelogs',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'refactoring',
    name: 'Refactoring',
    icon: 'RefreshCw',
    emoji: '♻️',
    description: 'Clean code, SOLID, DRY, design patterns',
    gradient: 'from-pink-500 to-violet-500'
  },
  {
    id: 'devops',
    name: 'DevOps & CI/CD',
    icon: 'Rocket',
    emoji: '🚀',
    description: 'Docker, GitHub Actions, deployment pipelines',
    gradient: 'from-blue-500 to-indigo-500'
  }
];

export const prompts: Prompt[] = [
  // PROJECT PLANNING
  {
    id: 'pp-01',
    title: 'Full-Stack Architecture Design',
    description: 'Design a scalable architecture for a new web application.',
    category: 'project-planning',
    difficulty: 'advanced',
    tags: ['Architecture', 'System Design', 'Planning'],
    promptTemplate: `Act as a Principal Solutions Architect. I am planning to build a [APP_TYPE] application.

Please provide a comprehensive architecture design covering the following:
1. Technology Stack: Recommend frontend, backend, database, and infrastructure tools with justifications.
2. High-Level Architecture Diagram: Describe the components and how they interact.
3. Data Flow: Explain how data moves from the user interface to the database and back.
4. Scalability & Availability: Detail strategies for handling high traffic and ensuring uptime.
5. Security: Outline the primary security measures to implement.

Here are the specific requirements:
- Expected users: [USER_COUNT]
- Core features: [FEATURES]
- Constraints: [CONSTRAINTS]`,
    useCase: 'When starting a new project and needing a solid architectural foundation.',
    expectedOutput: 'A detailed architectural blueprint with tech stack recommendations and design patterns.',
    isPro: true
  },
  {
    id: 'pp-02',
    title: 'Sprint Task Breakdown',
    description: 'Break down an epic into actionable sprint tasks with estimations.',
    category: 'project-planning',
    difficulty: 'intermediate',
    tags: ['Agile', 'Scrum', 'Planning'],
    promptTemplate: `Act as a Technical Product Manager and Agile Coach.
I have the following Epic: "[EPIC_DESCRIPTION]"

Please break this epic down into actionable user stories and technical tasks suitable for a 2-week sprint.
For each task, provide:
- Task Title
- User Story / Description
- Acceptance Criteria
- Estimated Story Points (Fibonacci scale)
- Dependencies (if any)

Format the output as a clean markdown table.`,
    useCase: 'During sprint planning to convert high-level requirements into manageable tasks.',
    expectedOutput: 'A table of user stories with acceptance criteria and point estimates.',
    isPro: false
  },
  // CODE REVIEW
  {
    id: 'cr-01',
    title: 'Comprehensive Code Review',
    description: 'Perform a deep code review focusing on bugs, performance, and best practices.',
    category: 'code-review',
    difficulty: 'intermediate',
    tags: ['Code Review', 'Clean Code', 'Quality'],
    promptTemplate: `Act as a Senior Software Engineer. Please perform a comprehensive code review of the following [LANGUAGE] code.

Focus your review on:
1. Potential bugs or edge cases
2. Performance bottlenecks
3. Security vulnerabilities
4. Code readability and adherence to clean code principles (SOLID, DRY)
5. Type safety (if applicable)

For every issue found, provide:
- The line(s) of code
- Explanation of the issue
- A concrete code suggestion to fix it

Here is the code:
\`\`\`[LANGUAGE]
[INSERT_CODE_HERE]
\`\`\``,
    useCase: 'Before merging a pull request to ensure code quality.',
    expectedOutput: 'A structured list of issues with explanations and refactored code snippets.',
    isPro: false
  },
  {
    id: 'cr-02',
    title: 'Security-Focused Code Audit',
    description: 'Review code specifically for security vulnerabilities.',
    category: 'code-review',
    difficulty: 'advanced',
    tags: ['Security', 'Audit', 'OWASP'],
    promptTemplate: `Act as a Cybersecurity AppSec Expert. Review the following [LANGUAGE] code for security vulnerabilities.
Pay special attention to OWASP Top 10 vulnerabilities (e.g., SQL Injection, XSS, CSRF, Insecure Direct Object References).

Provide a threat model for this specific component and list any vulnerabilities found along with:
1. Risk Level (Low/Med/High/Critical)
2. Exploit scenario
3. Remediation code

Code to review:
\`\`\`[LANGUAGE]
[INSERT_CODE_HERE]
\`\`\``,
    useCase: 'When reviewing critical security code like authentication or payment processing.',
    expectedOutput: 'A vulnerability report with risk levels and patched code.',
    isPro: true
  },
  // PERFORMANCE
  {
    id: 'pf-01',
    title: 'React Rendering Optimization',
    description: 'Identify and fix unnecessary re-renders in a React component.',
    category: 'performance',
    difficulty: 'advanced',
    tags: ['React', 'Performance', 'Optimization'],
    promptTemplate: `Act as a React Performance Expert. Analyze the following React component and identify any performance issues, specifically focusing on unnecessary re-renders, expensive calculations, and memory leaks.

Suggest improvements using:
1. React.memo, useMemo, or useCallback
2. State colocation
3. Context optimization
4. Virtualization (if applicable)

Provide the fully optimized code.

Component code:
\`\`\`tsx
[INSERT_REACT_COMPONENT_HERE]
\`\`\``,
    useCase: 'When a React application feels sluggish or a specific component is re-rendering too often.',
    expectedOutput: 'Optimized React component code with explanations of the performance fixes.',
    isPro: true
  },
  {
    id: 'pf-02',
    title: 'Database Query Optimization',
    description: 'Optimize a slow SQL query for better execution time.',
    category: 'performance',
    difficulty: 'intermediate',
    tags: ['SQL', 'Database', 'Performance'],
    promptTemplate: `Act as a Database Administrator. I have a slow-running SQL query on a [DB_TYPE] database.

Here is the query:
\`\`\`sql
[INSERT_SQL_QUERY_HERE]
\`\`\`

Here is the schema for the relevant tables:
\`\`\`sql
[INSERT_SCHEMA_HERE]
\`\`\`

Please analyze the query and suggest:
1. A rewritten, optimized version of the query.
2. Any indexes that should be created to support this query.
3. An explanation of why the original query was slow (e.g., table scans, missing indexes).`,
    useCase: 'When dealing with slow API endpoints caused by inefficient database queries.',
    expectedOutput: 'Rewritten SQL query, suggested CREATE INDEX statements, and performance analysis.',
    isPro: false
  },
  // BUG FIXING
  {
    id: 'bf-01',
    title: 'Root Cause Analysis',
    description: 'Determine the root cause of an error trace and fix it.',
    category: 'bug-fixing',
    difficulty: 'intermediate',
    tags: ['Debugging', 'Errors', 'Fix'],
    promptTemplate: `Act as an expert Debugger. I am getting the following error in my [LANGUAGE/FRAMEWORK] application.

Error message / Stack trace:
\`\`\`
[INSERT_ERROR_TRACE]
\`\`\`

Here is the relevant code snippet where the error occurs:
\`\`\`[LANGUAGE]
[INSERT_CODE]
\`\`\`

Please provide:
1. A clear explanation of the root cause of this error.
2. The exact code changes needed to fix it.
3. Suggestions on how to prevent this class of error in the future.`,
    useCase: 'When encountering an obscure error message or crash.',
    expectedOutput: 'An explanation of the error and the corrected code.',
    isPro: false
  },
  // REFACTORING
  {
    id: 'rf-01',
    title: 'Legacy Code Modernization',
    description: 'Refactor old code to use modern language features and patterns.',
    category: 'refactoring',
    difficulty: 'intermediate',
    tags: ['Refactoring', 'Modernization', 'Clean Code'],
    promptTemplate: `Act as a Senior [LANGUAGE] Developer. I have a piece of legacy code that works, but is outdated and hard to maintain.

Please refactor this code to use modern [LANGUAGE] features and best practices.
Goals:
1. Improve readability
2. Use modern syntax (e.g., ES6+ for JavaScript, pattern matching for newer languages)
3. Reduce complexity
4. Add appropriate type hints/annotations if supported by the language

Legacy Code:
\`\`\`[LANGUAGE]
[INSERT_LEGACY_CODE]
\`\`\``,
    useCase: 'When updating old codebases to current standards without changing functionality.',
    expectedOutput: 'Modernized code that is easier to read and maintain.',
    isPro: false
  }
];
