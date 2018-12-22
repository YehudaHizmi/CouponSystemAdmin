import { MessageService} from 'primeng/api';
import { WebApiAdminService } from './../../services/web-api-admin.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '../common/Company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {


  // Define variables
  companies: Company[] = [];
  cols: any[];
  caption = 'Company Main Management Area';
  company: Company = new Company(null, '', '', '');
  newCompany: boolean;
  displayDialog: boolean;
  selectedCompany: Company;
  companyName: string;
  numOfCompanies: number;
  DialogLeftButton = 'Delete';
  DialogRightButton = 'Update';
  createCompanyDialogForm: FormGroup;
  // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  /*
  At the constructor we inject
  1. FormBuilder for the favor validation of the forms
  2. WebApiAdminService for the favor of the services
  3. MessageService for the favor of the custom messages
  */
  constructor(private formBuilder: FormBuilder, private adminService: WebApiAdminService, private messageService: MessageService) {
    this.getAllCompanies();
    this.cols = adminService.companyCols;

    this.createCompanyDialogForm = formBuilder.group ({
      'compName': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    });

  }

  // on the ngOnInit a java script function responsible for covering and uncovering the password
  ngOnInit() {
    $('#compnayDialog').hover(function() {
      $('.toggle-password').click(function() {
        const input = $($(this).attr('toggle'));
        $(this).toggleClass('pi-eye pi-eye-slash');
        if (input.attr('type') === 'password') {
          input.attr('type', 'text');
        } else {
          input.attr('type', 'password');
        }
      });
    });

    // this.cols = [
    //   { displayName: 'Id',        field: 'id',        type: 'number' },
    //   { displayName: 'Name',      field: 'compName' , type: 'text'   },
    //   { displayName: 'Password',  field: 'password' , type: 'text'   },
    //   { displayName: 'Email',     field: 'email',     type: 'email'  },
    // ];
  }

  // When this method is activated a pop up window is opening and a new company can be added
  showDialogToAdd() {
    this.newCompany = true;
    this.company = new Company(null, '', '', '');
    this.displayDialog = true;
    this.createCompanyDialogForm.reset();
    this.disabledInputs('Add');
    this.DialogLeftButton = 'Cancel';
    this.DialogRightButton = 'Save';

    // const elem = $('#compnayDialog').find('.toggle-password');
    // elem.click(function() {
    //   $(this).removeClass ('pi-eye-slash');
    //   $(this).addClass ('pi-eye');
    //   $($(this).attr('toggle')).attr('type', 'password');
    // });
  }

  // When this method is activated a pop up window is opening and a new company can be edited
  onRowSelect(event) {
    this.newCompany = false;
    // this.createCompanyDialogForm.reset();
    this.company = this.cloneCompany(event.data);
    this.displayDialog = true;
    this.disabledInputs('Update');
    this.DialogLeftButton = 'Delete';
    this.DialogRightButton = 'Update';
  }


  // This method is activated from onRowSelect in order to present the edited company
  cloneCompany(comp: Company): Company {
    const tempComp = new Company(null, '', '', '');
    // tslint:disable-next-line:forin
    for (const prop in comp) {
      tempComp[prop] = comp[prop];
    }
    return tempComp;
  }

  // This method responsible for enabling and disabling editable inputs
  private disabledInputs(source: string) {
    this.createCompanyDialogForm.disable();
    this.createCompanyDialogForm.get('password').enable();
    this.createCompanyDialogForm.get('email').enable();
    if (source === 'Add') {
      this.createCompanyDialogForm.enable();
    }
  }

  /* This method responsible to save the data in two cases:
     1. When a new company being added the ddNewCompanyService service is activated
     2. When an existing company being edited than the updateCompanyService service is activated
  */
  save() {
    this.companyName = this.company.compName;
    if (this.newCompany) { // Add new company to DB
      this.adminService.addNewCompanyService(this.company).subscribe(
        (resp) => {
          this.getAllCompanies();
          this.messageService.add({severity: 'success', summary: 'Company Was Added', detail: this.companyName +
          ' Was Added Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Company Was\'t Added', detail: error._body});
        });
    } else { // Update the company
      this.adminService.updateCompanyService(this.company).subscribe(
        (resp) => {
          this.getAllCompanies();
          this.messageService.add({severity: 'success', summary: 'Company Was Updated', detail: this.companyName +
          ' Was Updated Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Company Was\'t Updated', detail: error._body});
        });
    }
    // this.company = null;
    this.displayDialog = false;
  }

  // When a company is deleted than this method is activated and it activate the deleteCompanyService service
   delete() {
    this.companyName = this.company.compName;
    if (!this.newCompany) {
    this.adminService.deleteCompanyService(this.selectedCompany).subscribe(
      (resp) => {
        this.getAllCompanies();
        this.messageService.add({severity: 'success', summary: 'Company Was Deleted', detail: this.companyName +
        ' Was Deleted Successfully'});
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Company Was\'t Deleted', detail: error._body});
      });
    }
     // this.company = null;
     this.displayDialog = false;
   }

   // This method is activated from the constructor - in order to intialize the data for the first time
  getAllCompanies() {
    this.adminService.getAllCompaniesService().subscribe(
      (resp) => {
        this.companies = resp.json();
        this.numOfCompanies = this.companies.length;
        // Make default sort of companies array
        this.sortArry(this.companies);
      },
      (error) => {
        this.companies = [];
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      });
  }

  // This function responsible to sort the array accoring to the company name
  private sortArry(arryToSort: Company[]) {
    arryToSort.sort((a: any, b: any) => {
      if (a.compName < b.compName) {
        return -1;
      } else if (a.compName > b.compName) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
