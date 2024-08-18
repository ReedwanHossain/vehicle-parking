import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status, VehicleType } from '../types/vehicle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parking-edit',
  standalone: true,
  templateUrl: './parking-edit.component.html',
  styleUrls: ['./parking-edit.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ParkingEditComponent implements OnInit {
  parkingForm: FormGroup;
  vehicleTypes = Object.values(VehicleType);
  statuses = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.parkingForm = this.fb.group({
      licenseNum: ['', Validators.required],
      vehicleType: [VehicleType.Car, Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: ['', Validators.required],
      status: [Status.In, Validators.required],
      address: [''],
      entryTime: [new Date().toISOString(), Validators.required],
      exitTime: [''],
      charge: ['']
    });
  }

  ngOnInit() {
    const licenseNum = this.route.snapshot.paramMap.get('licenseNum');
    if (licenseNum) {
      const parkingData = JSON.parse(localStorage.getItem('parking') || '[]');
      const parking = parkingData.find((p: any) => p.licenseNum === licenseNum);
      if (parking) {
        this.parkingForm.patchValue(parking);
      }
    }
  }

  onSubmit() {
    const formValue = this.parkingForm.value;
    const parkingData = JSON.parse(localStorage.getItem('parking') || '[]');
    const index = parkingData.findIndex((p: any) => p.licenseNum === formValue.licenseNum);
    if (index !== -1) {
      parkingData[index] = formValue;
      localStorage.setItem('parking', JSON.stringify(parkingData));
      this.router.navigate(['/parkingList']);
    }
  }

  getStatusName(status: Status): string {
    return Status[status as unknown as keyof typeof Status];
  }
}
