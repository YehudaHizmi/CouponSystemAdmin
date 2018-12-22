import { MessageService } from 'primeng/api';
import { WebApiAdminService } from './../../services/web-api-admin.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../common/Customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-area-customer',
  templateUrl: './admin-area-customer.component.html',
  styleUrls: ['./admin-area-customer.component.css']
})
export class AdminAreaCustomerComponent implements OnInit {

  customers: Customer[] = [];
  cols: any[];
  caption = 'Customer Main Management Area';
  customer: Customer = new Customer(null, '', '');
  newCustomer: boolean;
  displayDialog: boolean;
  selectedCustomer: Customer;
  customerName: string;
  numOfCustomers: number;
  DialogLeftButton = 'Delete';
  DialogRightButton = 'Update';
  createCustomerDialogForm: FormGroup;


  /*
  At the constructor we inject
  1. FormBuilder for the favor validation of the forms
  2. WebApiAdminService for the favor of the services
  3. MessageService for the favor of the custom messages
  */
  constructor(private formBuilder: FormBuilder, private adminService: WebApiAdminService, private messageService: MessageService) {
     this.getAllCustomers();
     this.cols = adminService.customerCols;

     this.createCustomerDialogForm = formBuilder.group ({
      'custName': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  // on the ngOnInit a java script function responsible for covering and uncovering the password
  ngOnInit() {
    $('#customerDialog').hover(function() {
      $('.toggle-password').click(function() {
        $(this).toggleClass('pi-eye pi-eye-slash');
        const input = $($(this).attr('toggle'));
        if (input.attr('type') === 'password') {
          input.attr('type', 'text');
        } else {
          input.attr('type', 'password');
        }
      });
    });

   // this.cols = [
    //   { displayName: 'Id',        field: 'id',        type: 'number'},
    //   { displayName: 'Name',      field: 'custName' , type: 'text'  },
    //   { displayName: 'Password',  field: 'password' , type: 'text'  }
    // ];
  }

  // When this method is activated a pop up window is opening and a new customer can be added
  showDialogToAdd() {
    this.newCustomer = true;
    this.customer = new Customer(null, '', '');
    this.displayDialog = true;
    this.createCustomerDialogForm.reset();
    this.disabledInputs('Add');
    this.DialogLeftButton = 'Cancel';
    this.DialogRightButton = 'Save';
  }

  // When this method is activated a pop up window is opening and a new customer can be edited
  onRowSelect(event) {
    this.newCustomer = false;
    this.customer = this.cloneCustomer(event.data);
    this.displayDialog = true;
    this.disabledInputs('Update');
    this.DialogLeftButton = 'Delete';
    this.DialogRightButton = 'Update';
  }

  // This method is activated from onRowSelect in order to present the edited customer
  cloneCustomer(cust: Customer): Customer {
    const tempCust = new Customer(null, '', '');
    // tslint:disable-next-line:forin
    for (const prop in cust) {
      tempCust[prop] = cust[prop];
    }
    return tempCust;
  }

  // This method responsible for enabling and disabling editable inputs
  private disabledInputs(source: string) {
    this.createCustomerDialogForm.disable();
    this.createCustomerDialogForm.get('password').enable();
    if (source === 'Add') {
      this.createCustomerDialogForm.enable();
    }
  }

  /* This method responsible to save the data in two cases:
     1. When a new customer being added the addNewCustomerService service is activated
     2. When an existing customer being edited than the updateCustomerService service is activated
  */
  save() {
    this.customerName = this.customer.custName;
    if (this.newCustomer) { // Add new company to DB
      this.adminService.addNewCustomerService(this.customer).subscribe(
        (resp) => {
          this.getAllCustomers();
          this.messageService.add({severity: 'success', summary: 'Customer Was Added', detail: this.customerName +
          ' Was Added Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Customer Was\'t Added', detail: error._body});
        });
    } else { // Update the company
      this.adminService.updateCustomerService(this.customer).subscribe(
        () => {
          this.getAllCustomers();
          this.messageService.add({severity: 'success', summary: 'Customer Was Updated', detail: this.customerName +
          ' Was Updated Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Customer Was\'t Updated', detail: error._body});
        });
    }
    // this.customer = null;
    this.displayDialog = false;
  }

  // When a customer is deleted than this method is activated and it activate the deleteCustomerService service
   delete() {
    this.customerName = this.customer.custName;
    if (!this.newCustomer) {
    this.adminService.deleteCustomerService(this.selectedCustomer).subscribe(
         () => {
           this.getAllCustomers();
            this.messageService.add({severity: 'success', summary: 'Customer Was Deleted', detail: this.customerName +
            ' Was Deleted Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Customer Was\'t Deleted', detail: error._body});
        });
    }
     // this.customer = null;
     this.displayDialog = false;
   }

  // This method is activated from the constructor - in order to intialize the data for the first time
  getAllCustomers() {
    this.adminService.getAllCustomersService().subscribe(
      (resp) => {
        this.customers = resp.json();
        this.numOfCustomers = this.customers.length;
        // Make default sort of companies array
        this.sortArry(this.customers);
    },
    (error) => {
      this.customers = [];
      this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
    });
  }

  // This function responsible to sort the array accoring to the customer name
  private sortArry(arryToSort: Customer[]) {
    arryToSort.sort((a: any, b: any) => {
      if (a.custName < b.custName) {
        return -1;
      } else if (a.custName > b.custName) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
