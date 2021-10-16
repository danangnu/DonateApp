import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { PostMissingComponent } from 'src/app/missing/post-missing/post-missing.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { Member } from 'src/app/_models/member';
import { Missing } from 'src/app/_models/missing';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  postMode = false;
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  missings: Missing[];
  user: User;
  bsModalRef: BsModalRef;
  message:string;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MemberService, 
    private toastr: ToastrService, private modalService: BsModalService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      this.missings = member.missings;
    });
  }
  
  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });
  }

  postToggle(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  receiveMessage($event) {
    this.message = $event;
    this.editForm.reset(this.member);
    this.modalService.hide(1);
  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }
}
