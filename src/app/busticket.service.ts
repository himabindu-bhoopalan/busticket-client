import { Injectable } from '@angular/core';
import  {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BusticketService {

  constructor(private http:HttpClient) { }
  usersignup(formdata):Observable<any>{
    console.log('usersignup method')
    return this.http.post('http://localhost:3040/signup',formdata);
  }

  // signin(formdata):Observable<any>{
  //   console.log('login method')
  //   return this.http.post('https://localhost:3000/signin',formdata);
  // }
}
