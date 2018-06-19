const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;


MongoClient.connect("mongodb://localhost:27017",
function(err, client){
  if(err){
    console.log(err);
    return;
  }

const db = client.db("artists");
console.log("Connected to database!");

server.post("/api/bands", function(req, res, next){
  const bandsCollection = db.collection("bands");
  const bandToSave = req.body;
  bandsCollection.save(bandToSave, function(err, result){
    if(err) next(err);
    res.status(201);
    res.json(result.ops[0])
    console.log("saved to database!");
  })
});

server.get("/api/bands", function(req, res, next){
  const bandsCollection = db.collection("bands");
  bandsCollection.find().toArray(function(err, allBands){
    if (err) next(err);
    res.json(allBands);
  })
});

server.delete("/api/bands", function(req, res, next){
  const bandsCollection = db.collection("bands");
  bandsCol;ection.remove({}, function(err, result){
    if(err) next(err);
    res.status(201).send();
  })
});

server.post("/api/bands/:id", function(req, res, next){
  const bandsCollection = db.collection("bands");
  const objectID = ObjectID(req.params.id);
  bandsCollection.update({_id: objectID}, req.body, function(err, result){
    if (err) next(err);
    res.status(201).send();
  })
});



server.listen(3000, function(){
  console.log("Listening on port 3000");
});

})
