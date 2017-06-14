var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var dishRouter = require('./routes/dishRouter'),
    promotionRouter = require('./routes/promotionRouter'),
    leadershipRouter = require('./routes/leadershipRouter');

var hostname = 'localhost',
    port = 3000;

var app = express();       

app.use(morgan('dev')); 
app.use(bodyParser.json());

app.use('/dishes',dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leadershipRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);

});