import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';

@Component({
  selector: 'app-busopap',
  templateUrl: './busopap.component.html',
  styleUrls: ['./busopap.component.css']
})
export class BusopapComponent implements OnInit {
busopdata
  constructor(private service:BusticketService) {
    this.service.busoplist().subscribe((busop)=>{
      console.log('inside userlist method'+busop);
      console.dir(busop);
      this.busopdata=busop;
    })
   }

  ngOnInit(): void {
  }

}
