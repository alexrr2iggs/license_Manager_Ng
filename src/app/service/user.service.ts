import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

import { User } from '../models/User';
import { UserSearchFilter } from '../models/UserSearchFilter';


@Injectable()
export class UserService {

  ip: string = 'localHost';
  port: number = 3000;
  url: string = 'http://' + this.ip + ':' + this.port + '/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {

    return (<Observable<User[]>>this.http.get(this.url + 'users'));
  }

  getById(userId: number): Observable<User> {

    return (<Observable<User>>this.http.get(this.url + 'user', { params: { userId: userId.toString() } }));
  }


  getFilteredUsers(userSearchFilter: UserSearchFilter): Observable<User[]> {

    let params: HttpParams = new HttpParams();

    for (const  key in userSearchFilter)
      if (userSearchFilter[key] !== undefined && userSearchFilter[key] !== '')
      params = params.append(key , userSearchFilter[key]);



    return (<Observable<User[]>>this.http.get(this.url + 'search_users', { params: params }));
  }

  postUser(user): Observable<User> {

    return (<Observable<User>>this.http.post(this.url + 'user', user, { headers: { ContentType: 'application/json' } }));
  }

  putUser(user: User): Observable<User> {

    return (<Observable<User>>this.http.put(this.url + 'user', user, { headers: { ContentType: 'application/json' } }));
  }

  deleteUser(userId: number): Observable< HttpResponse < Object>> {

    return this.http.delete<Object>(this.url + 'user', { params: { userId: userId.toString() }, observe: 'response'  });
  }

}
