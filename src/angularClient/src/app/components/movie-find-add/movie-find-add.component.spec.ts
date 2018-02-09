import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFindAddComponent } from './movie-find-add.component';

describe('MovieFindAddComponent', () => {
  let component: MovieFindAddComponent;
  let fixture: ComponentFixture<MovieFindAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFindAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFindAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
