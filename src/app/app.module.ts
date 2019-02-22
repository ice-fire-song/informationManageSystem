import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterWinComponent } from './registerwin/registerwin.component';
import { RegisterokComponent } from './registerok/registerok.component';
import { ManagementComponent } from './management/management.component';

import { StorageService } from './services/storage.service';
import { OrdinaryComponent } from './ordinary/ordinary.component';
import { OneComponent } from './search/one/one.component';
import { TwoComponent } from './search/two/two.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterWinComponent,
    RegisterokComponent,
    ManagementComponent,
    OrdinaryComponent,
    OneComponent,
    TwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [StorageService,  { provide: LocationStrategy, useClass: HashLocationStrategy }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
