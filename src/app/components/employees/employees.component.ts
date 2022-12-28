import { Component } from '@angular/core';
import { Employee } from 'src/app/Employees';
import { EmployeeTotalData } from 'src/app/EmployeeTotalData';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {



  employees: Employee[] = []
  employeesTotal: EmployeeTotalData[] = []
  tableComponents: any[] = []
  chartComponenets: any[] = []
  hoursWorkedInTotal: number = 0;



  constructor(private employeeDataService: EmployeeDataService){}

  ngOnInit(): void{


  
    this.employeeDataService.getEmployees().subscribe((employees => {
      for(var i = 0; i < employees.length; i++){

        if(this.employeesTotal.some(x => x.EmployeeName == employees[i].EmployeeName)){
          continue;
        }
        else if(employees[i].EmployeeName == null){
          continue;
        }
        var hoursSum = 0;
        var employeesMatch = employees.filter(x => x.EmployeeName == employees[i].EmployeeName);
  
        for(var j = 0; j < employeesMatch.length; j++){
  
          var startTime = new Date(employeesMatch[j].StarTimeUtc);
          var endTime = new Date(employeesMatch[j].EndTimeUtc);
          
          const milSecondsPerHour = 3600000;

          var diffInHours = (endTime.getTime() - startTime.getTime()) / milSecondsPerHour;

          hoursSum += diffInHours;
          

  
  
        }
        

        var empMatch = new EmployeeTotalData();
        empMatch.EmployeeName = employees[i].EmployeeName;
        empMatch.TotalTimeInMonth = Math.round(hoursSum);
        this.hoursWorkedInTotal += empMatch.TotalTimeInMonth;
        this.employeesTotal.push(empMatch);
        this.employeesTotal.sort((x,y) => (y.TotalTimeInMonth - x.TotalTimeInMonth))
        this.tableComponents = ['EmployeeName','TotalTimeInMonth']
      }
      

      this.employeesTotal.forEach(x => {

          var percentperEmployee = (x.TotalTimeInMonth / this.hoursWorkedInTotal) * 100;
          this.chartComponenets.push({y: percentperEmployee, name: x.EmployeeName})
      })

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: this.chartComponenets
        }]
      });
      
      chart.render();

    }));

  }


}







