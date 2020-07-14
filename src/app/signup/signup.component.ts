import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusticketService } from '../busticket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
userForm;//sign up form 
userData;//data coming from the server after signing up
category:any=['User','Bus Operator']
  constructor(private user:BusticketService,private router:Router) { 
    this.userForm = new FormGroup({
      'category':new FormControl('',Validators.required),
      'name':new FormControl(''),
      'email':new FormControl('',Validators.email),
      'phnumber':new FormControl('',[Validators.minLength(10),Validators.maxLength(10)]),  
      'password':new FormControl('',[Validators.minLength(8),Validators.maxLength(32),Validators.required])
    })
  }

  ngOnInit(): void {
  }
  sendData(){
    //check for a valid form 
    //generate a unique id for each user on form submission
    //according to the category i have to route to a corresponding component   
    // console.log(this.userForm.value);
    // console.log(this.userForm.valid);
    if(this.userForm.valid){
    
      this.user.usersignup(this.userForm.value).subscribe((data)=>{
        this.userData=data 
        if(data.status==200){
          
          alert("please sign in with the credentials");
          this.router.navigate(["/signin"]);
        }
        else if(data.status==400){
          alert("error");
        }else{
          alert('unexpected error occured.please try again.')
        }
        
      })

    }
    else{
      alert("please enter valid details")

    }
  

  }
  changeCity(e) {
    this.category.setValue(e.target.value, {
      onlySelf: true
    })
  }
}
