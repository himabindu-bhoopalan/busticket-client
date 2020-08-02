import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusticketService } from '../busticket.service';

@Component({
  selector: 'app-findbuses',
  templateUrl: './findbuses.component.html',
  styleUrls: ['./findbuses.component.css']
})
export class FindbusesComponent implements OnInit {
index
placesSource:any=["Chennai","Vellore","Madurai","Chittoor"]
placesDestination:any=["Chennai","Vellore","Madurai","Chittoor"]
findForm
bus_data
count_seats:number=0;
today
initial_busdata
  constructor(private service:BusticketService) {
    //setting date input 
    let vtoday = new Date();
    this.today = vtoday.toISOString().slice(0,10);

    this.service.buslistapproved().subscribe((bus1)=>{
      // console.log('inside buslist approved method');
      // console.dir(bus1);
      if(bus1.status==200){
        this.initial_busdata=bus1.data;
      }
     
    
    })
    

    //form 
    this.findForm = new FormGroup({
      'Source':new FormControl('',Validators.required),
      'Destination':new FormControl('',Validators.required),
      'Date':new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
  }
  removeOption(){

    let x =this.findForm.value.Source;
    // console.log(x);
    this.index = this.placesDestination.indexOf(x);
    this.placesDestination.splice(this.index, 1);

  }
  //search for buses
  findData(){
    // document.getElementById('suggestion').remove();
    this.findForm.value.Source=this.findForm.value.Source.trim();
    this.findForm.value.Destination=this.findForm.value.Destination.trim();
    // console.log(this.findForm.value);
    this.service.findBus(this.findForm.value).subscribe((finddata)=>{
      // console.log(finddata);
      if(finddata.status==200){
        if(finddata.data.length==0)
        {alert('No buses found for the following requirements');
        }
        else{
          
          let s=finddata.data.all_seats
          console.log(s);
          finddata.data.forEach(element => {
            console.log(element);
            this.count_seats=0;
            for(let i=1;i<=20;i++){
              if(element.all_seats[i]=="Available"){
                console.log(element.all_seats[i]);
                this.count_seats++;
              }
            }
            console.log(this.count_seats);
          });
          this.bus_data=finddata.data;
          }
        }
      else if(finddata.status==400){
        alert('error!');
      //counting the number of seats left in the bus
      } 
      else{
        alert('Unexpected error occured.Try again after some time.');
      }
     });
     
   
  }
}
