import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee, FormOne, FormTwo } from '../dashboard/employee/employee/employee.model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8081/api/';


  private formOneData!: FormOne;
  private formTwoData!: FormTwo;


  private httpClient = inject(HttpClient);
  deleteStatus = new BehaviorSubject<boolean>(false);

  public isFormOneValid = true;

  setFormOneData(data: any) {
    this.isFormOneValid = false;
    this.formOneData = data;
    console.log(this.formOneData);
  }

  getFormOneData() {
    return this.formOneData;
  }
  resetFormOne() {
    this.formOneData = {
      firstName: "",
      lastName: "",
      bloodGroup: "",
      dob: "",
      phoneNumber: "",
      emergencyNumber: "",
      gender: "",
      maritalStatus: "",
      email: "",
      address: ""
    };
    this.isFormOneValid = false;
  }
  resetFormTwo() {
    this.formTwoData = {
      divisionName: '',
      role: "",
      experience: '',
      linkedinUrl: '',
      twitterUrl: ''
    };
    this.isFormOneValid = false;
  }
  setFormTwoData(data: any) {
    this.formTwoData = data;
  }

  getEmployees() {
    return this.httpClient.get<Employee[]>(this.baseUrl + 'employee/');
  }

  getEmployeeById(id: number) {
    return this.httpClient.get<Employee>(this.baseUrl + 'employee/' + id);
  }

  postEmployee() {
    let employee: Employee;
    employee = {
      id: 1,
      firstName: this.formOneData.firstName,
      lastName: this.formOneData.lastName,
      dob: this.formOneData.dob.toString(),
      address: this.formOneData.address,
      bloodGroup: this.formOneData.bloodGroup,
      divisionName: this.formTwoData.divisionName,
      role: this.formTwoData.role,
      experience: this.formTwoData.experience,
      gender: this.formOneData.gender,
      email: this.formOneData.email,
      phoneNumber: this.formOneData.phoneNumber,
      emergencyNumber: this.formOneData.emergencyNumber,
      maritalStatus: this.formOneData.maritalStatus,
      linkedinUrl: this.formTwoData.linkedinUrl,
      twitterUrl: this.formTwoData.twitterUrl,
      active: true
    }

    return this.httpClient.post(this.baseUrl + 'employee/', employee);
  }

  deleteEmployee(empId: Number) {
    return this.httpClient.delete(this.baseUrl + 'employee/' + empId)
  }

  deleteEmployees(empIds: Number[]) {
    return this.httpClient.delete(this.baseUrl + 'employee', {
      body: empIds
    })
  }

  putEmployee(id: number, employee: Employee) {
    return this.httpClient.put(this.baseUrl + "employee/" + id, employee);
  }
  successDelete() {
    this.deleteStatus.next(true);
  }

}
