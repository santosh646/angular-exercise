import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  companies: any[] = [];
  totalResults: number = 0;
  paginatedCompanies: any[] = [];

  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm') || '';

    if (this.searchTerm.trim()) {
      this.companyService.searchCompanies(this.searchTerm).subscribe(response => {
        this.companies = response.items;
        this.totalResults = response.total_results;
        this.setupPagination();
      });
    }
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
    this.paginate();
  }

  paginate(): void {
    const startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;
    this.paginatedCompanies = this.companies.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }
}
