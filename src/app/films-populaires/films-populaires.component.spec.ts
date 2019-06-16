import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsPopulairesComponent } from './films-populaires.component';

describe('FilmsPopulairesComponent', () => {
  let component: FilmsPopulairesComponent;
  let fixture: ComponentFixture<FilmsPopulairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsPopulairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsPopulairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
