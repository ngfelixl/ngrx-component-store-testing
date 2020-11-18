import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Movie } from '../models/movies';

export interface MoviesState {
  movies: Movie[];
}

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  constructor() {
    super({movies: []});
  }

  readonly addMovie = this.updater((state, movie: Omit<Movie, 'id'>) => ({
    movies: [...state.movies, {
      id: Math.max(...state.movies.map(m => m.id), 0) + 1,
      ...movie
    }],
  }));

  readonly deleteMovie = this.updater((state, id: number) => ({
    movies: state.movies.filter(movie => movie.id !== id)
  }));

  readonly movies$: Observable<Movie[]> = this.select(state => state.movies);
}
