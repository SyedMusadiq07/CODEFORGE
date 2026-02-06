<p align="center">
  <img src="https://img.shields.io/badge/CodeForge-AI%20Powered-blueviolet?style=for-the-badge&logo=codereview&logoColor=white" alt="CodeForge"/>
</p>

<h1 align="center">🔥 CodeForge - AI-Powered Coding Practice Platform</h1>

<p align="center">
  <strong>A full-stack LeetCode-inspired coding platform with integrated AI assistant for intelligent learning</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square" alt="Version"/>
  <img src="https://img.shields.io/badge/license-ISC-green.svg?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square" alt="Node"/>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/PostgreSQL-14+-316192?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Prisma-6.6.0-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Gemini%20AI-Integrated-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini AI"/>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Design](#-database-design)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#️-environment-variables)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

**CodeForge** is a comprehensive coding practice platform designed to help developers improve their problem-solving skills. Similar to LeetCode, it provides a rich set of programming challenges with an integrated Monaco code editor, real-time code execution via Judge0 API, and **AI-powered features** using Google's Gemini AI.

### What Makes CodeForge Special?

| Feature                       | Description                                                        |
| ----------------------------- | ------------------------------------------------------------------ |
| 🤖 **AI-Powered Learning**    | Get progressive hints, debug assistance, and solution explanations |
| ⚡ **Real-time Execution**    | Instant code compilation and testing using Judge0                  |
| 🎯 **Multi-language Support** | JavaScript, Python, Java, C++, and more                            |
| 📊 **Progress Tracking**      | Monitor your solving history and improvement                       |
| 📚 **Playlist System**        | Organize problems into custom collections                          |
| 🔐 **Role-based Access**      | Admin panel for problem management                                 |

---

## ✨ Features

### Core Features

<table>
<tr>
<td width="50%">

#### 🔐 Authentication & Authorization

- JWT-based secure authentication
- HTTP-only cookies for token storage
- Role-based access control (Admin/User)
- Token blacklisting for secure logout

</td>
<td width="50%">

#### 💻 Code Execution Engine

- Multi-language code compilation
- Judge0 API integration
- Real-time test case validation
- Detailed execution metrics (time, memory)

</td>
</tr>
<tr>
<td width="50%">

#### 📝 Problem Management

- Create, edit, delete problems (Admin)
- Difficulty categorization (Easy/Medium/Hard)
- Tag-based organization
- Starter code snippets for multiple languages

</td>
<td width="50%">

#### 📊 Progress & Submissions

- Track solved problems
- View submission history
- Detailed test case results
- Personal dashboard with statistics

</td>
</tr>
</table>

### 🤖 AI-Powered Features

```mermaid
flowchart LR
    subgraph AI["🤖 AI Features"]
        H["💡 Progressive Hints"]
        C["💬 Chat Assistant"]
        D["🔧 Debug Helper"]
        E["📖 Solution Explainer"]
        R["🎯 Recommendations"]
    end

    U["👤 User"] --> AI
    AI --> G["🧠 Google Gemini AI"]
```

| Feature                      | Description                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **💡 Progressive Hints**     | 3-level hint system (basic → intermediate → advanced) that guides without spoiling |
| **💬 AI Chat Assistant**     | Context-aware conversational AI that understands the current problem               |
| **🔧 Debug Helper**          | Automatic error analysis with root cause identification and fix suggestions        |
| **📖 Solution Explainer**    | Comprehensive 8-section breakdown including complexity analysis                    |
| **🎯 Smart Recommendations** | Personalized problem suggestions based on skill level and history                  |

---

## 🛠️ Tech Stack

### Frontend Architecture

```mermaid
graph TD
    subgraph Frontend["🖥️ Frontend Stack"]
        R["⚛️ React 19"]
        V["⚡ Vite 6.2"]
        TW["🎨 TailwindCSS 4.1"]
        DUI["🌼 DaisyUI 5.0"]
        Z["🐻 Zustand 5.0"]
        ME["📝 Monaco Editor"]
        RR["🧭 React Router 7.5"]
        FM["✨ Framer Motion"]
    end

    R --> V
    R --> Z
    V --> TW
    TW --> DUI
    R --> ME
    R --> RR
    R --> FM
```

