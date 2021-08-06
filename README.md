# Reel'n
### A fishing tournament app for anyone who loves fishing and anyone who wants to see how they fare against other anglers.
### A fully-responsive full-stack web app for creating invitational or public fishing competitions created with React.js and Node.js supplemented with Express.

- Designed and built a fully responsive client-side React.js components while managing URL paths with hash routing.
- Included multer as a file upload middleware to store and handle image files uploaded by users.
- Relayed client to server requests via Node.js and Express.js in order to update the PostgreSQL database field/value pairs.
- Integrated user authentication with argon2 to allow persisting user sessions and saving user data in a JSON web token.

## Why I wanted to build this project

A couple of friends and I would have annual fishing competitions where the one who found and caught the most amount of species of fish would win. The losers would pay for the upcoming year's fishing license for the winner! We would keep track of what was caught during the year on a piece of paper (which would get totally destroyed when we would carry it around with us and dropping it into water :joy:). I figured this would be the perfect alternative for the piece of paper, and at the same time, open this little game up for anyone else to enjoy!

## Technologies Used

- React.js
- Node.js
- Express.js
- PostgreSQL
- JSON web token(jwt)
- Argon2
- Multer
- Babel
- Webpack
- pg (PostgreSQL client for Node.js)
- CSS3
- Javascript ES6

## Live Demo

Try the application live at [https://reeln.herokuapp.com/](https://reeln.herokuapp.com/)

## Features

- User can register an account and sign-in with persisting sessions.
- User can create a fishing tournament.
- User can join an open(public) tournament.
- User can see all tournaments that they are participating in and tournaments they have participated in.
- User can submitted a catch in a tournament they are participating in.
- User can view leaderboards for all tournaments.

## Preview

#### Mobile app
##### User log-in. View tournaments. Register to join an open tournament.
![reeln-demo-mobile](https://user-images.githubusercontent.com/82009814/128575620-58eac792-8653-4199-8ab5-3a111ec10865.gif)

#### Browser view
##### View lists of past/current/open tournaments. Log a catch for a current tournament. View updated leaderboard and the fish details after logging the catch.
![reeln-demo-browser-sm](https://user-images.githubusercontent.com/82009814/128576184-f299aaff-ef19-401d-a52c-d99a0adaab00.gif)

## Stretch Features

- Tournament hosts can invite other users to a closed tournament.
- All users can log their catch into their own personal album/journal.
- Users can chat among other tournament participants.

## Development

### System Requirements

- VS Code or any similar IDE supporting JavaScript ES6
- Node.js 14 or higher
- NPM 7 or higher
- PostgreSQL 12 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:theDanielTo/Reeln.git
    cd reeln
    ```
    
2. Install all dependencies with NPM.

    ```shell
    npm install
    ```
    
3. Import the example database to PostreSQL.

    ```shell
    npm run db:import
    ```

4. Start the project. Once started you can view the application by opening http://localhost:3030 in your browser.

    ```shell
    npm run dev
    ```
