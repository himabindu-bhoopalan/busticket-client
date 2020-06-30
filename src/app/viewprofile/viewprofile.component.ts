import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusticketService } from '../busticket.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  id
  user
  user_data
  profileForm
  constructor(private busservice:BusticketService,private route:ActivatedRoute) { 
    // this.user = this.route.params.subscribe(params => {
    //   this.id = params['id']
    //   console.log(this.id);
    //   console.log('params'+params);
    //   });
      
     
    //   this.busservice.get_user_data(this.id).subscribe((data)=>{
    //     console.log('inside viewprofile constructor '+data);
    //     console.dir(data);
    //     this.user_data=data;
        
    //   })
    
    let user = sessionStorage.getItem('userdata');
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
     alert('update service');
   }
  
  
}
