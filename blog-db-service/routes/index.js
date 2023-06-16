var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const database = client.db('blog');
const postsCollection = database.collection('posts');

// Add a new post to the database
router.post("/", async (req, res) => {
  const post = req.body;
  const result = await postsCollection.insertOne(post);
  res.send(result).status(204);
});

// Fetch the 5 most recent posts from the database
router.get("/latest", async (req, res) => {
  const results = await postsCollection.aggregate([
    {"$project": {"author": 1, "title": 1, "time": 1, "body": 1}},
    {"$sort": {"time": -1}},
    {"$limit": 5}
  ]).toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  const query = {_id: new ObjectId(req.params.id)};
  const result = await postsCollection.findOne(query);
  result ? res.send(result).status(200) : res.send("Not found").status(404);
});

// Update a post
router.patch("/title/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: req.body
  };
  const result = await postsCollection.updateOne(query, updates);
  res.send(result).status(200);
});

// Delete a post
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const result = await postsCollection.deleteOne(query);
  res.send(result).status(200);
});

module.exports = router;
