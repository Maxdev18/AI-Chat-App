# AI Chat App

This is a complete full-stack chat app using primarily the MERN stack. The web application is also\
published in a public [domain](insert url here). Some of the basic functionality of the app consists the user\
being able to create rooms and joins rooms. One thing that mainly stands out is the integration of AI.\

### AI Features

- Users are able to find and join rooms just by asking a command to the AI and the AI will automatically find\
the room that the user is looking for.
- The AI also has the ability of creating rooms on command, rather\
than the user clicking through mulitple times to create a room.
- Ability for adding people to a room on command rather than typing it out and maybe misspelling\
a user name. Or, the user can tell the AI the user's id.
- Can kick out people from a room.

### About the AI

- It is a 3rd party library called [AlanAI](https://alan.app/). It gives the ability for developers\
to be able to add a voice assistant to their projects or application.
- Open source library
- Compatible with javascript so easy to learn, use, and maintain
- #### How does it work?
  If you are interested in how the AlanAI works, go to their docs [here](https://alan.app/docs/).

### Application Features

- Create rooms and talk to people
- Make CRUD operations with integrated AI

### Application technologies

- The application is written in Javascript, React as the HTML portion, and CSS3.
- The stack in which was used is the MERN stack.
- MongoDB and mongoose were used for the purpose of storing necessary data from the user.
- Used Bcrypt for password hashing and json web tokens for security and authentication.
- For live persistent connection between clients, websockets were used from the\
library Socket.IO.

### Application back-end

- There is an admin back-end route with overview of the site.
- Includes a dashboard with current number of active sockets, total number of users registered,\
current active users, etc.
- Used a library called ChartJS for rendering charts and graphs easier.
- No way for anyone to get into the admin panel, obviuosly for security reasons, so I have\
taken screenshots instead.

## Installation Requirements

### `git clone https://github.com/Maxdev18/AI-Chat-App.git`

Clones the repository onto your system.

### `npm install` or `npm i`

Install all necessary dependencies and packages required to run the application.

### `npm run dev`

Runs both the front and back end servers concurrently and seperate from each other. Front-end runs\
on `localhost:3000`, and back-end runs on `localhost:5000`. The back-end only contains\
the back-end route/s for the admin login.