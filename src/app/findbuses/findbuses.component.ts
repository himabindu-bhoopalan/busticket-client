import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusticketService } from '../busticket.service';

@Component({
  selector: 'app-findbuses',
  templateUrl: './findbuses.component.html',
  styleUrls: ['./findbuses.component.css']
})
export class FindbusesComponent implements OnInit {
findForm
bus_data
count_seats:number=0;
  constructor(private service:BusticketService) {
    this.findForm = new FormGroup({
      'Source':new FormControl('',Validators.required),
      'Destination':new FormControl('',Validators.required),
      'Date':new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
  }
  findData(){
    console.log(this.findForm.value);
    this.service.findBus(this.findForm.value).subscribe((finddata)=>{
      console.log(finddata);
      if(finddata.status==200){
        if(finddata.data.length==0)
        {alert('No buses found for the following requirements')
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
