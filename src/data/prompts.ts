import type { Category, Prompt } from '../types';

export const categories: Category[] = [
  {
    id: 'subagents',
    name: 'Subagent Orchestration',
    icon: 'Network',
    emoji: '🤖',
    description: 'Ultra Plan teamwork, built-in research agents, and hierarchical delegation.',
    gradient: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'custom-agents',
    name: 'Custom Subagent Engineering',
    icon: 'Cpu',
    emoji: '⚙️',
    description: 'Dynamic definition, toolset scoping, and custom prompt injection.',
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'permissions',
    name: 'Permissions & Security',
    icon: 'ShieldAlert',
    emoji: '🔐',
    description: 'Permission bubbling, sandboxing, and Git worktree isolation.',
    gradient: 'from-red-600 to-rose-500'
  },
  {
    id: 'browser',
    name: 'Browser Automation',
    icon: 'Globe',
    emoji: '🌐',
    description: 'Sandboxed UI testing, web scraping, and E2E validation.',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'artifacts',
    name: 'Planning & Artifacts',
    icon: 'FileCode2',
    emoji: '📝',
    description: 'Implementation plans, interactive checklists, and rich markdown.',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'code-review',
    name: 'Code Review & Auditing',
    icon: 'SearchCode',
    emoji: '🔍',
    description: 'Context-aware PR reviews and vulnerability scanning.',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'performance',
    name: 'Performance Optimization',
    icon: 'Zap',
    emoji: '⚡',
    description: 'Flame graphs, bundle analysis, and execution loop tuning.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'security',
    name: 'Backend Security',
    icon: 'Lock',
    emoji: '🛡️',
    description: 'Cloudflare Workers, Hono APIs, and JWT Edge authentication.',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'ui-ux',
    name: 'UI/UX & Design',
    icon: 'Palette',
    emoji: '🎨',
    description: 'Tailwind v4 glassmorphism, micro-interactions, and visual polishing.',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'config',
    name: 'Agent Customization',
    icon: 'Wrench',
    emoji: '🛠️',
    description: 'Settings, custom skills, and system prompt engineering.',
    gradient: 'from-slate-600 to-gray-500'
  }
];

