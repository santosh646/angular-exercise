import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CompanyService} from "../../services/company.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-company-officers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-officers.component.html',
  styleUrls: ['./company-officers.component.scss']
})
export class CompanyOfficersComponent implements OnInit {
  companyName: string = '';
  companyNumber: string = '';
  officers: any[] = [];

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const navigation = history.state;
    this.companyName = navigation.companyName || '';
    this.companyNumber = navigation.companyNumber || '';

    if (this.companyNumber) {
      this.companyService.getCompanyOfficers(this.companyNumber).subscribe(response => {
        this.officers = response.items;
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  searchAgain() {
    this.router.navigate(['/']);
  }
}
``
