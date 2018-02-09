'use strict'

var mongoose=require('mongoose');
var dbOptions=require('./db-conf');
var Schema=mongoose.Schema;
var ObjectId=Schema.ObjectId;
var MovieSchema=new Schema({
	movie_id:"string",
	title:"string",
	release_year:"string",
	rating:"string",
	image:"string"
},
{
	collection:"movie"
});
var MovieModel=mongoose.model('Movie',MovieSchema);

mongoose.connect(`mongodb://${dbOptions.mongo.host}/${dbOptions.mongo.db}`);


module.exports=MovieModel;