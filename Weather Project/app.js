const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
    const query = req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=39d6fa5dc2b21f75bda0cb89f13db1f6&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.set("Content-Type", "text/html");
            res.write("The temp is " + temp);
            res.write(" It is " + weatherDiscription);
            res.write("<img src=" + imageURL + ">")
            res.send()

        });
    });

})

app.listen(3000, function () {
    console.log("server is running on port 3000");
})