# jsbossa
[![Build Status](https://travis-ci.org/ProjetosIFPB/RAD_Project.svg?branch=master)](https://travis-ci.org/laerciosb/jsbossa)
[![Code Climate](https://codeclimate.com/github/laerciosb/jsbossa/badges/gpa.svg)](https://codeclimate.com/github/laerciosb/jsbossa)
[![Test Coverage](https://codeclimate.com/github/laerciosb/jsbossa/badges/coverage.svg)](https://codeclimate.com/github/laerciosb/jsbossa/coverage)
[![Issue Count](https://codeclimate.com/github/laerciosb/jsbossa/badges/issue_count.svg)](https://codeclimate.com/github/laerciosb/jsbossa)

Application test.

---

### Requirements ###

* **[Node.js 6.9.1 LTS](http://nodejs.org/en/)** :white_check_mark:
* **[MongoDB 3.2.8](https://docs.mongodb.com/)** :white_check_mark:

### Installation ###

**Obs.: The following instructions were tested on Ubuntu distribution.**

1. After 'git clone' command, run the following commands to install dependencies:
  - user@user:~/path_to_cloned_folder$ **npm install**
  - user@user:~/path_to_cloned_folder$ **bower install**
  - **Manually install the dependencies that may have not been installed by the above command.** :white_check_mark:

2. Start the server and access the browser
  - user@user:~/path_to_cloned_folder$ **npm start**

3. Seed database required datas
  - user@user:~/path_to_cloned_folder$ **mongoimport --db jsbossa --file ./seeds/roles.json**

**OBS: Is required create the roles 'admin' and 'user' before create users.**
**OBS: Is optional create the others collections but if you want can repeat the last command alter the name of json file. Ex.: mongoimport --db jsbossa --file ./seeds/users.json**

---

## Lifecycle of application ##

1. This application provides a CRUD users through API.
2. User authentication by JWT(Json Web Token).
3. User authorization access by actions and roles.

---

## API Routes ##

### Auth ###
|   Action                                 | Required          | Method    | URL                                               
| -----------------------------------------|-------------------|-----------|----------------------------------------------------- 
|   Sign in user (local authentication)    |                   |  `POST`   | /api/auth/login
|   Register or Sign in (facebook oauth)   |                   |  `GET`    | /api/auth/facebook?access_token=:token
|   Get Reset Password                     |                   |  `POST`   | /api/auth/reset_password
|   Set new password after reset password  | Get Reset Pass    |  `POST`   | /api/auth/reset_password/:token

### Users ###
|   Action                                 | Required          | Method    | URL                                               
| -----------------------------------------|-------------------|-----------|----------------------------------------------------- 
|   List users                             | Auth and Admin    |  `GET`    | /api/users
|   Create user                            |                   |  `POST`   | /api/users
|   Read user                              | Auth              |  `GET`    | /api/users/:id
|   Update user                            | Auth and Admin    |  `PUT`    | /api/users/:id
|   Delete user                            | Auth and Admin    |  `DELETE` | /api/users/:id

### Roles ###
|   Action                                 | Required          | Method    | URL
| -----------------------------------------|-------------------|-----------|-----------------------------------------------------
|   List roles                             | Auth and Admin    |  `GET`    | /api/roles
|   Create role                            | Auth and Admin    |  `POST`   | /api/roles
|   Read role                              | Auth and Admin    |  `GET`    | /api/roles/:id
|   Update role                            | Auth and Admin    |  `PUT`    | /api/roles/:id
|   Delete role                            | Auth and Admin    |  `DELETE` | /api/roles/:id

---

## Tests ##
**Only after mongodb seeded**
* Find user queries:
>localhost:3000/api/users?gender=male&image=true&provider=Facebook&name=LaéR&email=fallen284@hotmail.com&_id=5852425b8995b53ada29aecc&bn=1986-12-25&bx=2000-12-25

---

## Contributors

* Laércio de Souza Bezerra ([laerciosb](https://github.com/laerciosb)) laerciosouza@lavid.ufpb.br

>Created By **[LaercioSB](http://lavid.ufpb.br/index.php/projetos/equipe/)** 2016.

---