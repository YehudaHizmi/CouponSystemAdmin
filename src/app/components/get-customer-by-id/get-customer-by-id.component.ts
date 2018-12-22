import { WebApiAdminService } from './../../services/web-api-admin.service';
import { Customer } from './../common/Customer';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-get-customer-by-id',
  templateUrl: './get-customer-by-id.component.html',
  styleUrls: ['./get-customer-by-id.component.css']
})
export class GetCustomerByIdComponent implements OnInit {

  requestedCustomer: Customer = new Customer(null, '', '');
  inputs: any[];
  caption = 'Customer Information';

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private adminService: WebApiAdminService, private messageService: MessageService) {
    this.inputs = adminService.customerCols;
  }

  // This methos activate getCustomerByIdService and return the infromation from the DB into requestedCustomer variable
  public getCustomer() {
    console.log(this.requestedCustomer.id);
    this.adminService.getCustomerByIdService(this.requestedCustomer.id).subscribe(
      (resp) => {
        this.requestedCustomer = resp.json();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      });
  }

  ngOnInit() {
    // this.inputs = [
    //   { displayName: 'Id', field: 'id', type: 'number' , disabled: 'false' },
    //   { displayName: 'Customer Name', field: 'custName' , type: 'text' , disabled: 'true'},
    //   { displayName: 'Password', field: 'password' , type: 'password', disabled: 'true'}
    // ];
  }

}
