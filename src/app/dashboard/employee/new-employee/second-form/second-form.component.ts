import { Component, inject, output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-second-form',
  standalone: true,
  styleUrl: './second-form.component.css',
  templateUrl: './second-form.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class SecondFormComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private toast = inject(ToastrService)
  readonly dialog = inject(MatDialog);
  employeeService = inject(EmployeeService);
  toggleform = output();
  form = new FormGroup({
    divisionName: new FormControl('', {
      validators: [Validators.required]
    }),
    role: new FormControl('', {
      validators: [Validators.required]
    }),
    experience: new FormControl('', {
      validators: [Validators.required]
    }),
    twitterUrl: new FormControl(''),
    linkedinUrl: new FormControl(''),
  })
  click() {
    if (this.form.valid) {
      this.employeeService.setFormTwoData(this.form.value)
      this.employeeService.postEmployee().subscribe({
        next: (data) => {
          console.log(data)
          this.toast.show(
            "User Added Successfully",
            "Success",
            {
              timeOut: 2500,
              closeButton: true
            },
            'toast-success'
          )
          this.employeeService.resetFormOne();
          this.employeeService.resetFormTwo();
          this.router.navigate(['../employees'], {
            relativeTo: this.route
          })
        },
        error: (err) => {
          console.log(err);
          this.toast.show(
            "Something went wrong",
            "Failed",
            {
              timeOut: 2500,
              closeButton: true,
            },
            'toast-error'
          )
        }
      })
    }
  }

  back() {
    if (this.form.dirty) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { success: "Leave", cancel: "Stay", content: "You have unsaved changes. If you go back now, your changes will be lost" }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.form.reset();
          this.toggleform.emit();
        }
      })
    }
    else {
      this.toggleform.emit();
    }
  }
}
