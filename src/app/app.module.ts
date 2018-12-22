import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { WebApiAdminService } from './services/web-api-admin.service';
import { GetAllCompaniesComponent } from './components/get-all-companies/get-all-companies.component';

import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule, PanelModule, DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DeleteCompanyComponent } from './components/delete-company/delete-company.component';
import { AdminAreaComponent } from './components/admin-area/admin-area.component';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HeaderComponent } from './components/common/header/header.component';
import { MenuModule } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { GetCompanyByIdComponent } from './components/get-company-by-id/get-company-by-id.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AdminAreaCustomerComponent } from './components/admin-area-customer/admin-area-customer.component';
import { GetCustomerByIdComponent } from './components/get-customer-by-id/get-customer-by-id.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { MessagesComponent } from './components/common/messages/messages.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

// import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import {ConfirmationService} from 'primeng/api';
// import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    CreateCompanyComponent,
    GetAllCompaniesComponent,
    // DeleteCompanyComponent,
    AdminAreaComponent,
    HeaderComponent,
   // MessagesComponent,
    GetCompanyByIdComponent,
   AdminAreaCustomerComponent,
   GetCustomerByIdComponent,
   CreateCustomerComponent,
   MessagesComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    InputTextModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    PasswordModule,
    DataViewModule,
    PaginatorModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    BrowserAnimationsModule,
    TableModule,
    DataTableModule,
    PanelMenuModule,
    MenuModule,
    FieldsetModule,
    ToastModule,
    ReactiveFormsModule,
    // ConfirmDialogModule,
    // ConfirmationService,
    // ToastModule,
    // MessagesModule,
    // MessageModule,
    // ShowHidePasswordModule,
    RouterModule.forRoot (
        [
          {
              path: 'allCompanies',
              component: AdminAreaComponent
          },
          {
            path: 'addCompany',
            component: CreateCompanyComponent
          },
          {
            path: 'getCompany',
            component: GetCompanyByIdComponent
          },
          {
            path: 'allCustomers',
            component: AdminAreaCustomerComponent
          },
          {
            path: 'addCustomer',
            component: CreateCustomerComponent
          },
          {
            path: 'getCustomer',
            component: GetCustomerByIdComponent
          },
          {
            path: '',
            redirectTo: '/allCompanies',
            pathMatch: 'full'
          }
        ]
    )
    // SplitButtonModule


  ],
  providers: [WebApiAdminService, MessageService, { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
