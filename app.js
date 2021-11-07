const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-Parser");
// https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=d32e96117f8caa6bb313e9a0e41e2025

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const apiKey = "d32e96117f8caa6bb313e9a0e41e2025";
  const unit = "metric";
  const query = req.body.cityInput;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
  https.get(url, function(response){

  console.log(response.statusCode);
      response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write('<head><meta charset="utf-8"></head>');
      res.write("<h3>The temperature description in " + query +" is " +description+".</h3>");
      res.write("<h1>The temperature in "+ query +" is " +temp+ "° celcius.</h1>");
      res.write("<img src="+iconURL+">");
      res.send();
    })
  });


})

app.listen(3000, function(){
  console.log("Server has started running on port 3000.");
})
