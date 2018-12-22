import { MessageService } from 'primeng/api';
import { Company } from './../common/Company';
import { WebApiAdminService } from './../../services/web-api-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-company-by-id',
  templateUrl: './get-company-by-id.component.html',
  styleUrls: ['./get-company-by-id.component.css']
})
export class GetCompanyByIdComponent implements OnInit {

  requestedCompany: Company = new Company(null, '', '', '');
  inputs: any[];
  caption = 'Company Information';

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private adminService: WebApiAdminService, private messageService: MessageService) {
    this.inputs = adminService.companyCols;

  }

  // This methos activate getCompanyByIdService and return the infromation from the DB into requestedCompany variable
  public getCompany() {
    this.adminService.getCompanyByIdService(this.requestedCompany.id).subscribe(
      (resp) => {
        this.requestedCompany = resp.json();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      });
  }

  ngOnInit() {
  //   this.inputs = [
  //     { displayName: 'Id', field: 'id', type: 'number' , disabled: 'false' },
  //     { displayName: 'Company Name', field: 'compName' , type: 'text' , disabled: 'true'},
  //     { displayName: 'Password', field: 'password' , type: 'text', disabled: 'true'},
  //     { displayName: 'Email', field: 'email', type: 'email', disabled: 'true' },
  //   ];
  // }
  }
}
