import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomerByIdComponent } from './get-customer-by-id.component';

describe('GetCustomerByIdComponent', () => {
  let component: GetCustomerByIdComponent;
  let fixture: ComponentFixture<GetCustomerByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCustomerByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCustomerByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
