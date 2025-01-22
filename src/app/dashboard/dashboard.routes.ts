import { Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full'
    },
    {
        path: 'employees',
        component: EmployeeListComponent,
        title: 'Employees'
    },
    {
        path: 'employee',
        loadChildren: () => import("./employee/employee/employee.routes").then(mod => mod.routes)
    },
    {
        path: 'new',
        loadComponent: () => import("./employee/new-employee/new-employee.component").then(mod => mod.NewEmployeeComponent),
        title: 'Add Employee'
    },
    {
        path: '**',
        redirectTo: '../not-found',
    }
]