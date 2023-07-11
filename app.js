const express = require('express');
const https = require('https');  // you dont have to install
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true})); // geting form data



app.listen(3000, ()=>{
    console.log('listening on port 3000');
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res)=>{
 
    
//1. Getting data from an API

// using HTTPS
 const query = req.body.cityName; 
 const apiKey = '492072660c9ba5e44ab7040fdde6ce17';
 const unit = 'metric'
 const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units=' + unit

    https.get(url, (response)=>{
        console.log(response.statusCode);

        // the method on is what would give as the data the api sent

    response.on('data', (data)=>{
        const weatherData = JSON.parse(data); // buffer data is converted into JSON
        const temp = weatherData.main.temp; 
    
        const des = weatherData.weather[0].description; 

        const icon = weatherData.weather[0].icon;

        imgURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

        // console.log(weatherData);
        // console.log(des);

        
        res.write("<h1>"+ query + " weather : " +"</h1>")
        res.write('<h1>' + des  + '</h1>');
        res.write("<img src =" + imgURL + ">");

        res.send();


    });
});
})


