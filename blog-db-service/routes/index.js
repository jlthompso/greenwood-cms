var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

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

module.exports = router;
