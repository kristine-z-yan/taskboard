# Taskboard App

A simple Kanban-style task board built with Next.js.  
You can create tasks, group them by status (`To do`, `In Progress`, `Done`), and move tasks between columns with drag and drop.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [dnd-kit](https://dndkit.com/) for drag and drop

## Features

- Add a new task with a title and status
- Display tasks in Kanban columns by status
- Drag and drop tasks across columns
- Delete tasks from the board

## Project Structure

- `src/app` - Next.js pages/layout and global styles
- `src/components` - UI components (`TaskList`, `TaskColumn`, `TaskItem`, `AddTaskForm`)
- `src/store` - Zustand store logic for tasks
- `src/types` - shared TypeScript types

## How to Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser at:

[http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - run the app in development mode
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run ESLint
