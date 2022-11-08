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
  // console.log(req.body);
  // req.body.numTickets = parseInt(req.body.numTickets);

  req.body.experience = parseInt(req.body.experience);
  let result = await db.collection("survey").insertOne(req.body);
  res.status(201).json({ id: result.insertedId });
  console.log(result.insertedId);
  // res.status(201).json({ });   
});


/* Chart Language */
router.get('/api/chart/language/:gender', async function (req, res) {

  if (req.params.gender != "a" && req.params.gender != "m" && req.params.gender != "f") 
    return res.status(404).send('Unable to find the requested resource!');

  pipeline = [];

  if (req.params.gender == "m" || req.params.gender == "f") {
    pipeline = [
      { $match: { "gender": req.params.gender } },
      { $group: { _id: "$language", count: { $sum: 1 } } },
      { $sort:{ _id : 1 } }
    ];
  }
  else {
    pipeline = [
      { $group: { _id: "$language", count: { $sum: 1 } } },
      { $sort:{ _id : 1 } }
    ];
  }

  const results = await db.collection("survey").aggregate(pipeline).toArray();
  console.log(results);
  
  return res.json(results);
});


/* Chart experience */
router.get('/api/chart/experience', async function (req, res) {


  const pipeline = [
    { $group: { 
      _id:  { $floor: {$divide: [ "$experience", 5 ]}}, 
      count: { $sum: 1 } 
      }
    },
    {
      $sort:{ _id : 1 }
    }
  ];

  const results = await db.collection("survey").aggregate(pipeline).toArray();
  console.log(results);
  
  return res.json(results);
});



module.exports = router;
