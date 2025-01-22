import { Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";

export const routes: Routes = [
    {
        path: ':id/details',
        component: EmployeeComponent
    },
    {
        path: '**',
        redirectTo: '../not-found'
    }
]