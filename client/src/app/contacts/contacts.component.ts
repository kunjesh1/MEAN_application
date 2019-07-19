import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],

})
export class ContactsComponent implements OnInit {

 contacts:Contact[];
  contact:Contact;
  firstName:string;
  lastName:string;
  phone:string;



  constructor(private contactService:ContactService) { }

  deleteContact(id:any){
    var contacts=this.contacts;
    this.contactService.deleteContact(id).subscribe(data=>{
      
      for(var i=0;i<contacts.length;i++)
      {
        if(contacts[i]._id==id)
        {
          contacts.splice(i,1);
        }
      }
    });
    
    

    }

  

  addContact(){

  
    const newContact={
      firstName:this.firstName,
      lastName:this.lastName,
      phone:this.phone
    }

    this.contactService.addContact(newContact).subscribe(data=>{console.log("POST request successful "+data);
    this.contacts.push(data);
   
  },error=>{
      console.log(error);
    });


    
    this.contactService.getContacts()
    .subscribe(data=>this.contacts=data); 

  }

  ngOnInit() {

   

    this.contactService.getContacts()
    .subscribe(data=>this.contacts=data); 
  }

}
