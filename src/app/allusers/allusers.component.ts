import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
userdata
delForm
  constructor(private service:BusticketService) { 
    this.service.userlist().subscribe((data)=>{
      console.log('inside userlist method'+data);
      console.dir(data.data);
      this.userdata=data.data;
    })
    this.delForm = new FormGroup({
      'reason':new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  }   
  deleteUser(id){
    // console.log(id)

  }
  sendData(){
   console.log('data sent');
  //  console.log(this.delForm);
  }
}
