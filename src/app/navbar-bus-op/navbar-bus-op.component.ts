import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-bus-op',
  templateUrl: './navbar-bus-op.component.html',
  styleUrls: ['./navbar-bus-op.component.css']
})
export class NavbarBusOpComponent implements OnInit {
user
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  CheckforApproval(){
    console.log('inside checking for approval');
    console.log(this.user)
    this.user = sessionStorage.getItem('busopdata'); 
    let busOperator=JSON.parse(this.user)
    if(busOperator.approval=="pending"){
      alert('You have not been approved yet so you cannot add buses.Please approach your manager.');
    }else{
      this.router.navigate(["/addbus"]);
    }
  }
 
}
