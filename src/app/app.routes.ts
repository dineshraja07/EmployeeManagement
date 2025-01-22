import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as DashBoardRoutes } from './dashboard/dashboard.routes';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: DashBoardRoutes,
        title: 'Dashboard'
    },
    {
        path: '**',
        redirectTo: 'not-found'
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        title: 'Not Found'
    }
];
