import { Component, OnInit } from '@angular/core';
import { Missing } from '../_models/missing';
import { Pagination } from '../_models/pagination';
import { MissingsService } from '../_services/missings.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  missings: Partial<Missing[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private missingService: MissingsService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.missingService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.missings = response.result;
      this.pagination = response.pagination;
    });
  }  

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
