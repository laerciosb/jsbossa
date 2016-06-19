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
3. User authorization access by actions and roles.

## API Routes ##

### Auth ###
|   Action                                 | Required          | Method    | URL                                               
| -----------------------------------------|-------------------|-----------|----------------------------------------------------- 
|   Sign out user                          | Auth and User     |  `GET`    | /auth/logout
|   Sign in user (local authentication)    |                   |  `POST`   | /auth/login

### Users ###
|   Action                                 | Required          | Method    | URL                                               
| -----------------------------------------|-------------------|-----------|----------------------------------------------------- 
|   List users                             | Auth and User     |  `GET`    | /users
|   Create user                            | Auth and Expert   |  `POST`   | /users
|   Read user                              | Auth and Expert   |  `GET`    | /users/:id
|   Update user                            | Auth and Expert   |  `PUT`    | /users/:id
|   Delete user                            | Auth and Expert   |  `DELETE` | /users/:id

### Roles ###
|   Action                                 | Required          | Method    | URL
| -----------------------------------------|-------------------|-----------|-----------------------------------------------------
|   List roles                             | Auth and Admin    |  `GET`    | /users
|   Create role                            | Auth and Admin    |  `POST`   | /users
|   Read role                              | Auth and Admin    |  `GET`    | /users/:id
|   Update role                            | Auth and Admin    |  `PUT`    | /users/:id
|   Delete role                            | Auth and Admin    |  `DELETE` | /users/:id
