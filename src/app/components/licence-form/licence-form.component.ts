import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Licence } from '../../models/Licence';
import { User } from '../../models/User';
import { Type } from '../../models/Type';

import { LicenceService } from '../../service/licence.service';
import { TypeService } from '../../service/type.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-licence-form',
  templateUrl: './licence-form.component.html',
  styleUrls: ['./licence-form.component.css']
})
export class LicenceFormComponent implements OnInit, AfterViewInit {

  @ViewChild('expirationDateIn') expirationDateIn: ElementRef;
  @ViewChild('creationDateIn') creationDateIn: ElementRef;

  @Input() licence: Licence;
  @Input() ownerUser: User;
  @Input() title: string;

  submitted: boolean = false;
  sending: boolean = false;
  isFieldSetted: boolean = false;

  licenceCopy: Licence;
  types: Type[];

  licenceForm: FormGroup = this.formBuilder.group({
    serialNumber: new FormControl({ value: '', disabled: true }, []),
    description: new FormControl('', []),
    creationDate: new FormControl({ value: '', disabled: true }, []),
    expirationDate: new FormControl('', [Validators.required]),
    typeId: new FormControl('', [Validators.required]),
    TUC: new FormControl('', [Validators.required]),
    TUC_P: new FormControl('', [Validators.required]),
    OFF_NET: new FormControl('', [Validators.required]),
    TLS: new FormControl('', [])
  });

  licenceValidationMessages = {

    'expirationDate': [
      { type: 'required', message: 'Expiration date is required' }

    ],
    'typeId': [
      { type: 'required', message: 'Type is required' }

    ],
    'TUC': [
      { type: 'required', message: 'TUC is required' }

    ],
    'TUC_P': [
      { type: 'required', message: 'TUC_P is required' }

    ],
    'OFF_NET': [
      { type: 'required', message: 'OFF_NET is required' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private licenceService: LicenceService,
    private typeService: TypeService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {

    this.typeService.getAll().subscribe(types => this.types = types);

    if (this.licence) {
      this.licenceCopy = JSON.parse(JSON.stringify(this.licence));
      this.licenceForm.setValue({
        serialNumber: this.licence.serialNumber ? this.licence.serialNumber : 0,
        description: this.licence.description ? this.licence.description : '',
        creationDate: this.licence.creationDate ? this.licence.creationDate.toString().slice(0, 10) : 0,
        expirationDate: this.licence.expirationDate ? this.licence.expirationDate.toString().slice(0, 10) : 0,
        typeId: this.licence.type ? this.licence.type.id : 0,
        TUC: this.licence.TUC ? this.licence.TUC : 0,
        TUC_P: this.licence.TUC_P ? this.licence.TUC_P : 0,
        OFF_NET: this.licence.OFF_NET ? this.licence.OFF_NET : 0,
        TLS: this.licence.TLS ? this.licence.TLS : 0
      });



    }
  }

  ngAfterViewInit(): void {

    if (!(this.licence))
      this.creationDateIn.nativeElement.value = new Date().toLocaleString().slice(0, 9);
  }

  onSubmit() {
    this.submitted = true;

    if (this.licenceForm.invalid)
      return;

    if (this.licence) {
      this.licenceForm.value.creationDate = this.licence.creationDate;
      this.licenceForm.value.serialNumber = this.licence.serialNumber;

      this.sending = true;
      this.licenceService.update(this.licenceForm.value).subscribe(this.onSave);
    } else {
      this.licenceForm.value.userId = this.ownerUser.id;
      this.licenceForm.value.creationDate = new Date();
      this.licenceForm.value.TLS = (this.licenceForm.value.TLS) ? 1 : 0;

      console.log(this.licenceForm.value);
      this.sending = true;
      this.licenceService.insert(this.licenceForm.value).subscribe(this.onSave);
    }
  }
  onSave = licence => {

    this.submitted = false;
    this.sending = false;
    this.activeModal.close(licence);
    this.activeModal.dismiss();
  }
  get f() { return this.licenceForm.controls; }
}
