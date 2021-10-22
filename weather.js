// back-end codes

const express = require("express");
const { read } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/weather.html");
});


app.post("/", function (req, res) {
    var city = req.body.cityInput;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8d7fc88a997f31d304421584d68a798e";
    https.get(url, function (response) {
        response.on("data", function (data) {
            var today = new Date();
            var currentDay = today.getDay();
            var day = "";
            if (currentDay === 0) {
                day="SUNDAY";
            }
            if (currentDay === 1) {
                day="MONDAY";
            }
            if (currentDay === 2) {
                day="TUESDAY";
            }
            if (currentDay === 3) {
                day="WEDNESDAY";
            }
            if (currentDay === 4) {
                day="THURSDAY";
            }
            if (currentDay === 5) {
                day="FRIDAY";
            }
            if (currentDay === 6) {
                day="SATURDAY";
            }
        
            const weatherData = JSON.parse(data);
            var temp = parseInt(weatherData.main.temp) - 273;
            console.log(weatherData.main.temp);
            console.log(weatherData.weather[0].description);
            const icon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.send("<center><h1 style='color: rgb(25, 133, 233);padding-top: 17%;'>"+ day + "</h1><h3>" + city + " Weather Forecast:</h3><p>City Temperature is: " + temp + " °C.</p><p>Currently weather is likely to be " + weatherData.weather[0].description + "</p><img src =" + icon + "></center>");

        });
    });
});
app.use(express.static("public"));

app.listen(process.env.PORT || 4000, function () {
    console.log("Your local server has been created at PORT 4000");
});
