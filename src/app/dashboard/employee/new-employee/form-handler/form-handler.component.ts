import { Component, input } from '@angular/core';


@Component({
  selector: 'app-form-handler',
  imports: [],
  templateUrl: './form-handler.component.html',
  styleUrl: './form-handler.component.css'
})
export class FormHandlerComponent {
  formStatus = input.required<FormStatus>();
}

export interface FormStatus {
  first: boolean,
  second: boolean,
  third: boolean
}