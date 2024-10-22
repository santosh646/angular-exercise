import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CompanyService} from "../../services/company.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyNumber: string = '';
  companyDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.companyNumber = this.route.snapshot.paramMap.get('companyNumber')!;
    this.companyService.searchCompanies(this.companyNumber).subscribe(response => {
      this.companyDetails = response.items[0];
    });
  }

  goToOfficers() {
    this.router.navigate(['/company-officers'], {
      state: {
        companyName: this.companyDetails.title,
        companyNumber: this.companyDetails.company_number
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  searchAgain() {
    this.router.navigate(['/']);
  }
}
