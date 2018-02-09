import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import {MovieService} from '../../services/movie-service.service'
import {Movie} from '../../models/Movie'

@Component({
  selector: 'app-movie-find-add',
  templateUrl: './movie-find-add.component.html',
  styleUrls: ['./movie-find-add.component.css']
})
export class MovieFindAddComponent implements OnInit {
  toFind:string='';
  radio:string='title';
  movie:Movie;
  constructor(private route:ActivatedRoute,private router:Router,private movieService:MovieService) { }

  ngOnInit() {
  }

  findAndAdd(event){
    event.preventDefault();
    if(this.toFind.length>0){
          if(this.radio=='id'){
            this.movieService.findMovieByIdService(this.toFind).subscribe(data=>{
              if(data.n==1){
                this.checkMovie(data);
              }
              else{
                alert('Movie not found');
                this.toFind='';
                this.radio='title';
              }
            })
          }
          else{
            this.movieService.findMovieByTitleService(this.toFind).subscribe(data=>{
              if(data.n==1){
                this.checkMovie(data);
              }
              else{
                alert('Movie not found');
                this.toFind='';
                this.radio='title';
              }
            })
          }
    }
    else{
      alert('Title or Id Empty');
    }
  }

checkMovie(data){
  this.movie=data;
  this.movieService.getMovie(this.movie.movie_id).subscribe(dbData=>{
    if(dbData.n==1){
      alert('Movie Already in Database as: '+dbData.title);
    }
    else{
        this.router.navigate(['addFService'],
        {
          queryParams:{
            movie:JSON.stringify(this.movie)
          }
        }
      );
    }
  });
}

}
