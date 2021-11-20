var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('alibabababa');
});
app.listen(process.env.PORT || 3000,function (){
console.log("listwning on port');
});

