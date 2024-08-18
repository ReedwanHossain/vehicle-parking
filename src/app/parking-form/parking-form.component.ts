import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleType,Status } from '../types/vehicle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parking-form',
  standalone: true,
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ParkingFormComponent {
  VehicleType = VehicleType;
  Status = Status;

  parkingForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    const formValue = this.parkingForm.value;
    if (formValue.status === Status.Out && !formValue.exitTime) {
      formValue.exitTime = new Date().toISOString();
    }
    if (formValue.entryTime) {
      formValue.entryTime = new Date(formValue.entryTime).toISOString();
    }
    if (formValue.exitTime) {
      formValue.exitTime = new Date(formValue.exitTime).toISOString();
    }

    const parkingData = JSON.parse(localStorage.getItem('parking') || '[]');

    parkingData.push(formValue);

    localStorage.setItem('parking', JSON.stringify(parkingData));

    this.parkingForm.reset({
      vehicleType: VehicleType.Car,
      status: Status.In,
      entryTime: new Date().toISOString()
    });
  }
}
