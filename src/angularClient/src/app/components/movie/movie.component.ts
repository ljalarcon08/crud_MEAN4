import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie-service.service'
import {Movie} from '../../models/Movie'
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies:Movie[];
  moviesAll:Movie[];
  movieForm:FormGroup;
  movie:Movie;
  listTotal:number;


  constructor(private movieService:MovieService, private formBuilder:FormBuilder) {
    this.movieForm=formBuilder.group({
      'movie_id':[null,Validators.required],
      'title':[null,Validators.required],
      'release_year':[null,Validators.required],
      'rating':[null,Validators.required],
      'image':[null,Validators.required]
    });
  }

  ngOnInit() {
    /*this.movieService.getMovies().subscribe(movies=>{
      console.log(movies);
      this.moviesAll=this.sortByKey(movies,'movie_id');
      this.movies=this.moviesAll.splice(0,5);
    });*/
    this.movieService.getMoviesByPage(0,5).subscribe(params=>{
      var json=JSON.parse(JSON.stringify(params));
      if(json.total>0){
        this.movies=json.data;
        this.listTotal=json.total;
      }
    })
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

  onScrollDown(){     
    if(this.listTotal>this.movies.length){
      console.log(this.movies.length);
      let page=this.movies.length/5;
      let pageSize=5;
      page=page+1;
        this.movieService.getMoviesByPage(page,pageSize).subscribe(params=>{
          var json=JSON.parse(JSON.stringify(params));
          if(json.total>0){
            console.log(json.data);
            this.movies=this.movies.concat(json.data);
            this.movies=this.sortByKey(this.movies,'movie_id');
            this.listTotal=json.total;
          }
        })
    }
    else{
      return;
    }
  }

  /*addMovie(post){
    let newMovie:Movie;
    newMovie=post;
    console.log(newMovie);
    this.movieService.addMovies(newMovie).subscribe(movie=>{
      this.movies.push(movie);
      console.log(this.movies);
    });
    this.movieForm.reset();
  }*/

  deleteMovie(movie_id){
    const resp=confirm('Seguro de Eliminar');
    if(resp){    
      const movies=this.movies;
      this.movieService.deleteMovie(movie_id).subscribe(data=>{
        if(data.n==1){
          var movieToDel=movies.filter((movieToDel)=>{
            return movieToDel.movie_id==movie_id;
          })
          if(movieToDel.length>0){
            movies.splice(movies.indexOf(movieToDel[0]),1);
          }
        }
      })
    }
    else{
      return;
    }
  }

}

