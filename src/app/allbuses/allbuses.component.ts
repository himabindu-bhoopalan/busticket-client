import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';

@Component({
  selector: 'app-allbuses',
  templateUrl: './allbuses.component.html',
  styleUrls: ['./allbuses.component.css']
})
export class AllbusesComponent implements OnInit {
busdata
data1

  constructor(private service:BusticketService) {
    this.service.buslist().subscribe((bus1)=>{
      console.log('inside userlist method'+bus1);
      console.dir(bus1);
      this.busdata=bus1;
    })
  
  
   }

  ngOnInit(): void {
  }
  approve(id){
    var obj={_id:id}
    
    console.log(id);
    this.service.approvebus(obj).subscribe((data)=>{
      console.log('inside userlist method'+data);
      this.data1=data
      console.dir(this.data1);
      if(this.data1.status==200){
        console.log('updated');
        alert('Approved!');
        location.reload();
      }
      if(this.data1.status==400){
        alert('Something went wrong ..Try again!');
        
      }
    })
  }
}
