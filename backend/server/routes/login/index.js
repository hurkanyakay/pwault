var express = require('express')
var router = express.Router()
var secret = require('../secret')
var jwt = require('jsonwebtoken');

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
      const { name, password } = json.data;
      if(name === 'test' && password === 'test'){
        var token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60*60),
          data:{
            foo: 'bar'
          }
        }, secret);
        res.json({
          name: 'UserName',
          token
        });
      }else{
        res.json({
          error: "Wrong combination"
        })
      }
    }catch(err){
      res.json({
        error: err.message || err
      })
    }
  });
})

router.post('/verify', async (req, res) => {
  let body = [];
  req.on('error', (err) => {
    res.json({
      error: err.message
    })
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
      body = Buffer.concat(body).toString();
      var json = JSON.parse(body)
      if(!json.data){
        throw new Error("no data")
      }
      const { token } = json.data;
      // invalid token - synchronous
      try {
        var decoded = jwt.verify(token, secret);
        res.json({
          token
        })
      }catch(err){
        res.json({
          error: err.message || err
        })
      }
  });
})

module.exports = router
