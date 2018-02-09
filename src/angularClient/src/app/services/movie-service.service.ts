import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import "rxjs/Rx";

import {Movie} from '../models/Movie';

@Injectable()
export class MovieService {
  domain:string='http://localhost:3000';
  constructor(private httpClient:HttpClient) { }

  getMovies(){
    console.log(`${this.domain}/api/movies`);
    return this.httpClient.get<Movie[]>(`${this.domain}/api/movies`)
        .map(res=>res);
  }

  getMoviesByPage(page,pageSize){
    var data={
      page:page,
      pageSize:pageSize
    }
    return this.httpClient.post(`${this.domain}/api/movies/getByPage`,data).map(res=>res);
  }

  getMovie(movie_id){
    return this.httpClient.get<Movie>(`${this.domain}/api/movies/${movie_id}`).map(res=>res);
  }

  getMoviesPageByTitle(page,title,pageSize){
    var request={
      page:page,
      pageSize:pageSize,
      title:title
    };
    return this.httpClient.post(`${this.domain}/api/movies/findTitleByPage`,request).map(res=>res);
  }

  addMovies(movie:Movie){
    console.log(`${this.domain}/api/movies/add`);
    return this.httpClient.post<Movie>(`${this.domain}/api/movies/add`,movie).map(res=>res);
  }

  updateMovie(movie:Movie){
    return this.httpClient.put<Movie>(`${this.domain}/api/movies/upt`,movie).map(res=>res);
  }

  deleteMovie(movie_id){
    return this.httpClient.delete<Movie>(`${this.domain}/api/movies/delete/${movie_id}`).map(res=>res);
  }

  findMovieByTitle(title){
    return this.httpClient.get<Movie[]>(`${this.domain}/api/movies/findTitle/${title}`).map(res=>res);
  }

  findMovieByIdService(movie_id){
    return this.httpClient.get<Movie>(`${this.domain}/api/movies/findServiceId/${movie_id}`).map(res=>res);
  }

  findMovieByTitleService(title){
    return this.httpClient.get<Movie>(`${this.domain}/api/movies/findServiceTitle/${title}`).map(res=>res);
  }

}
