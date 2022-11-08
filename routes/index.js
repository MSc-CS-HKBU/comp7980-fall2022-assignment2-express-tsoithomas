var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://21469385:F0txQ2Kj3lt94v1UU4QNdrD0oBNK9Z89oAfl8R8kAFzw2pAOUjPUPy2d6wIcXlJB9KXZ2dXNaziLUPZyltWEAA==@21469385.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@21469385@';

var db;

MongoClient.connect(url, function (err, client) {
  db = client.db('pa01DB');
  console.log("DB connected");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* Handle the Form */
router.post('/api/submit', async function (req, res) {
  console.log(req.body);
  // req.body.numTickets = parseInt(req.body.numTickets);
    
  // let result = await db.collection("survey").insertOne(req.body);
  // res.status(201).json({ id: result.insertedId });   
  res.status(201).json({ });   
});




module.exports = router;
