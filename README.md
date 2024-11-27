# Skribble - Multiplayer Drawing Game

Skribble is a simple multiplayer online drawing and guessing game, inspired by "Skribbl.io". Players join a room, take turns drawing a word, while others try to guess the word. This game uses WebSockets for real-time interaction and drawing.

## Features

- Create and join rooms to play with friends.
- Draw and guess words in real-time.
- Score tracking for players.
- Timer countdown for rounds.
- Chat system to interact with other players.
- Clear canvas and change drawing colors.

## Technologies Used

- **Backend**: Node.js with Express
- **WebSockets**: Socket.IO for real-time communication
- **Frontend**: HTML, CSS, EJS templating engine
- **Database**: In-memory storage for rooms (no database used)
- **Canvas**: For drawing

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**:
   git clone https://github.com/your-username/skribble.git
   
2. **Navigate to the project directory:**
cd skribble

3. **Install dependencies:**
npm install

4. **Run the application:**
You can start the server using nodemon (it will automatically restart on changes) or node:
npm start
The application will be accessible at http://localhost:3002.


**File Structure**
Here is a brief description of the important files and directories in the project:

**├── public/                # Static files (CSS, JavaScript, images)**

**│   ├── styles/            # Styles for the game**

**│   └── js/                # JavaScript files for game functionality**

**├── views/                 # EJS templates for rendering HTML**

**│   └── game.ejs           # The main game page template**

**├── index.js               # Main server file for the backend**
**├── package-lock.json   **

**├── package.json           # Project dependencies and scripts**

**└── README.md              # Project documentation**

## How the Game Works
**Room Creation:** Users can create or join a room by visiting the game page and entering a room number.

**Drawing:** Once in the room, a user is selected to draw a word from a list of predefined options. They draw it on the canvas, and others try to guess the word.

**Guessing:** Players type in their guesses in the chat, and the first player to guess correctly wins points.

**Timer:** Each round has a countdown timer, which can be controlled by the host.

**Rounds:** The game proceeds in rounds. At the end of each round, the scores are updated and a new word is selected for drawing.


## Usage
**Create Room:** Go to the /createroom route to create a new game room.
**Join Room:** Go to /joinroom?room=<room_number> to join an existing room.
**Start Game:** Once players are in the room, the host can start the game by triggering the startgame event.
**Play the Game:** Players draw and guess words, with scores being updated in real-time.








