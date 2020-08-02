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
Source
res
placesSource:any=["Chennai","Vellore","Madurai","Chittoor"]
placesDestination:any=["Chennai","Vellore","Madurai","Chittoor"]
today
index
  constructor(private service:BusticketService,private router:Router) {

    //set todays date in date input
    let vtoday = new Date();
    this.today = vtoday.toISOString().slice(0,10);
  
    

  
    //get bus operator details
    let busOperator=JSON.parse(sessionStorage.getItem('busopdata'))

    //form
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
  removeOption(){
    this.placesDestination=["Chennai","Vellore","Madurai","Chittoor"]
    let x =this.busForm.value.Source;
    console.log(x);
    this.index = this.placesDestination.indexOf(x);
    this.placesDestination.splice(this.index, 1);

  }
  sendData(){
    console.log(this.busForm.value);
    //trim all the fields 
    if(!this.busForm.valid){
      alert('Please fill all the fields with valid values')
    }else{

      this.busForm.value.Bus_operator_id=this.busForm.value.Bus_operator_id.trim();
    this.busForm.value.Bus_Name=this.busForm.value.Bus_Name.trim();
    this.busForm.value.Bus_ID=this.busForm.value.Bus_ID.trim();
    this.busForm.value.Source=this.busForm.value.Source.trim();
    this.busForm.value.Destination=this.busForm.value.Destination.trim();
      this.busForm.value.Date=this.busForm.value.Date;
    
    this.busForm.value.approval_status='pending';
    let seats={1:"Available"}
    for(let i=2;i<=20;i++){
      seats[i]="Available";
    }
    // console.log(seats);
    this.busForm.value.all_seats=seats
    
    // console.dir(this.busForm.value.Bus_ID);

    let busOperator=JSON.parse(sessionStorage.getItem('busopdata'))
    this.service.addbustoOp({_id:busOperator._id,Bus_ID:this.busForm.value.Bus_ID,Bus_Name:this.busForm.value.Bus_Name}).subscribe((data)=>{
      this.res=data
      if(this.res.status==200){
        console.log('bus added to bus op db');
      }else{
        // console.log('bus not added to bus op db');
        alert('Bus not added!Try again.')
      }
    })
    this.service.postBus(this.busForm.value).subscribe((productdata)=>{
      if(productdata.status==200){
        alert('New bus has been added!');
        this.router.navigate(['/bus_operator']); 
        //redirecting to home page after action is completed
      }else if(productdata.status==400){
        // console.log('bus not added in busdb');
        alert('Bus with same ID exists.Try with different bus ID.')
        
      }else{
        alert('Bus not added to ur account!raise a ticket.')
      }
      
    })


    }
    
  }
  }

