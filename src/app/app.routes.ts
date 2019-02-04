import { Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserDetailsComponent } from './components/user-details/user-details.component'
import { LicenceDetailsComponent } from './components/licence-details/licence-details.component';
import { TestComponent } from './components/test/test.component';
import { SearchComponent } from './components/search/search.component';
import { LicenceSearchFilterComponent } from './components/licence-search-filter/licence-search-filter.component';


export const AppRoutes: Routes = [
  { path: 'user-list', component: UsersTableComponent },
  { path: 'licence-details/:serial', component: LicenceDetailsComponent },
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  { path: 'user-details/:userId', component: UserDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'test', component: TestComponent }
];

