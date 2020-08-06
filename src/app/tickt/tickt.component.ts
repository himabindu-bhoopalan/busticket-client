import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';


@Component({
  selector: 'app-tickt',
  templateUrl: './tickt.component.html',
  styleUrls: ['./tickt.component.css']
})
export class TicktComponent implements OnInit {
total_bill
ticketid
bus
seats_booked_array
ticket
res
count1=0
user
updateseats
addticket
all_seats
isBusoperator:Boolean=false;
Reservation:Boolean=false;
user_reserve
  constructor(private service:BusticketService) { 

    //Is this operator or user??logic
    if(sessionStorage.getItem('busopdata')){
      this.isBusoperator=true;
      console.log('this is bus operator');
      this.user_reserve=JSON.parse(sessionStorage.getItem('user_data'));
    }


    console.log('inside the constructor');


    //get user details-for user component
    if(!this.isBusoperator){
      let usersession=sessionStorage.getItem('userdata')
      this.user=JSON.parse(usersession);
      console.log(this.user);

    }
    
    //getting seats
    this.seats_booked_array=JSON.parse(sessionStorage.getItem('seats'));
    console.log('seats array from session storage'+this.seats_booked_array);

    //getting bus details
    this.bus=JSON.parse(sessionStorage.getItem('busData'));
    console.log(this.bus);

    //calculate the bill
    this.total_bill=this.bus.Ticket_price*this.seats_booked_array.length


    //generate ticket-id
    this.ticketid=this.generate_id(this.bus.Source,this.bus.Destination)

    //ticket for bus operator
    if(this.isBusoperator){
      //for reservation
      this.ticket={
        ticketid:this.ticketid, //1       
        passenger_name:this.user_reserve.name,//2
        passenger_email:this.user_reserve.email,//3
        passenger_phone:this.user_reserve.phnumber,//4
        Bus_Name:this.bus.Bus_Name,//5
        Bus_ID:this.bus.Bus_ID,//5
        Bus_operator_id:this.bus.Bus_operator_id,//6
        Departure:this.bus.Departure,//7
        Arrival:this.bus.Arrival,//8
        Total_price:this.total_bill,//9
        Ticket_price:this.bus.Ticket_price,//10
        Source:this.bus.Source,//11
        Destination:this.bus.Destination,//12
        Date:this.bus.Date,//13
        Seats:this.seats_booked_array,//14
        Status:"success" //15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }

    
    }else{

      //ticket for bus operator
      this.ticket={
        ticketid:this.ticketid, //1       
        passenger_name:this.user.name,//2
        passenger_email:this.user.email,//3
        passenger_phone:this.user.phnumber,//4
        Bus_Name:this.bus.Bus_Name,//5
        Bus_ID:this.bus.Bus_ID,//5
        Bus_operator_id:this.bus.Bus_operator_id,//6
        Departure:this.bus.Departure,//7
        Arrival:this.bus.Arrival,//8
        Total_price:this.total_bill,//9
        Ticket_price:this.bus.Ticket_price,//10
        Source:this.bus.Source,//11
        Destination:this.bus.Destination,//12
        Date:this.bus.Date,//13
        Seats:this.seats_booked_array,//14
        Status:"success" //15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    } 

    }
  
  console.log('ticket'+this.ticket);

  }
  ngOnInit(): void {
    
  }

  //tp generate ticket id
  generate_id(a,b) {
    var c = a.slice(0, 3)+b.slice(0,3)

    var characters = '0123456789';
    var len = characters.length;
    for (var i = 0; i < 5; i++) {
    c+= characters.charAt(Math.floor(Math.random() * len));
    }
    // console.log("ticket id" + c)
    return c
  }

//ticket booking  
AddTicket(id){
//service-1 :update ticket db.
//service-2 :update the seats in the bus.
//service-3 :ticket added in passenger db.

// console.log('3 services here ');

//service-1
console.dir(this.ticket);
this.service.addticket(this.ticket).subscribe((data)=>{
  this.res=data
  // console.log('add ticket method',data);
  if(this.res.status==200){
    // console.log('ticket added');
    this.count1++;
  }else{
    alert('Ticket not added.Please try again.');
  }
}) 

//service -2 a new variable to update 
let a=sessionStorage.getItem('allseats')
this.all_seats=JSON.parse(a)
this.updateseats={"bus_id":this.bus._id,"seatList":this.all_seats}
// console.log('update seats');
// console.log(this.updateseats);
this.service.updateSeats(this.updateseats).subscribe((data)=>{
  // console.log('update seats of the bus!',data);
  this.res=data
  if(this.res.status==200){
    // console.log('Seats updated');
    this.count1++;
  }else{
    alert('Seats not updated in the Bus');
  }
}) 

// service-3 a new var

//if bus operator is reserving the tickets then in the prev window i.e seat booking module 
//when modal appears using name get the user details and store in the local storage 



  if(this.isBusoperator){
    this.user_reserve=JSON.parse(sessionStorage.getItem('user_data'))
    this.addticket={user_id:this.user_reserve._id,ticket:this.ticket}
  }else{
    this.user=JSON.parse(sessionStorage.getItem('userdata'))
    this.addticket={user_id:this.user._id,ticket:this.ticket}
  }
 
  this.service.addTickettoUser(this.addticket).subscribe((data)=>{
    console.log(data);
    if(this.res.status==200){
      // console.log('ticket added to user db');
      this.count1++;
      
    }else{
      alert("ticket not added to user's account");
    }
  }) 
  



  
  document.getElementById(id).innerHTML='Paid';
  alert('Your ticket is booked.Click on view ticket to see your tickets(only users can view their tickets)');


}


}
