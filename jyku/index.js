var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('alibabababa');
});

// use port 3000 unless there exists a preconfigured port
const port = process . env . PORT || 8001 ;

app.listen(port);
