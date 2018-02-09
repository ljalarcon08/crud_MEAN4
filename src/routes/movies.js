var router=require('express').Router();
var movieModel=require('../models/movie-model');
var request=require('request');

router.get(('/movies'),(req,res,next)=>{
    //res.send('Ello');
    movieModel.getAll((rows)=>{
        res.json(rows);
    });
}
);
router.get(('/movies/:id'),(req,res,next)=>{
    var id=req.params.id;
    movieModel.get(id,(rows)=>{
        if(rows==null){
            res.json({
                movie_id:0,
                title:'',
                release_year:'',
                rating:'',
                image:'',
                n:0})
        }
        else{
            let movie={
                movie_id:rows.movie_id,
                title:rows.title,
                release_year:rows.release_year,
                rating:rows.rating,
                image:rows.image,
                n:1
            }
            res.json(movie);
        }
    });
})

router.post(('/movies/getByPage'),(req,res,next)=>{
    var page=req.body.page;
    var pageSize=req.body.pageSize;
    movieModel.countAll((count)=>{
        if(count>0){
            movieModel.getByPage(page,pageSize,(rows)=>{
                res.json({
                    data:rows,
                    total:count
                })
            })
        }
    })
})



router.post(('/movies/add'),(req,res,next)=>{
    var task=req.body;
    movieModel.insert(task,()=>{
         res.redirect('/api/movies/'+req.body.movie_id);
    });

});

router.put(('/movies/upt'),(req,res,next)=>{
    var movie=req.body;
    movieModel.update(movie,()=>{
        res.json(
            {
                'n':1,
                'ok':1
            });
    });

});

router.get(('/movies/findTitle/:title'),(req,res,next)=>{
    var title=req.params.title;
    movieModel.findTitle(title,(rows)=>{
        res.json(rows);
    })
});

router.post(('/movies/findTitleByPage'),(req,res,next)=>{
    var page=req.body.page;
    var pageSize=req.body.pageSize;
    var title=req.body.title;
    movieModel.countTitleByPage(title,(count)=>{
        movieModel.getTitleByPage(title,page,pageSize,(rows)=>{
            res.json({
                data:rows,
                total:count
            });
        })
    })
});

router.delete(('/movies/delete/:id'),(req,res,next)=>{
    var movie_id=req.params.id;
    movieModel.delete(movie_id,()=>{
        res.json(
            {
                'n':1,
                'ok':1
            });
    });

});

router.get(('/movies/findServiceId/:id'),(req,res,next)=>{
    var movie_id=req.params.id;
    request.get('http://www.omdbapi.com/?i='+movie_id+'&apikey=29aac7aa',(error,response,body)=>{
        if (!error && response.statusCode == 200) {
            var json=JSON.parse(body);
            var n=json.Response=='True'?1:0;
            var movie={
                movie_id:json.imdbID,
                title:json.Title,
                release_year:json.Year,
                rating:json.imdbRating,
                image:json.Poster,
                n:n
            }
            res.json(movie);
        }
        else{
            res.json({n:0});
        }
    })
});


router.get(('/movies/findServiceTitle/:title'),(req,res,next)=>{
    var title=req.params.title;
    request.get('http://www.omdbapi.com/?t='+title+'&apikey=29aac7aa',(error,response,body)=>{
        if (!error && response.statusCode == 200) {
            var json=JSON.parse(body);
            var n=json.Response=='True'?1:0;
            var movie={
                movie_id:json.imdbID,
                title:json.Title,
                release_year:json.Year,
                rating:json.imdbRating,
                image:json.Poster,
                n:n
            }
            res.json(movie);
        }
        else{
            res.json({n:0});
        }
    })
});

//www.omdbapi.com/?i=tt0068646&apikey=29aac7aa
//www.omdbapi.com/?t=back to&apikey=29aac7aa



module.exports=router;