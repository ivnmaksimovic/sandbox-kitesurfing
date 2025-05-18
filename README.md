# Sandbox website

[https://kitesurfingmontenegro.com](https://kitesurfingmontenegro.com/)

created using assemble static site generator

## Requirements

  Node 16 and NPM

  Sharp for image resizing might need exact same node version as when it was installed https://sharp.pixelplumbing.com/install

## Installation

  `nvm use`
  `yarn`

## Developing

  `npm start`

## Deployment

`./scripts/build.sh` to build for production using correct node version

Deploy using
https://github.com/ivnmaksimovic/do

## Galleries

Add new images to `originals` folders in `src/assets/img/galleries`.

`npm run resize` to create all sizes.
