import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie-service.service'
import {Movie} from '../../models/Movie'
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import{ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  movieForm:FormGroup;
  movie:Movie;

  constructor(private formBuilder:FormBuilder,private movieService:MovieService,
  private route:ActivatedRoute,private router:Router) {
    this.movieForm=formBuilder.group({
      'movie_id':[null,Validators.required],
      'title':[null,Validators.required],
      'release_year':[null,Validators.required],
      'rating':[null,Validators.required],
      'image':[null,Validators.required]
    })
   }

  ngOnInit() {
  }

  addMovie(post){
    let newMovie:Movie;
    newMovie=post;
    this.movieService.addMovies(newMovie).subscribe(movie=>{
      this.router.navigate(['']);
    });
  }

}