### Backend Architecture

```mermaid
graph TD
    subgraph Backend["⚙️ Backend Stack"]
        N["💚 Node.js"]
        E["🚂 Express 5.1"]
        P["🔷 Prisma ORM 6.6"]
        PG["🐘 PostgreSQL"]
        JWT["🔑 JWT Auth"]
        J0["⚖️ Judge0 API"]
        GEM["🤖 Gemini AI"]
    end

    N --> E
    E --> P
    P --> PG
    E --> JWT
    E --> J0
    E --> GEM
```

### Complete Technology Stack

| Layer              | Technologies                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | React 19, Vite 6.2, TailwindCSS 4.1, DaisyUI 5.0, Zustand, Monaco Editor, React Router 7.5, Framer Motion, React Hook Form, Zod |
| **Backend**        | Node.js, Express 5.1, Prisma ORM 6.6, JWT, bcryptjs, Morgan, node-cron                                                          |
| **Database**       | PostgreSQL 14+                                                                                                                  |
| **AI/ML**          | Google Gemini AI (@google/generative-ai)                                                                                        |
| **Code Execution** | Judge0 API                                                                                                                      |
| **DevOps**         | Docker, Docker Compose                                                                                                          |

---

## 🏗 System Architecture

```mermaid
flowchart TB
    subgraph Client["🖥️ Client Layer"]
        Browser["🌐 Browser"]
        subgraph React["⚛️ React Application"]
            Pages["📄 Pages<br/>(Home, Problem, Profile, Auth)"]
            Components["🧩 Components<br/>(AI, Editor, Forms)"]
            Store["🐻 Zustand Store<br/>(Auth, Problem, Submission)"]
            Services["🔌 API Services"]
        end
    end

    subgraph Server["⚙️ Server Layer"]
        subgraph Express["🚂 Express Application"]
            Middleware["🔒 Middleware<br/>(Auth, CORS, Logger)"]
            Routes["🛣️ Routes<br/>(Auth, Problems, AI, Execute)"]
            Controllers["🎮 Controllers"]
            ServicesB["⚡ Services<br/>(AI, Code Execution)"]
        end
        Prisma["🔷 Prisma ORM"]
    end

    subgraph External["☁️ External Services"]
        Judge0["⚖️ Judge0 API<br/>(Code Execution)"]
        Gemini["🤖 Google Gemini<br/>(AI Features)"]
    end

    subgraph Database["🗄️ Database Layer"]
        PostgreSQL["🐘 PostgreSQL"]
    end

    Browser --> |HTTP/REST| Express
    Pages --> Components
    Components --> Store
    Store --> Services
    Services --> |Axios| Express

    Middleware --> Routes
    Routes --> Controllers
    Controllers --> ServicesB
    ServicesB --> Prisma
    ServicesB --> Judge0
    ServicesB --> Gemini
    Prisma --> PostgreSQL
```

---

