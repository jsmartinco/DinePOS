import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AEProduct } from './a-e-product';

describe('AEProduct', () => {
  let component: AEProduct;
  let fixture: ComponentFixture<AEProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AEProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AEProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
