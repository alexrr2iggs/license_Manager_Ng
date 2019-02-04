import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MenuComponent } from './components/menu/menu.component';
import { AppRoutes } from './app.routes';

import * as bootstrap from "bootstrap";
import * as $ from "jquery";

import { UserService } from '../app/service/user.service';
import { LicenceService } from '../app/service/licence.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LicenceDetailsComponent } from './components/licence-details/licence-details.component';
import { LicenceFormComponent } from './components/licence-form/licence-form.component';
import { ErrorComponenetComponent } from './errors/error-componenet/error-componenet.component';

import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { TestComponent } from './components/test/test.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';
import { LicenceSearchFilterComponent } from './components/licence-search-filter/licence-search-filter.component';
import { UserSearchFilterComponent } from './components/user-search-filter/user-search-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    MenuComponent,
    UserDetailsComponent,
    UserFormComponent,
    LicenceDetailsComponent,
    LicenceFormComponent,
    ErrorComponenetComponent,
    ConfirmationModalComponent,
    TestComponent,
    NumberDirective,
    SearchComponent,
    LicenceSearchFilterComponent,
    UserSearchFilterComponent
  ],
  entryComponents: [UserFormComponent, LicenceFormComponent, ConfirmationModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule
  ],
  providers: [
    UserService,
    LicenceService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


