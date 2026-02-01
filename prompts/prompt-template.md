# Prompt Template – ForumX Project

We used AI to support the planning, design, development, testing, and documentation of ForumX, a visual round-table discussion platform.

For project planning, we asked the AI to act as a senior engineer and product designer. We explained our goal of creating a platform where users can join topic-based discussion tables, create new tables, or participate as supervisors. Each table includes push-to-talk communication, a speaking queue, shared files, and an idea board. Supervisors can monitor rooms, assist teams, and manage discussions when needed.

System Architecture Flow:
User → Frontend (React) → Realtime Layer (WebRTC) → Backend (Node.js / Express) → Database (PostgreSQL)


For frontend development, we asked the AI to design a circular round-table interface with speaker highlighting, chat, and collaboration tools. We requested step-by-step explanations and reusable components. After the initial version, we used AI to modernize the interface with cleaner layouts, better colors, animations, and improved usability.

Frontend Development Flow:
Design → Components → State Management → Styling → Integration → Testing

For backend development, we asked the AI to design secure and scalable APIs for user authentication, room management, supervisor permissions, file storage, and real-time signaling. We also requested guidance on database schema design, session handling, and access control.

Backend Development Flow:
API Design → Database Schema → Authentication → Realtime Signaling → Authorization → Logging → Testing

We used AI to review and optimize both frontend and backend code for performance, accessibility, and reliability. We also asked it to identify bugs, edge cases, and synchronization issues and provide fixes.

Code Optimization Flow:
Implementation → Review → Optimize → Debug → Refactor → Validate

For documentation and deployment, we used AI to prepare setup instructions, reproducibility guides, and usage documentation. This ensures that judges and users can easily run and evaluate the project.

Deployment Flow:
Clone Repository → Install Dependencies → Configure Environment → Build → Run Services → Access Application

Finally, we used AI to prepare our hackathon pitch, including the problem statement, solution overview, demo flow, future roadmap, and judge Q&A preparation.

Overall, AI was used in a structured and responsible way to accelerate development, improve quality, and ensure successful delivery of a functional MVP within the hackathon timeline.
