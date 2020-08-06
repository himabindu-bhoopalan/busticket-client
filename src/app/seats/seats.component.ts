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

    //reserve form
    this.reserveForm = new FormGroup({
      'userInput': new FormControl('', Validators.required)
    })

    //used to disable confirm and reserve options 
    if (sessionStorage.getItem('userdata')!=null && sessionStorage.getItem('user_data')==null) {
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
  //reset button 
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
    if(this.seatnumbers.length==0){
      alert('No seats booked.')
    }else{
      //first valid else


        //bus operator reserve seats form-start
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

     
      //service to get user details only ..
      this.service.get_user_id(this.user_data).subscribe((data) => {
        if (data.status == 200) {
          let userdata = data.user_data
          sessionStorage.setItem('user_data', JSON.stringify(userdata));
        }else{
          alert('User not found!');
          let busidata=JSON.parse(sessionStorage.getItem('busData'))
          console.log(busidata);
          console.log(busidata._id);
          this.router.navigate(['selectseats',busidata._id]);
          // location.reload();
        }
      })
     
    } //bus operator reserve seats form-end
    
    

    //common procedure for bus op and user i.e 
    //1) storing "s"==seats array and 
    //2) 2.a)changing all_seats arrayof this bus object and 2.b)storing them too

    //1
    console.log(s+"seat array")
    sessionStorage.setItem('seats', JSON.stringify(s));

    //2.a
    let bus1 = JSON.parse(sessionStorage.getItem('busData'));
    s.forEach(element => {
      bus1.all_seats[String(element)] = "Booked";
    });

    //2.b
    console.log(bus1.all_seats);
    sessionStorage.setItem('allseats', JSON.stringify(bus1.all_seats))

    //going to next page
    this.router.navigate(['/ticket']);

    //only if reserve form is thr reload is need so condition

    if(!this.user){
      setTimeout(function(){ location.reload(); }, 2000);
    }
    




    }

  
 
  }

}
