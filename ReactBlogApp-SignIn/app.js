var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(path.join(__dirname,"/html")));

app.use(bodyParser.json());


app.post('/signin', function (req, res) {
  var user_name=req.body.email;
  var password=req.body.password;
  if(user_name=='admin' && password=='admin'){
  	res.send('success');
  }
  else{
  	res.send('Failure');
  }
})

app.post('/signup', function (req, res) {
  var user_name=req.body.name;
  var user_email=req.body.email;
  var password=req.body.password;
  console.log("--------------------------")
  console.log(user_name,user_email,password)
  res.send(JSON.stringify({name:user_name,email:user_email,pass:password}))
})


app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})
