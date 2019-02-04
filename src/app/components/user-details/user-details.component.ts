import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { Licence } from 'src/app/models/Licence';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';

import { UserService } from '../../service/user.service';
import { LicenceService } from '../../service/licence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenceFormComponent } from '../licence-form/licence-form.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId: number;
  user: User= new User();
  licencies: Licence[]=[];

  constructor(
    private userService: UserService,
    private licenceService: LicenceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userService.getById(params['userId']).subscribe(user => {
        this.user = user;
        this.licenceService.getByUserID(this.user.id).subscribe(licencies => {
          this.licencies = licencies;
        });
      });
    })
  }

  onUserSaved(user: User) {
    this.user = user;
  }

  onLicenceSaved(licence: Licence) {
    this.licencies.push(licence);
  }

  openUserFormModal() {
   
    const formModal = this.modalService.open(UserFormComponent);
    formModal.componentInstance.title = 'Modifica utente';
    formModal.componentInstance.user = this.user;

    formModal.close = (user) => { this.user = user;};
  }

  openLicenceFormModal() {

    const formModal = this.modalService.open(LicenceFormComponent);
    formModal.componentInstance.title = 'Crea nuova licenza';
    formModal.componentInstance.ownerUser = this.user;

    formModal.close = (licence) => this.licencies.push(licence);
  }

  openRemoveConfirmFormModal() {

    const modRef = this.modalService.open(ConfirmationModalComponent);

    modRef.close = remove => {
      if (remove)
        this.userService.deleteUser(this.user.id).subscribe(
          resp => {
            if (resp.status === 204)
              this.router.navigate(['/user-list']);
          }
        );
    };
  }
}

