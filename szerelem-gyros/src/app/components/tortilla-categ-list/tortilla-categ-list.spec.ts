import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortillaCategList } from './tortilla-categ-list';

describe('TortillaCategList', () => {
  let component: TortillaCategList;
  let fixture: ComponentFixture<TortillaCategList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TortillaCategList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TortillaCategList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
