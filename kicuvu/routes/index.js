var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TIKIYU' });
});
var expres = require("express")
var app = express();
app set = ("view engine" , "ejs" );
app set = ("views", ". /views");
app.listen(process.env.PORT || 3000);

app.get("/",function (req ,res){
      res.render("trang chủ web");
});
 
module.exports = router;
