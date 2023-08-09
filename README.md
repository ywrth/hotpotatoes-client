# Project Overview

Welcome to HotPotatoes! This README will guide you through the process of setting up the client-side of the myFlix app using React. The app interfaces with its pre-existing server-side code, which relies on a REST API and database.

## About the App

## Main Screen

1. Explore a vast collection of movies, each showcased with an appealing image, an engaging title, and a brief description.
2. Easily search through the movie list using the intuitive "search" feature.
3. Dive deeper into a movie's details by selecting it.
4. Effortlessly log out when you're done.
5. Seamlessly navigate to your Profile view.

## Individual Movie Details

- Gain comprehensive insights into a specific movie, including its description, genre, director, and an accompanying image.
- Personalize your experience by adding movies to your list of favorites.

## Login

- Securely log in using your credentials

## Signup

- New users can swiftly register by providing essential information, including username, password, email, and date of birth.

## Profile Management

- Access and review your registration details.
- Update your user information as needed, including username, password, email, and date of birth.
- Manage your favorite movies list effortlessly.
- Tailor your list of favorite movies by removing titles at your discretion.
- Existing users have the option to deregister.

# Getting Started

This project leverages the following technologies:

1. React
2. JSX
3. Bootstrap
4. Parcel (used as the build tool)

Setting Up the Development Environment
Install Parcel globally using the following command:

- npm install -g parcel

Install React and React DOM packages as project dependencies:

- npm install --save react react-dom

## Create a "src" folder within your project directory. Inside this folder, create the following three files:

index.jsx
index.scss
index.html

## Initiate the Parcel build process by running the following command in your terminal:

- parcel src/index.html
