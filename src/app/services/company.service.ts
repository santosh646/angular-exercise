import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiKey: string = environment.apiKey;
  private headers: HttpHeaders = new HttpHeaders({ 'x-api-key': this.apiKey });

  constructor(private http: HttpClient) {}

  searchCompanies(query: string): Observable<any> {
    const url: string = `/TruProxyAPI/rest/Companies/v1/Search?Query=${query}`;
    return this.http.get(url, { headers: this.headers });
  }

  getCompanyOfficers(companyNumber: string): Observable<any> {
    const url: string = `/TruProxyAPI/rest/Companies/v1/Officers?CompanyNumber=${companyNumber}`;
    return this.http.get(url, { headers: this.headers });
  }
}
