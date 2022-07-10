# AI Chat App

### AI Features

Since the code for the AI portion was written in Alan's SDK, the code is in the `AlanAICode` directory which you could use if you would like to fork the project and test a couple things out.

- Users are able to find and join rooms just by asking a command to the AI and the AI will automatically find
the room that the user is looking for.
- The AI also has the ability to delete and open a room

### About the AI

- It is a 3rd party library called [AlanAI](https://alan.app/). It gives the ability for developers
to be able to add a voice assistant to their projects or application.
- Open source library
- Compatible with javascript so easy to learn, use, and maintain
- #### How does it work?
  If you are interested in how the AlanAI works, go to their docs [here](https://alan.app/docs/).

### Application Features

- Create rooms, channels, and talk to people
- Make CRUD operations with the integrated AI assistant

### Application technologies

- The application is written in Javascript, React as the HTML portion, and CSS3.
- The stack in which was used is the MERN stack.
- MongoDB and mongoose were used for the purpose of storing necessary data from the user.
- Used Bcrypt for password hashing and json web tokens for security and authentication.
- For live persistent connection between clients, websockets were used from the
library Socket.IO.

### Application backend

- Consists of Express and NodeJS as the server implementation.
- For web sockets, SocketIO is used and uses port `5000` on `localhost` and uses the
root directory during production, so the API routes and the web sockets are all hosted on
the same port.
- Also saves uploaded images from the client and stores them in the backend. In the case of
using `localhost`, it will be saved onto the developer's system, but saved onto the hosting service's
server while in production like heroku.

## Installation Requirements

### `git clone https://github.com/Maxdev18/AI-Chat-App.git`

Clones the repository to specified directory onto your system.

### `npm install` or `npm i`

Install all necessary dependencies and packages required to run the application.
You will need to do this in the root directory and the client directory.

### `npm run dev`

Runs both the front and back end servers concurrently and seperate from each other. Front-end runs
on `localhost:3000`, and back-end runs on `localhost:5000`. The back-end only contains
the back-end route/s for the admin login.

## Neccessary environment variables
In order to run the application with all the features, you will need to set your own
ENV variables. There are ENV variables for the frontend and the backend which consists
from Google, EmailJS, JWT, and the MongoDB API keys. Since this was built with react, you will
need to initialize the frontend ENV variable with `REACT_APP`.

### Frontend environment variables
`REACT_APP_OAUTH_SECRET`\
`REACT_APP_EMAILJS_SERVICE_ID`\
`REACT_APP_EMAILJS_TEMPLATE_ID`\
`REACT_APP_EMAILJS_USER_ID`\
`REACT_APP_ALAN_KEY`

### Backend environment variables
`MONGO_ID`\
`JWT_SECRET`\
`EMAILJS_SERVICE_ID`\
`EMAILJS_TEMPLATE_ID`\
`EMAILJS_USER_ID`\
`CLOUD_NAME`\
`CLOUD_API_KEY`\
`CLOUD_API_SECRET`