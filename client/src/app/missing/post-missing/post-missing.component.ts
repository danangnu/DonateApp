import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-post-missing',
  templateUrl: './post-missing.component.html',
  styleUrls: ['./post-missing.component.css']
})
export class PostMissingComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  registerForm: FormGroup;
  maxDate: Date;
  bsModalRef: BsModalRef;
  user: User;
  validationErrors: string[] = [];
  message: string = "Hello!";
  
  constructor(private accountService: AccountService, private missingService: MissingsService, private fb: FormBuilder, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 0)
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['Male'],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      appUserId: [this.user.id, Validators.required],
      relations: ['', Validators.required]
    });
  }

  register() {
    this.missingService.postMissing(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/missing');
    }, error => {
      this.validationErrors = error;
    })
  }

  sendMessage() {
    this.messageEvent.emit(this.message)
  }
}
