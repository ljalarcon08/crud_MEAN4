var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var app=express();

var movieModel=require('./models/movie-model');
var request=require('request');

//var router=require('./routes/index');
var routerTasks=require('./routes/movies');
var path=require('path');
//var server=require('http').Server(app);

app.set('port', process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));

app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');


app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


//app.use('/',router);
app.use('/api',routerTasks);
//app.use(router);
app.use(express.static(path.join(__dirname,'dist')));

//app.use(express);
/*app.use((req,res,next)=>{
    var err=new Error('Not Found');
    err.status=404;
    next(err)
})

app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error=req.app.get('env')==='development'? err:{};
    res.status(err.status||500);
    res.render('error');
})*/



app.listen(app.get('port'),()=>{
    console.log('READY! '+app.get('port'));
    checkData();
});
console.log('PRRRRR');

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