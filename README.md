# SightReader

## About our App

Welcome to SightReader, the perfect sight-reading companion for all music learners. Here users will be able to practice the fundamental skills of reading notes from a music score in the comfort of their home, on-the-go, or in the classroom. 



Join our growing community now!

## Installation & Usage

#### Github steps
- Fork the repo (top right of the page).
- Go to your forked repo, it will now say `<your-github-username>thefinalproject`.
- Click the green "code" button and copy the **SSH** option if you have already setup git in your terminal, or the **HTTPS** option if not.

#### Terminal commands (GITBASH FOR WINDOW USERS OR TERMINAL FOR MAC USERS)

- Go to the directory you want to clone in.
- Run `git clone <SSH key or HTTPS key>`.
- Then, `cd final-project`.
- Check branch is main using `git branch` otherwise `git checkout main`.
- Run `ls` to check files & folders which should have an "api" folder, "client" folder and "README.md" file.
- To open in VS code, `code .`.

#### How to install the libraries

- Change directory into the api by running `cd api`
- Install the dependancies by running `npm install`
- Now do the same in the client folder

#### How to connect the database

- Create a `.env` file within the api folder
- Login to [elephantsql](https://www.elephantsql.com)
- Create a new instance, you can name it "sightreader-db"
- In the details tab of your new db, copy the db URL
- Within your `.env` file, add `DB_URL={your copied URL}`
- Make sure the `.env` is in the `.gitignore` file!
- cd into the api folder if you aren't already, and run `npm run setup-db`
- You should see "Set-up complete." in your terminal

#### How to run the server

- To the `.env` file, add `PORT=3000`
- cd into the api folder if you aren't already, and run `npm run dev`
- You should see "API listening on 3000" in your terminal

**Make sure to leave the server running in the terminal for the next stages too.**

#### How to run the front-end

- In a separate terminal, cd into the client folder and run `npm run dev`
- Copy the link provided in the terminal and view the website in your browser

#### How to use
- Create an account on the register page and login with it on the login page.
- You will be redirected to the challenge, where you can navigate to various pages.
- You can complete challenges, view your assignments, check the leaderboard, see your friends and message them all from the profile page.
- You will also be interact with your tutor through this sight by adding their username to the application.

#### If you wish to make a change

- Go to your terminal
- Run `git status` and check files are red.
- Run `git add .` to add **all** files
  OR `git add <folder-name>` to add a specific folder
  OR `git add <folder-name/file-name>` to add a specific file
- Run `git status` again and check files are green.
- Then, commit by `git commit -m "<message>"`.
- Finally, run `git push`.
- Make a "Pull Request" to merge it to the original repository and request a review.

## Technology used

- HTML
- CSS
- Javascript
- React + Vite
- Express.js
- Figma
- Bcrypt encryption
- Jest testing

## License

ISC license

## Wins and challenges



## Bugs



## Future features

In the future we would add an `edit` feature which would allow a user to update a flashcard deck with new flashcards or to delete flashcards from the deck. We would also implement a `teacher` feature so that teachers could create an account and assign flashcards as homework to their students.
