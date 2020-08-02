import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';
import { generate } from 'rxjs';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  res
  userData
  ticketsarray
  upcomingTickets = []
  cancelledTickets = []
  completedTickets = []
  dt2
  cancel
  cancel2
  constructor(private service: BusticketService) {
    //in the constructor get all the tickets of the user from db 
    //user data is in session storage but why fetching all?because the ticket whch has been added just now
    //will not be in session storage
    //compare with the date and display it on the screen
    //on the corresponding click of the button 
    //1 service 
    //ng ifs in the template


    let user = sessionStorage.getItem('userdata')
    this.userData = JSON.parse(user);
    // console.log(this.userData._id);

    //getting today's date
    let d = new Date()
    let day2 = d.getDate()
    let month2 = d.getMonth()
    let year2 = d.getFullYear()
    let hours2 = d.getHours()
    let minutes2 = d.getMinutes()



    //service to get user data
    this.service.get_user_data(this.userData._id).subscribe((data) => {
      this.res = data
      // console.log('getting user details', data);
      if (this.res.status == 200) {
        // console.log(this.res.message.tickets);
        // console.log('got user details');

      } else {
        // console.log('could not fetch user ticket details');
        alert('could not fetch user ticket details.try again..');
      }

      //separating the tickets based on current date and their date and status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


      this.res.message.tickets.forEach(element => {
        // console.log(element.Date);
        // console.log(element.Departure);


        //getting the journey date------------------------------
        let year1 = (element.Date).slice(0, 4)
        let month1 = (element.Date).slice(5, 7)
        let day1 = (element.Date).slice(8)
        let hours1 = (element.Departure).slice(0, 2)
        let minutes1 = (element.Departure).slice(3)
        //--------------------------xx----------------------------


        let dt1 = new Date(year1, Number(month1) - 1, day1, hours1, minutes1)//journey date
        this.dt2 = new Date(year2, month2, day2, hours2, minutes2)//today date

        // console.log(dt1);
        // console.log(this.dt2);
        // console.log('time difference', dt1.getTime() - this.dt2.getTime());

        let timeDiff = (dt1.getTime() - this.dt2.getTime()) / (1000 * 60 * 60); //time difference in hours 
        // console.log(timeDiff);

        if (element.Status == "cancelled") {
          this.cancelledTickets.push(element);
        }
        else if (timeDiff < 0 && element.Status == "success") {
          this.completedTickets.push(element);
        } else {
          if (timeDiff >= 0) {
            this.upcomingTickets.push(element);
          }

        }
       

      })
    })


  }
  ngOnInit(): void {
  }
  cancelTicket(id, index,seats,busname,busid,source,destination) {
    let ticketid = id
    let countservicecalled=0;
    let seatsbooked=seats;
    let busname1=busname;
    let busid1=busid;
    let src=source;
    let dest=destination
    var j = index
    // console.log('the index'+j);
    let g = new Date()
    // console.log(this.dt2);
    let timeleft = this.dt2.getTime() - g.getTime() / (1000 * 60 * 60)

    if (timeleft > 5) {
      //put request
      let obj={"_id":this.userData._id,"ticketid":ticketid}
      this.service.cancelTicket(obj).subscribe((data) => {
        // console.log(data);
        this.cancel = data
        if (this.cancel.status == 200) {
          countservicecalled+=1;
          // console.log('ticket cancelled in passenger db');
         
        } else {
          // console.log('ticket not cancelled in passenger db');
        }
      })


      //another put request to tickets db 
      let obj2={"ticketid":ticketid}
      this.service.Ticketdb(obj2).subscribe((data) => {
        // console.log(data);
        this.cancel2 = data
        if (this.cancel2.status == 200) {
          countservicecalled+=1;
          // console.log('ticket cancelled in ticket db');
          
        } else {
          // console.log('ticket not cancelled in ticket db');
        }
      })

      let obj3={"seats":seatsbooked,"Bus_Name":busname1,"Bus_ID":busid1,"Source":src,"Destination":dest}
      console.log('obj3');
      console.dir(obj3);  
      //update the seats to available in the bus
      this.service.cancelled_seat_available(obj3).subscribe((data) => {
        // console.log(data);
        this.cancel2 = data
        if (this.cancel2.status == 200) {
          countservicecalled+=1;
          console.log('seats changed to available in bus db');
          
        } else {
          console.log('seats not changed to available in bus db');
        }
      })

      
      // if(countservicecalled==3){
      // document.getElementById("cancel" + String(j)).innerHTML = "Cancelled";
      alert('Your ticket has been cancelled.You can find it in cancelled tickets.')
      location.reload();
      // }else if(countservicecalled==0){
      //   alert('The ticket was not cancelled.please try again.')
      // }else{
      //   alert('The ticket was not cancelled properly.')
      // }
      

    }
    else {
      alert("you can cancel the tickets only before 5 hours from departure time");
    }
  }

}

