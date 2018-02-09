import { Component, OnInit } from '@angular/core';
import {FormGroup,FormsModule,FormBuilder,Validators} from '@angular/forms'
import { ActivatedRoute , Router } from '@angular/router';
import {MovieService} from '../../services/movie-service.service'
import {Movie} from '../../models/Movie'

@Component({
  selector: 'app-movie-add-from-service',
  templateUrl: './movie-add-from-service.component.html',
  styleUrls: ['./movie-add-from-service.component.css']
})
export class MovieAddFromServiceComponent implements OnInit {
  movieForm:FormGroup;
  movie:Movie;

  constructor(private movieService:MovieService,private formBuilder:FormBuilder
    ,private route:ActivatedRoute,private router:Router) { 
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
      this.movie=JSON.parse(params.movie);
      this.movieForm.setValue({
        movie_id:this.movie.movie_id,
        title: this.movie.title,
        release_year:this.movie.release_year,
        rating:this.movie.rating,
        image:this.movie.image
      });
    });
  }

  addMovie(post){
    let newMovie:Movie;
    newMovie=post;
    this.movieService.addMovies(newMovie).subscribe(movie=>{
      this.router.navigate(['']);
    });
  }

}
