import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { EmployeelistComponent, EmployeeAdd } from './employeelist/employeelist.component';
import { DemoNgZorroAntdModule } from '../../modules/ng-zorro-antd.module';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  declarations: [
    EmployeelistComponent,
    EmployeeAdd
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    MaterialModule,
  ]
})
export class AdminLayoutModule { }
