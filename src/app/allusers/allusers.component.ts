import { Component, OnInit } from '@angular/core';
import { BusticketService } from '../busticket.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
userdata
  constructor(private service:BusticketService) { 
    this.service.userlist().subscribe((data)=>{
      console.log('inside userlist method'+data);
      console.dir(data.data);
      this.userdata=data.data;
    })
  
  }

  ngOnInit(): void {
  }

}
