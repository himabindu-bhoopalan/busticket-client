import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusticketService } from '../busticket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  seatscount = 0
  seatnumbers = []
  bus
  id
  busData
  user: Boolean = false
  reserveForm
  user_data
  isTaken:Boolean=false
  constructor(private route: ActivatedRoute, private service: BusticketService, private router: Router) {

    this.reserveForm = new FormGroup({
      'userInput': new FormControl('', Validators.required)
    })

    if (sessionStorage.getItem('userdata')!=null) {
      this.user = true;
      console.log('this is user');
    }
    if (sessionStorage.getItem('busopdata')!=null) {
      this.user = false;
      console.log('this is bus operator');
    }


    //get bus id from previous page 
    this.bus = this.route.params.subscribe(params => {
      this.id = params['id']
      console.log('the bus id ' + this.id);
    });


    //get the bus details 
    this.service.findbusone(this.id).subscribe((data) => {
      this.busData = data;
      console.log(this.busData);
      for (let i = 1; i <= 20; i++) {
        if (this.busData.all_seats[i] == "Available") {
          document.getElementById(String(i)).style.backgroundColor = 'red';
        } else {
          document.getElementById(String(i)).style.backgroundColor = 'grey';
          document.getElementById(String(i)).style.cursor ='not-allowed';
          document.getElementById(String(i)).style.pointerEvents ='none';
          this.isTaken=true
        }
      }
      sessionStorage.setItem('busData', JSON.stringify(data));
    })

  }

  ngOnInit(): void {

  }
  refresh() {
    location.reload();
  }
  ar(seatno) {
    //for this bus and user has tickets >=10 then show the alert
    if (this.seatscount >= 10) {
      alert('Can book only upto 10 seats.. ');
    } else {
      if( document.getElementById(seatno).style.backgroundColor =='green'){
        document.getElementById(seatno).style.backgroundColor ='red';
        let index=this.seatnumbers.indexOf(seatno);
        this.seatscount--;
        this.seatnumbers.splice(index,1);
        console.log(this.seatnumbers);
      }else{
        document.getElementById(seatno).style.backgroundColor = 'green';
        if(!(seatno in this.seatnumbers)){
          this.seatscount++;
          this.seatnumbers.push(seatno);
          console.log(this.seatscount, this.seatnumbers);
        }
       
      }
     
    }

  }
  confirm(s) {

    //bus operator reserve seats form
    if (this.reserveForm.value.userInput) {
      console.log('reserve form is getting executed');
      
      console.log(this.reserveForm.value);
      if (Number(this.reserveForm.value.userInput)) {
        this.user_data = { phnumber: Number(this.reserveForm.value.userInput) }
       

        console.dir(this.user_data);

      }
      else if (this.reserveForm.value.userInput.indexOf("@") !== -1 && this.reserveForm.value.userInput.indexOf(".com") !== -1) {
        this.user_data= { email: this.reserveForm.value.userInput }
       
        console.dir(this.user_data);
      }
      else {

        this.user_data={ name: this.reserveForm.value.userInput }
        console.dir(this.user_data);

      }

      //no use of this below service --later going to delete
      //service to get user id only ..
      this.service.get_user_id(this.user_data).subscribe((data) => {
        if (data.status == 200) {
          let userdata = data.user_data
          sessionStorage.setItem('user_data', JSON.stringify(userdata));
        }else{
          alert('User not found!');
          location.reload();
        }
      })
      console.log(s);
      sessionStorage.setItem('seats', JSON.stringify(this.seatnumbers));
      
      let busdata = sessionStorage.getItem('busData');
      let bus1 = JSON.parse(busdata);
      s.forEach(element => {
        bus1.all_seats[String(element)] = "Booked";
      });
      console.log(bus1.all_seats);
      sessionStorage.setItem('allseats', JSON.stringify(bus1.all_seats))
      this.router.navigate(['/ticket']);
      setTimeout(function(){ location.reload(); }, 1000);
     
    }
    
 
  }

}
