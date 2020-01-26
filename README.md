# Vtex Sync 
 ### A Front-End workflow setup for Vtex CMS

#### author   : Cristiano Rocha,
#### homepage : https://github.com/CrisFeit/Vtex-Sync

##  Features
* Reverse Proxy - Run in proxy mode where Vtex files will be served from your local directory
* Vue Single File Components
* 3 Code Split - Shared / Desktop / Mobile
* Support for ES6 modules - import / export syntax
* Suport for Async Await syntax
* Smacss , ITCSS and Atomic css Architecture

##  Specifications
 
 * Vue single file components
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

const vtex       =  './app/dist/arquivos';
const folders    =  '{shared,desktop,mobile}';
const scripts    =  `./app/src/${folders}/js/**.js`
const styles     =  `./app/src/${folders}/sass/**/*.scss`
const vuefiles    = `./app/src/${folders}/vue/modules/components vue/*.vue`;

```
## Comand and Control
- Development
```bash
npm run dev

npm run vue
```
- Production
```bash
npm run prod

npm run vueProd
```

## References
https://github.com/vtex/speed

https://github.com/Zeindelf/taskerify

https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md