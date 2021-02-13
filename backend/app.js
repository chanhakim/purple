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
  res.status(code || 500).json({ "error": message });
}

function getDocuments(snapshot) {
  let tmp = {};
  snapshot.forEach((doc) => {
  tmp[doc.id] = doc.data();
  });
  return tmp;
}

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

var server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * GET request for elected_officials
 */
app.get("/api/officials", function (req, res) {
  db.collection('elected_officials').get()
  .then((snapshot) => {
    // let docs = getDocuments(snapshot);
    // console.log(docs);
    res.status(200).json(getDocuments(snapshot));
  })
  .catch((error) => {
    res.status(500).send(error);
    handleError(res, error.message, "Failed to get officials.");
  });
});

/**
 * POST request for elected_officials
 */
app.post("/api/officials", function(req, res) {
  var name = Object.keys(req.body)[0]
  if (!name || !req.body[name].email || !req.body[name].role || !req.body[name].zip_codes) {
    handleError(res, "Invalid user input", "Must provide a name, email, role, and zip code(s).", 400);
  } else {
    var official_to_be_added = {
      email: req.body[name].email,
      role: req.body[name].role,
      zip_codes: req.body[name].zip_codes,
    };
    db.collection('elected_officials').doc(name).set(official_to_be_added, {merge: true})
      .then(success => {
        res.status(201).json({
          success: true,
          message: "Elected official successfully added.",
        })
      }, rejection => {
        res.status(500).json({
          success: false,
          message: "Elected official failed to be added.",
        })
      })
      .catch(error => {
        res.status(500).send(error);
        handleError(res, error.message, "Failed to post official.")
      });
  }
});
//curl -d '{"test_official":{"email":"email1","role":"role1","zip_codes": {"zip1":true}}}' -H 'Content-Type: application/json' http://127.0.0.1:3000/api/news

/**
 * GET request for news_stories
 */
app.get("/api/news", function (req, res) {
  db.collection('news_stories').get()
  .then((snapshot) => {
    // console.log(snapshot.data());
    res.status(200).json(getDocuments(snapshot));
  })
  .catch((error) => {
    res.status(500).send(error);
    handleError(res, error.message, "Failed to get news.");
  });
});

/**
 * POST request for news_stories
 */
app.post("/api/news", function(req, res) {
  var story_to_be_added = req.body;
  if (!req.body.id || !req.body.headline || !req.body.body || !req.body.zip_code || !req.body.link) {
    handleError(res, "Invalid user input", "Must provide an ID, headline, body, zip code(s), and link.", 400);
  } else {
    db.collection('news_stories').doc(story_to_be_added.id).set(story_to_be_added, {merge: true})
      .then(success => {
        res.status(201).json({
          success: true,
          message: "News story successfully added.",
        })
      }, rejection => {
        res.status(500).json({
          success: false,
          message: "News story failed to be added.",
        })
      })
      .catch(error => {
        res.status(500).send(error);
        handleError(res, error.message, "Failed to post news story.")
      });
  }
});
//curl -d '{"id": "uuid", "headline": "str","body": "str", "zip_code": {"array":true}, "link": "link"}' -H 'Content-Type: application/json' http://127.0.0.1:3000/api/news

/**
 * GET request for zip_codes
 */
app.get("/api/zip_codes", function (req, res) {
  db.collection('zip_codes').get()
  .then((snapshot) => {
    // console.log(snapshot.data());
    res.status(200).json(getDocuments(snapshot));
  })
  .catch((error) => {
    res.status(500).send(error);
    handleError(res, error.message, "Failed to get zip codes.");
  });
});

/**
 * POST request for zip_codes
 */
app.post("/api/zip_codes", function(req, res) {
  var zip_to_be_added = req.body;
  if (!req.body) {
    handleError(res, "Invalid user input", "Must provide zip code(s).", 400);
  }
  db.collection('zip_codes').doc('zip_codes_to_officials').update(zip_to_be_added)
    .then(success => {
      res.status(201).json({
        success: true,
        message: "Zip code successfully added.",
      })
    }, rejection => {
      res.status(500).json({
        success: false,
        message: "Zip code failed to be added.",
      })
    })
    .catch(error => {
      res.status(500).send(error);
      handleError(res, error.message, "Failed to post zip code.")
    });
});
// curl -d '{"33647": ["Kathy Castor", "Marco Rubio"]}' -H 'Content-Type: application/json' http://127.0.0.1:3000/api/zip_codes

/**
 * GET request for templates
 */
app.get("/api/templates", function (req, res) {
  db.collection('templates').get()
  .then((snapshot) => {
    // console.log(snapshot.data());
    res.status(200).json(getDocuments(snapshot));
  })
  .catch((error) => {
    res.status(500).send(error);
    handleError(res, error.message, "Failed to get templates.");
  });
});

/**
 * POST request for templates
 */
app.post("/api/templates", function(req, res) {
  var template_to_be_added = req.body;
  if (!req.body.template_id || !req.body.body || !req.body.to || !req.body.from || !req.body.subject) {
    handleError(res, "Invalid user input", "Must provide an ID, subject, body, to, and from.", 400);
  } else {
    db.collection('templates').doc(template_to_be_added.template_id).set(template_to_be_added, {merge: true})
      .then(success => {
        res.status(201).json({
          success: true,
          message: "Template successfully added.",
        })
      }, rejection => {
        res.status(500).json({
          success: false,
          message: "Template failed to be added.",
        })
      })
      .catch(error => {
        res.status(500).send(error);
        handleError(res, error.message, "Failed to post template.")
      });
  }
});
// curl -d '{"subject": "subject", "to": ["email3","email2"],"from":"email3","body":"bodyhtml","template_id":"123"}' -H 'Content-Type: application/json' http://127.0.0.1:3000/api/templates

/**
 * GET request for a single template
 */
app.get("/api/single_template/:id", function(req, res) {

  if (!req.params.id) {
    handleError(res, "Invalid user input", "Must provide an ID.", 400);
  } else{
    console.log(req.params.id);
    db.collection('templates').doc(req.params.id).get()
      .then((snapshot) => {
        res.status(200).json(snapshot.data());
      })
      .catch((error) => {
      res.status(500).send(error);
      handleError(res, error.message, "Failed to get template.");
      });
    }
});

/**
 * GET request for a set of news
 */
app.get("/api/news/:from-:to", function(req, res) {

  if (!req.params.from || !req.params.to) {
    handleError(res, "Invalid user input", "Must provide a start and end.", 400);
  } else{
    db.collection('news_stories').orderBy('date').limit(req.params.to-req.params.from).get()
      .then((snapshot) => {
        console.log(req.params.from +" "+req.params.to);
        res.status(200).json(getDocuments(snapshot));

      })
      .catch((error) => {
      res.status(500).send(error);
      handleError(res, error.message, "Failed to get template.");
      });
    }
});