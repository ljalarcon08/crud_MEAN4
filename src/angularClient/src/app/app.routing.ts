import { RouterModule , Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core'; 
import { AppComponent } from './app.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieAddComponent } from './components/movie-add/movie-add.component';
import { MovieFindComponent } from './components/movie-find/movie-find.component';
import { MovieFindAddComponent } from './components/movie-find-add/movie-find-add.component';
import { MovieAddFromServiceComponent } from './components/movie-add-from-service/movie-add-from-service.component';

export const AppRoutes:Routes=[
    {
        path:'',
        component:MovieComponent
    },
    {
        path:'edit',
        component:MovieEditComponent
    },
    {
        path:'add',
        component:MovieAddComponent
    },
    {
        path:'find',
        component:MovieFindComponent
    },
    {
        path:'findAdd',
        component:MovieFindAddComponent
    },
    {
        path:'addFService',
        component:MovieAddFromServiceComponent
    }
];
export const ROUTING:ModuleWithProviders=RouterModule.forRoot(AppRoutes);