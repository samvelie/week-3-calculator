var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
var operations = require('./routes/operations');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

console.log('Server online');

app.use('/operations', operations);

app.listen(5000);
