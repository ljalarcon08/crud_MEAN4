import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddFromServiceComponent } from './movie-add-from-service.component';

describe('MovieAddFromServiceComponent', () => {
  let component: MovieAddFromServiceComponent;
  let fixture: ComponentFixture<MovieAddFromServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddFromServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddFromServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
