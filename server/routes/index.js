var express = require('express');
var router = express.Router();
var config = require('../config.json')

/* GET home page. */

var Twit = require('twit')

var client = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
})

router.get('/', function(req,res,next){
  let quer = {screen_name:req.query.q}
  client.get('statuses/user_timeline',quer , function(error, data, response) {
    if (error) throw error;
  res.send(data)
  })
})

router.post('/new-twit', function(req, res, next) {
  client.post('statuses/update', {status: req.body.twit}, function (error, twit, response) {
    res.send(twit)
  })
})

module.exports = router;
