import { Injectable } from '@angular/core';
import  {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BusticketService {

  constructor(private http:HttpClient) { }

  updatebus(formdata):Observable<any>{
    // console.log(formdata);
    // console.log('updatebus service');
    // return this.http.put('http://localhost:3040/updatebus',formdata);
    return this.http.put('https://busnode.herokuapp.com/updatebus',formdata);

  }
  userdelete(formdata):Observable<any>{
    // console.log(formdata);
    // console.log('updateprofile service');
    // return this.http.put('http://localhost:3040/userdelete',formdata);
    return this.http.put('https://busnode.herokuapp.com/userdelete',formdata);

  }
  updateprofile(formdata):Observable<any>{
    // console.log(formdata);
    // console.log('updateprofile service');
    // return this.http.put('http://localhost:3040/updateprofile',formdata);
    return this.http.put('https://busnode.herokuapp.com/updateprofile',formdata);

  }
  get_user_id(formdata):Observable<any>{
    // console.dir(formdata);
    // console.log('just get only the id of the user');
    // return this.http.post('http://localhost:3040/getuserid',formdata);
    return this.http.post('https://busnode.herokuapp.com/getuserid',formdata);
  }

  usersignup(formdata):Observable<any>{
    // console.log('usersignup method');
    // return this.http.post('http://localhost:3040/signup',formdata);
    return this.http.post('https://busnode.herokuapp.com/signup',formdata);
  }

  user_sign_in(formdata):Observable<any>{
    // console.log('login method');
    // return this.http.post('http://localhost:3040/signin',formdata);
    return this.http.post('https://busnode.herokuapp.com/signin',formdata);
  }

  get_user_data(data):Observable<any>{
    // console.log('get_user_data service method'+data);
    // return this.http.get('http://localhost:3040/getuserdata/'+data);
    return this.http.get('https://busnode.herokuapp.com/getuserdata/'+data);
  }


   postBus(data):Observable<any>{
    //  console.log('inside post method'+data);
    //  return this.http.post('http://localhost:3040/addbus',data);
     return this.http.post('https://busnode.herokuapp.com/addbus',data);
   }
   
   findBus(data):Observable<any>{
    //  console.log('findbus service');
    //  console.log(data);
    // return this.http.post('http://localhost:3040/findbus',data);
     return this.http.post('https://busnode.herokuapp.com/findbus',data);
   }

   userlist():Observable<any>{
    //  console.log('this is userlist service');
    //  return this.http.get('http://localhost:3040/allusers');
     return this.http.get('https://busnode.herokuapp.com/allusers');
   }

   buslist():Observable<any>{
    //  console.log('bus list service');
    //  return this.http.get('http://localhost:3040/allbuses');
     return this.http.get('https://busnode.herokuapp.com/allbuses');
   }

   busoplist():Observable<any>{
    // console.log('bus op list service');
    // return this.http.get('http://localhost:3040/allbusops');
    return this.http.get('https://busnode.herokuapp.com/allbusops');
  }

  approvebus(obj):Observable<any>{
    // console.log('inside put service ',obj);
    // return this.http.put('http://localhost:3040/busapproval',obj);
    return this.http.put('https://busnode.herokuapp.com/busapproval',obj);
  }

  approvebusoperator(obj):Observable<any>{
    // console.log('inside put service ',obj);
    // return this.http.put('http://localhost:3040/operatorapproval',obj);
    return this.http.put('https://busnode.herokuapp.com/operatorapproval',obj);
  }

  findbusone(data):Observable<any>{
    // console.log('get_bus_data service method'+data);
    // return this.http.get('http://localhost:3040/getbusdata/'+data);
    return this.http.get('https://busnode.herokuapp.com/getbusdata/'+data);
  }

  addticket(data):Observable<any>{
    // console.log('inside ticket service'+data);
    // return this.http.post('http://localhost:3040/addticket',data);
    return this.http.post('https://busnode.herokuapp.com/addticket',data);
  }

  addTickettoUser(data):Observable<any>{
    // console.log('inside add tikcet to user db'+data)
    // return this.http.put('http://localhost:3040/userticket',data);
    return this.http.put('https://busnode.herokuapp.com/userticket',data);
  }

  updateSeats(data):Observable<any>{
    // console.log('inside update seats in bus db');
    // console.dir(data);
    // return this.http.put('http://localhost:3040/updateseats',data);
    return this.http.put('https://busnode.herokuapp.com/updateseats',data);
  }

  cancelTicket(obj):Observable<any>{
    // console.log('inside cancelTicket service');
    // return this.http.put('http://localhost:3040/cancelticket',obj);
    return this.http.put('https://busnode.herokuapp.com/cancelticket',obj);
  }

  Ticketdb(obj):Observable<any>{
    // console.log('inside Ticketdb service');
    // return this.http.put('http://localhost:3040/cancelticketfromdb',obj);
    return this.http.put('https://busnode.herokuapp.com/cancelticketfromdb',obj);
  }

  addbustoOp(idandbusid):Observable<any>{
    // console.log('addbustoOp service');
    // return this.http.put('http://localhost:3040/addbustooperator',idandbusid);
    return this.http.put('https://busnode.herokuapp.com/addbustooperator',idandbusid);
  }


  findbusofoperator(id):Observable<any>{
    // console.log('findbusofoperator service');
    // return this.http.get('http://localhost:3040/findbusofoperator/'+id);
    return this.http.get('https://busnode.herokuapp.com/findbusofoperator/'+id);
  }
}
