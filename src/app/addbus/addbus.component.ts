import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusticketService } from '../busticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbus',
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.css']
})
export class AddbusComponent implements OnInit {
busForm
  constructor(private service:BusticketService,private router:Router) {
    this.busForm = new FormGroup({
      'Bus_operator_id':new FormControl('',Validators.required),
      'Bus_Name':new FormControl('',Validators.required),
      'Date':new FormControl('',Validators.required),
      'Departure':new FormControl('',Validators.required),
      'Arrival':new FormControl('',Validators.required),
      'Source':new FormControl('',Validators.required),
      'Destination':new FormControl('',Validators.required),       
      'Ticket_price':new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
  }
  sendData(){
    // alert('Form value'+this.busForm.value);
    
    this.busForm.value.approval_status='pending';
    let seats={1:"Available"}
    for(let i=2;i<=20;i++){
      seats[i]="Available";
    }
    console.log(seats);
    this.busForm.value.all_seats=seats
    
    console.dir(this.busForm.value);
    this.service.postBus(this.busForm.value).subscribe((productdata)=>{
      alert('New item'+this.busForm.value.Bus_Name +' has been created!');
      this.router.navigate(['/bus_operator']); 
      //redirecting to home page after action is completed
    })
  }
  }

