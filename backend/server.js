var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase/app");

require("firebase/firestore");

var app = express();
app.use(bodyParser.json());

var firebaseConfig = {
    apiKey: "AIzaSyAksURU-1uhXnx6s3OA-D442qlhV4HfNV0",
    authDomain: "purple-4fd28.firebaseapp.com",
    projectId: "purple-4fd28",
    storageBucket: "purple-4fd28.appspot.com",
    messagingSenderId: "62443145886",
    appId: "1:62443145886:web:8bd99281ca1689cb6fc98f",
    measurementId: "G-QTDSDVSKKP"
  };

firebase.initializeApp(firebaseConfig);

var db_ref = firebase.firestore().ref
