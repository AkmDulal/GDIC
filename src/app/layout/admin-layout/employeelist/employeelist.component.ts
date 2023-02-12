import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AddEmployee, AddEmployeeSkils } from '../../../store/actions/employee.action';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../service/data.service';
import { CommonService } from '../../../service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeState } from 'src/app/store/state/employee.state';
import { DatePipe } from '@angular/common';

export interface DialogData {
  id: number;
  status: any;
  save_type: string;

}

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent {
  public clickCount: number = 0;
  public datalists: any = []



  constructor(public dialog: MatDialog, private dataService: DataService, private common: CommonService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataReacive()
    this.common.aClickedEvent.subscribe((data: string) => {
      this.dataReacive();
    });
  }

  dataReacive() {
    this.datalists = this.router.snapshot.data['results']
  }

  createUserDialog() {
    this.clickCount = Number(this.clickCount) + 1;
    if (this.clickCount < 2) {
      const dialogRef = this.dialog.open(EmployeeAdd, {
        width: "900px",
        data: {
          status: 1,
          save_type: 'create'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.clickCount = 0;
      });
    }

  }
}



@Component({
  selector: 'app-user-add-edit',
  templateUrl: './employee-add-edit-dialog.component.html',
  styleUrls: ['./employeelist.component.scss']
})

export class EmployeeAdd implements OnInit {
  public type: string = this.data.save_type;
  public submitButton: boolean = false;
  public cashData: any = [];
  public cashDataShow: any = [];
  
  public cashSkillData: any = [];
  public cashSkillDataShow: any = [];

  firstFormGroup = this._formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    dath_barth: ['', Validators.required],
    phone_number: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    skill_name: ['', Validators.required],
    experience_years: ['', Validators.required],
    skill_level: ['', Validators.required],
  });
  isLinear = false;

  constructor(public dialogRef: MatDialogRef<EmployeeAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _formBuilder: FormBuilder, private common: CommonService, private store: Store) {
  }

  ngOnInit() {
    this.dataGet()
    this.dataSkilGet()
    this.buildLoginForm();
    console.log(typeof (this.cashData), "this.cashData this.cashData")
  }

  buildLoginForm() {
    this.firstFormGroup.setValue({
      first_name: this.cashData.first_name || null,
      last_name: this.cashData.last_name || null,
      dath_barth: this.cashData.dath_barth || null,
      phone_number: this.cashData.phone_number || null,

    })
    this.secondFormGroup.setValue({
      skill_name: this.cashSkillData.skill_name,
      experience_years: this.cashSkillData.experience_years,
      skill_level: this.cashSkillData.skill_level
    })
  }



  @Select(EmployeeState.getEmployySelector) getEmployObj$: Observable<any[]> | undefined
  dataGet() {
    this.getEmployObj$?.subscribe((res: any) => {
      this.cashData = res[0]
      this.cashDataShow = res
    })
  }
  @Select(EmployeeState.getEmployySkillSelector) getSkillEmployObj$: Observable<any[]> | undefined
  dataSkilGet() {
    console.log("dataSkilGet dataSkilGet");
    this.getSkillEmployObj$?.subscribe((res: any) => {
      this.cashSkillData = res[0]
      this.cashSkillDataShow = res
    })
  }
  from1() {
    this.dataGet()
    this.store.dispatch(new AddEmployee(this.firstFormGroup.value))
  }
  from2() {
    this.dataSkilGet()
    this.store.dispatch(new AddEmployeeSkils(this.secondFormGroup.value))
  }

  changeStatus(event: boolean) {
    if (event == true) {
      this.data.status = '1'
    } else {
      this.data.status = '0'
    }
  }

  onsubmit() {
  }
}

