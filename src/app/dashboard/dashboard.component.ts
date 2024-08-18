import { Component, OnInit } from '@angular/core';
import { VehicleType, Status, Parking } from '../types/vehicle'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  VehicleType = VehicleType;
  Status = Status;
  totalCars: number = 0;
  totalEmptySpots: number = 100;
  vehicleTypeInfo: { [key in VehicleType]?: number } = {};
  parkedMoreThanTwoHours: Parking[] = [];

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

    
  }

}
