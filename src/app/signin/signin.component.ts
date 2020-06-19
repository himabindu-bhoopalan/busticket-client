import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusticketService } from '../busticket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm
  
  constructor(private busservice:BusticketService,private router:Router) {
    this.signinForm = new FormGroup({
      'email':new FormControl('',Validators.email),
      'password':new FormControl('',[Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])'),
      Validators.minLength(8),Validators.maxLength(32),Validators.required]),
    })
   }

  ngOnInit(): void {
  }
  sigin(){
    // this.busservice.signin(this.signinForm.value).subscribe((data)=>{
    //   if(data.status=='200'){
    //     this.router.navigate["/dashboard"]
    //   }
      
    // })
  }

}
