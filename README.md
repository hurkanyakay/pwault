![](/.github/pwault.gif)

# PWault

[![Greenkeeper badge](https://badges.greenkeeper.io/hurkanyakay/pwault.svg)](https://greenkeeper.io/)

Work in Progress. PWault is a password vault based on NodeJs, SQLite and React/Redux/Redux-Saga and simply generates password and saves them with related information like website url, email, username, website favicon and additional information. Frontend is based on React Boilerplate. React semantic-ui is used in frontend.


## Features
 - Bookmarklet support: You can drag bookmarklet to bookmarks and when you click the bookmarklet on a website, PWault will search existed passwords using domain and will list those entries(domains and subdomains may need different passwords)
 - Favicon support: Automatically gets the favicon when url is set in the form and saves DB as base64 image
 - Revealing passwords
 - Copy button that copies to clipboard
 - Password Generator: Adjustable length, string, numeric, punctuation for generation
 - Redux-auth-wrapper is used for authorization of pages

## Todo
 - [ ] Encryption is not implemented yet, only CRUD of passwords/websites are implemented
 - [ ] Multiple User support needed, login is test & test for now
 - [ ] Category support is needed

### Development
Frontend and Backend environment is decoupled. Npm install is needed in both frontend and backend folder. .env file needs to be defined from .env-sample

 - Root directory

```
npm install and npm start for parallel start of dev environment
```

 - Frontend

```
cd frontend 
npm install / yarn install
```

 - Backend

```
cd backend 
npm install
```

### Production
 - Frontend Folder
```
npm run build
```
 - Backend Folder

```
NODE_ENV=production node index //PM2 can be used
```

Nodejs can automatically serve static files from build folder in its port. No need for static server like Apache/Nginx.

