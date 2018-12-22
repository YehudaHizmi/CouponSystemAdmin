
import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Company } from './../components/common/Company';
import { Customer } from './../components/common/Customer';

@Injectable({
  providedIn: 'root'
})
export class WebApiAdminService {

  companyCols: any[];
  customerCols: any[];
  prefixCompanyUrl = 'http://localhost:8080/company/';
  prefixCustomerUrl = 'http://localhost:8080/customer/';
  prefixLogOutUrl = 'http://localhost:8080/';


  constructor( private http: Http) {

    this.companyCols = [
      { displayName: 'Id',        field: 'id',        type: 'number' , disabled: 'false' },
      { displayName: 'Name',      field: 'compName' , type: 'text'   , disabled: 'true' },
      { displayName: 'Password',  field: 'password' , type: 'text'   , disabled: 'true' },
      { displayName: 'Email',     field: 'email',     type: 'email'  , disabled: 'true' }
    ];

    this.customerCols = [
      { displayName: 'Id',        field: 'id',        type: 'number' , disabled: 'false' },
      { displayName: 'Name',      field: 'custName' , type: 'text'  , disabled: 'true' },
      { displayName: 'Password',  field: 'password' , type: 'text'  , disabled: 'true' }
    ];
  }


  /**********************************************************************************/
  /*********************Services for all the company methods*************************/
  /**********************************************************************************/

  // Get all the companies from the DB
  public getAllCompaniesService() {
    // return this.http.get('http://localhost:8080/company/get-all-companies');
    return this.http.get(this.prefixCompanyUrl + 'get-all-companies');
  }

  public getCompanyByIdService(id: number) {
    // return this.http.get('http://localhost:8080/company/get-company/' + id);
    return this.http.get(this.prefixCompanyUrl + 'get-company/' + id);
  }

  // Add new company to the DB
  public addNewCompanyService(company: Company) {
    // return this.http.post('http://localhost:8080/company/create-company/', company);
    return this.http.post(this.prefixCompanyUrl + 'create-company/', company);
  }

  // Delete a company to the DB
  public deleteCompanyService(company: Company) {
    const options = new RequestOptions({
      body: company
    });
    // return this.http.delete ('http://localhost:8080/company/remove-company/' + company.id, options);
    return this.http.delete (this.prefixCompanyUrl + 'remove-company/' + company.id, options);
  }

  public updateCompanyService(company: Company) {
    // return this.http.put ('http://localhost:8080/company/update-company/' + company.id, company);
    return this.http.put (this.prefixCompanyUrl + 'update-company/' + company.id, company);
  }

  /**********************************************************************************/
  /*********************Services for all the customer methods*************************/
  /**********************************************************************************/

  // Get all the companies from the DB
  public getAllCustomersService() {
    // return this.http.get('http://localhost:8080/customer/get-all-customers');
    return this.http.get(this.prefixCustomerUrl + 'get-all-customers');
  }

  public getCustomerByIdService(id: Number) {
    // return this.http.get('http://localhost:8080/customer/get-customer/' + id);
    return this.http.get(this.prefixCustomerUrl + 'get-customer/' + id);
  }

  // Add new company to the DB
  public addNewCustomerService(customer: Customer) {
    // return this.http.post('http://localhost:8080/customer/create-customer/', customer);
    return this.http.post(this.prefixCustomerUrl + 'create-customer/', customer);
  }

  // Delete a company to the DB
  public deleteCustomerService(customer: Customer) {
    const options = new RequestOptions({
      body: customer
    });
    // return this.http.delete ('http://localhost:8080/customer/remove-customer/' + customer.id, options);
    return this.http.delete (this.prefixCustomerUrl + 'remove-customer/' + customer.id, options);
  }

  public updateCustomerService(customer: Customer) {
    // return this.http.put ('http://localhost:8080/customer/update-customer/' + customer.id, customer);
    return this.http.put (this.prefixCustomerUrl + 'update-customer/' + customer.id, customer);
  }

  /**********************************************************************************/
  /*********************Services for the logout method*******************************/
  /**********************************************************************************/
  public logOutService(request, response) {
    return this.http.post(this.prefixLogOutUrl + 'logout', request, response);
  }




}
