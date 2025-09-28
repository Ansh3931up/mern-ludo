<h1  align="center">Online Multiplayer Ludo Game </h1>

Ludo Online is a multiplayer web-based implementation of the classic board game Ludo, built using the MERN stack and integrated with SocketIO for real-time communication.
  
<p align="center">
>> <a href="https://youtu.be/mGMnH9Nvsyw">Watch YouTube Video here</a> <<
  </p>

## Architecture

![Interface](https://github.com/Wenszel/mern-ludo/blob/main/src/images/architecture.png?raw=true)

## Tech Stack

Frontend:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

Backend:

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Tests:

![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

Other:

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)

## Key Features and Challenges

-   Maintained session consistency with **Express Session** and **MongoDB**.

-   Enabled real-time communication via **WebSocket** and **SocketIO**.

-   Maintained code reliability by implementing unit and integration tests using **Mocha**, **Chai**, and **Jest**.

-   Implemented E2E tests utilizing **Cypress**, addressing challenges related to [testing collaboration](https://docs.cypress.io/guides/references/trade-offs#Multiple-browsers-open-at-the-same-time) and canvas functionality in the application.

-   Established a CI/CD pipeline using **CircleCI**, with pushing **Docker** container to **AWS ECR** and deploying to **AWS ECS**


## Installation

1.  Download this repository

2.  Generate your own [mongoDB atlas](https://www.mongodb.com) credential URL. It should looks like this:

```

mongodb+srv://madmin:<password>@clustername.mongodb.net/<dbname>?retryWrites=true&w=majority

```

3.  Add this URL to the /backend/.env file (refer to .env.example)

4.  Perform these commands in the main directory:

```
npm i
npm start
cd backend
npm i
node server.js
```

## Screenshots

![Interface](https://github.com/Wenszel/mern-ludo/blob/main/src/images/readme1.png?raw=true)

![Interface](https://github.com/Wenszel/mern-ludo/blob/main/src/images/lobby.png?raw=true)

![Interface](https://github.com/Wenszel/mern-ludo/blob/main/src/images/winner.png?raw=true)

---

## 🚀 Recent Updates and Improvements (By:Ansh Kumar)

### Initialization Setup

#### Backend Environment Configuration
1. **Create `.env` file in the backend directory:**
   ```bash
   cd backend
   touch .env
   ```

2. **Add the following environment variables to `backend/.env`:**
   ```env
   PORT=8080
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string_here
   ```

3. **Start the backend server:**
   ```bash
   cd backend
   npm run test 
   <!-- added dev and start in script -->
   npm run dev
   # or
   npm start
   ```

### 🔍 Finding All Changes Made

To view all the modifications and improvements made to the codebase, search for:
```bash
grep -r "//Changes :" .
```

This will show all locations where changes were documented using the `//Changes :` comment pattern.

---

## 📋 Summary of Changes and Optimizations

### 🎯 Backend Improvements

#### 1. **Server Configuration (`backend/server.js`)**
- ✅ Added fallback PORT configuration (`PORT=8080`)
- ✅ Added server startup logging for better debugging
- ✅ Enhanced error handling and server initialization

#### 2. **Package Management (`backend/package.json`)**
- ✅ Added `dev` and `start` scripts for easier development
- ✅ Improved npm script organization

#### 3. **Pawn Schema Enhancements (`backend/models/pawn.js`)**
- ✅ Added `score` field with default value 0
- ✅ Implemented `addScore(points)` method for score management
- ✅ Added `resetScore()` method for score reset functionality
- ✅ Created `getScore()` method for score retrieval
- ✅ Enhanced `getPositionAfterMove()` with default case handling

#### 4. **Player Schema Updates (`backend/models/player.js`)**
- ✅ Added `totalScore` field for tracking player's cumulative score

#### 5. **Game Handler Optimizations (`backend/handlers/gameHandler.js`)**
- ✅ Integrated scoring system with pawn movement
- ✅ Added real-time score updates using Socket.IO
- ✅ Implemented DRY principle with scoring helpers
- ✅ Enhanced move validation and score calculation

#### 6. **Scoring System (`backend/handlers/scoringHandler.js`)**
- ✅ Created centralized scoring logic
- ✅ Implemented player total score calculation
- ✅ Added score aggregation and distribution methods

#### 7. **Test Improvements (`backend/tests/schemas/room.test.js`)**
- ✅ Refactored tests to use pawn schema methods instead of duplicate logic
- ✅ Added comprehensive pawn method tests (getScore, addScore, resetScore, canMove)
- ✅ Implemented proper score initialization in test setup
- ✅ Enhanced test coverage for pawn functionality

### 🎨 Frontend Optimizations

#### 1. **Gameboard Component (`src/components/Gameboard/Gameboard.jsx`)**
- ✅ Integrated ScoreBoard component for real-time score display
- ✅ Enhanced component structure and imports

#### 2. **Map Component Improvements (`src/components/Gameboard/Map/Map.jsx`)**
- ✅ Enhanced canvas error handling with try-catch blocks
- ✅ Improved touchable area validation for pawns
- ✅ Fixed overlapping pawn rendering logic
- ✅ Optimized pawn positioning and interaction
- ✅ Added graceful error handling for canvas operations

#### 3. **ScoreBoard Component (`src/components/ScoreBoard/ScoreBoard.jsx`)**
- ✅ **Performance Optimization**: Implemented `useMemo` for sorted players array
- ✅ Added real-time score updates via Socket.IO
- ✅ Enhanced score display with proper sorting
- ✅ Optimized re-rendering with memoized calculations

### 🧪 Testing Enhancements

#### 1. **Room Model Tests**
- ✅ Comprehensive testing of pawn schema methods
- ✅ Score management functionality tests
- ✅ Movement validation tests
- ✅ Position calculation tests

#### 2. **Code Quality Improvements**
- ✅ Applied DRY (Don't Repeat Yourself) principle
- ✅ Enhanced error handling throughout the application
- ✅ Improved code maintainability and readability

### 🚀 Performance Optimizations

1. **Frontend Performance:**
   - ✅ Used `useMemo` hook for expensive sorting operations
   - ✅ Optimized re-rendering cycles
   - ✅ Enhanced canvas rendering efficiency

2. **Backend Performance:**
   - ✅ Centralized scoring logic to reduce code duplication
   - ✅ Optimized database operations
   - ✅ Improved real-time communication efficiency

### 🔧 Development Experience

1. **Better Debugging:**
   - ✅ Added comprehensive logging
   - ✅ Enhanced error messages
   - ✅ Improved development server setup

2. **Code Organization:**
   - ✅ Consistent change documentation with `//Changes :` comments
   - ✅ Modular scoring system implementation
   - ✅ Enhanced test coverage and structure

---

## 🎮 New Features Added

### Real-time Scoring System
- Players now accumulate points based on dice rolls
- Scores are transferred when pawns capture opponents
- Real-time score updates across all connected clients
- Persistent score tracking throughout the game

### Enhanced Game Logic
- Improved pawn movement validation
- Better handling of overlapping pawns
- Enhanced canvas interaction and error handling
- Optimized game state management

---

## 🔧 Technical Debt Addressed

1. **Code Duplication:** Eliminated duplicate logic between schemas and tests
2. **Error Handling:** Added comprehensive error handling for canvas operations
3. **Performance:** Optimized sorting and rendering operations
4. **Maintainability:** Improved code organization and documentation
5. **Testing:** Enhanced test coverage and reliability

---

*All changes are documented with `//Changes :` comments throughout the codebase for easy tracking and maintenance.*
