import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  IsLoggedService,
  IsLoggedServiceImpl,
} from './shared/services/is-logged.service';
import {
  OrdersService,
  OrdersServiceImpl,
} from './shared/services/orders.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [
    { provide: IsLoggedService, useClass: IsLoggedServiceImpl },
    { provide: OrdersService, useClass: OrdersServiceImpl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
