import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../service/user.service';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  users: User[];
  
  constructor(private userService: UserService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(users => { this.users = users; })
  }

  onUserAdded(user: User) {

    this.users.push(user);
  }

  openUserFormModal() {

    const formModal = this.modalService.open(UserFormComponent);
    formModal.componentInstance.title = 'Aggiungi utente';

    formModal.close = user => this.users.push(user);
  }

}
