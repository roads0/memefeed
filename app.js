const express = require('express');
const snoowrap = require('snoowrap');
const config = require('./config');
const app = express()

const reddit = new snoowrap({
  userAgent: 'An in-browser dashboard service',
  clientId: config.snoowrap.clientIdS,
  clientSecret: config.snoowrap.client_secretS,
  refreshToken: config.snoowrap.refresh_token
});

const reddits = ['dankmemes']

app.get('/', function(req, res) {
    res.sendfile('index.html')
})

app.get('/superagent.js', function(req, res) {
  res.sendfile('superagent.js')
})

app.get('/memefeed', (req, res) => {
  reddit.getSubreddit(reddits[Math.floor(Math.random()*reddits.length)]).getTop({time: 'week'}).then(data => {
  res.json(data[Math.floor(Math.random() * data.length)])
  })
})

app.listen(3000, function () {
  console.log('Memefeed listening on port 3000!')
})
