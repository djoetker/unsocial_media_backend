# Unsocial Media Platform
This project is a simple social media platform where users can post and comment text and hyperlinks (that are sanitized with DOMpurify) without the need for registration or user data. It provides basic functionality such as posting, commenting, searching for hashtags or words, and infinite scrolling to view posts.

### Deployed version on render.com:

https://unsocial-media-frontend.onrender.com/

(it might take a moment for the posts to load, render.com instance will spin down with inactivity, which can delay requests by 50 seconds.)

### Features

+ **Post Creation:** Users can create new posts without registration.
+ **Commenting:** Users can comment on posts.
+ **Hashtag Search:** Users can search for posts containing specific hashtags or words.
+ **Infinite Scrolling:** Posts are loaded dynamically as the user scrolls, providing a seamless browsing experience.

## Technologies Used

### Frontend:

React.js, React Router DOM, React Infinite Scroll Component, Axios, DOMPurify

### Backend:

Node.js, Express.js, MongoDB, Mongoose, Axios, dotenv, cors

## Installation

After cloning the repositories:

### Navigate to frontend directory
cd frontend
npm install

### Navigate to backend directory
cd ../backend
npm install

### .env
Set up .env file in both directories as seen in .env.sample

### Usage
In both frontend and backend directoy run "npm run dev".
