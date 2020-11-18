import { MoviesStore } from './movies.component.store';

describe('MoviesComponentStore', () => {
  let moviesStore: MoviesStore;

  describe('addMovie reducer', () => {
    it('should add a movie to the store', (done) => {
      moviesStore = new MoviesStore();
      moviesStore.setState({ movies: [] });

      moviesStore.addMovie({ name: 'Star Wars' });

      moviesStore.state$.subscribe((state) => {
        expect(state.movies.length).toBe(1);
        expect(state.movies[0]).toEqual({ id: 1, name: 'Star Wars' });
        done();
      });
    });
  });

  describe('movies$ selector', () => {
    it('should return an empty array as a default state', (done) => {
      moviesStore = new MoviesStore();

      moviesStore.movies$.subscribe(movies => {
        expect(movies.length).toBe(0);
        done();
      });
    });

    it('should return the correct movies in the store', (done) => {
      moviesStore = new MoviesStore();
      const moviesData = [
        { id: 1, name: 'Spiderman' },
        { id: 2, name: 'Star Wars' }
      ];

      moviesStore.setState({ movies: moviesData });

      moviesStore.movies$.subscribe(movies => {
        expect(movies).toEqual(moviesData);
        done();
      });
    });
  });
});
