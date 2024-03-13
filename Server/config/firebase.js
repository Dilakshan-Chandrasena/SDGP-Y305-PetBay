const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const dotenv = require("dotenv").config();

const serviceAccount = require("./firebase-key.json");
const serviceAccountTest = require("./firebase-key-test.json");

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv == "test") {
  initializeApp({
    credential: cert(serviceAccountTest),
  });
} else {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

module.exports = { db };
