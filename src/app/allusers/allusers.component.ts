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
reasonForm
  constructor(private service:BusticketService) { 
    this.service.userlist().subscribe((data)=>{
      console.log('inside userlist method'+data);
      console.dir(data.data);
      let allusers=data.data;
      this.userdata=allusers.filter(function(){
        return (allusers.message==''||allusers.message==undefined && allusers.name!=="hima")
      })
    })
    this.reasonForm = new FormGroup({
      'reason':new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  }   
  deleteUser(id){
    // console.log(id)
    sessionStorage.setItem('user_id',JSON.stringify(id))
    this.userdata.forEach(element => {
      if(element._id=id){

        this.userdata.splice(element,1);
      }
    });
    
   

  }
  sendData(){
   console.log('data sent');
   let id=JSON.parse(sessionStorage.getItem('user_id'))
   this.reasonForm.value._id=id
  console.log(this.reasonForm.value);
  this.service.userdelete(this.reasonForm.value).subscribe((data) => {
    if (data.status == 200) {
      alert('user deleted');
      location.reload();
    }else{
      alert('user not deleted.Try again.');
    }
  })


  }
}
