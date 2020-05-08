const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyparser = require("body-parser");
const Marks = require('./models/marks'); 

app.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb://localhost/zajel', { useNewUrlParser: true , useUnifiedTopology: true})
app.set('view engine', 'ejs');

app.use(express.static("public"));


var MongoClient = require('mongodb').MongoClient;


 app.get('/',  (req,res)=>{

    MongoClient.connect("mongodb://localhost:27017/zajel", function (err, db) {
        
        db.collection('Marks', function (err, collection) {
    
            collection.find().toArray(function(err, items) {
                if(err) console.log("Error to find data");    
                res.render("Marks", {marks :  items})
            });
        });
                    
    });
    
})

app.get('/personal-info', (req, res) =>{
res.render('personal-info');
})

app.post('/saved', (req,res)=>{
   var name = req.body.name;
   var id_No = req.body.id;
   var nationality = req.body.nationaliy;
   var jnat = req.body.jnat;
   var city = req.body.city;
   var from = req.body.from;
   var street = req.body.street;


MongoClient.connect("mongodb://localhost:27017/zajel", function (err, db) {
    
    db.collection('Personal-Info', function (err, collection) {
        
        collection.insert({ name: name , 
            Id_Number: id_No,
             Nationality: nationality, 
             Jordan_Nationality_Number: jnat,
             city: city,
             city_Village_Camp: from,
             Street: street  });
       
    });
                
});

MongoClient.connect("mongodb://localhost:27017/zajel", function (err, db) {
        
    db.collection('Personal-Info', function (err, collection) {

        collection.find().toArray(function(err, items) {
            if(err) console.log("Error to find data");    
            res.render("personal_info_saved", {info :  items})
        });
    });
                
});

})

app.get('/personal_info_saved', (req, res)=>{
    MongoClient.connect("mongodb://localhost:27017/zajel", function (err, db) {
        
    db.collection('Personal-Info', function (err, collection) {

        collection.find().toArray(function(err, items) {
            if(err) console.log("Error to find data");    
            res.render("personal_info_saved", {info :  items})
        });
    });
                
});

})

app.listen(4000, function(){
    console.log("Server started in port 4000");
})