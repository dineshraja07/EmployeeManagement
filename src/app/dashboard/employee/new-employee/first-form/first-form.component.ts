import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../../../services/employee.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-first-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatSelectModule],
  templateUrl: './first-form.component.html',
  styleUrl: './first-form.component.css',
  providers: [provideNativeDateAdapter()]
})
export class FirstFormComponent {
  toggleNext = output();

  employeeService = inject(EmployeeService);
  readonly dialog = inject(MatDialog);

  isNewEntry = this.employeeService.isFormOneValid;
  existingForm = this.employeeService.getFormOneData();

  form = new FormGroup({
    firstName: new FormControl(this.isNewEntry ? '' : this.existingForm?.firstName, {
      validators: [Validators.required]
    }),
    lastName: new FormControl(this.isNewEntry ? '' : this.existingForm?.lastName, {
      validators: [Validators.required]
    }),
    bloodGroup: new FormControl(this.isNewEntry ? '' : this.existingForm?.bloodGroup),
    dob: new FormControl(this.isNewEntry ? '' : this.existingForm?.dob, {
      validators: [Validators.required]
    }),
    phoneNumber: new FormControl(this.isNewEntry ? '' : this.existingForm?.phoneNumber),
    emergencyNumber: new FormControl(this.isNewEntry ? '' : this.existingForm?.emergencyNumber, {
      validators: [Validators.required]
    }),
    gender: new FormControl(this.isNewEntry ? '' : this.existingForm?.gender, {
      validators: [Validators.required]
    }),
    maritalStatus: new FormControl(this.isNewEntry ? '' : this.existingForm?.maritalStatus),
    email: new FormControl(this.isNewEntry ? '' : this.existingForm?.email, {
      validators: [Validators.email, Validators.required]
    }),
    address: new FormControl(this.isNewEntry ? '' : this.existingForm?.address),
  })

  back() {
    // this.location.back();
    if (this.form.dirty || this.form.valid) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { success: "Leave", cancel: "Stay", content: "You have unsaved changes. If you go back now, your changes will be lost" }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.employeeService.resetFormOne();
          window.history.back();
        }
      })
    }
    else {
      window.history.back();
    }
  }

  click() {
    if (this.form.valid) {
      this.employeeService.setFormOneData(this.form.value);
      this.toggleNext.emit();
    }
    else {
      // console.log(this.form);
      console.log("disabled");
    }
  }
}
