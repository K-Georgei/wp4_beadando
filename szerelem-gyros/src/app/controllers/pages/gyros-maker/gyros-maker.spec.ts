import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyrosMaker } from './gyros-maker';

describe('GyrosMaker', () => {
  let component: GyrosMaker;
  let fixture: ComponentFixture<GyrosMaker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GyrosMaker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GyrosMaker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
