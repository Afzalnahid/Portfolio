# Noray Afzal Nahid Portfolio

A high-performance, modular portfolio for an AI Automation Expert, built with React 19 and Tailwind CSS 4.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (using OKLCH colors)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (shadcn/ui style)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [Wouter](https://github.com/molecula-js/wouter)
- **AI Streaming:** [Streamdown](https://streamdown.ai/)

## 🏗️ Architecture

The project has been refactored into a highly modular, section-based architecture for better maintainability:

```text
client/src/
├── components/
│   ├── ui/             # Reusable UI primitives (Buttons, Cards, etc.)
│   ├── sections/       # Main page sections (Hero, About, etc.)
│   ├── Map.tsx         # Google Maps integration
│   └── AiChat.tsx      # AI Assistant with streaming support
├── pages/
│   ├── Home.tsx        # Public landing page
│   └── NotFound.tsx    # 404 error page
└── contexts/
    └── ThemeContext.tsx # Dark/Light mode management
```

## ✨ Key Features

- **Cinematic Hero:** High-end design with glow button effects and tech overlays.
- **AI Assistant:** Interactive streaming chat interface.
- **Global Reach:** Interactive map visualizing active deployments worldwide.
- **Enterprise Resiliency:** Professional-grade Error Boundaries and 404 pages.

## 🛠️ Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Type Check
```bash
npm run check
```

### Formatting
```bash
npm run format
```

## 📝 License
MIT
