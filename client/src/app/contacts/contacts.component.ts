import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],

})
export class ContactsComponent implements OnInit {

  public contacts:Contact[];
  contact:Contact;
  firstName:string;
  lastName:string;
  phone:string;



  constructor(private contactService:ContactService) { }

  addContact(){

    const newContact={
      firstName:this.firstName,
      lastName:this.lastName,
      phone:this.phone
    }

    this.contactService.addContact(newContact);
                       
  }

  ngOnInit() {

    this.contactService.getContacts()
        .subscribe(data=>this.contacts=data); 

        console.log(this.contacts);
        console.log(this.contacts);
  }

}
