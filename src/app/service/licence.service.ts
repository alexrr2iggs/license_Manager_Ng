import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Licence } from '../models/Licence';
import { LicenceSearchFilter } from '../models/LicenceSearchFilter';



@Injectable()
export class LicenceService {

  ip: string = 'localHost';
  port: number = 3000;
  url: string = 'http://' + this.ip + ':' + this.port + '/';

  constructor(private http: HttpClient) { }

  getByUserID(userId: number): Observable<Licence[]> {

    return (<Observable<Licence[]>>this.http.get(this.url + 'user_licencies', { params: { userId: userId.toString() } }));
  }

  getBySerial(serialNumber: number): Observable<Licence> {

    return (<Observable<Licence>>this.http.get(this.url + 'licence', { params: { serial: serialNumber.toString() } }));
  }

  getFilteredLicencies(licenceSearchFilter: LicenceSearchFilter): Observable<Licence[]> {

    let params: HttpParams = new HttpParams();

    for (const  key in licenceSearchFilter)
      if (licenceSearchFilter[key] !== undefined && licenceSearchFilter[key] !== '')
      params = params.append(key , licenceSearchFilter[key]);



    return (<Observable<Licence[]>>this.http.get(this.url + 'search_licence', { params: params }));
  }

  update(licence: Licence): Observable<Licence> {
    return (<Observable<Licence>>this.http.put(this.url + 'licence', licence));
  }

  insert(licence: Licence): Observable<Licence> {
    return (<Observable<Licence>>this.http.post(this.url + 'licence', licence));
  }

  deleteLicence(serial: number): Observable<HttpResponse<Object>> {

    return this.http.delete<Object>(this.url + 'licence', { params: { serial: serial.toString() }, observe: 'response' });
  }


}


