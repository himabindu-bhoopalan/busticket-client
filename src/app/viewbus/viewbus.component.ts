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
journey_date_over:Boolean;
today_date=new Date();
journey_date
loader:Boolean=false;
index
placesSource:any=["Chennai","Vellore","Madurai","Chittoor"]
placesDestination:any=["Chennai","Vellore","Madurai","Chittoor"]
modalplaceholder={"Source":'',"Destination":'',"Date":'',"Departure":'',"Arrival":''};
today
  constructor(private service:BusticketService) {
    let vtoday = new Date();
    this.today = vtoday.toISOString().slice(0,10);
    //code to get the buses of only this bus operator
    //bus operator details are already in session storage 
    //get buses data from the bus op id in the bus op data


    //again here we are using a service to get data of the bus operator eventhough 
    //data is there in the session storage because if the bus is added in the current 
    //sesssion then it would not have added ..

    //get todays date 
    //if journey date <todays date reserve button disabled ..show journey is over 
    this.updatebusForm = new FormGroup({
      'Date':new FormControl(this.modalplaceholder.Date,),
      'Departure':new FormControl(this.modalplaceholder.Departure,),
      'Arrival':new FormControl(this.modalplaceholder.Arrival,),
      'Source':new FormControl(this.modalplaceholder.Source,),
      'Destination':new FormControl(this.modalplaceholder.Destination,),
    })
    
    


    let busOperator=JSON.parse(sessionStorage.getItem('busopdata'))
    //to fetch buses of bus operator 
    this.service.findbusofoperator(busOperator.unique_id).subscribe((bus1)=>{
      console.log(bus1);
      if(bus1.status==200 || bus1.status==400){
        this.loader=true;
      }
      if(bus1.status==200){
        console.log('inside busoperator buses method'+bus1);
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

            //to disable the reserve button 
            
            //date object
            this.journey_date=new Date(element.Date);
            console.log(this.journey_date);
            console.log(this.today_date);
            
            this.journey_date_over=this.journey_date<this.today_date;
            element["journey_date_over"]=this.journey_date_over;
            console.log(this.journey_date_over);
            console.log(element["journey_date_over"]);


          });
        }
        
      }else{
        alert('Error could not fetch buses of this operator');
      }
     
    })
   
   


   }

  ngOnInit(): void {
  }
  removeOption(){

    let x =this.updatebusForm.value.Source;
    console.log(x);
    this.index = this.placesDestination.indexOf(x);
    this.placesDestination.splice(this.index, 1);

  }
  // bus.Source,bus.Destination,bus.Date,bus.Departure,bus.Arrival
  setbus(busid,Source1,Destination1,Date,Departure,Arrival){
    sessionStorage.setItem('bus_id',JSON.stringify(busid))
    this.updatebusForm.value.Source=Source1;
    this.updatebusForm.value.Destination=Destination1;
    this.modalplaceholder={"Source":Source1,"Destination":Destination1,"Date":Date,"Departure":Departure,"Arrival":Arrival}
        //updating bus details 
        console.log(this.modalplaceholder);
       
    
  }
  updatebus(){  
    let id=JSON.parse(sessionStorage.getItem('bus_id'))
    console.log('bus data');
    console.log(this.busdata);
    console.log('modal place holder');
    console.log(this.modalplaceholder);
  
      if(this.updatebusForm.value.Source!==null && this.updatebusForm.value.Source!==undefined && this.updatebusForm.value.Source!=="")
      {
        this.modalplaceholder.Source=this.updatebusForm.value.Source;
      }
      if(this.updatebusForm.value.Destination!==null && this.updatebusForm.value.Destination!==undefined && this.updatebusForm.value.Destination!=="")
      {
        this.modalplaceholder.Destination=this.updatebusForm.value.Destination;
      }
      if(this.updatebusForm.value.Date!=null && this.updatebusForm.value.Date!==undefined && this.updatebusForm.value.Date!=="")
      {
        this.modalplaceholder.Date=this.updatebusForm.value.Date
      }
      if(this.updatebusForm.value.Departure!=null && this.updatebusForm.value.Departure!==undefined && this.updatebusForm.value.Departure!=="")
      {
        this.modalplaceholder.Departure=this.updatebusForm.value.Departure;
      }
      if(this.updatebusForm.value.Arrival!=null && this.updatebusForm.value.Departure!==undefined && this.updatebusForm.value.Departure!=="")
      {
        this.modalplaceholder.Arrival=this.updatebusForm.value.Arrival;
      }
    
 
    this.modalplaceholder['_id']=id
    console.log('update form value');
    console.log(this.updatebusForm.value);
    console.log('modal place holder');
    console.log(this.modalplaceholder);
  
    this.service.updatebus(this.modalplaceholder).subscribe((data) => {
      if (data.status == 200) {
        alert('Bus details updated');
        location.reload();
      }else{
        alert('Bus not updated.Try again');
      }
    })
  }

}
