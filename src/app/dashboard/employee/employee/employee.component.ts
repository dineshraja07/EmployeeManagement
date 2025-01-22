import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsComponentUpdate } from '../../../details/details.component';
@Component({
  selector: 'app-employee',
  imports: [DetailsComponentUpdate],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  navigate() {
    this.router.navigate(['../update'], {
      relativeTo: this.activateRoute
    })
  }
}
