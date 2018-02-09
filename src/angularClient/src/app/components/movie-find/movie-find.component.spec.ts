import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFindComponent } from './movie-find.component';

describe('MovieFindComponent', () => {
  let component: MovieFindComponent;
  let fixture: ComponentFixture<MovieFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
