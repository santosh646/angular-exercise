import {Routes} from '@angular/router';
import {CompanySearchComponent} from "./components/company-search/company-search.component";
import {CompanyDetailsComponent} from "./components/company-details/company-details.component";
import {SearchResultsComponent} from "./components/search-results/search-results.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {CompanyOfficersComponent} from "./components/company-officers/company-officers.component";
import {authGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: '', component: CompanySearchComponent},
      {path: 'search-results/:searchTerm', component: SearchResultsComponent},
      { path: 'company/:companyNumber', component: CompanyDetailsComponent, canActivate: [authGuard] },
      {path: 'company-officers', component: CompanyOfficersComponent}
    ]
  }
];
