import { User } from './../../models/User';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Licence } from 'src/app/models/Licence';
import { Subject } from 'rxjs';
import { LicenceService } from 'src/app/service/licence.service';
import { UserService } from 'src/app/service/user.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewChecked {

  @ViewChild('searchResultCont') public searchResultCont: ElementRef;

  searchSubject: Subject<any> = new Subject();

  licenceSearch: boolean = true;
  userSearch: boolean = false;
  licencies: Licence[] = [];
  users: User[] = [];

  oldLicenciesLength = this.licencies.length;
  constructor(private licenceService: LicenceService,
    private userService: UserService) { }

  ngOnInit() {

  }


  ngAfterViewChecked() {

    if (this.licencies.length !== this.oldLicenciesLength) {
      this.oldLicenciesLength = this.licencies.length;
      this.moveToSearchResults();
    }

    console.log('ngAfterViewChecked');
  }

  onLicenceClick() {

    this.licenceSearch = true;
    this.userSearch = false;
  }

  onUserClick() {

    this.licenceSearch = false;
    this.userSearch = true;
  }

  onSerch(searchFilter) {

    if (this.licenceSearch)
      this.licenceService.getFilteredLicencies(searchFilter).subscribe(licencies => {this.licencies = licencies; } );
    else if (this.userSearch)
      this.userService.getFilteredUsers(searchFilter).subscribe(users => {this.users = users; console.dir(users); } );
  }

  onSearchClick(): void  {
    this.searchSubject.next();
  }

  public moveToSearchResults(): void {
    this.searchResultCont.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
}
}
