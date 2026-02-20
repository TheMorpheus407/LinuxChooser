# 🐧 LinuxChooser

**Find your perfect Linux distribution!**
An interactive quiz that helps users find the best Linux distribution based on their needs, experience, and preferences.

![LinuxChooser](https://img.shields.io/badge/🇩🇪_German-Fully_localized-black?style=for-the-badge)

**[👉 Try it now](https://themorpheus407.github.io/LinuxChooser/)**

---

## ✨ Features

- 🎯 **Personalized Recommendations** – Smart scoring algorithm based on real user requirements
- 🖥️ **26+ Distributions** – From beginner-friendly (Linux Mint, Ubuntu) to expert distros (Arch, Gentoo, NixOS)
- 🔍 **Browse & Filter** – Explore all distributions with sorting and filtering options
- 🎨 **Desktop Environments** – Recommendations for the right desktop (GNOME, KDE, Cinnamon, etc.)
- ⚠️ **Deal-Breaker Warnings** – Honest hints about potential limitations
- 📊 **Live Rankings** – See in real-time how your answers affect the recommendations
- 🔗 **Shareable Results** – Share your result with friends via URL
- 📱 **Responsive Design** – Works on desktop and mobile devices
- ⚡ **Fast & Modern** – Built with React 19, TypeScript, and Vite

## 📋 Supported Distributions

| Category          | Distributions                                           |
| ----------------- | ------------------------------------------------------- |
| **Beginner**      | Linux Mint, Ubuntu, Zorin OS, elementary OS, Linux Lite |
| **Intermediate**  | Fedora, Pop!\_OS, Tuxedo OS, openSUSE, Manjaro, Kubuntu, KDE neon |
| **Gaming**        | Nobara, Bazzite, Garuda Linux                           |
| **Privacy**       | Tails, Qubes OS                                         |
| **Expert**        | Arch Linux, EndeavourOS, Void Linux, Gentoo, NixOS      |
| **Lightweight**   | antiX, Puppy Linux, Lubuntu, MX Linux                   |
| **Server/Stable** | Debian, AlmaLinux                                       |

## 🛠️ Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/TheMorpheus407/LinuxChooser.git
cd LinuxChooser

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will run at `http://localhost:5173`

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Create optimized production build        |
| `npm run preview` | Preview the production build             |
| `npm run lint`    | Run ESLint                               |

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── BrowseDistrosPage.tsx  # Browse all distributions with filters
│   ├── DistroCard.tsx         # Individual distribution card
│   ├── DistroFilters.tsx      # Filter controls for browsing
│   ├── ErrorBoundary.tsx      # Error handling wrapper
│   ├── LandingPage.tsx        # Landing page
│   ├── Layout.tsx             # App layout with header/footer
│   ├── LiveSidebar.tsx        # Real-time rankings during quiz
│   ├── Question.tsx           # Quiz question component
│   └── ResultsPage.tsx        # Results page with recommendations
├── context/                 # React Context for quiz state
├── data/                    # Distro & question data
│   ├── distros.ts             # 26+ distributions with attributes
│   ├── questions.ts           # Quiz questions (German)
│   └── desktopEnvironments.ts # Desktop environment definitions
├── hooks/                   # Custom React hooks
└── utils/                   # Scoring algorithm & helper functions
```

<p align="center">
  Made with ❤️ for the Linux community
</p>
