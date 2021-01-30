const express=require('express');
const http=require('http');
const bodyParser=require('body-parser');

const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.route("/")

.get(function(req,res){
    
    res.render("index2");

   
})

.post(function(req,res){
    
    const city=req.body.cityname;
    const url="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=cef581cb4273e90941cbf1576edba745&units=metric";
    http.get(url,function(response){

    response.on("data",function(data){
        const weatherdata=JSON.parse(data)
        const temp=weatherdata.main.temp;
        const weatherdescription=weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon
        const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

        console.log(temp);
        console.log(weatherdescription);

        // res.write("<h1>Temperature in "+ city +" is "+temp+" degree celcius </h1>");
        // res.write("<h1>Weather is "+weatherdescription+" </h1>");
        // res.write("<img src=" +imageurl +">")
        // res.send();

        res.render("index",{city:city,temp:temp,description:weatherdescription,imageurl:imageurl})
        
    });


    });

});

app.listen(3000,function(){
   console.log("Server is running");
});