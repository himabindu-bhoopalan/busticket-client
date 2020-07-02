import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busop',
  templateUrl: './busop.component.html',
  styleUrls: ['./busop.component.css']
})
export class BusopComponent implements OnInit {
user;
  constructor() {
    this.user = sessionStorage.getItem('busopdata');
   }

  ngOnInit(): void {
  }

}
