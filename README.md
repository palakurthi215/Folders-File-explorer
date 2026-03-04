# FileTree Explorer

A web application for visualizing and navigating a directory structure loaded from a JSON file. Built with **React 18**, **TypeScript**, **React Router v6**, **Vite**, and **Tailwind CSS**.

---

## Features

- Load a JSON file representing a file tree (by uploading or pasting)
- Expand/collapse folders in a tree view
- View details of files and folders (name, size, path, children, total size)
- Search for nodes by name (case‑insensitive, results persist after refresh)
- All data is stored in `localStorage` – no need to reload the JSON after the first load
- Fully typed with TypeScript and type guards (`isFile`, `isFolder`)
- Responsive and clean UI with Tailwind CSS

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Architectural Decisions

### 1. Global State Management with Context
The entire application state (the loaded tree, search query, and results) is managed in a TreeContext provider. This centralises state and makes it easy to access from any component. The context also automatically syncs with localStorage, so the tree and search query survive page reloads.

### 2. TypeScript with Strict Mode
We leverage TypeScript's strict mode and custom type guards (isFile, isFolder) to ensure type safety throughout the application. This prevents runtime errors when accessing properties that only exist on files or folders.

### 4. Routing with React Router v6
Three routes are defined:

- `/` – Home page for uploading/pasting JSON.
- `/tree` – The main tree view with search.
- `/tree/:nodePath` – Detail page for a specific node (file or folder). The nodePath parameter is URL‑encoded to support special characters.

### 5. Tailwind CSS for Styling
Tailwind CSS is used for all styling, providing a utility‑first approach that keeps the codebase maintainable and consistent. The design is clean, with cards, shadows, and subtle hover effects.

### 6. Search Persistence
The search query is saved to localStorage so that when the user returns to the tree view, their previous search is restored. Search results are recomputed using a memoised searchTree function that traverses the tree recursively.

---

## What Would Be Done with More Time

Given additional time, the following improvements could be implemented:

- **Advanced JSON validation** – More thorough validation of the input structure, including checking that every node has required fields and that file sizes are numbers.

- **Virtualized tree rendering** – For very large trees (thousands of nodes), rendering all nodes at once can become slow. Using a library like react-window would allow the tree to render only visible items.

- **Unit tests** – Adding tests for utility functions (formatSize, calculateFolderSize, searchTree) and component behaviour with React Testing Library.

- **File icons** – Replace the simple emoji icons with a library like lucide-react to show different icons based on file extensions (e.g., .tsx, .json).

- **Breadcrumb navigation** – On the node detail page, display a clickable breadcrumb trail showing the full path, allowing users to jump to any ancestor.

- **Dark mode** – Implement a theme switcher using Tailwind's dark mode variant and store the preference in localStorage.

- **In‑place editing** – Allow users to rename files/folders or delete them directly from the UI (though this was not a requirement).

- **Better error handling** – Show more user‑friendly error messages and guide the user to correct the JSON format.


- **Keyboard navigation** – Enable arrow keys to navigate the tree, and Enter to expand/collapse or open details.

---

## Known Limitations

### Performance on Deep Trees
The tree is rendered recursively without virtualization. If the tree has thousands of nodes, the initial render and updates may become slow.

### Basic JSON Validation
Only a minimal validation is performed (root must be a folder with a children array). Malformed JSON may still cause runtime errors.

### Search
It does not support fuzzy matching or regular expressions.
