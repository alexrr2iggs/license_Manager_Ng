import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';


import { User } from '../../models/User';
import { Type } from '../../models/Type';
import { LicenceService } from '../../service/licence.service';
import { LicenceSearchFilter } from '../../models/LicenceSearchFilter';
import { TypeService } from '../../service/type.service';

@Component({
  selector: 'app-licence-search-filter',
  templateUrl: './licence-search-filter.component.html',
  styleUrls: ['./licence-search-filter.component.css']
})
export class LicenceSearchFilterComponent implements OnInit {


  types: Type[];
  @Input() search: Observable<void>;
  @Output('onSearch') searchEventEmiter: EventEmitter<LicenceSearchFilter> = new EventEmitter<LicenceSearchFilter>();

  licenceSearchForm: FormGroup = this.formBuilder.group({
    typeId: new FormControl('', ),
    user: new FormControl('', ),
    type: new FormControl('', ),
    description: new FormControl('', ),
    creationDateTo: new FormControl('', ),
    creationDateSince: new FormControl('', ),
    expirationDateTo: new FormControl(''),
    expirationDateSince: new FormControl(''),
    TUCMin: new FormControl('', ),
    TUCMax: new FormControl('', ),
    TUC_PMin: new FormControl('', ),
    TUC_PMax: new FormControl('', ),
    OFFNETMin: new FormControl('', ),
    OFFNETMax: new FormControl('', ),
    TLS: new FormControl('', )
  });

  constructor(
    private formBuilder: FormBuilder,
    private licenceService: LicenceService,
    private typeService: TypeService) { }

  ngOnInit() {
    this.typeService.getAll().subscribe(types => this.types = types);

    this.search.subscribe(() => this.searchEventEmiter.emit(this.licenceSearchForm.value));
  }
}
