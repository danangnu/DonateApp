import { Component, OnInit } from '@angular/core';
import { Missing } from '../_models/missing';
import { MissingsService } from '../_services/missings.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  missings: Partial<Missing[]>;
  predicate = 'liked';

  constructor(private missingService: MissingsService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.missingService.getLikes(this.predicate).subscribe(response => {
      this.missings = response;
    });
  }  
}
