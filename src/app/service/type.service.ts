import { Injectable } from '@angular/core';
import { Type } from '../models/Type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  ip: string = 'localHost';
  port: number = 3000;
  url: string = 'http://' + this.ip + ':' + this.port + '/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Type[]> {

    return (<Observable<Type[]>>this.http.get(this.url +'types'));
  }
}
