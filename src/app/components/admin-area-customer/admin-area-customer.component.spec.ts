import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreaCustomerComponent } from './admin-area-customer.component';

describe('AdminAreaCustomerComponent', () => {
  let component: AdminAreaCustomerComponent;
  let fixture: ComponentFixture<AdminAreaCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAreaCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreaCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
