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
res
  constructor(private service:BusticketService,private router:Router) {
    let busOperator=JSON.parse(sessionStorage.getItem('busopdata'))
    this.busForm = new FormGroup({
      'Bus_operator_id':new FormControl(busOperator.unique_id,Validators.required),
      'Bus_Name':new FormControl('',Validators.required),
      'Bus_ID':new FormControl('',Validators.required),
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
    
    console.dir(this.busForm.value.Bus_ID);

    let busOperator=JSON.parse(sessionStorage.getItem('busopdata'))
    this.service.addbustoOp({_id:busOperator._id,Bus_ID:this.busForm.value.Bus_ID,Bus_Name:this.busForm.value.Bus_Name}).subscribe((data)=>{
      this.res=data
      if(this.res.status==200){
        console.log('bus added to bus op db');
      }else{
        console.log('bus not added to bus op db');
        
      }
    })
    this.service.postBus(this.busForm.value).subscribe((productdata)=>{
      if(productdata.status==200){
        alert('New item'+this.busForm.value.Bus_Name +' has been created!');
        this.router.navigate(['/bus_operator']); 
        //redirecting to home page after action is completed
      }else{
        console.log('bus not added in busdb');
      }
      
    })
  }
  }

