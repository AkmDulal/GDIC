import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { RouteResolver } from '../../service/route.resolver';
const routes: Routes = [
  {
    path: 'employee-list',
    component: EmployeelistComponent,
    canActivate:[AuthGuard],
    resolve: {results: RouteResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
