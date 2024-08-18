import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { VehicleType, Status, Parking } from '../types/vehicle';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, NgxEchartsDirective]
})
export class DashboardComponent implements OnInit {
  VehicleType = VehicleType;
  Status = Status;
  totalCars: number = 0;
  totalEmptySpots: number = 100;
  vehicleTypeInfo: { [key in VehicleType]?: number } = {};
  parkedMoreThanTwoHours: Parking[] = [];
  pieChartOptions: EChartsOption = {};
  lineChartOptions: EChartsOption = {};

  ngOnInit(): void {
    const parkingData: Parking[] = JSON.parse(localStorage.getItem('parking') || '[]');

    this.totalCars = parkingData.length;
    this.totalEmptySpots = 100 - this.totalCars;

    this.vehicleTypeInfo = parkingData.reduce((acc: { [key in VehicleType]?: number }, park: Parking) => {
      const vehicleType = park.vehicleType as VehicleType;
      acc[vehicleType] = (acc[vehicleType] || 0) + 1;
      return acc;
    }, {} as { [key in VehicleType]?: number });

    this.parkedMoreThanTwoHours = parkingData.filter((park: Parking) => {
      if (park.exitTime && park.entryTime) {
        const entry = new Date(park.entryTime).getTime();
        const exit = new Date(park.exitTime).getTime();
        return (exit - entry) > 2 * 60 * 60 * 1000; 
      }
      return false;
    });

    const vehicleTypeCounts = parkingData.reduce((acc: { [key: string]: number }, park) => {
      const type = park.vehicleType as string;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.pieChartOptions = {
      title: {
        text: 'Vehicle Type Distribution',
        left: 'center'
      },
      series: [
        {
          name: 'Vehicle Type',
          type: 'pie',
          radius: '50%',
          data: Object.keys(vehicleTypeCounts).map(key => ({
            name: key,
            value: vehicleTypeCounts[key]
          }))
        }
      ]
    };

    const dailyCounts: { [date: string]: number } = {};
    const weeklyCounts: { [week: string]: number } = {};
    const monthlyCounts: { [month: string]: number } = {};

    parkingData.forEach(park => {
      if (park.entryTime) {
        const entryDate = new Date(park.entryTime);
        const date = entryDate.toISOString().split('T')[0];
        const week = `${entryDate.getFullYear()}-W${Math.ceil(entryDate.getDate() / 7)}`;
        const month = `${entryDate.getFullYear()}-${entryDate.getMonth() + 1}`;

        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
        weeklyCounts[week] = (weeklyCounts[week] || 0) + 1;
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
      }
    });

    this.lineChartOptions = {
      title: {
        
        left: 'center'
      },
      tooltip: {},
      legend: {
        data: ['Daily', 'Weekly', 'Monthly']
      },
      xAxis: {
        type: 'category',
        data: Object.keys(dailyCounts).sort()
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Daily',
          type: 'line',
          data: Object.keys(dailyCounts).sort().map(date => ({
            name: date,
            value: dailyCounts[date]
          }))
        },
        {
          name: 'Weekly',
          type: 'line',
          data: Object.keys(weeklyCounts).sort().map(week => ({
            name: week,
            value: weeklyCounts[week]
          }))
        },
        {
          name: 'Monthly',
          type: 'line',
          data: Object.keys(monthlyCounts).sort().map(month => ({
            name: month,
            value: monthlyCounts[month]
          }))
        }
      ]
    };
  }
}
