# ForumX - Setup Instructions

## Installation

1. **Install React Router**
   ```bash
   npm install react-router-dom
   ```

2. **Your project structure should be:**
   ```
   /ForumX
   ├── index.html
   ├── package.json
   └── src/
       ├── main.jsx
       ├── App.jsx
       ├── ForumX.jsx
       ├── ForumX.css
       ├── RoundTable.jsx
       ├── RoundTable.css
       ├── Supervisor.jsx
       └── Supervisor.css
   ```

## Navigation Routes

The app now has three routes:

- **`/`** (Home) → ForumX Entry Page
- **`/table`** → Round Table Discussion Page
- **`/supervisor`** → Supervisor Dashboard

## How to Navigate

From the **ForumX home page**, you can:

1. **Click "Start Session"** → Goes to Round Table (`/table`)
2. **Click "Access Dashboard"** → Goes to Supervisor (`/supervisor`)

## Running the App

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`

## Notes

- Make sure all CSS files are in the same directory as their corresponding JSX files
- The Material Icons font is loaded via CDN in index.html
- All navigation is handled by React Router (no page reloads)
