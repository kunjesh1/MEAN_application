import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Contact } from './contact';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class ContactService {

  constructor(private http:HttpClient ) { }


  getContacts():Observable<Contact[]>
  {
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts');

  }

  addContact(newContact){

    var header=new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/contact',newContact,{headers:header});
  }

  deleteContact(id):Observable<Contact[]>
  {
    return this.http.delete<Contact[]>('http://localhost:3000/contact/id'+id);
  }

}
