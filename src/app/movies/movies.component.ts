import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movies';
import { MoviesStore } from './movies.component.store';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit {
  addMovieForm: FormGroup;
  readonly movies$ = this.moviesStore.movies$;

  constructor(private readonly moviesStore: MoviesStore) {
    this.addMovieForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.moviesStore.setState({movies: []});
  }

  addMovie(): void {
    const movie: Omit<Movie, 'id'> = this.addMovieForm.value;
    this.addMovieForm.reset();
    this.moviesStore.addMovie(movie);
  }

  deleteMovie(id: number): void {
    this.moviesStore.deleteMovie(id);
  }

  resetMovies(): void {
    //    resets the State to empty array 👇
    this.moviesStore.setState({movies: []});
  }
}
