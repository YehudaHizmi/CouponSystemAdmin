// import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/primeng';
import { WebApiAdminService } from './../../../services/web-api-admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  request: Request;
  response: Response;
  prefixLogOutUrl: string;

  constructor(private adminService: WebApiAdminService, private messageService: MessageService) {
    this.prefixLogOutUrl = adminService.prefixLogOutUrl;
  }

  ngOnInit() {
    this.items = [
    {
      label: 'Company',
      items: [
          {label: 'Manage Area', icon: 'pi pi-fw pi-file', routerLink: '/allCompanies'},
          {label: 'Company {Id}', icon: 'pi pi-fw pi-file', routerLink: '/getCompany'},
          {label: 'Add {Single}', icon: 'pi pi-fw pi-plus', routerLink: '/addCompany'},
          // {label: 'Delete/Update', icon: 'pi pi-fw pi-trash', routerLink: '/allCompanies'}
      ]
  },
  {
        label: 'Customer',
        items: [
          {label: 'Manage Area', icon: 'pi pi-fw pi-file', routerLink: '/allCustomers'},
          {label: 'Customer {Id}', icon: 'pi pi-fw pi-file', routerLink: '/getCustomer'},
          {label: 'Add {Single}', icon: 'pi pi-fw pi-plus', routerLink: '/addCustomer'}
        ]
      }
    ];
  }

  public logout() {
    this.adminService.logOutService(this.request, this.response).subscribe(
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'LogOut', detail: 'You Were Logged Out Successfully'});
        window.location.href = this.prefixLogOutUrl;
      },
      (error) => {
        this.messageService.add({severity: 'success', summary: 'LogOut', detail: 'Logged Out Failed'});
      });
  }

}
