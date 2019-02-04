import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

 @Input() confirmLab: string='Si';
 @Input() ID: string ='confirmationModal';
 @Input() denyLab: string='No';
 @Input() title: string='Conferma';
 @Input() message: string='Sei sicuro?';

 

  constructor(public activeModal: NgbActiveModal) {}
}
