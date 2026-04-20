# Taskboard App

A Kanban-style task management app built with Next.js.
It supports task creation, drag-and-drop across columns, dynamic column management, and a clean responsive UI.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [dnd-kit](https://dndkit.com/) for drag and drop

## Features

- Create tasks from the top form (title + target column)
- Add tasks inline inside each column (press Enter to submit)
- Drag and drop tasks between columns (`dnd-kit`)
- Remove tasks directly from each card
- Add custom columns from the inline `+ Add new column` tile
- Remove custom columns via the `×` button in the header
- Keep default columns (`To do`, `In Progress`, `Done`) protected
- Enforce a maximum of 5 total columns

## Default Workflow Columns

- `To do`
- `In Progress`
- `Done`

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

## Notes

- App state is currently in-memory via Zustand (refresh clears current board data).
- Column removal also removes tasks that belong to the deleted custom column.

## Available Scripts

- `npm run dev` - run the app in development mode
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run ESLint
