const { initializeApp } = require("firebase/app");
const { getStorage,  } = require("firebase/storage");
const dotenv = require("dotenv").config();
const firebaseConfig = {
  apiKey: "AIzaSyDtxrgz7k4G7wThBKy6EQ-WCescAqOl01w",
  authDomain: "sdgp-y3-05-petbay.firebaseapp.com",
  projectId: "sdgp-y3-05-petbay",
  storageBucket: "sdgp-y3-05-petbay.appspot.com",
  messagingSenderId: "68269331856",
  appId: "1:68269331856:web:fa7bfd964f05087fc64f15",
  measurementId: "G-V4ZWEZNXRQ"
};


const firebaseConfigTest = {
  apiKey: "AIzaSyDtxrgz7k4G7wThBKy6EQ-WCescAqOl01w",
  authDomain: "sdgp-y3-05-petbay.firebaseapp.com",
  projectId: "sdgp-y3-05-petbay",
  storageBucket: "sdgp-test",
  messagingSenderId: "68269331856",
  appId: "1:68269331856:web:fa7bfd964f05087fc64f15",
  measurementId: "G-V4ZWEZNXRQ"
}

// Initialize Firebase
const nodeEnv = process.env.NODE_ENV
if(nodeEnv == 'test'){
  initializeApp(firebaseConfigTest);
}else{
  initializeApp(firebaseConfig);
}



const storage = getStorage();

module.exports = {storage}
