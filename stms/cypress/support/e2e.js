// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: Cypress.env("VITE_API_KEY"),
  authDomain: Cypress.env("VITE_AUTH_DOMAIN"),
  projectId: Cypress.env("VITE_PROJECT_ID"),
  storageBucket: Cypress.env("VITE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("VITE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("VITE_APP_ID"),
  measurementId: Cypress.env("VITE_MEASUREMENT_ID"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
