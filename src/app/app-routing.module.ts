import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UserComponent } from './user/user.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { FindbusesComponent } from './findbuses/findbuses.component';
import { BusopComponent } from './busop/busop.component';
import { AddbusComponent } from './addbus/addbus.component';
import { ViewbusComponent } from './viewbus/viewbus.component';
import { ViewprofbusopComponent } from './viewprofbusop/viewprofbusop.component';
import { AllbusesComponent } from './allbuses/allbuses.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AdminComponent } from './admin/admin.component';
import { SeatsComponent } from './seats/seats.component';
import { TicktComponent } from './tickt/tickt.component';
import { BusopapComponent } from './busopap/busopap.component';
import { TripsComponent } from './trips/trips.component';


const routes: Routes = [
  
  {
    path:"",
    component:SigninComponent
  },
  {   path:"signin",
      component:SigninComponent
  },
  {   path:"ticket",
      component:TicktComponent
  },
  {   path:"trips",
      component:TripsComponent
  },
  {   path:"selectseats",
      component:SeatsComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"user",
    component:UserComponent
  },
  {
    path:"profile",
    component:ViewprofileComponent
  },
  {
    path:"findbus",
    component:FindbusesComponent
  },
  {
    path:"bus_operator",
    component:BusopComponent
  },
  {
    path:"profilebusop",
    component:ViewprofbusopComponent
  },
  {
    path:"addbus",
    component:AddbusComponent
  },
  {
    path:"viewbus",
    component:ViewbusComponent
  },
  {
    path:"busopapproval",
    component:BusopapComponent
  },
  {
    path:"allbuses",
    component:AllbusesComponent
  },
  {
    path:"allusers",
    component:AllusersComponent
  },
  {
    path:"admin",
    component:AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
