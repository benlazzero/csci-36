# Installation Guide

## Install Natively

The program uses NodeJS to serve the app, so we'll need to have `npm` installed.

Npm is now included in the NodeJS Installer. Please [download and run the installer for your OS](https://nodejs.org/en/).
If you're on a platform without a web browser, install node from a [package manager suitable for your OS](https://nodejs.org/en/download/package-manager/).

Clone the repo. If you've added your SSH keys to your Gitlab account:

`git clone git@gitlab.com:stevenacorrea/fa20-cs36-project.git`

Otherwise, over HTTPS. You'll be prompted for your Gitlab credentials:

`https://gitlab.com/stevenacorrea/fa20-cs36-project.git`

Change directory into the project and run npm install:

`cd fa20-cs36-project`

`npm install`

Start the application server:

`node server.js`

Navigate to `http://localhost:5000`

## Install using Docker and Docker Compose

Docker configuration is included in the project. This makes it easier to run cross-platform.

Install docker and docker-compose for your system

Change directory into the project and build the docker compose:

`cd fa20-cs36-project`

`docker-compose build`

Run Docker compose:
`docker-compose up`

Navigate to `http://localhost:5000`
