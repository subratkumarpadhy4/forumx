Build Reproducibility Guide – ForumX

This file explains how to run ForumX
from the source code on any computer.

System Requirements
- Windows / macOS / Linux
- Node.js version 18 or higher
- NPM
- Git

Step 1: Download the Project

Open terminal and run:

git clone https://github.com/Ayyykayy/ForumX.git
cd ForumX

Step 2: Install Dependencies

Run:

npm install

This will install all required packages.

Step 3: Setup Environment (If Needed)

If a .env file is required, create it in the main folder
and add necessary keys.

Example:

VITE_API_URL=your_api_url

Step 4: Run the Application

Start the project using:

npm run dev

Step 5: Open in Browser

After the server starts, open:

http://localhost:5173

Step 6: Check the Application

Make sure:
- The homepage loads
- Rooms can be created
- UI works properly
- Chat and voice are visible

Troubleshooting

If the port is busy, close other apps using it.

If dependencies fail, run:

npm install

again.

If Node version is old, update to version 18+.

Build Verification

This project was tested on:
Node.js v18
NPM v9
Google Chrome

