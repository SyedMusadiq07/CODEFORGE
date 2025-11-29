# AI Components Architecture

## Component Tree

```
ProblemPage.jsx (Root)
├── Imports
│   ├── React, useState, useEffect
│   ├── Monaco Editor
│   ├── Lucide Icons
│   ├── React Router (Link, useParams)
│   ├── Zustand Stores (useProblemStore, useExecutionStore, useSubmissionStore, useAuthStore)
│   └── AI Components (HintButton, AIChatPanel, DebugButton, ExplainSolutionModal, AIRecommendations)
│
├── State Management
│   ├── id (from URL params)
│   ├── problem (from store)
│   ├── code (editor content)
│   ├── activeTab (description|submissions|discussion|hints)
│   ├── selectedLanguage (javascript|python|java|cpp)
│   ├── errorMessage (NEW - for debug trigger)
│   └── testCases (input/output pairs)
│
├── UI Structure
│   ├── Navbar
│   │   ├── Home Link
│   │   ├── Problem Title & Stats
│   │   ├── ExplainSolutionModal Button (NEW)
│   │   ├── AIRecommendations Button (NEW)
│   │   ├── Bookmark Button
│   │   ├── Share Button
│   │   └── Language Selector
│   │
│   ├── Main Content (2-column grid)
│   │   ├── Left Panel (Problem Details)
│   │   │   ├── Tabs (description|submissions|discussion|hints)
│   │   │   └── Tab Content
│   │   │       ├── Description Tab (problem text, examples, constraints)
│   │   │       ├── Submissions Tab (SubmissionsList component)
│   │   │       ├── Discussion Tab (placeholder)
│   │   │       └── Hints Tab (MODIFIED)
│   │   │           ├── HintButton Component (NEW)
│   │   │           └── Static hints from database
│   │   │
│   │   └── Right Panel (Code Editor)
│   │       ├── Monaco Editor (600px height)
│   │       └── Action Bar (MODIFIED)
│   │           ├── Run Code Button
│   │           ├── DebugButton (NEW - conditional on error)
│   │           └── Submit Solution Button
│   │
│   ├── Test Results Section
│   │   └── Submission Component OR Test Cases Table
│   │
│   └── AIChatPanel (NEW - floating, bottom-right)
│       ├── Toggle Button (sparkle icon)
│       └── Chat Window (conditional)
│           ├── Message History
│           └── Input Field
```

## Component Details