## 🗄 Database Design

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ PROBLEM : creates
    USER ||--o{ SUBMISSION : makes
    USER ||--o{ PROBLEM_SOLVED : solves
    USER ||--o{ PLAYLIST : owns

    PROBLEM ||--o{ SUBMISSION : has
    PROBLEM ||--o{ PROBLEM_SOLVED : "solved by"
    PROBLEM ||--o{ PROBLEM_IN_PLAYLIST : "included in"

    SUBMISSION ||--o{ TEST_CASE_RESULT : contains

    PLAYLIST ||--o{ PROBLEM_IN_PLAYLIST : contains

    USER {
        uuid id PK
        string name UK
        string email UK
        string image
        enum role "ADMIN | USER"
        string password
        datetime createdAt
        datetime updatedAt
    }

    PROBLEM {
        uuid id PK
        string title
        text description
        enum difficulty "EASY | MEDIUM | HARD"
        array tags
        uuid userId FK
        json examples
        text constraints
        text hints
        text editorial
        json testCases
        json codeSnippets
        json referenceSolutions
        datetime createdAt
        datetime updatedAt
    }

    SUBMISSION {
        uuid id PK
        uuid userId FK
        uuid problemId FK
        json sourceCode
        string language
        text stdin
        text stdout
        text stderr
        text compileOutput
        string status
        string memory
        string time
        datetime createdAt
    }

    TEST_CASE_RESULT {
        uuid id PK
        uuid submissionId FK
        int testCase
        boolean passed
        text stdout
        text expected
        text stderr
        text compileOutput
        string status
        string memory
        string time
        datetime createdAt
    }

    PROBLEM_SOLVED {
        uuid id PK
        uuid userId FK
        uuid problemId FK
        datetime createdAt
    }

    PLAYLIST {
        uuid id PK
        string name
        text description
        uuid userId FK
        datetime createdAt
        datetime updatedAt
    }

    PROBLEM_IN_PLAYLIST {
        uuid id PK
        uuid playlistId FK
        uuid problemId FK
        datetime createdAt
    }

    TOKEN_BLACKLIST {
        uuid id PK
        string token UK
        datetime expiresAt
        datetime createdAt
    }
```

### Database Schema Details

#### User Model

| Field       | Type            | Description                |
| ----------- | --------------- | -------------------------- |
| `id`        | UUID            | Primary key                |
| `name`      | String (unique) | Username                   |
| `email`     | String (unique) | User email                 |
| `image`     | String?         | Profile picture URL        |
| `role`      | Enum            | ADMIN or USER              |
| `password`  | String          | Hashed password            |
| `createdAt` | DateTime        | Account creation timestamp |
| `updatedAt` | DateTime        | Last update timestamp      |

#### Problem Model

| Field                | Type     | Description                     |
| -------------------- | -------- | ------------------------------- |
| `id`                 | UUID     | Primary key                     |
| `title`              | String   | Problem title                   |
| `description`        | Text     | Full problem statement          |
| `difficulty`         | Enum     | EASY, MEDIUM, or HARD           |
| `tags`               | String[] | Category tags (Array, DP, etc.) |
| `userId`             | UUID     | Creator's user ID               |
| `examples`           | JSON     | Language-specific examples      |
| `constraints`        | String   | Problem constraints             |
| `hints`              | String?  | Optional hints                  |
| `editorial`          | String?  | Solution editorial              |
| `testCases`          | JSON     | Input/output test pairs         |
| `codeSnippets`       | JSON     | Starter code per language       |
| `referenceSolutions` | JSON     | Correct solutions per language  |

#### Submission Model

| Field           | Type    | Description                  |
| --------------- | ------- | ---------------------------- |
| `id`            | UUID    | Primary key                  |
| `userId`        | UUID    | Submitting user's ID         |
| `problemId`     | UUID    | Problem being solved         |
| `sourceCode`    | JSON    | Submitted code               |
| `language`      | String  | Programming language         |
| `stdin`         | String? | Input provided               |
| `stdout`        | String? | Execution output             |
| `stderr`        | String? | Error messages               |
| `compileOutput` | String? | Compilation errors           |
| `status`        | String  | Accepted, Wrong Answer, etc. |
| `memory`        | String? | Memory usage                 |
| `time`          | String? | Execution time               |

#### TestCaseResult Model

| Field          | Type    | Description       |
| -------------- | ------- | ----------------- |
| `id`           | UUID    | Primary key       |
| `submissionId` | UUID    | Parent submission |
| `testCase`     | Int     | Test case number  |
| `passed`       | Boolean | Pass/fail status  |
| `stdout`       | String? | Actual output     |
| `expected`     | String  | Expected output   |
| `status`       | String  | Execution status  |

#### Playlist & ProblemInPlaylist Models

| Model               | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `Playlist`          | User-created problem collections             |
| `ProblemInPlaylist` | Junction table for many-to-many relationship |

#### TokenBlacklist Model

| Field       | Type            | Description           |
| ----------- | --------------- | --------------------- |
| `id`        | UUID            | Primary key           |
| `token`     | String (unique) | Invalidated JWT token |
| `expiresAt` | DateTime        | Token expiration time |

---

## 📚 API Reference

### Base URL

```
Development: http://localhost:8080/api/v1
Production:  https://your-domain.com/api/v1
```

### Authentication Endpoints

| Method | Endpoint                | Description            | Auth Required |
| ------ | ----------------------- | ---------------------- | ------------- |
| `POST` | `/auth/register`        | Register new user      | No            |
| `POST` | `/auth/login`           | Login user             | No            |
| `POST` | `/auth/logout`          | Logout user            | No            |
| `GET`  | `/auth/check`           | Verify authentication  | Yes           |
| `GET`  | `/auth/get-submissions` | Get user's submissions | Yes           |
| `GET`  | `/auth/get-playlists`   | Get user's playlists   | Yes           |

### Problem Endpoints

| Method   | Endpoint                       | Description                | Auth Required |
| -------- | ------------------------------ | -------------------------- | ------------- |
| `GET`    | `/problems/get-all-problems`   | List all problems          | Yes           |
| `GET`    | `/problems/get-problem/:id`    | Get problem by ID          | No            |
| `POST`   | `/problems/create-problem`     | Create new problem         | Admin         |
| `PUT`    | `/problems/update-problem/:id` | Update problem             | Admin         |
| `DELETE` | `/problems/delete-problem/:id` | Delete problem             | Admin         |
| `GET`    | `/problems/get-solved-problem` | Get user's solved problems | Yes           |

### Code Execution Endpoints

| Method | Endpoint        | Description                  | Auth Required |
| ------ | --------------- | ---------------------------- | ------------- |
| `POST` | `/execute-code` | Execute code with test cases | Yes           |

### Submission Endpoints

| Method | Endpoint                                        | Description                 | Auth Required |
| ------ | ----------------------------------------------- | --------------------------- | ------------- |
| `GET`  | `/submissions/get-all-submissions`              | Get all submissions         | Yes           |
| `GET`  | `/submissions/get-submissions/:problemId`       | Get submissions for problem | Yes           |
| `GET`  | `/submissions/get-submissions-count/:problemId` | Get submission count        | Yes           |

### Playlist Endpoints

| Method   | Endpoint                               | Description                  | Auth Required |
| -------- | -------------------------------------- | ---------------------------- | ------------- |
| `GET`    | `/playlist`                            | Get all user playlists       | Yes           |
| `GET`    | `/playlist/:playlistId`                | Get playlist details         | Yes           |
| `POST`   | `/playlist/create-playlist`            | Create new playlist          | Yes           |
| `POST`   | `/playlist/:playlistId/add-problem`    | Add problem to playlist      | Yes           |
| `DELETE` | `/playlist/:playlistId`                | Delete playlist              | Yes           |
| `DELETE` | `/playlist/:playlistId/remove-problem` | Remove problem from playlist | Yes           |

### AI Endpoints

| Method | Endpoint                        | Description                      | Auth Required |
| ------ | ------------------------------- | -------------------------------- | ------------- |
| `GET`  | `/ai/hint/:problemId`           | Get progressive hints            | Yes           |
| `POST` | `/ai/debug`                     | Debug user's code                | Yes           |
| `GET`  | `/ai/explain/:problemId`        | Get solution explanation         | Yes           |
| `GET`  | `/ai/explain/:problemId/stream` | Stream solution explanation      | Yes           |
| `GET`  | `/ai/recommend`                 | Get personalized recommendations | Yes           |
| `POST` | `/ai/chat`                      | Chat with AI assistant           | Yes           |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** or **yarn**
- **PostgreSQL** v14 or higher
- **Docker** (optional)
- **Judge0** instance ([Installation Guide](judge0-installation-guide.md))
- **Google Gemini API Key**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/codeforge.git
cd codeforge
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Quick Start with Docker

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/codeforge"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Judge0 API Configuration
JUDGE0_API_URL="http://localhost:2358"
JUDGE0_API_KEY="your-judge0-api-key"

# Google Gemini AI
GEMINI_API_KEY="your-google-gemini-api-key"

# Server Configuration
PORT=8080
NODE_ENV="development"

# CORS Configuration
FRONTEND_URL="http://localhost:5173"
```

### Frontend (`frontend/.env`)

```env
VITE_BACKEND_URL="http://localhost:8080"
```

### Getting API Keys

| Service       | How to Get                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Gemini AI** | Visit [Google AI Studio](https://makersuite.google.com/app/apikey)                                                    |
| **Judge0**    | Follow [Judge0 Installation Guide](judge0-installation-guide.md) or use [Judge0 CE](https://github.com/judge0/judge0) |

---

## 🐳 Docker Deployment

### Docker Architecture

```mermaid
graph LR
    subgraph Docker["🐳 Docker Compose"]
        FE["📦 Frontend<br/>:5173"]
        BE["📦 Backend<br/>:8080"]
        DB["📦 PostgreSQL<br/>:5432"]
        J0["📦 Judge0<br/>:2358"]
    end

    FE --> BE
    BE --> DB
    BE --> J0
```

### Docker Commands

```bash
# Build images
docker-compose build

# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v
```

---

## 📁 Project Structure

```
CODEEFORGEE/
├── 📁 backend/
│   ├── 📁 prisma/
│   │   ├── 📄 schema.prisma          # Database schema definition
│   │   └── 📁 migrations/            # Database migration files
│   ├── 📁 src/
│   │   ├── 📁 controllers/           # Request handlers
│   │   │   ├── 📄 ai.controller.js        # AI feature handlers
│   │   │   ├── 📄 auth.controller.js      # Authentication handlers
│   │   │   ├── 📄 executeCode.controller.js
│   │   │   ├── 📄 playlist.controller.js
│   │   │   ├── 📄 problem.controller.js
│   │   │   └── 📄 submission.controller.js
│   │   ├── 📁 routes/                # API route definitions
│   │   │   ├── 📄 ai.routes.js
│   │   │   ├── 📄 auth.routes.js
│   │   │   ├── 📄 executeCode.routes.js
│   │   │   ├── 📄 playlist.routes.js
│   │   │   ├── 📄 problems.routes.js
│   │   │   └── 📄 submission.routes.js
│   │   ├── 📁 services/              # Business logic layer
│   │   │   └── 📄 ai.service.js
│   │   ├── 📁 middlewares/           # Custom middleware
│   │   │   └── 📄 auth.middleware.js
│   │   ├── 📁 libs/                  # Utility functions
│   │   │   ├── 📄 config.js
│   │   │   ├── 📄 db.js
│   │   │   └── 📄 problem.libs.js
│   │   └── 📄 index.js               # Server entry point
│   ├── 📄 Dockerfile
│   └── 📄 package.json
│
├── 📁 frontend/
│   ├── 📁 public/                    # Static assets
│   ├── 📁 src/
│   │   ├── 📁 pages/                 # Page components
│   │   │   ├── 📄 AddProblem.jsx
│   │   │   ├── 📄 HomePage.jsx
│   │   │   ├── 📄 LoginPage.jsx
│   │   │   ├── 📄 ProblemPage.jsx
│   │   │   ├── 📄 Profile.jsx
│   │   │   └── 📄 SignUpPage.jsx
│   │   ├── 📁 components/            # Reusable components
│   │   │   ├── 📁 AI/                # AI feature components
│   │   │   ├── 📄 AddProblemForm.jsx
│   │   │   ├── 📄 Layout.jsx
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 ProblemTable.jsx
│   │   │   └── 📄 ...
│   │   ├── 📁 store/                 # Zustand state stores
│   │   │   ├── 📄 useAuthStore.js
│   │   │   ├── 📄 useExecution.js
│   │   │   ├── 📄 useProblemStore.js
│   │   │   └── 📄 ...
│   │   ├── 📁 services/              # API service clients
│   │   │   └── 📄 aiService.js
│   │   ├── 📁 libs/                  # Utility functions
│   │   │   ├── 📄 axios.js
│   │   │   └── 📄 utils.js
│   │   ├── 📄 App.jsx
│   │   ├── 📄 main.jsx
│   │   └── 📄 index.css
│   ├── 📄 Dockerfile
│   └── 📄 package.json
│
├── 📄 docker-compose.yml             # Multi-container setup
├── 📄 README.md                      # This file
├── 📄 ARCHITECTURE_DIAGRAM.md        # System architecture docs
└── 📄 judge0-installation-guide.md   # Judge0 setup guide
```

---

## 📸 Screenshots

<details>
<summary><b>🏠 Home Page - Problem Listing</b></summary>
<br>
<p align="center">
  <i>Browse problems with difficulty filters, tags, and search functionality</i>
</p>
<!-- Add your screenshot: ![Home Page](./screenshots/home.png) -->
</details>

<details>
<summary><b>💻 Problem Solving Interface</b></summary>
<br>
<p align="center">
  <i>Monaco Editor with problem description, examples, and test cases</i>
</p>
<!-- Add your screenshot: ![Problem Page](./screenshots/problem.png) -->
</details>

<details>
<summary><b>🤖 AI Assistant Features</b></summary>
<br>
<p align="center">
  <i>AI Chat, Progressive Hints, Debug Helper, and Solution Explainer</i>
</p>
<!-- Add your screenshot: ![AI Features](./screenshots/ai-features.png) -->
</details>

<details>
<summary><b>👤 User Profile Dashboard</b></summary>
<br>
<p align="center">
  <i>Submission history, solved problems, and personal statistics</i>
</p>
<!-- Add your screenshot: ![Profile](./screenshots/profile.png) -->
</details>

<details>
<summary><b>📚 Playlist Management</b></summary>
<br>
<p align="center">
  <i>Create and manage custom problem collections</i>
</p>
<!-- Add your screenshot: ![Playlists](./screenshots/playlists.png) -->
</details>

---

## 🔒 Security Features

| Feature                      | Implementation                           |
| ---------------------------- | ---------------------------------------- |
| **Authentication**           | JWT tokens with HTTP-only cookies        |
| **Password Security**        | bcryptjs hashing with salt rounds        |
| **CORS Protection**          | Whitelist-based origin validation        |
| **SQL Injection Prevention** | Prisma ORM parameterized queries         |
| **Session Management**       | Token blacklisting on logout             |
| **Authorization**            | Role-based access control (RBAC)         |
| **Input Validation**         | Zod schema validation on frontend        |
| **XSS Protection**           | React's built-in escaping + sanitization |

---

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Linting

```bash
cd frontend
npm run lint
```

### Production Build

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
NODE_ENV=production node src/index.js
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2024

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
```

---

## 🙏 Acknowledgments

<table>
<tr>
<td align="center">
<a href="https://judge0.com/">
<img src="https://img.shields.io/badge/Judge0-Code%20Execution-orange?style=for-the-badge" alt="Judge0"/>
</a>
<br/>Code Execution Engine
</td>
<td align="center">
<a href="https://ai.google.dev/">
<img src="https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
</a>
<br/>AI Capabilities
</td>
<td align="center">
<a href="https://microsoft.github.io/monaco-editor/">
<img src="https://img.shields.io/badge/Monaco-Editor-blue?style=for-the-badge" alt="Monaco"/>
</a>
<br/>Code Editor
</td>
</tr>
<tr>
<td align="center">
<a href="https://www.prisma.io/">
<img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
</a>
<br/>Database ORM
</td>
<td align="center">
<a href="https://leetcode.com/">
<img src="https://img.shields.io/badge/LeetCode-Inspiration-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode"/>
</a>
<br/>Inspiration
</td>
<td align="center">
<a href="https://react.dev/">
<img src="https://img.shields.io/badge/React-Framework-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
</a>
<br/>Frontend Framework
</td>
</tr>
</table>

---

<p align="center">
  <strong>Built with ❤️ using React, Node.js, and AI</strong>
</p>

<p align="center">
  <a href="https://github.com/yourusername/codeforge/issues">Report Bug</a>
  ·
  <a href="https://github.com/yourusername/codeforge/issues">Request Feature</a>
  ·
  <a href="#-codeforge---ai-powered-coding-practice-platform">⬆️ Back to Top</a>
</p>

---

<p align="center">
  <sub>If you found this project helpful, please consider giving it a ⭐</sub>
</p>
 