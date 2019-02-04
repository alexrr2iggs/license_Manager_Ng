import { Component, OnInit } from '@angular/core';
import { Licence } from '../../models/Licence';
import { LicenceService } from '../../service/licence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenceFormComponent } from 'src/app/components/licence-form/licence-form.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-licence-details',
  templateUrl: './licence-details.component.html',
  styleUrls: ['./licence-details.component.css']
})
export class LicenceDetailsComponent implements OnInit {

  licence: Licence;
  constructor( private licenceService: LicenceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.licenceService.getBySerial(params['serial']).subscribe(licence => {
        this.licence = licence;
      });
    })
  }

  openLicenceFormModal() {
    const modRef = this.modalService.open(LicenceFormComponent);
    modRef.componentInstance.licence = this.licence;
    modRef.close = licence => this.licence = licence;
  }

  openRemoveConfirmFormModal() {
    const modRef = this.modalService.open(ConfirmationModalComponent);

    modRef.close = remove => {
      if (remove)
        this.licenceService.deleteLicence(this.licence.serialNumber).subscribe(
          resp => {
            if (resp.status === 204)
              this.router.navigate(['/user-details/' + this.licence.user.id]);
          }
        );
    };
  }
}



