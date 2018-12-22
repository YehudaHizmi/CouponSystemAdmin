import { MessageService } from 'primeng/api';
import { WebApiAdminService } from './../../services/web-api-admin.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '../common/Company';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-get-all-companies',
  templateUrl: './get-all-companies.component.html',
  styleUrls: ['./get-all-companies.component.css']
})
export class GetAllCompaniesComponent implements OnInit {

  companies: Company[];
  selectedCompany: Company;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  value: string;

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private webApiAdminService: WebApiAdminService, private messageService: MessageService) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.webApiAdminService.getAllCompaniesService().subscribe(
      (resp) => {
        this.companies = resp.json();
      },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      });
  }

  deleteCompany(company: Company) {
      this.webApiAdminService.deleteCompanyService(company).subscribe(
          () => {}
      );
      this.getCompanies();
  }

  selectCompany(event: Event, company: Company) {
    this.selectedCompany = company;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
     this.value = event.value;
    if (this.value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = this.value.substring(1, this.value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = this.value;
    }
  }

  onDialogHide() {
    this.selectedCompany = null;
  }


}
