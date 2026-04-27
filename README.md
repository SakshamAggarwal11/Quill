# Quill - Offline Private AI Workspace

Quill is a local-first AI web app built with Next.js and Ollama. It runs locally, supports text chat, and supports image prompts when a vision model is installed.

## Features

- Landing page, auth flow, and chat workspace.
- Local chat streaming through Ollama (`/api/chat`).
- Collapsible sidebar with search and recents.
- Local image attachments from the `+` menu.
- Topic-based recents (not full prompt text).
- User profile anchored at the bottom of the sidebar.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React
- React Markdown + GFM
- React Syntax Highlighter

## Routes

- `/` - Landing page
- `/auth` - Auth page
- `/login` - Login page
- `/signup` - Signup page
- `/chat` - Main chat workspace
- `/projects` - Personal projects page
- `/api/chat` - Local streaming proxy to Ollama

## Requirements

- Node.js 18+
- npm
- Ollama installed and running
- At least one local text model (for text chat), for example `llama3.2`
- A local vision model (for image chat), for example `llava`

## Install

```bash
npm install
```

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm run start
```

Open: `http://localhost:3000`

## Ollama Setup

Install Ollama on macOS:

```bash
brew install ollama
```

Start Ollama service:

```bash
brew services start ollama
```

Pull text model:

```bash
ollama pull llama3.2
```

Pull vision model for image prompts:

```bash
ollama pull llava
```

Check installed models:

```bash
ollama list
```

## Image Prompt Notes

- Upload images using `+` -> `Upload files` or `Photos`.
- If no vision model is installed, image prompts will fail with a clear setup error.
- If `llava` is unavailable, try another vision-capable model (for example `llama3.2-vision`) and set that as your model.

## Project Structure

- `app/` - Routes, API handlers, global styles
- `components/chat/` - Chat page, sidebar, message rendering, input controls
- `components/auth/` - Local auth/session helpers
- `components/landing/` - Landing page sections and branding

## Troubleshooting

- If styling looks stale, hard refresh with `Cmd+Shift+R`.
- If image prompts fail, run `ollama list` and ensure a vision model exists.
- If Ollama is unreachable, verify service status and `http://localhost:11434` availability.
- If port `3000` is busy, stop old Next.js processes and restart.
