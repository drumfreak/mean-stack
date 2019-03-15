import { Component, OnInit } from '@angular/core';

import { ContactService } from './contact.service';
import {WeatherService} from '../weather/weather.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  loading: boolean;
  submitted: boolean;
  sentEmail: any = {};

  model: any = {
    subject: '',
    name: '',
    emailAddress: '',
    emailBody: ''
  };


  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitEmail(this.model);
  }

  resetForm() {
    this.model = {};
    this.sentEmail = {};
    this.submitted = false;
    this.loading = false;
  }

  submitEmail(email): void {
     // console.log(email);
    this.loading = true;
    this.contactService.submitContact(email).subscribe(sentEmail => {
      console.log(sentEmail);
      this.sentEmail = sentEmail;
      this.loading = false;
      this.submitted = true;
    });
  }

}
