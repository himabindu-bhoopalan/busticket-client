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
  category:any=['User','Bus Operator']
  constructor(private busservice:BusticketService,private router:Router) {
    this.signinForm = new FormGroup({
      'category':new FormControl('',Validators.required),
      'userInput':new FormControl('',Validators.required),
      'password':new FormControl('',[
      Validators.minLength(8),Validators.maxLength(32),Validators.required]),
    })
   }
  
  ngOnInit(): void {
  }
  signIn(){
    console.log(this.signinForm.value);
    
    let signin_data=[]
    let a={password:this.signinForm.value.password}
    signin_data.push(a)
    signin_data.push({category:this.signinForm.value.category});
    console.log(this.signinForm.value);
    console.dir(signin_data);
    // console.log(this.signinForm.value.userInput)
    
    
    if(Number(this.signinForm.value.userInput)){
        let b={phnumber:Number(this.signinForm.value.userInput)}
        signin_data.push(b)
        
        console.dir(signin_data);
        
    }
    else if(this.signinForm.value.userInput.indexOf("@")!==-1 && this.signinForm.value.userInput.indexOf(".com")!==-1){
      let b={email:this.signinForm.value.userInput}
      signin_data.push(b)
      console.dir(signin_data);
    }
    else{
     
      signin_data.push({name:this.signinForm.value.userInput})
      console.dir(signin_data);

    }

    //service  
    this.busservice.user_sign_in(signin_data).subscribe((data)=>{
     console.log('signin component'+data.status);
     console.dir(data.userdata);
     console.log('signin component'+data.message);
     if(data.status==200){
       console.log("hello");
       //routing to corresponding component and setting the data to session storage
       if(this.signinForm.value.category=="User"){
        sessionStorage.setItem('userdata', JSON.stringify(data.userdata));
        this.router.navigate(['/user']);
       }else{
        sessionStorage.setItem('busopdata', JSON.stringify(data.userdata)); 
        this.router.navigate(['/bus_operator']);

       }
       
     }
      
    })
  }
  changeCity(e) {
    this.category.setValue(e.target.value, {
      onlySelf: true
    })
  }
}
