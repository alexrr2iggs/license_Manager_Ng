import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserSearchFilter } from 'src/app/models/UserSearchFilter';


@Component({
  selector: 'app-user-search-filter',
  templateUrl: './user-search-filter.component.html',
  styleUrls: ['./user-search-filter.component.css']
})
export class UserSearchFilterComponent implements OnInit {

  @Input() search: Observable<void>;
  @Output('onSearch') searchEventEmiter: EventEmitter<UserSearchFilter> = new EventEmitter<UserSearchFilter>();

  userSearchForm: FormGroup = this.formBuilder.group({
    businessName: new FormControl('', ),
    description: new FormControl('', )
  });

  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.search.subscribe(() => this.searchEventEmiter.emit(this.userSearchForm.value));
  }
}
