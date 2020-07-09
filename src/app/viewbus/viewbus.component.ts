import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-viewbus',
  templateUrl: './viewbus.component.html',
  styleUrls: ['./viewbus.component.css']
})
export class ViewbusComponent implements OnInit {
busdata
count_seats
reserveForm
NoseatsBooked:Boolean=false;
updatebusForm
  constructor(private service:BusticketService) {

    //code to get the buses of only this bus operator
    //bus operator details are already in session storage 
    //get buses data from the bus op id in the bus op data


    //again here we are using a service to get data of the bus operator eventhouhgh 
    //data is there in the session storage because if the bus is added in the current 
    //sesssion then it would not have added ..

    let busOperator=JSON.parse(sessionStorage.getItem('busopdata'))
    
    this.service.findbusofoperator(busOperator.unique_id).subscribe((bus1)=>{
      console.log(bus1);
      if(bus1.status==200){
        console.log('inside busuperator buses method'+bus1);
        console.dir(bus1);
        this.busdata=bus1.data;
        if(bus1.data.length==0){
          document.getElementById("nodatafound").innerHTML="No buses found.."
        }
        else{
          this.busdata.forEach(element => {
            console.log(element);
            this.count_seats=0;
            for(let i=1;i<=20;i++){
              if(element.all_seats[i]=="Available"){
                console.log(element.all_seats[i]);
                this.count_seats++;
              } 
            }
            element.seats_left=this.count_seats
            if(element.seats_left==20){this.NoseatsBooked=true;}
            // console.log('seats booked'+this.count_seats);
          });
        }
        
      }else{
        alert('Error could not fetch buses of this operator');
      }
     
    })
   
    //updating bus details 
    this.updatebusForm = new FormGroup({
      'Bus_Name':new FormControl('',Validators.required),
      'Date':new FormControl('',),
      'Departure':new FormControl('',),
      'Arrival':new FormControl('',),
      'Source':new FormControl('',),
      'Destination':new FormControl('',),
    })

   }

  ngOnInit(): void {
  }
  setbus(busid){
    sessionStorage.setItem('bus_id',JSON.stringify(busid))
    
  }
  updatebus(){
    
    let id=JSON.parse(sessionStorage.getItem('bus_id'))
    this.updatebusForm.value._id=id
    console.log(this.updatebusForm.value);
    this.service.updatebus(this.updatebusForm.value).subscribe((data) => {
      if (data.status == 200) {
        alert('Bus details updated');
        location.reload();
      }else{
        alert('Bus not updated.Try again');
      }
    })
  }

}
