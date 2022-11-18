import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageAlertComponent } from './cart-page-alert.component';

describe('CartPageAlertComponent', () => {
  let component: CartPageAlertComponent;
  let fixture: ComponentFixture<CartPageAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPageAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
