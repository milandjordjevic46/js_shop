import { Component, OnInit } from '@angular/core';
import { ContactPresenterImpl, ContactPresenter } from './contact.component.presenter';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [{provide: ContactPresenter, useClass: ContactPresenterImpl}]
})
export class ContactComponent implements OnInit {

  constructor(private contactPresenter: ContactPresenter) { }

  ngOnInit(): void {
  }

  openMapLocation(): void {
    this.contactPresenter.openOnMap();
  }

}
