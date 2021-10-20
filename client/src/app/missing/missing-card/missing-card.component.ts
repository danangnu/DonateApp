import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Missing } from 'src/app/_models/missing';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-card',
  templateUrl: './missing-card.component.html',
  styleUrls: ['./missing-card.component.css']
})
export class MissingCardComponent implements OnInit {
  @Input() missing: Missing;

  constructor(private missingService: MissingsService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addLike(missing: Missing) {
    this.missingService.addLike(missing.id).subscribe(() => {
      this.toastr.success("You have followed " + missing.firstName + "'s report");
    });
  }
}
