var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var app=express();

var movieModel=require('./models/movie-model');
var request=require('request');

var routerTasks=require('./routes/movies');
var path=require('path');

app.set('port', process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));

app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');


app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


app.use('/api',routerTasks);

app.use(express.static(path.join(__dirname,'dist')));




app.listen(app.get('port'),()=>{
    console.log('READY ON PORT '+app.get('port'));
    checkData();
});

function checkData(){
    movieModel.countAll((count)=>{
        if(count==0){
            addData();
        }
    })
}

function addData(){
    let movies=['The good','Back to','matrix','the god','el','seven','ocho'];
    for(let i=0;i<movies.length;i++){
        request.get('http://www.omdbapi.com/?t='+movies[i]+'&apikey=29aac7aa',(error,response,body)=>{
            if (!error && response.statusCode == 200) {
                var json=JSON.parse(body);
                var movie={
                    movie_id:json.imdbID,
                    title:json.Title,
                    release_year:json.Year,
                    rating:json.imdbRating,
                    image:json.Poster,
                };
                movieModel.insert(movie,()=>{
                    console.log('Insertado:'+movie);        
                })
            }
        })
    }
}