export const prompts: Prompt[] = [
  // ─── 1. Subagent Orchestration ───
  {
    id: 'sa-01',
    title: 'Initialize Ultra Teamwork',
    description: 'Deploy the exclusive /teamwork-preview command for massive architectural tasks.',
    category: 'subagents',
    difficulty: 'advanced',
    tags: ['Ultra Plan', 'Multi-Agent', 'Orchestration'],
    promptTemplate: `Using the /teamwork-preview slash command, deploy a highly collaborative multi-agent framework to solve the following architectural challenge:
[CHALLENGE_DESCRIPTION]

Ensure the framework utilizes its built-in error recovery and automatic retry mechanics. I will provide the high-level goal, and I expect the agent team to manage the cooperative overhead and report back only upon completion or catastrophic failure.`,
    useCase: 'When tackling an extremely complex task that requires multiple specialized agents working concurrently.',
    expectedOutput: 'A coordinated execution trace of multiple agents resolving the challenge autonomously.',
    isPro: true
  },
  {
    id: 'sa-02',
    title: 'Deploy Research Subagent',
    description: 'Invoke the built-in research subagent for isolated codebase exploration.',
    category: 'subagents',
    difficulty: 'beginner',
    tags: ['Research', 'Navigation', 'Exploration'],
    promptTemplate: `Please invoke the built-in 'research' subagent to explore the following repository/directory: [DIRECTORY_PATH].

The research subagent should specifically look for:
1. Architectural patterns used
2. Undocumented dependencies
3. Potential performance bottlenecks in the data layer

Have the subagent return a summarized markdown report to you without polluting our main context.`,
    useCase: 'When you need to understand a massive new codebase without cluttering the main conversation history.',
    expectedOutput: 'A clean, synthesized summary artifact provided by the research subagent.',
    isPro: false
  },
  {
    id: 'sa-03',
    title: 'Clone Self for Parallel Execution',
    description: 'Deploy the `self` subagent to execute identical tasks in parallel.',
    category: 'subagents',
    difficulty: 'intermediate',
    tags: ['Parallel', 'Self Clone', 'Efficiency'],
    promptTemplate: `I have a massive batch processing task. Please invoke the 'self' subagent to spawn an identical clone of yourself.
Assign the clone to handle the processing of [DATASET_B], while you process [DATASET_A].
Ensure you both share the exact same system prompt and toolsets, and merge your final results into a single artifact when complete.`,
    useCase: 'When you need to parallelize identical workloads across identical agent configurations.',
    expectedOutput: 'Two parallel execution streams merging into one consolidated result.',
    isPro: false
  },
  {
    id: 'sa-04',
    title: 'Hierarchical Delegation Setup',
    description: 'Configure a multi-level delegation hierarchy (up to 10 levels deep).',
    category: 'subagents',
    difficulty: 'advanced',
    tags: ['Hierarchy', 'Delegation', 'Management'],
    promptTemplate: `Design a hierarchical delegation strategy for the following epic: [EPIC_DESCRIPTION]
Please deploy a primary 'manager' subagent. Instruct this manager to recursively spawn up to 3 layers of worker subagents (remaining well below the 10-level nesting depth limit) to handle specific sub-tasks.
Ensure the manager monitors resource exhaustion and bubbles up any critical blockers to our main conversation.`,
    useCase: 'When simulating a corporate engineering team structure for massive epic completion.',
    expectedOutput: 'A deeply nested tree of subagents systematically checking off components of an epic.',
    isPro: true
  },
  {
    id: 'sa-05',
    title: 'Subagent Error Recovery Loop',
    description: 'Instruct an orchestrating agent to implement robust retry logic for failing subagents.',
    category: 'subagents',
    difficulty: 'intermediate',
    tags: ['Error Handling', 'Recovery', 'Resilience'],
    promptTemplate: `Please spawn a custom subagent to execute [HIGH_RISK_TASK]. 
If the subagent fails or returns an error, do not immediately fail the main process. Instead, analyze the failure reason, refine the prompt or toolset, and re-invoke a fresh subagent.
Repeat this error recovery loop up to 3 times before bubbling the failure up to me.`,
    useCase: 'When delegating highly volatile tasks like unstable API integrations or flaky tests.',
    expectedOutput: 'A resilient execution log showing failure, dynamic adjustment, and successful retry.',
    isPro: false
  },

  // ─── 2. Custom Subagent Engineering ───
  {
    id: 'csa-01',
    title: 'Define Read-Only Analyst',
    description: 'Create a custom subagent strictly limited to read-only toolsets.',
    category: 'custom-agents',
    difficulty: 'intermediate',
    tags: ['Definition', 'Read-Only', 'Security'],
    promptTemplate: `Using the define_subagent tool, create a new custom subagent named 'SecurityAnalyst'.
System Prompt: "You are a read-only security auditor. You must only read files and analyze code for vulnerabilities. You cannot modify the system."
Configuration: Equip this subagent ONLY with read-only tools. Disable all write capabilities and terminal command access.
Once defined, invoke it to scan the [TARGET_DIRECTORY] for exposed secrets.`,
    useCase: 'When you need an agent to perform analysis without risking accidental system modification.',
    expectedOutput: 'A securely sandboxed agent performing a deep audit without mutation capabilities.',
    isPro: false
  },
  {
    id: 'csa-02',
    title: 'Define Build Engineer Agent',
    description: 'Create a subagent with specific terminal and write toolsets.',
    category: 'custom-agents',
    difficulty: 'advanced',
    tags: ['Definition', 'Write-Access', 'CI/CD'],
    promptTemplate: `Use define_subagent to create a custom subagent named 'BuildEngineer'.
System Prompt: "You are a DevOps engineer responsible for compiling code and fixing build errors. You will iteratively run the build command, analyze the output, and modify source files to fix compilation issues."
Configuration: Equip this subagent with write capabilities and terminal command execution.
Invoke it to resolve the current failing build in the [PROJECT_ROOT].`,
    useCase: 'When delegating the tedious loop of compiling, reading errors, and patching syntax.',
    expectedOutput: 'An automated agent that continuously patches and builds until successful compilation.',
    isPro: true
  },
  {
    id: 'csa-03',
    title: 'Inject Dynamic Persona',
    description: 'Dynamically define a subagent with a highly specialized domain persona.',
    category: 'custom-agents',
    difficulty: 'beginner',
    tags: ['Persona', 'Prompt Injection', 'Specialization'],
    promptTemplate: `Define a custom subagent named 'DBAGuru'.
Inject this system prompt: "You are a Principal Database Administrator with 20 years of Postgres experience. You only communicate in raw, highly optimized SQL queries and execution plan analyses."
Invoke it and ask it to optimize the slow query found in [FILE_PATH].`,
    useCase: 'When you need deep, specialized expertise in a very narrow domain.',
    expectedOutput: 'A highly focused response containing only optimized SQL and expert analysis.',
    isPro: false
  },
  {
    id: 'csa-04',
    title: 'Define Subagent Delegator',
    description: 'Create a subagent that is uniquely permitted to spawn its own subagents.',
    category: 'custom-agents',
    difficulty: 'advanced',
    tags: ['Delegation', 'Recursive', 'Architecture'],
    promptTemplate: `Use define_subagent to create a 'ScrumMaster' agent.
Configuration: You MUST enable subagent delegation capabilities for this specific agent.
Instruct the ScrumMaster to analyze [PROJECT_REQUIREMENTS], define 3 unique custom worker subagents (Frontend, Backend, QA) based on those requirements, and orchestrate their work.`,
    useCase: 'When bootstrapping an entire autonomous software development team.',
    expectedOutput: 'An orchestrator agent that successfully provisions and manages its own team.',
    isPro: true
  },
  {
    id: 'csa-05',
    title: 'Persistent Lifecycle Subagent',
    description: 'Define a subagent meant to be invoked repeatedly throughout a session.',
    category: 'custom-agents',
    difficulty: 'intermediate',
    tags: ['Lifecycle', 'Persistence', 'Linting'],
    promptTemplate: `Define a custom subagent named 'LinterBot' equipped with read/write tools and a system prompt focused strictly on fixing ESLint and Prettier violations.
Do not invoke it yet. 
Whenever I instruct you to "Clean up my code" later in this conversation, you should repeatedly invoke this pre-defined 'LinterBot' without needing to redefine it.`,
    useCase: 'When establishing persistent helper bots that you can call upon multiple times in one chat.',
    expectedOutput: 'A saved custom subagent configuration ready for on-demand invocation.',
    isPro: false
  },

  // ─── 3. Permissions & Security ───
  {
    id: 'ps-01',
    title: 'Isolated Git Worktree Setup',
    description: 'Deploy a subagent into an isolated workspace using Git worktrees.',
    category: 'permissions',
    difficulty: 'advanced',
    tags: ['Isolation', 'Git', 'Workspace'],
    promptTemplate: `I need a subagent to prototype a highly experimental feature without affecting my current working tree.
Invoke a subagent and configure its Workspace Access to operate on a newly created, isolated Git worktree for the branch [EXPERIMENTAL_BRANCH].
As the parent agent, ensure you monitor its workspace and review the diff before merging.`,
    useCase: 'When experimenting with risky architectural changes that shouldn\'t pollute the main branch.',
    expectedOutput: 'An agent safely building in a quarantined worktree environment.',
    isPro: true
  },
  {
    id: 'ps-02',
    title: 'Inherited Scope Verification',
    description: 'Verify that a subagent strictly inherits the parent\'s directory read/write scopes.',
    category: 'permissions',
    difficulty: 'intermediate',
    tags: ['Scope', 'Inheritance', 'Security'],
    promptTemplate: `I am currently restricting your file access to only the './src/frontend' directory.
Spawn a 'FullStack' subagent and instruct it to attempt writing a file to './src/backend'.
Report back on how the Inherited Scopes prevent the subagent from bypassing the safety configurations I established for you.`,
    useCase: 'When testing the security boundaries and permission inheritance of your agent ecosystem.',
    expectedOutput: 'A validation report proving the subagent was blocked by inherited scope limits.',
    isPro: false
  },
  {
    id: 'ps-03',
    title: 'Permission Bubbling Flow',
    description: 'Trigger a scenario that forces a subagent to bubble a permission request to the user.',
    category: 'permissions',
    difficulty: 'intermediate',
    tags: ['Bubbling', 'UI', 'Approval'],
    promptTemplate: `Spawn a custom subagent and instruct it to execute the terminal command 'npm publish --access public'.
Since this is a destructive/high-risk command, rely on the Permission Bubbling feature. Explain to me how the subagent will pause, bubble the request up to the subagent panel UI, and wait for my explicit confirmation before proceeding.`,
    useCase: 'When executing high-risk deployment commands through autonomous agents.',
    expectedOutput: 'A paused subagent awaiting manual user approval in the UI.',
    isPro: false
  },
  {
    id: 'ps-04',
    title: 'Strict Command Prefixing',
    description: 'Define allowed terminal command prefixes for secure execution.',
    category: 'permissions',
    difficulty: 'beginner',
    tags: ['Commands', 'Prefixes', 'Terminal'],
    promptTemplate: `Please configure your permission requests to only ask for the 'npm run test' and 'git status' command prefixes.
Once approved, spawn a subagent and instruct it to continuously run tests and report status. Ensure it cannot run arbitrary scripts.`,
    useCase: 'When locking down agent terminal access to only safe, non-destructive CLI tools.',
    expectedOutput: 'An agent securely constrained to specific, harmless CLI prefixes.',
    isPro: false
  },
  {
    id: 'ps-05',
    title: 'Audit Agent Safety Configs',
    description: 'Review the current safety boundaries and inherited configurations.',
    category: 'permissions',
    difficulty: 'beginner',
    tags: ['Audit', 'Safety', 'Review'],
    promptTemplate: `Please audit your current safety configurations.
List out all allowed terminal command prefixes, your exact file read/write directory scopes, and confirm how these will be passed down to any subagents you define via Configuration Inheritance.`,
    useCase: 'When onboarding onto a new project and verifying what the agent is allowed to touch.',
    expectedOutput: 'A detailed markdown artifact listing all active permission scopes.',
    isPro: false
  },

  // ─── 4. Browser & UI Automation ───
  {
    id: 'ba-01',
    title: 'Invoke /browser Slash Command',
    description: 'Deploy the dedicated browser agent for interactive web tasks.',
    category: 'browser',
    difficulty: 'intermediate',
    tags: ['Browser', 'UI', 'Interactive'],
    promptTemplate: `Using the /browser slash command, invoke the sandboxed web browser agent.
Instruct it to navigate to [STAGING_URL], complete the multi-step user registration flow using mock data, and verify that the "Welcome Dashboard" is successfully rendered.`,
    useCase: 'When needing autonomous end-to-end testing of a complex web interface.',
    expectedOutput: 'A successful registration flow executed entirely within the sandboxed browser.',
    isPro: false
  },
  {
    id: 'ba-02',
    title: 'Visual Regression Testing',
    description: 'Use the browser agent to capture and compare UI screenshots.',
    category: 'browser',
    difficulty: 'advanced',
    tags: ['Visual', 'Testing', 'Screenshots'],
    promptTemplate: `Deploy the browser subagent to [LOCAL_DEV_URL].
Navigate through the top 3 pages of the application. For each page, evaluate the CSS rendering, ensure there are no overflowing text elements, and capture the layout state to verify our recent Tailwind v4 refactoring didn't cause visual regressions.`,
    useCase: 'When performing visual QA after a massive CSS architecture change.',
    expectedOutput: 'A report detailing any visual anomalies found during the automated browse.',
    isPro: true
  },
  {
    id: 'ba-03',
    title: 'Scrape Dynamic SPA Content',
    description: 'Extract data from a heavily JavaScript-rendered Single Page Application.',
    category: 'browser',
    difficulty: 'intermediate',
    tags: ['Scraping', 'SPA', 'Data'],
    promptTemplate: `The standard read_url_content tool cannot parse the dynamic Angular SPA at [TARGET_URL].
Invoke the browser subagent. Have it navigate to the URL, wait for the JS framework to mount the DOM and render the text, extract the primary documentation content, and save it to a markdown file in our scratch directory.`,
    useCase: 'When extracting information from modern web apps that block static curl/fetch requests.',
    expectedOutput: 'A cleanly extracted markdown file containing the dynamic content.',
    isPro: false
  },
  {
    id: 'ba-04',
    title: 'E2E OAuth Flow Verification',
    description: 'Test a complex third-party OAuth login flow via the browser agent.',
    category: 'browser',
    difficulty: 'advanced',
    tags: ['OAuth', 'Authentication', 'E2E'],
    promptTemplate: `Invoke the /browser agent to test our new Google OAuth integration.
Have it click "Sign in with Google", navigate through the consent screen sandbox, and verify that it correctly redirects back to our application with a valid session cookie.
Bubble up any network or cross-origin errors encountered during the redirect.`,
    useCase: 'When automating the testing of complex authentication handshakes.',
    expectedOutput: 'A verified OAuth flow or a detailed trace of where the redirect failed.',
    isPro: true
  },
  {
    id: 'ba-05',
    title: 'Lighthouse Performance Audit',
    description: 'Run performance profiling via the browser agent.',
    category: 'browser',
    difficulty: 'beginner',
    tags: ['Performance', 'Lighthouse', 'Audit'],
    promptTemplate: `Deploy the browser agent to load [PRODUCTION_URL].
Analyze the network waterfall, identify any render-blocking resources, and evaluate the Core Web Vitals (LCP, FID, CLS) based on the browser's rendering performance. Suggest optimizations.`,
    useCase: 'When diagnosing poor front-end performance in a live environment.',
    expectedOutput: 'A performance report with actionable network and rendering optimizations.',
    isPro: false
  },

  // ─── 5. Planning & Artifacts ───
  {
    id: 'pa-01',
    title: 'Rigorous Implementation Plan',
    description: 'Force the agent into Planning Mode to generate a detailed architectural plan.',
    category: 'artifacts',
    difficulty: 'intermediate',
    tags: ['Planning', 'Architecture', 'Artifacts'],
    promptTemplate: `I want to implement a complex real-time WebSocket infrastructure.
Do not write any code yet. Enter Planning Mode and generate a highly detailed 'implementation_plan.md' artifact.
Ensure you set 'request_feedback = true' so I can approve the architecture, data models, and fallback polling strategies before you begin execution.`,
    useCase: 'When starting a massive feature and needing to enforce a "measure twice, cut once" workflow.',
    expectedOutput: 'A paused state awaiting user approval on a beautiful markdown plan.',
    isPro: false
  },
  {
    id: 'pa-02',
    title: 'Interactive Task Checklist',
    description: 'Generate a living `task.md` artifact to track multi-step progress.',
    category: 'artifacts',
    difficulty: 'beginner',
    tags: ['Checklist', 'Tasks', 'Tracking'],
    promptTemplate: `Based on our approved implementation plan, generate a 'task.md' artifact.
Break down the architecture into component-level items using the custom '[/]' in-progress notation.
As you execute the code changes, continuously update this artifact so I can track your progress in real-time.`,
    useCase: 'When monitoring an agent executing a long-running, multi-file refactoring job.',
    expectedOutput: 'A dynamic checklist that updates automatically as the agent works.',
    isPro: false
  },
  {
    id: 'pa-03',
    title: 'Rich Markdown Audio Rendering',
    description: 'Utilize the new audio file rendering capabilities in artifacts.',
    category: 'artifacts',
    difficulty: 'intermediate',
    tags: ['Audio', 'Media', 'Markdown'],
    promptTemplate: `Create an artifact named 'accessibility_audit.md'.
Document the screen reader compliance of our application, and explicitly use the new audio rendering support to embed the generated text-to-speech audio files (.mp3 or .wav) directly into the markdown using the absolute path syntax: ![Audio Sample](/absolute/path/to/audio.mp3).`,
    useCase: 'When documenting accessibility features, podcasts, or music generation features.',
    expectedOutput: 'An artifact containing playable audio files embedded within the text.',
    isPro: false
  },
  {
    id: 'pa-04',
    title: 'Visual Walkthrough Generation',
    description: 'Generate a comprehensive `walkthrough.md` after task completion.',
    category: 'artifacts',
    difficulty: 'beginner',
    tags: ['Walkthrough', 'Summary', 'Visuals'],
    promptTemplate: `Now that you have completed the UI overhaul, generate a 'walkthrough.md' artifact.
Summarize the exact CSS architectural changes made, what components were tested, and use the 'carousel' markdown syntax to embed screenshots showcasing the "Before" and "After" states of the UI.`,
    useCase: 'When presenting completed work to a stakeholder or user for final review.',
    expectedOutput: 'A visually rich presentation document utilizing carousels and images.',
    isPro: false
  },
  {
    id: 'pa-05',
    title: 'Artifact Git Diff Visualization',
    description: 'Embed clean code diffs within an artifact for easy reviewing.',
    category: 'artifacts',
    difficulty: 'beginner',
    tags: ['Diffs', 'Code', 'Review'],
    promptTemplate: `Before you commit these changes, create a 'review_diff.md' artifact.
Use standard diff code blocks (prefixing lines with + and -) to cleanly visualize the critical changes you are proposing for the authentication middleware. Highlight the security improvements using GitHub-style warning alerts.`,
    useCase: 'When reviewing sensitive code changes without needing to switch to an IDE diff view.',
    expectedOutput: 'An easy-to-read markdown artifact showing exact code additions and deletions.',
    isPro: false
  },

  // ─── 6. Code Review & Auditing ───
  {
    id: 'cra-01',
    title: 'Massive Monorepo Audit',
    description: 'Perform a comprehensive code review across multiple packages.',
    category: 'code-review',
    difficulty: 'advanced',
    tags: ['Monorepo', 'Audit', 'Review'],
    promptTemplate: `Deploy the 'research' subagent to scan our entire turborepo monorepo.
Cross-reference the 'packages/ui' library against its usage in 'apps/web' and 'apps/docs'.
Identify any deprecated component usage, prop type mismatches, or missing exports, and compile a massive code review artifact detailing all necessary migrations.`,
    useCase: 'When upgrading core design systems across a large monorepo.',
    expectedOutput: 'A cross-referenced audit report detailing dependency issues across packages.',
    isPro: true
  },
  {
    id: 'cra-02',
    category: 'code-review',
    difficulty: 'advanced',
    title: 'OWASP Top 10 Vulnerability Scan',
    description: 'Deeply scan the backend for common security flaws.',
    tags: ['Security', 'OWASP', 'Vulnerabilities'],
    promptTemplate: `Act as a Cybersecurity Expert. Scan the './src/backend' directory for OWASP Top 10 vulnerabilities.
Focus specifically on SQL Injection (ensure all Drizzle queries use parameterized inputs), XSS, and broken access control in the Hono API routes.
Provide remediation code for any vulnerabilities discovered.`,
    useCase: 'When auditing a backend before a production launch.',
    expectedOutput: 'A security report with risk levels and patched code snippets.',
    isPro: true
  },
  {
    id: 'cra-03',
    title: 'Clean Code & SOLID Refactor',
    description: 'Review code for architectural cleanliness and SOLID principles.',
    category: 'code-review',
    difficulty: 'intermediate',
    tags: ['SOLID', 'Clean Code', 'Architecture'],
    promptTemplate: `Review the 'UserService' class in [FILE_PATH].
Analyze it strictly against SOLID principles (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
If it violates any of these, rewrite the class to properly decouple the logic and inject dependencies.`,
    useCase: 'When a class has grown too large and requires architectural decoupling.',
    expectedOutput: 'A refactored, highly modular class structure.',
    isPro: false
  },
  {
    id: 'cra-04',
    title: 'React Hooks Anti-Pattern Detect',
    description: 'Find and fix common React hooks mistakes like missing dependencies.',
    category: 'code-review',
    difficulty: 'intermediate',
    tags: ['React', 'Hooks', 'Anti-Patterns'],
    promptTemplate: `Scan the React components in [DIRECTORY].
Look for common hook anti-patterns: missing exhaustive-deps in useEffect, deeply nested objects causing infinite re-renders, and misuse of useMemo/useCallback.
Provide inline patches to correct the dependency arrays and stabilize reference equality.`,
    useCase: 'When fixing mysterious infinite loops or stale closures in React.',
    expectedOutput: 'Patched React components with correct hook dependency management.',
    isPro: false
  },
  {
    id: 'cra-05',
    title: 'Automated PR Description',
    description: 'Generate a beautiful, comprehensive Pull Request description.',
    category: 'code-review',
    difficulty: 'beginner',
    tags: ['PR', 'Documentation', 'Git'],
    promptTemplate: `Analyze all the files currently modified in the working tree (git diff).
Generate a professional Pull Request description formatted in markdown. Include a summary of the "Why" and "What", list out the breaking changes, and provide a checklist for QA testers.`,
    useCase: 'When preparing to merge a large feature branch and needing a detailed summary.',
    expectedOutput: 'A perfectly formatted markdown PR template filled with context.',
    isPro: false
  },

  // ─── 7. Performance Optimization ───
  {
    id: 'po-01',
    title: 'Flame Graph Analysis',
    description: 'Analyze performance bottlenecks using execution traces.',
    category: 'performance',
    difficulty: 'advanced',
    tags: ['Flame Graph', 'Profiling', 'Bottlenecks'],
    promptTemplate: `I have provided a CPU profile / flame graph output in [FILE_PATH].
Analyze the execution stack and identify the exact functions causing the highest thread-blocking time. 
Suggest algorithmic improvements or Web Worker offloading strategies to unblock the main thread.`,
    useCase: 'When a web app is dropping frames or feeling unresponsive under load.',
    expectedOutput: 'Identified bottleneck functions and optimized algorithmic replacements.',
    isPro: true
  },
  {
    id: 'po-02',
    title: 'Bundle Size Reduction',
    description: 'Optimize Vite/Webpack builds to reduce JavaScript payload.',
    category: 'performance',
    difficulty: 'intermediate',
    tags: ['Bundle', 'Vite', 'Tree-Shaking'],
    promptTemplate: `Analyze my 'package.json' and 'vite.config.ts'.
Identify heavy dependencies (e.g., lodash, moment) and suggest modern, tree-shakeable alternatives (e.g., lodash-es, date-fns).
Provide the exact configuration needed to implement route-level code splitting using React.lazy and Suspense.`,
    useCase: 'When Initial Page Load metrics (LCP) are suffering due to massive JS bundles.',
    expectedOutput: 'Updated configuration and refactored imports for massive payload reduction.',
    isPro: false
  },
  {
    id: 'po-03',
    title: 'D1 Database Query Tuning',
    description: 'Optimize SQLite/D1 queries for maximum edge performance.',
    category: 'performance',
    difficulty: 'advanced',
    tags: ['D1', 'SQLite', 'Database'],
    promptTemplate: `Analyze the following Drizzle ORM query targeting a Cloudflare D1 database: [QUERY_CODE].
Determine why it is scanning the entire table. Write the exact 'CREATE INDEX' SQL statement needed to optimize this lookup, and rewrite the Drizzle query to utilize efficient join patterns rather than N+1 fetching.`,
    useCase: 'When edge API routes are timing out due to inefficient database lookups.',
    expectedOutput: 'Optimized schema indexes and refactored ORM queries.',
    isPro: true
  },
  {
    id: 'po-04',
    title: 'React Render Profiling',
    description: 'Eliminate wasted renders in complex React trees.',
    category: 'performance',
    difficulty: 'intermediate',
    tags: ['React', 'Renders', 'Memoization'],
    promptTemplate: `The complex data grid component in [FILE_PATH] is lagging when users type in the search bar.
Refactor the component to implement state colocation, extract the expensive grid into a 'React.memo' wrapper, and implement search debouncing using a custom hook.`,
    useCase: 'When fixing input lag and jittery UI updates in heavy React apps.',
    expectedOutput: 'A highly optimized, memoized React component.',
    isPro: false
  },
  {
    id: 'po-05',
    title: 'Asset Caching Strategy',
    description: 'Implement robust Service Worker and Cache-Control headers.',
    category: 'performance',
    difficulty: 'intermediate',
    tags: ['Caching', 'Service Worker', 'Headers'],
    promptTemplate: `Design a comprehensive caching strategy for our Cloudflare Worker backend.
Provide the code to configure appropriate 'Cache-Control' headers for static assets (1 year immutable) and implement a stale-while-revalidate pattern for dynamic API endpoints using the Cache API.`,
    useCase: 'When trying to achieve perfect Lighthouse scores and offline capabilities.',
    expectedOutput: 'Worker routing code with advanced cache manipulation.',
    isPro: false
  },

  // ─── 8. Backend Security ───
  {
    id: 'bs-01',
    title: 'Secure JWT Edge Authentication',
    description: 'Implement secure, HTTP-only JWT auth on Cloudflare Workers.',
    category: 'security',
    difficulty: 'advanced',
    tags: ['JWT', 'Hono', 'Edge'],
    promptTemplate: `Design a complete Authentication API using Hono running on Cloudflare Workers.
Implement /login and /signup routes. Use the Web Crypto API (crypto.subtle) to securely hash passwords with a salt.
Generate a JWT and store it securely in an HTTP-only, Secure, SameSite=Strict cookie. Do not leak the token to the JavaScript runtime.`,
    useCase: 'When building a highly secure, native authentication system without third parties.',
    expectedOutput: 'A fully functional Hono authentication router.',
    isPro: true
  },
  {
    id: 'bs-02',
    title: 'Zod Payload Validation',
    description: 'Enforce strict schema validation on all incoming API requests.',
    category: 'security',
    difficulty: 'beginner',
    tags: ['Zod', 'Validation', 'Hono'],
    promptTemplate: `Using '@hono/zod-validator', write a secure API route for updating a user profile.
Create a Zod schema that enforces: string lengths, valid email formats, and strips out any unexpected or malicious properties (SQL injection attempts) before passing the data to the database layer.`,
    useCase: 'When securing API endpoints against malformed or malicious client data.',
    expectedOutput: 'A typed, strictly validated API endpoint.',
    isPro: false
  },
  {
    id: 'bs-03',
    title: 'CORS & CSRF Protection',
    description: 'Configure impenetrable CORS headers and CSRF tokens.',
    category: 'security',
    difficulty: 'intermediate',
    tags: ['CORS', 'CSRF', 'Middleware'],
    promptTemplate: `Configure the global middleware for our Hono application.
Set up strict CORS headers allowing only our specific frontend domain. Implement a Double Submit Cookie pattern or custom header requirement to entirely eliminate the risk of Cross-Site Request Forgery (CSRF) attacks on our mutation endpoints.`,
    useCase: 'When deploying an API to production and preventing cross-origin exploits.',
    expectedOutput: 'Global security middleware configurations for the backend.',
    isPro: false
  },
  {
    id: 'bs-04',
    title: 'Rate Limiting at the Edge',
    description: 'Implement abuse protection using Cloudflare tools.',
    category: 'security',
    difficulty: 'advanced',
    tags: ['Rate Limit', 'Cloudflare', 'Protection'],
    promptTemplate: `Write a middleware for our Cloudflare Worker that implements IP-based rate limiting.
Utilize a Cloudflare KV namespace to track request counts. Limit users to 100 requests per minute, and return a 429 Too Many Requests response with an appropriate 'Retry-After' header if they exceed the quota.`,
    useCase: 'When protecting an expensive AI endpoint from DDOS or excessive billing abuse.',
    expectedOutput: 'A robust rate-limiting middleware using Edge KV.',
    isPro: true
  },
  {
    id: 'bs-05',
    title: 'Secrets & Environment Variables',
    description: 'Securely manage credentials in the Antigravity ecosystem.',
    category: 'security',
    difficulty: 'beginner',
    tags: ['Secrets', 'Env', 'Configuration'],
    promptTemplate: `Explain how to securely manage API keys and database credentials in this project.
Provide the command to inject secrets into the Cloudflare Worker environment using Wrangler, and update the TypeScript 'Env' type binding so we have strict type safety when accessing 'env.STRIPE_SECRET_KEY'.`,
    useCase: 'When setting up third-party integrations that require sensitive API keys.',
    expectedOutput: 'Safe configuration instructions and TypeScript definitions.',
    isPro: false
  },

  // ─── 9. UI/UX & Design ───
  {
    id: 'ui-01',
    title: 'Tailwind v4 Utility Migration',
    description: 'Upgrade custom CSS classes to native Tailwind v4 `@utility` directives.',
    category: 'ui-ux',
    difficulty: 'advanced',
    tags: ['Tailwind v4', 'CSS', 'Refactoring'],
    promptTemplate: `Review my 'index.css' file containing legacy custom classes (e.g., .btn-primary, .card-hover).
Refactor the entire file to use Tailwind CSS v4's new '@utility' and '@custom-variant' syntax. Ensure all custom utilities seamlessly support Tailwind's state modifiers (like hover:, md:, dark:).`,
    useCase: 'When modernizing a codebase to leverage the absolute latest Tailwind engine.',
    expectedOutput: 'A state-of-the-art CSS file utilizing native Tailwind v4 directives.',
    isPro: true
  },
  {
    id: 'ui-02',
    title: 'Premium Glassmorphism Component',
    description: 'Design a highly complex, performant glassmorphic UI card.',
    category: 'ui-ux',
    difficulty: 'intermediate',
    tags: ['Glassmorphism', 'UI', 'Premium'],
    promptTemplate: `Create a React component for a 'Pricing Card'.
Utilize premium glassmorphism aesthetics: backdrop-blur, subtle inner white borders, radial gradient backgrounds, and an animated 1px glowing border using CSS mask-composite. Ensure it looks world-class and breathtaking.`,
    useCase: 'When the design requires a massive "Wow" factor and premium feel.',
    expectedOutput: 'A stunning React component with advanced CSS rendering techniques.',
    isPro: false
  },
  {
    id: 'ui-03',
    title: 'Accessible Micro-Animations',
    description: 'Implement delightful, accessible UI transitions.',
    category: 'ui-ux',
    difficulty: 'intermediate',
    tags: ['Animations', 'A11y', 'Framer Motion'],
    promptTemplate: `Enhance the provided navigation menu using Framer Motion (or pure CSS).
Add staggered entrance animations for the menu items and a smooth layout transition for the active indicator.
Crucially, wrap all animations in a 'prefers-reduced-motion' check to ensure strict accessibility compliance.`,
    useCase: 'When adding polish to an app without violating accessibility standards.',
    expectedOutput: 'Smooth, delightful animations that respect user OS settings.',
    isPro: false
  },
  {
    id: 'ui-04',
    title: 'Responsive Grid Architecture',
    description: 'Build complex, responsive layouts using CSS Grid and Subgrid.',
    category: 'ui-ux',
    difficulty: 'beginner',
    tags: ['Grid', 'Layout', 'Responsive'],
    promptTemplate: `Build a highly responsive 'Dashboard' layout using Tailwind CSS.
It should feature a sticky sidebar on desktop that transforms into a bottom tab bar on mobile. The main content area should utilize CSS Grid (with auto-fit minmax) to perfectly tile a series of metric cards across any screen size.`,
    useCase: 'When constructing the foundational skeleton of a complex web app.',
    expectedOutput: 'A perfectly responsive layout template.',
    isPro: false
  },
  {
    id: 'ui-05',
    title: 'Dark Mode Color Palette Generation',
    description: 'Generate harmonious HSL color tokens for light/dark themes.',
    category: 'ui-ux',
    difficulty: 'intermediate',
    tags: ['Colors', 'Dark Mode', 'Design Systems'],
    promptTemplate: `Act as an expert UI/UX Designer.
Generate a comprehensive set of CSS variables for a modern web app that supports both Light and Dark modes.
Use HSL values. Provide a primary brand color (electric indigo), neutral grays, and semantic colors (success, error, warning). Ensure the contrast ratios meet WCAG AA standards.`,
    useCase: 'When establishing the foundational design system and theme for a new brand.',
    expectedOutput: 'A complete `:root` and `.dark` CSS variable block with perfect contrast.',
    isPro: false
  },

  // ─── 10. Agent Customization ───
  {
    id: 'ac-01',
    title: 'Query the Antigravity Guide',
    description: 'Fetch official documentation using the built-in skill.',
    category: 'config',
    difficulty: 'beginner',
    tags: ['Guide', 'Docs', 'Skills'],
    promptTemplate: `Invoke the 'antigravity-guide' skill to look up the documentation for [SPECIFIC_FEATURE].
Read the relevant offline subdocs from the references directory. If it requires the latest updates, use the browser subagent to fetch the live URL from the sitemap provided in the guide.
Summarize the usage instructions for me.`,
    useCase: 'When you need to learn exactly how to use a specific Antigravity feature.',
    expectedOutput: 'A clear tutorial derived directly from official documentation.',
    isPro: false
  },
  {
    id: 'ac-02',
    title: 'Create a Custom Workflow Skill',
    description: 'Package a repetitive task into a reusable agent skill.',
    category: 'config',
    difficulty: 'advanced',
    tags: ['Skills', 'Automation', 'Workflow'],
    promptTemplate: `Use the 'workflow-skill-creator' to distill the complex database migration workflow we just completed into a reusable agent skill.
Create the 'SKILL.md' file with the appropriate YAML frontmatter, and include a 'scripts/' directory if necessary.
Save it to my Workspace Customizations Root so I can invoke it seamlessly in the future.`,
    useCase: 'When you\'ve perfected a multi-step process and want the agent to automate it forever.',
    expectedOutput: 'A newly registered skill loaded into the agent\'s toolkit.',
    isPro: true
  },
  {
    id: 'ac-03',
    title: 'Define Project-Scoped Rules',
    description: 'Enforce global architectural guidelines via AGENTS.md.',
    category: 'config',
    difficulty: 'intermediate',
    tags: ['Rules', 'AGENTS.md', 'Guidelines'],
    promptTemplate: `Create an 'AGENTS.md' file in the Workspace Customizations Root (.agents/).
Add a strict Project-Scoped Rule that states: "All new React components must be written as functional components using TypeScript, must use Tailwind v4 @utility classes exclusively, and must export a Zod schema for their props."`,
    useCase: 'When enforcing strict coding standards across a team of AI agents and humans.',
    expectedOutput: 'A persistent rule file that permanently alters the agent\'s behavior in this repo.',
    isPro: false
  },
  {
    id: 'ac-04',
    title: 'Configure MCP Server Integration',
    description: 'Connect an external Model Context Protocol server.',
    category: 'config',
    difficulty: 'advanced',
    tags: ['MCP', 'Servers', 'Integration'],
    promptTemplate: `Write the configuration required in 'settings.json' (or the appropriate config file) to connect a new local MCP server running on port 8080.
Explain how the agent will discover and eager-load the tools provided by this server so I can start invoking them immediately.`,
    useCase: 'When extending the agent\'s capabilities to interact with local databases or proprietary APIs.',
    expectedOutput: 'Configuration instructions and examples for MCP connection.',
    isPro: true
  },
  {
    id: 'ac-05',
    title: 'Customize Keybindings & UI',
    description: 'Modify the Antigravity IDE / CLI settings.',
    category: 'config',
    difficulty: 'beginner',
    tags: ['Settings', 'IDE', 'CLI'],
    promptTemplate: `Consult the offline CLI/IDE subdocs from the antigravity-guide.
Provide the exact JSON payload I need to add to my 'settings.json' to change the default chat panel position to the right, enable vim mode in the CLI, and bind the 'invoke_subagent' slash command to Ctrl+Shift+S.`,
    useCase: 'When personalizing the Antigravity workspace for maximum developer ergonomics.',
    expectedOutput: 'A valid settings configuration block.',
    isPro: false
  }
];
