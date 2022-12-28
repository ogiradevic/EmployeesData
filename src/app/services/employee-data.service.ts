import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Employees';
import {Observable} from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';


  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee[]>{

      return this.http.get<Employee[]>(this.apiUrl);


  }

}
