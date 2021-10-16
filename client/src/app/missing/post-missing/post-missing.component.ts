import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-post-missing',
  templateUrl: './post-missing.component.html',
  styleUrls: ['./post-missing.component.css']
})
export class PostMissingComponent implements OnInit {
  registerForm: FormGroup;
  maxDate: Date;
  bsModalRef: BsModalRef;
  user: User;
  validationErrors: string[] = [];
  
  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) {
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
    this.accountService.postMissing(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/member/edit');
    }, error => {
      this.validationErrors = error;
    })
  }

  cancel() {

  }
}
