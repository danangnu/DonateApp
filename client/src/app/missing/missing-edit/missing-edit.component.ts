import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Missing } from 'src/app/_models/missing';
import { AccountService } from 'src/app/_services/account.service';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-edit',
  templateUrl: './missing-edit.component.html',
  styleUrls: ['./missing-edit.component.css']
})
export class MissingEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  missing: Missing;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private missingService: MissingsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMissing();
  }

  loadMissing() {
    this.missingService.getMissing(this.route.snapshot.paramMap.get('id')).subscribe(missing => {
      this.missing = missing;
    });
  }

  updateMissing() {
    this.missingService.updateMissing(this.missing).subscribe(() => {
      this.toastr.success('Profile updated successfully')
      this.editForm.reset(this.missing);
    });
  }
}
