<<<<<<< HEAD
# Quill - Offline Private AI Studio

Quill is a local-first AI web app built with Next.js, React, Tailwind CSS, Framer Motion, Lucide React, Recharts, and a local Ollama backend.

## Features

- Full-width landing page with hero, about, features, security, roadmap, and FAQ sections.
- Separate authentication page for Login and Sign Up.
- Claude-style chat interface with a collapsible sidebar, markdown rendering, and code highlighting.
- Streaming local AI responses from Ollama at `http://localhost:11434/api/generate`.
- Dark Developer visual style with glassmorphism and neon cyan/purple accents.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts
- React Markdown + GFM
- React Syntax Highlighter

## Routes

- `/` - Landing page
- `/auth` - Login / Sign Up page
- `/chat` - Main chat dashboard
- `/api/chat` - Local streaming proxy to Ollama

## Requirements

- Node.js 18 or newer
- npm
- Ollama installed and running locally
- A local model pulled in Ollama, for example `llama3.2`

## Install

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open:

- `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Start Production Server

```bash
npm run start
```

## Ollama Setup

If Ollama is not installed:

```bash
brew install ollama
```

Start Ollama:

```bash
brew services start ollama
```

Pull a model:

```bash
ollama pull llama3.2
```

## Project Structure

- `app/` - App Router pages, API route, and global styles
- `components/landing/` - Landing page modules
- `components/chat/` - Chat dashboard modules
- `components/auth/` - Authentication page module

## Troubleshooting

- If the page looks unstyled, hard refresh the browser with `Cmd+Shift+R`.
- If chat shows an Ollama error, verify `ollama serve` is running and that a model exists under `http://localhost:11434/api/tags`.
- If you see port issues, stop other Next dev processes and rerun `npm run dev`.
=======
its still in its in developing stage !!!!
>>>>>>> c6f341a163dc7061371b64112a6769c9eb8a0465
