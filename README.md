# Tic-Tac-Toe

A modern, responsive **Tic-Tac-Toe** game built with **Vanilla JavaScript**, **HTML5**, and **CSS3** — no frameworks, no libraries.  
Play locally with a friend or challenge the computer’s AI in a smooth, minimal UI.

---

## Features

- Local two-player mode  
- AI mode powered by the **Minimax algorithm**  
- Dynamic 3×3 grid created with JavaScript  
- Scoreboard tracking wins and draws  
- Fully responsive for desktop, tablet, and mobile  
- Animated hover and highlight effects  
- Simple reset and replay system  

---

## Game Modes

### Local Play
Two players take turns on the same device, alternating between **X** and **O**.  
The first to align three symbols in a row, column, or diagonal wins.

### Vs AI
Challenge the computer!  
The AI uses the **Minimax algorithm**, which simulates every possible move to determine the best one.  
This makes it almost impossible to beat in difficult mode.

---

## How to Run

### Option 1 — Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/1st-blackhat/tictactoe.git
   ```

2. Navigate into the project folder:
   ```bash
   cd tictactoe
   ```

3. Open the file in your browser:
   ```bash
   index.html
   ```

### Option 2 — Live Demo

You can try it online here:  
👉 Live Demo — https://1st-blackhat.github.io/Tic-Tac-Toe-/

---

## Tech Stack

| Category      | Technology / Details |
|---------------|----------------------|
| Frontend      | HTML5, CSS3, JavaScript (ES6+) |
| AI Logic      | Minimax algorithm (implemented in vanilla JS) |
| Styling       | CSS Grid, CSS animations |
| Fonts         | Google Fonts — Poppins, Montserrat |
| Hosting       | GitHub Pages (optional) |
| Tools / Build | None — plain HTML/CSS/JS (no bundler) |

---

## Project structure

The section below describes the current, minimal project layout and a recommended, clearer structure if you later decide to reorganize the codebase. This README reflects the repository as-is and offers an optional refactor suggestion.

Current (repository files)

```
Tic-Tac-Toe-/
│
├── tictactoe.html        # Main HTML structure (landing + game screen)
├── tictactoe.js          # Core game logic + AI system
├── styles.css            # Styling and animations
├── README.md             # Project documentation
└── assets/               # Icons, screenshots, and other visuals
```

Recommended (optional, clearer convention)

```
Tic-Tac-Toe-/
│
├── index.html            # App entry point (rename from tictactoe.html)
├── js/
│   └── app.js            # Core game logic + AI (rename from tictactoe.js)
├── css/
│   └── styles.css        # Styling and animations
├── assets/               # Icons, screenshots, and other visuals
└── README.md             # Project documentation
```

Notes:
- The "Recommended" layout is optional — it improves discoverability for new contributors and matches common web project conventions. If you'd like, I can rename files and move them into these folders (option B from earlier). 

---

## What I Learned

- How to handle DOM manipulation effectively
- Implementing a real game loop in pure JavaScript
- Applying the Minimax algorithm to make an unbeatable AI
- Designing a responsive and flexible layout using only CSS Grid
- Organizing multi-screen logic within a single page app

### Future Improvements

- Add sound effects and subtle animations
- Add undo and redo moves
- Add light/dark themes
- Add multiplayer support using WebSockets

### Author

Black hat  

Front-End Developer and JavaScript Enthusiast

- GitHub: @1st-blackhat
- Email: auto7matic000@gmail.com

### License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this code for personal or commercial purposes. 


If you find this project helpful, consider giving it a star on GitHub — it really helps.
