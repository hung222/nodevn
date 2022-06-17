var expres = require("express")
var app = express();
app set = ("view engine","ejs" );
app set = ("views","./views");
app.listen(process.env.PORT || 5000);

app.get("/",function (req ,res){
      res.render("trang chủ web");
});
 
