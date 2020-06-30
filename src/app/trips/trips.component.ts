import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  constructor() {
    //in the constructor get all the tickets of the user from db 
    //compare with the date and display it on the screen
    //on the corresponding click of the button 
    //1 service 
    //ng ifs in the template
   }

  ngOnInit(): void {
  }

}
