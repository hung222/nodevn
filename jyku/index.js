var express = require('express');
var app = express();
 
app.get('/', function(req, res){
   res.send("hello nguyễn phúc ,phúc nguyễn");
});
 
app.listen(5000);