import { Component } from '@angular/core';
import { FormHandlerComponent, FormStatus } from "./form-handler/form-handler.component";
import { FirstFormComponent } from "./first-form/first-form.component";
import { SecondFormComponent } from './second-form/second-form.component';

@Component({
  selector: 'app-new-employee',
  imports: [FormHandlerComponent, FirstFormComponent, SecondFormComponent],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent {
  formStatus: FormStatus = {
    first: true,
    second: false,
    third: false
  }

  toggleSecond() {
    this.formStatus.second = !this.formStatus.second;
  }
}
