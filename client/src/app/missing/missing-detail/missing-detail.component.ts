import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Missing } from 'src/app/_models/missing';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-detail',
  templateUrl: './missing-detail.component.html',
  styleUrls: ['./missing-detail.component.css']
})
export class MissingDetailComponent implements OnInit {
  missing: Missing;

  constructor(private missingService: MissingsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMissing();
  }

  loadMissing() {
    this.missingService.getMissing(this.route.snapshot.paramMap.get('id')).subscribe(missing => {
      this.missing = missing;
    });
  }
}
