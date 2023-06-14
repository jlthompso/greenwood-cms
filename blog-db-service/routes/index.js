var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const database = client.db('blog');
const posts = database.collection('posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  res.send('Got a POST request');
});

module.exports = router;
