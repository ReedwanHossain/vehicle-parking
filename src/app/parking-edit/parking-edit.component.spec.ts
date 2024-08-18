import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingEditComponent } from './parking-edit.component';

describe('ParkingEditComponent', () => {
  let component: ParkingEditComponent;
  let fixture: ComponentFixture<ParkingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
