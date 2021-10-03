import { Component, OnInit } from '@angular/core';
import { Missing } from 'src/app/_models/missing';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-list',
  templateUrl: './missing-list.component.html',
  styleUrls: ['./missing-list.component.css']
})
export class MissingListComponent implements OnInit {
  missings: Missing[];

  constructor(private missingService: MissingsService) { }

  ngOnInit(): void {
    this.loadMissings();
  }

  loadMissings() {
    this.missingService.getMissings().subscribe(missings => {
      this.missings = missings;
    });
  }
}
