const {initializeApp, cert} = require("firebase-admin/app");
const {getFirestore, getStorage} = require("firebase-admin/firestore");

const serviceAccount = require("./firebase-key.json");

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();
const storage = getStorage();

module.exports = {db, storage};
