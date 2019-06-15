var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var btoa = require ('btoa');

var app = express();

// app.use(express.static(__dirname+ "/"));

var urlSchema = new mongoose.Schema({
    url: ''
    // Date: ''
});


// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/URLshortner');


app.get("/",(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

//Api to short the url
app.post('/short', function(req, res, next) {
    var urlData = req.body.url;
    URL.findOne({url: urlData}, function(err, url) {
        if(url) {
            console.log('URL found in DB');
            res.send({
                url: urlData,
                hash: btoa(doc._id),
                status: 200,
                statusTxt: 'OK'
            });
        } else {
            console.log(' URL not found in DB');
            var url = new URL({
                url: urlData
            });
            url.save(function(err) {
                if(err) {
                    return console.error(err);
                }
                res.send({
                    url: urlData,
                    hash: btoa(url._id),
                    status: 200,
                    statusTxt: 'OK'
                });
            });
        }
    });
});



app.listen(3000,()=>{
    console.log(
        "Server is runnig at Port 3000"
    )
});