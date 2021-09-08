# Project Catwalk Team Ocelot
 Project Catwalk comprises a complete redesign of the retail portal designed to address this concern and modernize the site.

 # Team Members
 - Daniel Politis
 - Jeff Liu
 - Yingchen Bai
 - Andrew Hang

# Updating the Repository
Every morning, when a new toy problem is added, you'll need to sync your version of the repo with hackreactor's. Git won't automatically pull in upstream changes for you; it trusts that you'll pull them in as needed. Do so by giving Git a reference to hackreactor's version of the repo:

git remote add upstream https://github.com/hackreactor/xxxx##-toy-problems.git
Be sure to substitue xxxx## with your actual cohort prefix where xxxx is your campus and ## is your cohort number (ex: hrsf50)

After you've done that, updating your repo is as simple as running the following:

git checkout master       // Your fork's master branch
git pull upstream master  // Your class's master branch
This will check out your branch and tell git to grab any changes made to the main repository and merge them into your branch.

 # Front-End-Dependencies

 - Front-End MVC
    - ReactJS ($npm i react / $npm i react-dom)
 - Asset compilation + loading
    - Webpack ($npm install --save-dev webpack)
    - Webpack-dev

 - CSS Frameworks
    - Bootstrap
     - ($npm i boostrap)
     - [Link to Bootstrap!](https://getbootstrap.com/)

 # Server
 - MVC
   - ExpressJS ($npm i express)

added a few lines of text for testing feature pull request
