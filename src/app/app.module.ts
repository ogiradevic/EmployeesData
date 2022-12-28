import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from "./components/employees/employees.component";
// import { EmployeeItemComponent } from "./components/components/employee-item/employee-item.component";

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
    declarations: [
        AppComponent, EmployeesComponent, CanvasJSChart
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule, HttpClientModule, 
        
    ]
})
export class AppModule { }
