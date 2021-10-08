import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Missing } from 'src/app/_models/missing';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-list',
  templateUrl: './missing-list.component.html',
  styleUrls: ['./missing-list.component.css']
})
export class MissingListComponent implements OnInit {
  missings$: Observable<Missing[]>;

  constructor(private missingService: MissingsService) { }

  ngOnInit(): void {
    this.missings$ = this.missingService.getMissings();
  }
}
