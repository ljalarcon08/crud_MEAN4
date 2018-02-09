import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie-service.service'
import {Movie} from '../../models/Movie'
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import{ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movieForm:FormGroup;
  movie:Movie;
  

  constructor(private movieService:MovieService
    ,private formBuilder:FormBuilder,
  private route:ActivatedRoute,
  private router:Router) {

    this.movieForm=formBuilder.group({
      'movie_id':[null,Validators.required],
      'title':[null,Validators.required],
      'release_year':[null,Validators.required],
      'rating':[null,Validators.required],
      'image':[null,Validators.required]
    });

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params.movie_id!=0){
        this.movieService.getMovie(params.movie_id).subscribe(movie=>{
          this.movie=movie;
          this.movieForm.setValue({
            movie_id:this.movie.movie_id,
            title: this.movie.title,
            release_year:this.movie.release_year,
            rating:this.movie.rating,
            image:this.movie.image
          });
        });
      }
    });
    //console.log(this.movieForm.value);
  }

  updateMovie(movieUpt:Movie){
    this.movie=movieUpt;
    this.movieService.updateMovie(this.movie).subscribe(data=>{
      if(data.n==1){
        this.router.navigate(['']);
      }
    });
  }


}
