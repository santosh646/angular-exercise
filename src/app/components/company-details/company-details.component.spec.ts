import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  let mockCompanyService: any;
  let mockAuthService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockCompanyService = jasmine.createSpyObj(['searchCompanies']);
    mockAuthService = jasmine.createSpyObj(['logout']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('12345')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        CompanyDetailsComponent
      ],
      providers: [
        { provide: CompanyService, useValue: mockCompanyService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;

    const mockCompanyDetails = {
      items: [
        {
          title: 'Test Company',
          company_number: '12345',
          company_status: 'active',
          company_type: 'private',
          date_of_creation: '2020-01-01',
          address_snippet: '123 Main St'
        }
      ]
    };

    mockCompanyService.searchCompanies.and.returnValue(of(mockCompanyDetails));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set companyNumber from route parameters', () => {
    expect(component.companyNumber).toBe('12345');
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('companyNumber');
  });

  it('should load company details on init', () => {
    expect(component.companyDetails).toEqual({
      title: 'Test Company',
      company_number: '12345',
      company_status: 'active',
      company_type: 'private',
      date_of_creation: '2020-01-01',
      address_snippet: '123 Main St'
    });
    expect(mockCompanyService.searchCompanies).toHaveBeenCalledWith('12345');
  });

  it('should navigate to officers list when goToOfficers is called', () => {
    component.goToOfficers();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/company-officers'], {
      state: {
        companyName: 'Test Company',
        companyNumber: '12345'
      }
    });
  });

  it('should call AuthService logout and navigate to home on logout', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to home when searchAgain is called', () => {
    component.searchAgain();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
