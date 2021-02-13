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

var db = firebase.firestore()


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/api/officials", function(req, res) {
	db.collection('elected_officials').get()
	.then((snapshot) => {
		console.log(snapshot.data());
		res.status(200).json(snapshot.data());
	})
	.catch((error) => {
		res.status(500).send(error);
	});
});