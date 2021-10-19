import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Missing } from 'src/app/_models/missing';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-list',
  templateUrl: './missing-list.component.html',
  styleUrls: ['./missing-list.component.css']
})
export class MissingListComponent implements OnInit {
  public filterMode:boolean = false;
  missing: Missing[];
  pagination: Pagination;
  userParams: UserParams;
  genderList = [{value: 'Male', display: 'Males'}, {value: 'Female', display: 'Females'}]

  constructor(private missingService: MissingsService) {
    this.userParams = this.missingService.getUserParams();
   }

  ngOnInit(): void {
    this.loadMissings();
  }

  loadMissings() {
    this.missingService.setUserParams(this.userParams);
    this.missingService.getMissings(this.userParams).subscribe(response => {
      this.missing = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.userParams = this.missingService.resetUserParams();
    this.loadMissings();
    this.filterMode = false;
    //console.log(this.filterMode);
  }

  filtersMode() {
    this.filterMode = true;
    //console.log(this.filterMode);
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.missingService.setUserParams(this.userParams);
    this.loadMissings();
  }
}
