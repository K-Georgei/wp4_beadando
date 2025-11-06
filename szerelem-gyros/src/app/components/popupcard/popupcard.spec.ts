import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popupcard } from './popupcard';

describe('Popupcard', () => {
  let component: Popupcard;
  let fixture: ComponentFixture<Popupcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popupcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popupcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
