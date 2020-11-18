import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { MoviesStore } from './movies.component.store';


describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  const mockMoviesStore = jasmine.createSpyObj('MoviesStore', ['setState', 'addMovie'], { movies$: of([]) });

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      imports: [ ReactiveFormsModule ]
    });
    TestBed.overrideProvider(MoviesStore, { useValue: mockMoviesStore });
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('addMovies', () => {
    it('should reflect the DOM input value in the FormGroup', () => {
      const hostElement = fixture.nativeElement;
      const nameInput: HTMLInputElement = hostElement.querySelector('form input');

      nameInput.value = 'Star Wars';
      nameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(fixture.componentInstance.addMovieForm.value).toEqual({ name: 'Star Wars' });
    });

    it('should dispatch the moviesStore.addMovie action with the FormGroup value', () => {
      fixture.componentInstance.addMovieForm.setValue({ name: 'Batman' });

      fixture.componentInstance.addMovie();

      expect(mockMoviesStore.addMovie).toHaveBeenCalledWith({ name: 'Batman' });
    });

    it('should clear the form if a movie is added', () => {
      fixture.componentInstance.addMovieForm.setValue({ name: 'Terminator' });

      fixture.componentInstance.addMovie();

      expect(fixture.componentInstance.addMovieForm.value).toEqual({ name: null });
    });
  });

  describe('deleteMovie', () => {
    it('should trigger the deleteMovie component store function if the user clicks the delete button', () => {
      const moviesData = [{id: 7, name: 'Powerrangers'}, {id: 2, name: 'Batman'}];
      const testMockMovieStore = jasmine.createSpyObj('MoviesStore', ['setState', 'deleteMovie'], { movies$: of(moviesData) });
      TestBed.overrideProvider(MoviesStore, { useValue: testMockMovieStore });
      fixture = TestBed.createComponent(MoviesComponent);
      fixture.detectChanges();

      const movies = fixture.debugElement.queryAll(By.css('.movie'));
      movies[0].query(By.css('button.delete')).triggerEventHandler('click', null);

      expect(testMockMovieStore.deleteMovie).toHaveBeenCalledWith(7);
    });
  });

  describe('movies$ selector', () => {
    it('should display no movies by default', () => {
      const movieElements = fixture.debugElement.queryAll(By.css('.movie'));

      expect(movieElements.length).toBe(0);
    });

    it('should be a reference to the moviesStore movies$', () => {
      expect(fixture.componentInstance.movies$).toBe(mockMoviesStore.movies$);
    });

    it('should display movies$ in the DOM', () => {
      const moviesData = [{id: 1, name: 'Powerrangers'}, {id: 2, name: 'Batman'}];
      const testMockMovieStore = jasmine.createSpyObj('MoviesStore', ['setState'], { movies$: of(moviesData) });
      TestBed.overrideProvider(MoviesStore, { useValue: testMockMovieStore });
      fixture = TestBed.createComponent(MoviesComponent);
      fixture.detectChanges();

      const movies = fixture.debugElement.queryAll(By.css('.movie'));
      expect(movies[0].nativeElement.textContent).toContain('Powerrangers');
      expect(movies[1].nativeElement.textContent).toContain('Batman');
    });
  });
});
