import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Missing } from 'src/app/_models/missing';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-edit',
  templateUrl: './missing-edit.component.html',
  styleUrls: ['./missing-edit.component.css']
})
export class MissingEditComponent implements OnInit {
  missing: Missing;

  constructor(private route: ActivatedRoute, private missingService: MissingsService) { }

  ngOnInit(): void {
    this.loadMissing();
  }

  loadMissing() {
    this.missingService.getMissing(this.route.snapshot.paramMap.get('id')).subscribe(missing => {
      this.missing = missing;
    });
  }
}
