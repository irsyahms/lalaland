const express = require('express');
const router = express.Router();
const Politician = require('../models/politician');

router.get('/', function(req,res){
  Politician.findAll()
    .then(politicians => {
      res.render('politician', {politicians: politicians});
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router;
