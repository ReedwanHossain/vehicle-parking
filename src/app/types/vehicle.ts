export interface Parking {
    licenseNum: string;
    vehicleType: VehicleType;
    ownerName: string;
    ownerPhone: string;
    status: Status;
    address: string;
    entryTime: string;
    exitTime: string;
    charge: string;
  }


export enum VehicleType {
    Microbus = 'microbus',
    Car = 'car',
    Truck = 'truck',
}
  
export enum Status {
    In = 'in',
    Out = 'out',
  }
  