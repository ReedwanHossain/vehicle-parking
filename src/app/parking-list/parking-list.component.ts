import { Component, OnInit } from '@angular/core';
import { VehicleType, Status, Parking } from '../types/vehicle';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-parking-list',
  standalone: true,
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css'],
  imports: [CommonModule]
})
export class ParkingListComponent implements OnInit {

  constructor(private router: Router) {}

  VehicleType = VehicleType;
  Status = Status;
  parking: Parking[] = [];

  ngOnInit(): void {
    const parkingData = JSON.parse(localStorage.getItem('parking') || '[]');
    this.parking = parkingData;
  }

  editStatus(park: any) {
    this.router.navigate(['/editParking', park.licenseNum]);
  }
}
