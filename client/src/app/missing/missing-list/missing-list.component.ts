import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Missing } from 'src/app/_models/missing';
import { Pagination } from 'src/app/_models/pagination';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-list',
  templateUrl: './missing-list.component.html',
  styleUrls: ['./missing-list.component.css']
})
export class MissingListComponent implements OnInit {
  missing: Missing[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private missingService: MissingsService) { }

  ngOnInit(): void {
    this.loadMissings();
  }

  loadMissings() {
    this.missingService.getMissings(this.pageNumber, this.pageSize).subscribe(response => {
      this.missing = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMissings();
  }
}
