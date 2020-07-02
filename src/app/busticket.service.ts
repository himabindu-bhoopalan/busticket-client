import { Injectable } from '@angular/core';
import  {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BusticketService {

  constructor(private http:HttpClient) { }

  usersignup(formdata):Observable<any>{
    console.log('usersignup method');
    return this.http.post('http://localhost:3040/signup',formdata);
  }

  user_sign_in(formdata):Observable<any>{
    console.log('login method');
    return this.http.post('http://localhost:3040/signin',formdata);
  }

  get_user_data(data):Observable<any>{
    console.log('get_user_data service method'+data);
    return this.http.get('http://localhost:3040/getuserdata/'+data);
  }

  get_busop_data(data):Observable<any>{
    console.log('get_user_data service method'+data);
    return this.http.get('http://localhost:3040//getbusopdata/'+data);
  }

   postBus(data):Observable<any>{
     console.log('inside post method'+data);
     return this.http.post('http://localhost:3040/addbus',data);
   }
   
   findBus(data):Observable<any>{
     console.log('findbus service');
     console.log(data);
     return this.http.post('http://localhost:3040/findbus',data);
   }
   userlist():Observable<any>{
     console.log('this is userlist service');
     return this.http.get('http://localhost:3040/allusers');
   }

   buslist():Observable<any>{
     console.log('bus list service');
     return this.http.get('http://localhost:3040/allbuses');
   }
   busoplist():Observable<any>{
    console.log('bus op list service');
    return this.http.get('http://localhost:3040/allbusops');
  }
  approvebus(obj){
    console.log('inside put service ',obj);
    return this.http.put('http://localhost:3040/busapproval',obj);
  }
  approvebusoperator(obj){
    console.log('inside put service ',obj);
    return this.http.put('http://localhost:3040/operatorapproval',obj);
  }
}
