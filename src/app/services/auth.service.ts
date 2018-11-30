import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ConfigService } from './ConfigService';
import { User } from '../models/UserModel';
import {Designation} from '../models/DesignationModel';
import {Department} from '../models/DepartmentModel';
import {BehaviorSubject} from 'rxjs';

import {map} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ApiUrl:string;
  private authToken = new BehaviorSubject('');
  jwtToken = this.authToken.asObservable();
  
  constructor(private http:HttpClient,private _config:ConfigService) {
    this.ApiUrl = _config.Config.ApiUrl;
  }

  userAuthentication(Data:User)
  {
    return this.http.post<any>(`${this.ApiUrl}/auth/signin`,Data).pipe(
      map(data=>{
        if(data && data.payload.accessToken)
        {
          localStorage.setItem("user",JSON.stringify(data));
          this.setAuthToken(data.payload.accessToken);
        }
        return data;
      })
    )
  }

  setAuthToken(token: string) {
    this.authToken.next(token)
  }
  deleteAuthToken(){
    this.authToken.next('');
  }
  getAuthToken(){
    return this.authToken;
  }

  addDesignation(Data:Designation)
  {
    return this.http.post<any>(`${this.ApiUrl}/designation/new?departmentId=${Data.departmentId}`,{"name":Data.designationName});
  }
  getAllDesignation()
  {
    return this.http.get<any>(`${this.ApiUrl}/designation/all`);
  }
  addDepartment(Data:Department)
  {
    return this.http.post<any>(`${this.ApiUrl}/departments/new`,{"name":Data.name});
  }

  getAllDepartments()
  {
    return this.http.get<any>(`${this.ApiUrl}/departments/all`);
  }



}
