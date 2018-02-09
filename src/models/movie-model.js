'use strict'

var connection=require('./movie-connection');
var MovieModel=()=>{};

MovieModel.getAll=(cb)=>{
	connection.find().exec((err,rows)=>{
		if(err)throw err;
		else{
			cb(rows);
		}
	});
};

MovieModel.countAll=(cb)=>{
	connection.count().exec((err,count)=>{
		if(err)throw err;
		else{
			cb(count);
		}
	});
};

MovieModel.getByPage=(page,page_size,cb)=>{
	connection.find().sort({movie_id:1}).skip(page>0?(page-1)*page_size:0).limit(page_size).exec((err,rows)=>{
		if(err)throw err;
		else{
			cb(rows);
		}		
	})
}

MovieModel.getTitleByPage=(title,page,page_size,cb)=>{
	connection.find({title:{$regex:"^"+title+'.*', $options: "i"}}).sort({movie_id:1}).skip(page>0?(page-1)*page_size:0).limit(page_size).exec((err,rows)=>{
		if(err)throw err;
		else{
			cb(rows);
		}		
	})
}

MovieModel.countTitleByPage=(title,cb)=>{
	connection.find({title:{$regex:"^"+title+'.*', $options: "i"}}).count().exec((err,count)=>{
		if(err)throw err;
		else{
			cb(count);
		}		
	})
}

MovieModel.get=(movie_id,cb)=>{
		let id=movie_id;
		console.log(id);
		connection.findOne({movie_id:id}).exec((err,rows)=>{
		if(err)throw err;
		else{
			cb(rows);
		}
	});
};

MovieModel.findTitle=(title,cb)=>{
	console.log(title);
	connection.find({title:{$regex:"^"+title+'.*', $options: "i"}}).exec((err,rows)=>{
		if(err)throw err;
		else{
			cb(rows);
		}
	});
}

MovieModel.insert=(movie,cb)=>{
	let data=movie;
	connection.count({movie_id:data.movie_id}).exec((err,count)=>{
		if(err)throw err;
		else{
			if(count==0){
				connection.create(data,(err)=>{
					if(err)throw err;
					cb();
				})
			}
			else{
				console.log('Movie ya existe');
				cb();
			}
		}
	});
};

MovieModel.update=(movie,cb)=>{
	let data=movie;
	console.log(data);
	connection.count({movie_id:data.movie_id}).exec((err,count)=>{
		if(err)throw err;
		else{
			if(count==0){
				console.log('Movie no existe');
				cb();
			}	
			else{
				connection.findOneAndUpdate(
					{movie_id:data.movie_id},
					{
						title:data.title,
						release_year:data.release_year,
						rating:data.rating,
						image:data.image
					},
					(err)=>{
						if(err)throw(err);
						cb();
					}
					)
				}
			}
		})
};

MovieModel.delete=(movie_id,cb)=>{
	let id=movie_id;
	console.log(id+' POR BORR');
	connection.findOneAndRemove({movie_id:id},(err)=>{
		console.log(err);
		if(err)throw(err);
		cb();
	})
};

module.exports=MovieModel;