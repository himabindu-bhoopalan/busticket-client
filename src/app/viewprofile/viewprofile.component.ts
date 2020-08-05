import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusticketService } from '../busticket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  id
  user
  user_data
  updateForm
  constructor(private service:BusticketService,private route:ActivatedRoute,private router:Router) { 
   
    let user = sessionStorage.getItem('userdata');
    this.user_data=JSON.parse(user);
      this.updateForm = new FormGroup({
        'Id':new FormControl(this.user_data.unique_id,[Validators.minLength(7)]),
        'Name':new FormControl(this.user_data.name,),
        'Email':new FormControl(this.user_data.email,),
        'Phone':new FormControl(this.user_data.phnumber,[Validators.maxLength(10)])
      })
     
  }

  ngOnInit(): void {
   
     
  }
   update(){
     console.log(this.updateForm.value);
      // if(this.updateForm.value.Phone!=null && this.updateForm.value.Phone!=undefined && this.updateForm.value.Phone!=""){
      //   if(String(this.updateForm.value.Phone).length<10||String(this.updateForm.value.Phone).length>10){
      //     alert('Phone number length should be 10');
      //   }
      // else{ 

        
      this.updateForm.value._id= this.user_data._id
      // console.log(this.updateForm.value);
      //call service update it and then navigate to home page 
      this.service.updateprofile(this.updateForm.value).subscribe((data)=>{
        // console.log(data);
        if(data.status==200){
          
          alert('User details updated.Please login with new details');
          this.router.navigate(['/signin']);
          setTimeout(function(){ location.reload(); }, 1000);
         
        
          
        }else{
          alert('Update not successful,try again or didnt add any new updated details.');
        }
       
      })

      }

  //   }
   
   
  //  }
  
}
