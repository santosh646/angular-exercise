import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss'],
})
export class CompanySearchComponent {
  searchTerm: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  searchCompanies() {
    if (this.isValidInput(this.searchTerm)) {
      this.errorMessage = '';
      this.router.navigate(['/search-results', this.searchTerm]);
    } else {
      this.errorMessage = 'Please enter a valid company name or number.';
    }
  }

  // Validation method
  isValidInput(input: string): boolean {
    const alphanumericRegex: RegExp = /^[a-zA-Z0-9\s]+$/;
    const numericRegex: RegExp = /^[0-9]{1,10}$/;

    if (input.trim() === '') {
      return false;
    }

    return alphanumericRegex.test(input) || numericRegex.test(input);
  }
}