### 1. HintButton.jsx
```
┌─────────────────────────────────────┐
│  💡 Get AI Hint (Level 1)          │
│  [Loading...]                       │
│  ┌──────────────────────────────┐  │
│  │ ℹ️  HINT LEVEL 1              │  │
│  │ Think about using a hash map  │  │
│  │ to store frequencies...       │  │
│  │                               │  │
│  │ [Need more help? Level 2 →]   │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Props**: `problemId`
**State**: `hints` (array), `currentLevel` (1-3), `isLoading`
**API**: `GET /ai/hint/:problemId?level=X`

### 2. AIChatPanel.jsx
```
Fixed Position (bottom-right)
┌──────────────────────────────┐
│ ✨ AI Assistant          [X] │
├──────────────────────────────┤
│ 💬 Empty state message       │
│ • Understanding problems     │
│ • Algorithm approaches       │
│ • Debugging help             │
├──────────────────────────────┤
│ Chat Bubbles (when active):  │
│ ┌─────────────────────┐      │
│ │ User: How to solve? │      │
│ └─────────────────────┘      │
│      ┌───────────────────┐   │
│      │ AI: Use two       │   │
│      │ pointers approach │   │
│      └───────────────────┘   │
├──────────────────────────────┤
│ [Ask AI anything...] [Send]  │
└──────────────────────────────┘
```

**Props**: `problemId`
**State**: `messages` (array), `input`, `isLoading`, `isOpen`
**API**: `POST /ai/chat`

### 3. DebugButton.jsx
```
Conditional Render (only if errorMessage exists)
┌─────────────────────────────────────┐
│  🐛 Debug with AI                   │
│                                     │
│  Modal (on click):                  │
│  ┌────────────────────────────────┐│
│  │ 🐛 AI Debug Analysis        [X]││
│  ├────────────────────────────────┤│
│  │ ⚠️ Error Detected              ││
│  │ SyntaxError: missing )         ││
│  ├────────────────────────────────┤│
│  │ 📊 Analysis                    ││
│  │ You forgot closing parenthesis ││
│  │ on line 15...                  ││
│  ├────────────────────────────────┤│
│  │ ✅ Suggestions                 ││
│  │ 1. Add ) after array access    ││
│  │ 2. Check bracket matching      ││
│  ├────────────────────────────────┤│
│  │ 💻 Suggested Fix               ││
│  │ arr[i]) // ← Add this          ││
│  └────────────────────────────────┘│
└─────────────────────────────────────┘
```

**Props**: `problemId`, `code`, `language`, `errorMessage`
**State**: `debugAnalysis`, `isLoading`, `showAnalysis`
**API**: `POST /ai/debug`

### 4. ExplainSolutionModal.jsx
```
┌──────────────────────────────────────┐
│  💡 Explain Solution                 │
│                                      │
│  Modal (on click):                   │
│  ┌─────────────────────────────────┐│
│  │ 💡 Solution Explanation      [X]││
│  ├─────────────────────────────────┤│
│  │ [1] Problem Understanding       ││
│  │ This is a classic two-sum...    ││
│  ├─────────────────────────────────┤│
│  │ [2] Algorithm Approach          ││
│  │ Use hash map to store seen...   ││
│  ├─────────────────────────────────┤│
│  │ [3] Code Walkthrough            ││
│  │ Line 1: Initialize map...       ││
│  ├─────────────────────────────────┤│
│  │ 💻 Reference Code               ││
│  │ function twoSum(nums, target)   ││
│  ├─────────────────────────────────┤│
│  │ ⏱️ Time: O(n) | 💾 Space: O(n)  ││
│  ├─────────────────────────────────┤│
│  │ ⚡ Optimization Tips             ││
│  │ ⚠️ Common Mistakes              ││
│  └─────────────────────────────────┘│
└──────────────────────────────────────┘
```

**Props**: `problemId`
**State**: `explanation`, `isLoading`, `isOpen`
**API**: `GET /ai/explain/:problemId`

### 5. AIRecommendations.jsx
```
┌──────────────────────────────────────┐
│  🎯 Get Recommendations              │
│                                      │
│  Modal (on click):                   │
│  ┌─────────────────────────────────┐│
│  │ 📈 AI Recommendations        [X]││
│  ├─────────────────────────────────┤│
│  │ ℹ️ Based on your progress...    ││
│  ├─────────────────────────────────┤│
│  │ ┌──────────────────────────┐    ││
│  │ │[#1] [Medium] [Array]     │    ││
│  │ │ Three Sum Problem         │    ││
│  │ │ Next logical step after   │    ││
│  │ │ mastering two-sum...      │    ││
│  │ │ ℹ️ Strengthens hash maps   │    ││
│  │ └──────────────────────────┘    ││
│  │ ┌──────────────────────────┐    ││
│  │ │[#2] [Hard] [DP]          │    ││
│  │ │ Longest Increasing Sub... │    ││
│  │ └──────────────────────────┘    ││
│  └─────────────────────────────────┘│
└──────────────────────────────────────┘
```

**Props**: `userId`
**State**: `recommendations`, `isLoading`, `isOpen`
**API**: `GET /ai/recommend?userId=xxx`

## Data Flow

### Example: User Clicks "Get AI Hint"

```
1. User clicks button
   ↓
2. HintButton.jsx
   - Sets isLoading = true
   - Calls aiService.getHint(problemId, 1)
   ↓
3. aiService.js
   - Makes GET request to /api/v1/ai/hint/:problemId?level=1
   - Returns promise
   ↓
4. Backend ai.controller.js
   - Validates problemId exists
   - Calls ai.service.js generateHint()
   ↓
5. Backend ai.service.js
   - Fetches problem from database
   - Constructs Gemini prompt based on level
   - Calls Gemini API
   - Returns hint text
   ↓
6. Response flows back to frontend
   ↓
7. HintButton.jsx
   - Stores hint in state (cache)
   - Sets isLoading = false
   - Displays hint in alert box
   ↓
8. User sees hint and "Need more help" button
```

## State Management Patterns

### Local State (useState)
- Modal visibility (`isOpen`, `showAnalysis`)
- Loading states (`isLoading`, `isExecuting`)
- Input fields (`input`, `code`)
- Cached data (`hints`, `messages`)

### Zustand Stores
- `useProblemStore`: Problem details, loading state
- `useExecutionStore`: Code execution results
- `useSubmissionStore`: User submissions history
- `useAuthStore`: Current user info (NEW - for recommendations)

### Props Drilling
- `problemId`: Passed to all AI components
- `code`: Passed to DebugButton
- `language`: Passed to DebugButton
- `errorMessage`: Passed to DebugButton
- `userId`: Passed to AIRecommendations

## Styling System

### DaisyUI Classes Used
- `btn btn-primary` - Primary action buttons
- `btn btn-error` - Debug button (red)
- `btn btn-info` - Explain button (cyan)
- `btn btn-accent` - Recommendations (purple)
- `modal modal-open` - Full-screen modals
- `alert alert-info` - Hint boxes
- `chat chat-start/chat-end` - Chat bubbles
- `badge badge-success/warning/error` - Difficulty tags
- `card bg-base-100` - Content containers

### Custom Styling
- Fixed positioning for AIChatPanel: `fixed bottom-6 right-6 z-50`
- Max heights for scrollable content: `max-h-[60vh] overflow-y-auto`
- Grid layout preservation: No changes to existing `grid-cols-1 lg:grid-cols-2`

## Error Boundaries

### Try-Catch Blocks
Every API call wrapped in try-catch:
```javascript
try {
  const response = await aiService.method();
  // Success handling
} catch (error) {
  toast.error(error.message);
  console.error('Error:', error);
  // Cleanup (close modals, reset state)
}
```

### Graceful Degradation
- No AI responses → Show "No data available" message
- Network error → Toast notification + retry option
- Authentication error → Redirect to login (handled by axios interceptor)

## Performance Optimizations

### 1. Hint Caching
```javascript
const [hints, setHints] = useState({ 1: null, 2: null, 3: null });

// Check cache before API call
if (hints[level]) {
  // Use cached hint
} else {
  // Fetch from API
}
```

### 2. Conditional Rendering
```javascript
{errorMessage && <DebugButton />}  // Only mounts when needed
{isOpen && <ModalContent />}       // Only renders when open
```

### 3. Lazy Modal Loading
- Modals don't fetch data until opened
- Prevents unnecessary API calls on page load

## Accessibility Features

### Keyboard Navigation
- All modals: `Esc` key closes
- Chat input: `Enter` sends message
- Buttons: Tab-navigable

### Screen Readers
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- Icon buttons have `title` attributes
- Loading states announced

### Visual Indicators
- Loading spinners for async operations
- Disabled states when actions unavailable
- Color coding (not sole indicator - text labels too)

---

This architecture ensures maintainability, scalability, and user-friendly AI integration!
