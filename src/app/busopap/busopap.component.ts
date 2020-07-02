import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';

@Component({
  selector: 'app-busopap',
  templateUrl: './busopap.component.html',
  styleUrls: ['./busopap.component.css']
})
export class BusopapComponent implements OnInit {
busopdata
data2
  constructor(private service:BusticketService) {
    this.service.busoplist().subscribe((busop)=>{
      console.log('inside userlist method'+busop);
      console.dir(busop);
      this.busopdata=busop;
    })
   }

  ngOnInit(): void {
  }
  approve(id){
    var obj={_id:id}
    
    console.log(id);
    this.service.approvebusoperator(obj).subscribe((data)=>{
      console.log('inside userlist method'+data);
      this.data2=data
      console.dir(this.data2);
      if(this.data2.status==200){
        alert('Operator Approved!');
      }
      if(this.data2.status==400){
        alert('Something went wrong ..Try again!');
        
      }
    })
  }
}
