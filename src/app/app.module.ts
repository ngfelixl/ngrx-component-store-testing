import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesStore } from './movies/movies.component.store';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [MoviesStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
