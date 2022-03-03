var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("2bvltdoaltdlhqaltd");
});

app.listen(process.env.PORT || 5000)
