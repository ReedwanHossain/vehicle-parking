import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParkingFormComponent } from './parking-form/parking-form.component';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { ParkingEditComponent } from './parking-edit/parking-edit.component';

export const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'createParking',
    component: ParkingFormComponent,
  },
  {
    path: 'parkingList',
    component: ParkingListComponent,
  },
  { 
    path: 'editParking/:licenseNum', 
    component: ParkingEditComponent 
  }

];
