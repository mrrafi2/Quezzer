

# Quezzer

Quezzer is a dynamic, modern quiz platform built with React, Firebase, and advanced CSS animations. It transforms learning into an engaging, competitive experience by combining interactive quiz content, real-time progress tracking, animated leaderboards, and comprehensive user account management.

## Features

- **Quiz Categories & Sequential Labels**
  - Organized quiz categories (e.g., Arts & Culture, History, Science & Nature, etc.) with multiple labels per category.
  - Enforces sequential progression: users must complete labels in order before moving forward.

- **Progress Overview**
  - Animated progress bar that fills as you complete quiz labels.
  - Milestone rewards: unlocks exclusive medals (ribbon at 20%, star at 50%, crown at 85%) as you achieve key progress thresholds.

- **Ranking System & Leaderboard**
  - Real-time leaderboard that ranks users based on cumulative quiz scores.
  - Displays user avatars, usernames, scores, and earned medals.
  - Top-ranked users receive special visual effects and neon styling.
  
- **Category Progress**
  - Detailed per-category progress pages (for your own account and for viewing other users’ progress).
  - Visual progress bars with animated gradients and percentage completions.
  
- **User Account Management**
  - Sign up, log in, and log out using Firebase Authentication.
  - Edit profile details including username, avatar icon, and avatar background color.
  - Dark mode toggle for personalized UI experiences.

- **Help & Documentation**
  - Engaging help pages that explain the ranking mechanism and progress overview features, ensuring users understand how their performance is tracked and rewarded.

- **Responsive & Futuristic Design**
  - Modern, neon–cyber aesthetic with advanced CSS animations (e.g., fade-ins, slide-ups, glitch effects) and transitions.
  - Fully responsive layouts for desktop and mobile devices.
  - Some parts use Framer Motion for smooth animations, while others rely on pure CSS for performance.

## Technologies & Libraries

- **React** (v19.0.0)
- **React Router DOM** (v7.1.5) – For routing between pages.
- **Firebase** – 
  - **Firebase Authentication:** Secure user management.
  - **Firebase Realtime Database:** Real-time storage for quiz data, user profiles, badges, and progress.
- **Framer Motion** (v12.4.7) – For advanced, smooth animations in components like the progress overview.
- **React Icons** (v5.5.0) – For vector icons throughout the app.
- - **Bootstrap** (v5) – For making resposive more easy to handle and simplification of some complex css styles.
- **CSS Modules & Modern CSS Animations** – To scope styling and deliver engaging animated effects.


## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrrafi2/Quezzer.git
   cd Quaser
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Firebase:**
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication (Email/Password) and the Realtime Database.
   - Copy your Firebase configuration into the appropriate file (`firebase.js`) or use environment variables.

4. **Run the application:**
   ```bash
   npm start
   ```
   Your app will run on `http://localhost:3000`.

## Usage

- **Sign Up / Log In:**  
  Create an account or log in using your credentials.
  
- **Take Quizzes:**  
  Select a quiz category and complete the labels in sequential order. You cannot skip a label until the previous ones are complete.
  
- **View Your Progress:**  
  Check your overall progress with progress bars and milestone medals.
  
- **See the Leaderboard:**  
  View the real-time ranking of all users based on their cumulative quiz scores. Special neon effects highlight top-3 ranked users.
  
- **Detailed Category Progress:**  
  Navigate to your category progress page or view other users’ progress for a deep dive into performance metrics.
  
- **Manage Your Account:**  
  Edit your username, avatar, and toggle dark mode via the account section.
  
- **Help Section:**  
  Visit the help page to understand the ranking, progress, and quiz mechanisms of Quezzer.

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your improvements. Ensure you follow the existing code style and include appropriate tests.

