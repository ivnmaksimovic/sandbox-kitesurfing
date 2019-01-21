# Sandbox website

[https://kitesurfingmontenegro.com](https://kitesurfingmontenegro.com/)

created using assemble static site generator

## Requirements

  Node 6 and NPM

## Installation

  `npm install` or `yarn`

## Developing

  `npm start`

## Deploying

- copy `.ftppass-example` to `.ftppass` and update key1 username and password for ftp hosting

  `npm run deploy-prod`

## Firebase hosting

`npm install -g firebase-tools` to update global firebase cli
`firebase login` with kitesurfingmontenegro@gmail.com
`npm run deploy` to deploy dist folder to firebase
