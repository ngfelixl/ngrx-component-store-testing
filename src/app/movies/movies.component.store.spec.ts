import { MoviesStore } from './movies.component.store';

describe('MoviesComponentStore', () => {

  describe('addMovie reducer', () => {
    it('should add a movie to the store', (done) => {
      const moviesStore = new MoviesStore();
      moviesStore.setState({ movies: [] });

      moviesStore.addMovie({ name: 'Star Wars' });

      moviesStore.state$.subscribe((state) => {
        expect(state.movies.length).toBe(1);
        expect(state.movies[0]).toEqual({ id: 1, name: 'Star Wars' });
        done();
      });
    });

    it('should have the (maximum + 1) of the existing ids as id', () => {
      const moviesStore = new MoviesStore();
      moviesStore.setState({ movies: [
        {id: 1, name: 'Darkwing Duck'},
        {id: 9, name: 'Gargoyles'}
      ] });

      moviesStore.addMovie({name: 'Dragonball'});

      moviesStore.state$.subscribe(state => {
        expect(state.movies.length).toBe(3);
        expect(state.movies[2]).toEqual({id: 10, name: 'Dragonball'});
      });
    });
  });

  describe('deleteMovie reducer', () => {
    it('should remove an existing movie from the store', (done) => {
      const moviesStore = new MoviesStore();
      moviesStore.setState({ movies: [{id: 1, name: 'Zorro'}] });

      moviesStore.deleteMovie(1);

      moviesStore.state$.subscribe(state => {
        expect(state.movies.length).toBe(0);
        done();
      });
    });

    it('should not affect the store if the movie id does not exist', (done) => {
      const movies = [{id: 1, name: 'Zorro'}];
      const moviesStore = new MoviesStore();
      moviesStore.setState({ movies });

      moviesStore.deleteMovie(2);

      moviesStore.state$.subscribe(state => {
        expect(state.movies).toEqual(movies);
        done();
      });
    });
  });

  describe('movies$ selector', () => {
    it('should return an empty array as a default state', (done) => {
      const moviesStore = new MoviesStore();

      moviesStore.movies$.subscribe(movies => {
        expect(movies.length).toBe(0);
        done();
      });
    });

    it('should return the correct movies in the store', (done) => {
      const moviesStore = new MoviesStore();
      moviesStore.setState({ movies: [] });
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
