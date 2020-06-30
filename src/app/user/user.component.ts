import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user
  id
    
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.user = this.route.params.subscribe(params => {
    //   this.id=params['id'];
    //   console.log('inside user component : params '+params);
    //   console.dir(params);
      // console.log('user data inside user component id'+this.id);
      // });
  }
 
}
