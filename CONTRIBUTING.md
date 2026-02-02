# Contributing to Linux Chooser

Thank you for your interest in contributing to Linux Chooser! This document provides guidelines and information to help you get started.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
  - [Running the Project](#running-the-project)
  - [Available Scripts](#available-scripts)
- [Code Style Guidelines](#code-style-guidelines)
  - [TypeScript/React](#typescriptreact)
  - [CSS](#css)
  - [File Organization](#file-organization)
- [Commit Message Conventions](#commit-message-conventions)
  - [Commit Message Format](#commit-message-format)
  - [Type Prefixes](#type-prefixes)
  - [Examples](#examples)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Project Structure](#project-structure)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20 or higher)
- **npm** (comes with Node.js)
- **Git**

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/LinuxChooser.git
   cd LinuxChooser
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/TheMorpheus407/LinuxChooser.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173/` (or the next available port).

---

## Development Workflow

### Running the Project

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check for code issues |

### Available Scripts

- **Development**: Use `npm run dev` during development. The server supports Hot Module Replacement (HMR) for instant feedback.
- **Production Build**: Run `npm run build` to create an optimized production build in the `dist/` directory.
- **Linting**: Always run `npm run lint` before committing to ensure code quality.

---

## Code Style Guidelines

This project uses ESLint with TypeScript and React plugins for code quality enforcement.

### TypeScript/React

- Use **TypeScript** for all new files (`.ts` / `.tsx`)
- Use **functional components** with hooks (no class components)
- Use **default exports** for components (`export default function ComponentName`)
- Prefer **arrow functions** for event handlers and callbacks
- Use **destructuring** for props and state
- Keep components focused and modular

**Example component structure:**

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExampleComponent() {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <input value={value} onChange={handleChange} />
    </motion.div>
  );
}
```

### CSS

- Use **CSS custom properties** (CSS variables) for theming
- Follow the existing color palette:
  - Primary purple: `#6c35de`
  - Accent orange: `#ff6b35`
  - Dark background: `#0d0d11`
  - Light text: `#f0f2f5`
- Use **Oswald** font for headings and buttons
- Use **Roboto** font for body text
- Use semantic class names that describe the component/element purpose

### File Organization

- Place React components in `src/components/`
- Place React context providers in `src/context/`
- Place custom hooks in `src/hooks/`
- Place utility functions in `src/utils/`
- Place data files (distros, questions, etc.) in `src/data/`

---

## Commit Message Conventions

We follow a structured commit message format to maintain a clear and readable git history.

### Commit Message Format

```
<Type> <short description>
```

Or with an optional scope for clarity:

```
<Type> <scope>: <short description>
```

For multi-line commits, add a body after a blank line:

```
<Type> <short description>

<optional body with more details>
```

**Guidelines:**
- Use **imperative mood** in the subject line ("Add feature" not "Added feature")
- Keep the subject line under **72 characters**
- Capitalize the first letter of the subject
- Do not end the subject line with a period
- Separate subject from body with a blank line
- Use the body to explain **what** and **why** (not how)

### Type Prefixes

| Type | Description |
|------|-------------|
| `Add` | New feature, file, or functionality |
| `Update` | Enhancement or modification to existing feature |
| `Fix` | Bug fix |
| `Remove` | Removal of files, features, or code |
| `Refactor` | Code restructuring without changing behavior |
| `Docs` | Documentation changes |
| `Style` | Formatting, styling (no code logic changes) |
| `Test` | Adding or updating tests |
| `Chore` | Build process, dependencies, tooling |

### Examples

**Simple commit:**
```
Add question skip functionality
```

**Commit with scope:**
```
Update branding: Oswald/Roboto fonts and new color palette
```

**Commit with body:**
```
Remove redundant files and development documentation

Delete planning/review documents, research notes, unused template
assets (react.svg, vite.svg), and duplicate logo files from root.
```

**Bug fix:**
```
Fix navigation state not resetting on quiz restart
```

---

## Branch Naming Conventions

Use descriptive branch names with the following prefixes:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New features (`feature/add-distro-comparison`) |
| `fix/` | Bug fixes (`fix/navigation-state-reset`) |
| `docs/` | Documentation (`docs/add-contributing-guide`) |
| `refactor/` | Code refactoring (`refactor/quiz-context`) |
| `chore/` | Maintenance tasks (`chore/update-dependencies`) |

**Examples:**
- `feature/add-new-distro`
- `fix/mobile-responsive-issues`
- `docs/update-readme`

---

## Pull Request Process

1. **Sync your fork** with the upstream repository:
   ```bash
   git fetch upstream
   git checkout master
   git merge upstream/master
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following the code style guidelines

4. **Run linting** to check for issues:
   ```bash
   npm run lint
   ```

5. **Build the project** to ensure no TypeScript errors:
   ```bash
   npm run build
   ```

6. **Commit your changes** following the commit conventions

7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request** on GitHub:
   - Provide a clear title following commit conventions
   - Describe what changes you made and why
   - Reference any related issues (e.g., "Closes #4")
   - Include screenshots for UI changes

### Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] `npm run lint` passes without errors
- [ ] `npm run build` completes successfully
- [ ] Commit messages follow the conventions
- [ ] PR description clearly explains the changes
- [ ] UI changes include screenshots (if applicable)

---

## Reporting Issues

When reporting issues, please include:

1. **Clear title** describing the problem
2. **Environment details**:
   - Browser and version
   - Operating system
   - Node.js version (if relevant)
3. **Steps to reproduce** the issue
4. **Expected behavior** vs **actual behavior**
5. **Screenshots** (for visual issues)
6. **Console errors** (if any)

### Issue Templates

**Bug Report:**
```markdown
## Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- Browser: Chrome 120
- OS: Windows 11
```

**Feature Request:**
```markdown
## Description
A clear description of the feature.

## Use Case
Why this feature would be useful.

## Proposed Solution
How you think it could be implemented (optional).
```

---

## Project Structure

```
LinuxChooser/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages deployment
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── ErrorBoundary.tsx
│   │   ├── LandingPage.tsx
│   │   ├── Layout.tsx
│   │   ├── LiveSidebar.tsx
│   │   ├── Question.tsx
│   │   └── ResultsPage.tsx
│   ├── context/             # React context providers
│   │   └── QuizContext.tsx
│   ├── data/                # Quiz data and distro information
│   │   ├── desktopEnvironments.ts
│   │   ├── distros.ts
│   │   ├── games.ts
│   │   ├── index.ts
│   │   └── questions.ts
│   ├── hooks/               # Custom React hooks
│   │   └── useQuiz.ts
│   ├── utils/               # Utility functions
│   │   ├── dealBreakers.ts
│   │   ├── index.ts
│   │   └── scoringAlgorithm.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts           # Vite configuration
```

---

## Questions?

If you have questions about contributing, feel free to:

1. Open an issue for discussion
2. Check existing issues and pull requests for context

Thank you for contributing to Linux Chooser!
