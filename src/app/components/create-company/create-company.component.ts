import { MessageService } from 'primeng/api';
import { Company } from './../common/Company';
import { WebApiAdminService } from './../../services/web-api-admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  newCompany: Company = new Company(null, '', '', '');
  caption = 'Create A New Company';
  createCompanyForm: FormGroup;
  cols: any[];


    /*
  At the constructor we inject
  1. FormBuilder for the favor validation of the forms
  2. WebApiAdminService for the favor of the services
  3. MessageService for the favor of the custom messages
  */
  constructor(private formBuilder: FormBuilder, private adminService: WebApiAdminService, private messageService: MessageService) {
     this.cols = adminService.companyCols;
     this.createCompanyForm = formBuilder.group ({
      'compName': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // This method is activated when a new company being added.
  // it gets the all the information from the form and sent it as a company object into the addNewCompanyService service
  public addNewCompany() {
    this.adminService.addNewCompanyService(this.newCompany).subscribe
    (
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'Company Was Added', detail: this.newCompany.compName +
         ' Was Added Successfully'});
      },
      (error) => {
         this.messageService.add({severity: 'error', summary: 'Company Was\'t Added', detail: error._body});
      });
      this.newCompany = new Company(null, '', '', '');
      // this.messageService.clear();
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
