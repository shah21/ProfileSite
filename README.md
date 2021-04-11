# Profile App

![react][react-url]
![typescript][types-url]
![node][npm-image]
![mongodb][mongo-url]

This project is a simple mern stack application that helps to maintain our profile . So you can create an account and edit your profile thats all 😄. This project can use to reference for creating a simple mern application with following features ⬇️

## Features
* JWT Authorization
* Password hashing
* Form Validation
* CRUD Operations 
* Flash messages 
..Etc.

### Installation

<h4> Server </h4>

1. Configure mongoDb database 📖 [Connect with mongoDb atlas][mongo-conn]
2. Clone the repo

   ```sh
   git clone https://github.com/shah21/ProfileSite.git
   ```
3. Install NPM packages

   ```sh
   npm install
   ```
4. Enter your API keys and Database credentials in .env 
   🗒️ You can find example .env file from repo
   
   ```JS
    MONGO_USER = USER_NAME
    MONGI_PASSWORD = ....
    etc...
   ```
<h4> Client (Web) </h4> 

1. Install NPM packages

   ```sh
   npm install
   ```
2. Change host ( server address ) on axios/config.ts ( if you want to run project locally )

   ```sh
   const host = '<address>';
   const BASE_URL = `http://${host}`;
   ```   








[node-js]: https://img.shields.io/badge/node-javascript-green
[npm-image]: https://img.shields.io/badge/node-v12.18.3-green
[mongo-url]: https://img.shields.io/badge/mongodb-v4.4-brightgreen
[react-url]: https://img.shields.io/badge/reactJs-%20v17.0.1-blue
[types-url]: https://img.shields.io/badge/typescript-4.1.5-%236E97CC
