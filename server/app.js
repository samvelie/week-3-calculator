var express =  require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

console.log('Server online');

app.listen(5000);
