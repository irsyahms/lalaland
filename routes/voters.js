const express = require('express');
const router = express.Router();
const Voter = require('../models/voters');

router.get('/', function(req,res) {
  res.render('voters', {data:null, message: null})
})

router.post('/', function(req,res) {
  if(req.body.searchBy === 'default') {
    res.render('voters', {data: null, message: 'Please fill the blank'})
  } else if(req.body.searchBy === 'name') {
    Voter.findWhere('first_name', req.body.searchName, 'like')
     .then(voters => {
       res.render('voters', {data: voters, message: null})
     })
  } else if(req.body.searchBy === 'gender') {
    if(req.body.searchGender === 'default') {
      res.render('voters', {data: null, message: 'Please fill the blank'})
    } else {
      Voter.findWhere('gender', req.body.searchGender, 'equal')
      .then(voters => {
        res.render('voters', {data: voters, message: null})
      })
    }
  } else if(req.body.searchBy === 'age') {
    if(req.body.searchStartAge === '') {
      res.render('voters', {data: null, message: 'Range Start Age must be filled'})
    }

    let startAge = req.body.searchStartAge;
    let endAge = req.body.searchEndAge === '' ? startAge : req.body.searchEndAge

    Voter.findWhere('age', {start: startAge, end: endAge}, 'between')
    .then(voters => {
      res.render('voters', {data: voters, message: null})
    })
  }
})

module.exports = router;
