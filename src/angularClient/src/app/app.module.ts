import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieService } from './services/movie-service.service';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import{ ROUTING } from './app.routing';
import { MovieAddComponent } from './components/movie-add/movie-add.component';
import { MovieFindComponent } from './components/movie-find/movie-find.component';
import { MovieFindAddComponent } from './components/movie-find-add/movie-find-add.component';
import { MovieAddFromServiceComponent } from './components/movie-add-from-service/movie-add-from-service.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieEditComponent,
    MovieAddComponent,
    MovieFindComponent,
    MovieFindAddComponent,
    MovieAddFromServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ROUTING,
    InfiniteScrollModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
