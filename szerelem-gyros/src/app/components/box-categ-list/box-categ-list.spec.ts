import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCategList } from './box-categ-list';

describe('BoxCategList', () => {
  let component: BoxCategList;
  let fixture: ComponentFixture<BoxCategList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxCategList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxCategList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
