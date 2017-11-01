const express = require('express');
const router = express.Router();
const Votes = require('../models/votes')

router.get('/top5', function(req,res) {
  Votes.findTopFive()
   .then(data => {
     res.render('top5', {data: data})
   })
})

router.get('/analyzed', function(req,res){
  Votes.analyzed()
   .then(data => {
     res.render('analyzed', {data: data})
   })
})

module.exports = router;
