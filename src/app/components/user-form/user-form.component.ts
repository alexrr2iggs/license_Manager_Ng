import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../../models/User'

import { UserService } from '../../service/user.service';
import { from } from 'rxjs';
import { isUndefined } from 'util';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit  {

  @Input() user: User;
  @Input() public title: string;

  userCopy: User;
  sending: boolean = false;
  submitted: boolean = false;
  isFieldSetted: boolean = false;

  userForm: FormGroup = this.formBuilder.group({
    businessName: new FormControl('',Validators.required),
    description: new FormControl('',)
  });

  userValidationMessages = {

    'businessName': [
      { type: 'required', message: 'Business name is required' }
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {

    if (this.user) {
      this.userCopy = JSON.parse(JSON.stringify(this.user));
      this.userForm.setValue({
        businessName: this.userCopy.businessName,
        description: this.userCopy.description
      })
    }
  }

  onSubmit() {

    this.submitted = true;

    if (this.userForm.invalid)
      return;

    if (this.user) {
      this.userCopy.businessName= this.userForm.value.businessName;
      this.userCopy.description= this.userForm.value.description;

      this.sending = true;
      this.userService.putUser(this.userCopy).subscribe(this.onSave);
    }
    else {
      this.sending = true;
      this.userService.postUser(this.userForm.value).subscribe(this.onSave);
    }
  }

  onSave = user => {
    this.sending = false;
    this.activeModal.close(user);
    this.activeModal.dismiss();
  }

  get f() { return this.userForm.controls; }
}
