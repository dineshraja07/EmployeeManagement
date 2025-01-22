import { Component, inject, input, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';
import { Employee } from '../dashboard/employee/employee/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-update',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  imports: [FormsModule, DropdownComponent],
})
export class DetailsComponentUpdate implements OnInit {
  private toast = inject(ToastrService)
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  location = inject(Location);
  isDropDown = false;
  id: number = 0;

  getEmployee() {
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data: Employee) => {
        this.firstName1 = data.firstName;
        this.lastName1 = data.lastName;
        this.email1 = data.email;
        this.employee = data;
      },
    });
  }
  ngOnInit(): void {
    {
      this.id = this.route.snapshot.params['id'];
      this.route.queryParams.subscribe({
        next: params => {
          if (params['update'] && params['update'] === 'true') {
            this.click();
            console.log(this.isClicked + " " + this.isUpdateClicked);
          }
          else {
            this.isUpdateClicked = false;
            this.isClicked = false;
          }
        }
      });
      this.getEmployee();
    }
  }

  firstName1: string = '';
  lastName1: string = '';
  email1: string = '';
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    bloodGroup: '',
    dob: '',
    phoneNumber: '',
    emergencyNumber: '',
    gender: '',
    maritalStatus: '',
    email: '',
    address: '',
    divisionName: '',
    experience: '',
    linkedinUrl: '',
    twitterUrl: '',
    role: '',
    active: true
  };



  isClicked = false;
  isUpdateClicked = false;
  click() {
    this.isClicked = true;
    console.log('clicked...');
    this.router.navigate(["./"], {
      queryParams: { update: 'true' },
      relativeTo: this.route
    })
    this.isUpdateClicked = true;
  }
  OnUpdate() {
    this.employeeService.putEmployee(this.id, this.employee).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmployee();
        this.toast.show(
          "Success",
          "Successfully Updated",
          {
            timeOut: 2500,
            closeButton: true,
            toastClass: 'ngx-toastr toast-blue'
          },
          'toast-success'
        )
        this.router.navigate(['./'], {
          relativeTo: this.route
        })
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changed(flag: boolean) {
    this.employee.active = flag;
  }

  back() {
    this.location.back();
  }
}
