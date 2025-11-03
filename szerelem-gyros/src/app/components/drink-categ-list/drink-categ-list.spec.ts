import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkCategList } from './drink-categ-list';

describe('DrinkCategList', () => {
  let component: DrinkCategList;
  let fixture: ComponentFixture<DrinkCategList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkCategList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkCategList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
