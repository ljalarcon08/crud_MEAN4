import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie-service.service';
import {FormsModule} from '@angular/forms';
import {Movie} from '../../models/Movie';
import{ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-movie-find',
  templateUrl: './movie-find.component.html',
  styleUrls: ['./movie-find.component.css']
})
export class MovieFindComponent implements OnInit {
  movies:Movie[];
  toFind:string;
  listTotal:number;
  title:string;
  constructor(private movieService:MovieService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.title=params.title;
      if(params.title!=0){
          this.movieService.getMoviesPageByTitle(0,params.title,5).subscribe(params=>{
            var json=JSON.parse(JSON.stringify(params));
            if(json.total>0){
              this.movies=json.data;
              this.listTotal=json.total;
            }
          }
        )
      }      
    })

  }

  onScrollDown(){     
    if(this.listTotal>this.movies.length){
      let page=this.movies.length/5;
      let pageSize=5;
      page=page+1;
      this.movieService.getMoviesPageByTitle(page,this.title,pageSize).subscribe(params=>{
          var json=JSON.parse(JSON.stringify(params));
          if(json.total>0){
            this.movies=this.movies.concat(json.data);
            this.listTotal=json.total;
          }
        })   
    }
    else{
      return;
    }
  }


}
