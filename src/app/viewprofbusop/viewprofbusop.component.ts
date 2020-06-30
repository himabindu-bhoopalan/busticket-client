import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BusticketService } from '../busticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewprofbusop',
  templateUrl: './viewprofbusop.component.html',
  styleUrls: ['./viewprofbusop.component.css']
})
export class ViewprofbusopComponent implements OnInit {
profileForm
user
id
user_data;
  constructor(private busservice:BusticketService,private route:ActivatedRoute) { 
    // this.user = this.route.params.subscribe(params => {
    //   this.id = params['id']
    //   console.log(this.id);
    //   console.log('params'+params);
    //   });
      
     
    //   this.busservice.get_busop_data(this.id).subscribe((data)=>{
    //     console.log('inside viewprofile constructor '+data);
    //     console.dir(data);
    //     this.user_data=data;
    //     sessionStorage.setItem('Bus_Operator',this.user_data);
    //   })
     
    let user = sessionStorage.getItem('busopdata');
    this.user_data=JSON.parse(user);
    this.profileForm = new FormGroup({
      'Id':new FormControl('',),
      'Name':new FormControl('',),
      'Email':new FormControl('',),
      'Phone':new FormControl('',)
    })
    
  }

  ngOnInit(): void {
  }
  update(){
    alert('hi');
  }
}
