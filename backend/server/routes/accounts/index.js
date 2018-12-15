var express = require('express')
var router = express.Router()
const request = require('request');
const _ = require('lodash');
var secret = require('../secret')
var jwt = require('jsonwebtoken');
const { getFavRequest, extractRootDomain, containsRegex }  = require('../../utils')

router.use((req, res, next)=> {
  try {
    var token = req.headers['x-access-token'];
    var decoded = jwt.verify(token, secret);
  }catch(err){
    return res.status(401).send({ message: 'Token Invalid!' });
  }
  next()
})

router.post('/', async (req, res) => {
  let body = [];
  req.on('error', (err) => {
    res.json({
      error: err.message
    })
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    try{
      body = Buffer.concat(body).toString();
      var json = JSON.parse(body)

      if(!json.data){
        throw new Error("no data")
      }
      if(!json.data.id){
        throw new Error("missing data")
      }
      var data = await DB.fetchSingleAccount(json.data.id)

      res.json({
        data
      })

    }catch(err){
      res.json({
        error: err.message || err
      })
    }
  });
})

router.post('/all', async (req, res) => {
  try{
    var data = await DB.fetchAllAccounts()
    res.json(data)
  }catch(err){
    res.json({
      error: err.message || err
    })
  }
})

// new
router.post('/new', async (req, res) => {
  let body = [];
  req.on('error', (err) => {
    res.json({
      error: err.message || err
    })
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    try{
      body = Buffer.concat(body).toString();
      var json = JSON.parse(body)

      if(!json.data){
        throw new Error("no data")
      }
      if(!json.data.name || !json.data.username || !json.data.password || !json.data.website){
        throw new Error("missing data")
      }

      var inserted = await DB.insertAccount({
        id: null,
        date: Date.now(),
        name: json.data.name,
        username: json.data.username,
        email: json.data.email,
        password: json.data.password,
        website: json.data.website,
        favicon: json.data.favicon,
        additional: json.data.additional
       })
      res.json({
        result: "Account saved!",
        id: inserted
      })
    }catch(err){
      res.json({
        error: err.message || err
      })
    }
  });
})

// update strategy
router.post('/update', async (req, res) => {
  let body = [];
  req.on('error', (err) => {
    res.json({
      error: err.message
    })
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    try{
      body = Buffer.concat(body).toString();
      var json = JSON.parse(body)
      if(!json.data){
        throw new Error("no data")
      }

      if(!json.data.id || !json.data.name || !json.data.username || !json.data.password || !json.data.website){
        throw new Error("missing data")
      }

      var updated = await DB.updateAccount({
        id: json.data.id,
        date: Date.now(),
        name: json.data.name,
        username: json.data.username,
        email: json.data.email,
        password: json.data.password,
        website: json.data.website,
        favicon: json.data.favicon,
        additional: json.data.additional
       })
      res.json({
        result: "Account updated!",
        updated
      })

    }catch(err){
      res.json({
        error: err.message || err
      })
    }
  });
})
// delete
router.post('/delete', async (req, res) => {
  let body = [];
  req.on('error', (err) => {
    res.json({
      error: err.message
    })
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    try{
      body = Buffer.concat(body).toString();
      var json = JSON.parse(body)
      if(!json.data){
        throw new Error("no data")
      }
      await DB.deleteAccount(json.data)
      res.json({
        result: "Account deleted!"
      })
    }catch(err){
      res.json({
        error: err.message || err
      })
    }
  });
})

// get favicon
router.post('/favicon', async (req, res) => {
  let body = [];
  req.on('error', (err) => {
    res.json({
      error: err.message
    })
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    try{
      body = Buffer.concat(body).toString();
      var json = JSON.parse(body)
      if(!json.data){
        throw new Error("no data")
      }
      if(!json.data.website){
        throw new Error("no website defined")
      }
      var base64img = await getFavRequest(json.data.website)

      res.json({
        data: base64img
      })
    }catch(err){
      res.json({
        error: err.message || err
      })
    }
  });
})

//searchQueryReq
router.post('/search', async (req, res) => {
  let body = [];
  req.on('error', (err) => {
    res.json({
      error: err.message
    })
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    try{
      body = Buffer.concat(body).toString();
      var json = JSON.parse(body)
      if(!json.data){
        throw new Error("no data")
      }
      if(!json.data.url){
        throw new Error("url missing")
      }

      var rootDomain = extractRootDomain(json.data.url)
      var allAccounts = await DB.fetchAllAccounts()
      const { nameSearch, siteSearch } = containsRegex(allAccounts, rootDomain)
      const data = _.map(_.assign(
        _.mapKeys(nameSearch,  k => k.id),
        _.mapKeys(siteSearch, k => k.id)
      ))

      res.json({
        data
      })
    }catch(err){
      res.json({
        error: err.message || err
      })
    }
  });
})

module.exports = router
