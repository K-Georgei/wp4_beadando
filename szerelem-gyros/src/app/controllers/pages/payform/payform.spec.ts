import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayformComponent } from './payform';

describe('PayformComponent', () => {
  let component: PayformComponent;
  let fixture: ComponentFixture<PayformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
