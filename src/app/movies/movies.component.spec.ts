import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MoviesComponent } from './movies.component';
import { MoviesStore } from './movies.component.store';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  const mockMoviesStore = jasmine.createSpyObj('MoviesStore', ['setState', 'addMovie'], ['movies$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      providers: [{
        provide: MoviesStore,
        useValue: mockMoviesStore,
     }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addMovies', () => {
    it('should call the addMovie function of the moviesStore', () => {
      fixture.componentInstance.addMovie();

      expect(mockMoviesStore.addMovie).toHaveBeenCalledWith({ name: null });
    });
  });

  describe('movies$', () => {
    it('should display no movies by default', () => {
      const movieElements = fixture.debugElement.queryAll(By.css('.movie'));

      expect(movieElements.length).toBe(0);
    });
  });
});
