# jsbossa
[![Build Status](https://travis-ci.org/ProjetosIFPB/RAD_Project.svg?branch=master)](https://travis-ci.org/laerciosb/jsbossa)
[![Code Climate](https://codeclimate.com/github/laerciosb/jsbossa/badges/gpa.svg)](https://codeclimate.com/github/laerciosb/jsbossa)
[![Test Coverage](https://codeclimate.com/github/laerciosb/jsbossa/badges/coverage.svg)](https://codeclimate.com/github/laerciosb/jsbossa/coverage)
[![Issue Count](https://codeclimate.com/github/laerciosb/jsbossa/badges/issue_count.svg)](https://codeclimate.com/github/laerciosb/jsbossa)

Application test.

### Requirements ###

* **[Node.js 6.0.0](http://nodejs.org/en/)** :white_check_mark:
* **[Express.js 4.13.1](http://expressjs.com/pt-br/)** :white_check_mark:

### Installation ###

**Obs.: The following instructions were tested on Ubuntu distribution.**

1. After 'git clone' command, run the following commands to install dependencies:
  - user@user:~/path_to_cloned_folder$ **npm install**
  - user@user:~/path_to_cloned_folder$ **bower install**
  - **Manually install the dependencies that may have not been installed by the above command.** :white_check_mark:

2. Start the server and access the browser
  - user@user:~/path_to_cloned_folder$ **npm start**
  - Access the browser http://localhost:3000

## Lifecycle of application ##

1. This application provides a CRUD users through API.
2. User authentication local.

## API Routes ##

### Auth ###
|   Action                                 | Required          | Method    | URL                                               
| -----------------------------------------|-------------------|-----------|----------------------------------------------------- 
|   Sign in user by OAuth (facebook)       |                   |  `GET`    | /auth/facebook
|   Response auth to server (facebook)     |                   |  `GET`    | /auth/facebook/callback
|   Sign in user by OAuth (google)         |                   |  `GET`    | /auth/google
|   Response auth to server (google)       |                   |  `GET`    | /auth/google/callback
|   Get user authenticated                 |                   |  `GET`    | /auth/current_user
|   GET User authentication status         |                   |  `GET`    | /auth/loggedin
|   Sign out user                          |                   |  `GET`    | /auth/logout
|   Sign in user (local authentication)    |                   |  `POST`   | /auth/login

### Users ###
|   Action                                 | Required          | Method    | URL                                               
| -----------------------------------------|-------------------|-----------|----------------------------------------------------- 
|   List users                             |                   |  `GET`    | /users
|   Create user                            |                   |  `POST`   | /users
|   Read user                              |                   |  `GET`    | /users/:id
|   Update user                            |                   |  `PUT`    | /users/:id
|   Delete user                            |                   |  `DELETE` | /users/:id
