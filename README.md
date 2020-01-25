# Vtex Sync 
 ### A Front-End workflow setup for Vtex CMS

##  Features
* Reverse Proxy - Run in proxy mode where Vtex files will be served from your local directory
* Vue Single File Components
* ES6 Modules  - Add support for ES6 import / export syntax
* Suport for Async Await syntax
* Smacss , ITCSS and Atomic css Architecture

##  Specifications
 
 * Vue single file component 
 * Browser Sync   \* requires at least version 2.8.0
 * Sass
 * Postcss
      * autoprefixer
      * nanocss
 * Browserify
    * Glob
    * Uglify
    * Babelify
    * Event Stream
    * Vynil Source Stream & Vynil Buffer
  * Image Min
  * Sprite Smith

## Requirements
* Node Js
* Vtex Id Authentication
## Install
```bash
  npm install
```
## Guide
- Open the Gulp File,
- Enter the **Domain Name** of your store.
```javascript
const storeName = 'My-Store';
```
- Configure your paths 
```javascript

const storeName  =  'My-Store';
const vtex       =  './app/dist/arquivos';
const folders    =  '{common,desktop,mobile}';
const scripts    =  `./app/src/${folders}/js/**.js`
const styles     =  `./app/src/${folders}/sass/**/*.scss`
```
## Comand and Control
- Development
```bash
npm run dev
```
- Production
```bash
npm run prod
```

## References
https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md

https://github.com/vtex/speed