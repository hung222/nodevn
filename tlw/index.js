var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("chào bạn anh tuấn làm nodejs chung không hihihihihihi");
});

app.listen(process.env.PORT || 5000)
