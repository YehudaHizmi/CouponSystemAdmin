import { MessageService } from 'primeng/api';
import { WebApiAdminService } from './../../services/web-api-admin.service';
import { Customer } from './../common/Customer';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  @ViewChild('AddCustForm') AddCustForm;
  newCustomer: Customer = new Customer(null, '', '');
  caption = 'Create A New Customer';
  createCustomerForm: FormGroup;
  cols: any[];

  /*
  At the constructor we inject
  1. FormBuilder for the favor validation of the forms
  2. WebApiAdminService for the favor of the services
  3. MessageService for the favor of the custom messages
  */
  constructor(private formBuilder: FormBuilder, private adminService: WebApiAdminService, private messageService: MessageService) {
    this.cols = adminService.customerCols;

    this.createCustomerForm = formBuilder.group ({
      'custName': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

  }

  // This method is activated when a new customer being added.
  // it gets the all the information from the form and sent it as a customer object into the addNewCustomerService service
  public addNewCustomer() {
    this.adminService.addNewCustomerService(this.newCustomer).subscribe
    (
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'Customer Was Added', detail: this.newCustomer.custName +
         ' Was Added Successfully'});
      },
      (error) => {
         this.messageService.add({severity: 'error', summary: 'Customer Was\'t Added', detail: error._body});
      });
      this.newCustomer = new Customer(null, '', '');
  }


  // on the ngOnInit a java script function responsible for covering and uncovering the password
  ngOnInit() {
    $('.toggle-password').click(function() {
      $(this).toggleClass('pi-eye pi-eye-slash');
      const input = $($(this).attr('toggle'));
      if (input.attr('type') === 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  }

}

