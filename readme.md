# 🚀 CodeForge - AI-Powered LeetCode Clone

A full-stack web application that provides an intelligent coding practice platform similar to LeetCode, enhanced with AI-powered features for learning assistance, code debugging, and personalized recommendations.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [AI Features](#-ai-features)
- [Database Schema](#-database-schema)
- [Docker Support](#-docker-support)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## ✨ Features

### Core Features

#### 🔐 User Authentication
- Secure JWT-based authentication system
- Login and signup functionality
- Protected routes for authenticated users
- Role-based access control (Admin/User)

#### 👨‍💼 Admin Panel
- Create and manage custom coding problems
- Test problems with Judge0 API before publishing
- Edit and delete existing problems
- Monitor user submissions and progress

#### 💻 Code Execution
- Multi-language support (JavaScript, Python, Java, C++, etc.)
- Real-time code execution using Judge0 API
- Comprehensive test case validation
- Monaco Editor integration for IDE-like experience

#### 📊 Progress Tracking
- Track solved problems for each user
- Display submission history with detailed results
- Visual progress indicators
- Difficulty-based problem categorization

#### 📝 Problem Management
- Browse and filter problems by difficulty and tags
- Detailed problem descriptions with examples
- Starter code snippets for multiple languages
- Sample test cases and constraints

#### 📚 Playlist System
- Create custom problem playlists
- Organize problems by topics or difficulty
- Share playlists with other users
- Track progress within playlists

### 🤖 AI-Powered Features

#### 1. **Progressive Hints System**
- 3-level hint system (basic → intermediate → advanced)
- Context-aware hints based on problem difficulty
- Prevents spoilers while guiding learning
- Cached hints for performance optimization

#### 2. **AI Chat Assistant**
- Real-time conversational AI support
- Context-aware responses based on current problem
- Maintains conversation history
- Floating chat panel for seamless interaction

#### 3. **Debug Assistant**
- Automatic error analysis for failed submissions
- Root cause identification
- Actionable fix suggestions
- Code improvement recommendations

#### 4. **Solution Explainer**
- 8-section comprehensive solution breakdown:
  - Problem understanding
  - Intuition building
  - Step-by-step approach
  - Algorithm/data structure selection
  - Code explanation
  - Time/space complexity analysis
  - Edge cases handling
  - Alternative approaches

#### 5. **Smart Recommendations**
- Personalized problem recommendations
- Based on user's skill level and solving history
- Adaptive difficulty progression
- Topic-based suggestion engine

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.2.0
- **Styling**: TailwindCSS 4.1.3 + DaisyUI 5.0.18
- **State Management**: Zustand 5.0.3
- **Code Editor**: Monaco Editor (@monaco-editor/react 4.7.0)
- **Form Handling**: React Hook Form 7.55.0
- **Routing**: React Router DOM 7.5.0
- **UI Components**: Lucide React, Framer Motion
- **Markdown Rendering**: React Markdown with syntax highlighting

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL with Prisma ORM 6.6.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **AI Integration**: Google Generative AI (Gemini) 0.24.1
- **Code Execution**: Judge0 API via Axios
- **Security**: CORS, Cookie Parser
- **Logging**: Morgan
- **Automation**: Node-cron 3.0.3

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│                   (localhost:5173)                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  React Frontend (Vite)                                  │
│  ├─ Pages (Home, Problem, Profile, Auth)               │
│  ├─ AI Components (Hints, Chat, Debug, Explain)        │
│  ├─ Monaco Editor                                       │
│  ├─ State Management (Zustand)                         │
│  └─ Services (API clients)                             │
│                                                         │
│                    ↕ HTTP/REST                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                   BACKEND SERVER                        │
│                  (localhost:8080)                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Express.js Application                                 │
│  ├─ Routes (Auth, Problems, AI, Submissions)           │
│  ├─ Controllers (Business Logic)                       │
│  ├─ Services (AI, Code Execution)                      │
│  ├─ Middleware (Auth, CORS)                            │
│  └─ Prisma ORM                                          │
│                                                         │
│       ↕                           ↕                     │
│                                                         │
├──────────────┬──────────────────────┬──────────────────┤
│              │                      │                  │
│  PostgreSQL  │   Google Gemini AI   │   Judge0 API    │
│   Database   │   (AI Responses)     │ (Code Execution)│
│              │                      │                  │
└──────────────┴──────────────────────┴──────────────────┘
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)
- **Docker** (optional, for containerized deployment)
- **Judge0 API** access (see [Judge0 Installation Guide](judge0-installation-guide.md))

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CODEEFORGEE
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables (see Configuration section)
cp .env.example .env

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed the database
npx prisma db seed
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/codeforge"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Judge0 API
JUDGE0_API_URL="http://localhost:2358"
JUDGE0_API_KEY="your-judge0-api-key-if-required"

# Google Gemini AI
GEMINI_API_KEY="your-google-gemini-api-key"

# Server Configuration
PORT=8080
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:5173"
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL="http://localhost:8080"
```

### Getting API Keys

1. **Google Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your backend `.env` file

2. **Judge0 Setup**:
   - Follow the [Judge0 Installation Guide](judge0-installation-guide.md)
   - Set up Judge0 locally or use a hosted service
   - Update the Judge0 URL and API key in `.env`

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:8080`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Run Backend in Production

```bash
cd backend
NODE_ENV=production node src/index.js
```

### Using Docker

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/v1/auth/signup          - Register new user
POST   /api/v1/auth/login           - Login user
POST   /api/v1/auth/logout          - Logout user
GET    /api/v1/auth/me              - Get current user
```

### Problem Endpoints

```
GET    /api/v1/problems             - Get all problems
GET    /api/v1/problems/:id         - Get problem by ID
POST   /api/v1/problems             - Create problem (Admin)
PUT    /api/v1/problems/:id         - Update problem (Admin)
DELETE /api/v1/problems/:id         - Delete problem (Admin)
```

### Submission Endpoints

```
POST   /api/v1/submissions          - Submit solution
GET    /api/v1/submissions/:userId  - Get user submissions
GET    /api/v1/submissions/problem/:problemId - Get problem submissions
```

### Code Execution Endpoints

```
POST   /api/v1/execute/run          - Run code with test cases
POST   /api/v1/execute/submit       - Submit code for validation
```

### AI Endpoints

```
GET    /api/v1/ai/hint/:id?level=X  - Get progressive hints
POST   /api/v1/ai/chat              - Chat with AI assistant
POST   /api/v1/ai/debug             - Debug code errors
GET    /api/v1/ai/explain/:id       - Get solution explanation
GET    /api/v1/ai/recommend?userId=X - Get problem recommendations
```

### Playlist Endpoints

```
GET    /api/v1/playlists            - Get all playlists
POST   /api/v1/playlists            - Create playlist
GET    /api/v1/playlists/:id        - Get playlist by ID
PUT    /api/v1/playlists/:id        - Update playlist
DELETE /api/v1/playlists/:id        - Delete playlist
```

## 🤖 AI Features

### Progressive Hints

The hint system provides three levels of assistance:

1. **Level 1**: High-level approach hint
2. **Level 2**: More detailed guidance with key insights
3. **Level 3**: Near-complete solution approach

Usage:
```javascript
GET /api/v1/ai/hint/problem-id?level=1
```

### AI Chat Assistant

Context-aware conversational AI that:
- Understands the current problem
- Maintains conversation history
- Provides step-by-step guidance
- Avoids giving direct solutions

### Debug Assistant

Analyzes failed code submissions and provides:
- Error root cause analysis
- Line-by-line code review
- Specific fix suggestions
- Best practices recommendations

### Solution Explainer

Comprehensive 8-section breakdown:
1. Problem Understanding
2. Intuition
3. Approach
4. Algorithm/DS Selection
5. Code Explanation
6. Complexity Analysis
7. Edge Cases
8. Alternative Solutions

## 🗄️ Database Schema

### Core Models

#### User
- Authentication and profile information
- Role-based access (ADMIN/USER)
- Relationships: problems, submissions, solvedProblems, playlists

#### Problem
- Title, description, difficulty
- Test cases (JSON)
- Code snippets for multiple languages
- Reference solutions
- Tags and constraints

#### Submission
- User's submitted code
- Execution results (status, time, memory)
- Test case results
- Language and timestamps

#### ProblemSolved
- Tracks which problems users have solved
- Junction table between User and Problem

#### Playlist
- Custom problem collections
- Created by users
- Many-to-many with problems

#### TestCaseResult
- Individual test case execution results
- Linked to submissions

#### TokenBlacklist
- JWT token invalidation
- Session management

For complete schema details, see [backend/prisma/schema.prisma](backend/prisma/schema.prisma)

## 🐳 Docker Support

The project includes Dockerfiles for both frontend and backend:

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 8080
CMD ["npm", "run", "dev"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

## 📁 Project Structure

```
CODEEFORGEE/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── middlewares/       # Auth, validation
│   │   ├── libs/              # Utilities, config
│   │   └── index.js           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # DB migrations
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # Route pages
│   │   ├── components/        # React components
│   │   │   ├── AI/            # AI feature components
│   │   │   └── ...            # Other components
│   │   ├── services/          # API clients
│   │   ├── store/             # Zustand stores
│   │   ├── libs/              # Utilities
│   │   └── main.jsx           # App entry point
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml         # Multi-container setup
├── README.md                  # This file
├── SUMMARY.md                 # AI implementation summary
├── ARCHITECTURE_DIAGRAM.md    # System architecture
├── AI_COPILOT_IMPLEMENTATION.md
├── AI_COMPONENTS_ARCHITECTURE.md
├── TESTING_GUIDE.md
└── judge0-installation-guide.md
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm run lint
```

### Manual Testing

Follow the comprehensive [TESTING_GUIDE.md](TESTING_GUIDE.md) for step-by-step testing instructions.

## 🔒 Security Features

- JWT-based authentication with httpOnly cookies
- Password hashing using bcryptjs
- CORS protection with whitelist
- Input validation and sanitization
- SQL injection protection via Prisma ORM
- Token blacklisting for logout
- Role-based access control

## 🌟 Key Highlights

- **Real-time Code Execution**: Instant feedback using Judge0 API
- **Multi-language Support**: JavaScript, Python, Java, C++, and more
- **AI-Powered Learning**: Get hints, debug help, and explanations
- **Progress Tracking**: Monitor your problem-solving journey
- **Modern UI/UX**: Clean, responsive design with Monaco Editor
- **Scalable Architecture**: Modular design with separation of concerns

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Judge0](https://judge0.com/) for code execution API
- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for code editing
- [Prisma](https://www.prisma.io/) for database management
- [LeetCode](https://leetcode.com/) for inspiration

## 📧 Contact

For questions or support, please open an issue on the GitHub repository.

---

**Built with ❤️ using React, Node.js, and AI**
