import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';

@Component({
  selector: 'app-allbuses',
  templateUrl: './allbuses.component.html',
  styleUrls: ['./allbuses.component.css']
})
export class AllbusesComponent implements OnInit {
busdata
  constructor(private service:BusticketService) {
    this.service.buslist().subscribe((bus1)=>{
      console.log('inside userlist method'+bus1);
      console.dir(bus1);
      this.busdata=bus1;
    })
  
  
   }

  ngOnInit(): void {
  }

}
