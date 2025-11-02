import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitaCategList } from './pita-categ-list';

describe('PitaCategList', () => {
  let component: PitaCategList;
  let fixture: ComponentFixture<PitaCategList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PitaCategList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitaCategList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
