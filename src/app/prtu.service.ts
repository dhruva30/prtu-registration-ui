import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrtuService {

  baseUrl = "https://prtu-services.herokuapp.com/api/v1/"

  constructor(private http: HttpClient) { }

  register(body){
      return this.http.post(this.baseUrl+"register",body);
  }

  health(){
    return this.http.get(this.baseUrl+"healthcheck");
  }

  getMandalDetails(body){
    return this.http.post(this.baseUrl+"mandals/details",body);
}
getSingleMandalDetails(mandal){
  return this.http.get(this.baseUrl+"mandals/"+mandal+"/details");
}
}
