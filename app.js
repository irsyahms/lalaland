const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const politician = require('./routes/politician');
const voters =  require('./routes/voters');
const result = require('./routes/votes')

app.get('/', function(req,res) {
  res.render('index')
})

app.use('/politicians', politician);
app.use('/voters', voters)
app.use('/results', result)



app.listen(3000, function(){
  console.log(`Are you looking for me? 3000`);
})
