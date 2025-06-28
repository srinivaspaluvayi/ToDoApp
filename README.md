# 📝 Full-Stack ToDo Application

A modern, full-featured ToDo and Task Management application built with **React**, **Node.js**, and **MongoDB**.  
Designed to boost productivity through intuitive UI, powerful task management features, and real-time collaboration.

---

## 🚀 Features

### ✅ Core Task Management
- Create, update, delete, and mark tasks as completed
- Add **due dates**, **priorities** (High/Medium/Low), and **categories**
- Support for **recurring tasks** and **subtasks**
- **Reminders** via email or in-app notifications
- **Search & filter** by category, status, or priority

### 👥 User Profiles
- Secure **authentication & authorization** (JWT / OAuth)
- Upload **profile picture**, edit **personal info**
- **Password reset** and **account management**

### 🧠 Collaboration & Notes
- **Assign tasks** to team members
- Add **comments** or notes on tasks
- Shared task visibility within teams or lists

### 📊 Dashboard & Analytics
- Task progress tracking with completion stats
- Weekly/monthly completion overview
- Calendar view for task deadlines and planning

### 🎨 User Experience
- **Dark/light themes** and custom themes
- **Responsive UI** for mobile and tablets
- **Keyboard shortcuts** for power users

### 🔗 Integrations (optional extensions)
- Google Calendar, Outlook sync
- Notifications via email / push (e.g., Firebase, OneSignal)
- External tools: Slack, Trello, Microsoft Teams

### 🛡️ Security
- Secure login with **JWT or OAuth (Google/GitHub)**
- **Two-factor authentication (2FA)** (optional)
- Privacy controls for public/private task visibility

### ✨ Bonus Features
- **Attachments**: Add files or images to tasks
- Daily **journal** / notes tab
- Create multiple lists/projects per user
- **Gamification**: streaks, badges, productivity stats

---

## 🛠 Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- React Router, Redux (optional)
- Axios / Fetch for API calls
- Styled Components or TailwindCSS for styling

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- RESTful API with middleware for auth, logging, error handling

### Database
- [MongoDB](https://www.mongodb.com/) with Mongoose ODM
- User, Task, Category, Subtask, and Comment schemas

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB Atlas or local MongoDB server

### Clone the Repo
```bash
git clone https://github.com/srinivaspaluvayi/ToDoApp.git
cd ToDoApp
