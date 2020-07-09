import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import { BusopComponent } from './busop/busop.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { FindbusesComponent } from './findbuses/findbuses.component';
import { AddbusComponent } from './addbus/addbus.component';
import { ViewbusComponent } from './viewbus/viewbus.component';
import { NavbarBusOpComponent } from './navbar-bus-op/navbar-bus-op.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { ViewprofbusopComponent } from './viewprofbusop/viewprofbusop.component';
import { AllbusesComponent } from './allbuses/allbuses.component';
import { AllusersComponent } from './allusers/allusers.component';
import { SeatsComponent } from './seats/seats.component';
import { TicktComponent } from './tickt/tickt.component';
import { BusopapComponent } from './busopap/busopap.component';
import { TripsComponent } from './trips/trips.component';
import { SeatsBusopComponent } from './seats-busop/seats-busop.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserComponent,
    BusopComponent,
    AdminComponent,
    NavbarComponent,
    ViewprofileComponent,
    FindbusesComponent,
    AddbusComponent,
    ViewbusComponent,
    NavbarBusOpComponent,
    NavbarUserComponent,
    ViewprofbusopComponent,
    AllbusesComponent,
    AllusersComponent,
    SeatsComponent,
    TicktComponent,
    BusopapComponent,
    TripsComponent,
    SeatsBusopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
