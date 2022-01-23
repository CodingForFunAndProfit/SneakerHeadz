import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerSearchComponent } from './sneaker-search.component';

describe('SneakerSearchComponent', () => {
  let component: SneakerSearchComponent;
  let fixture: ComponentFixture<SneakerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SneakerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
