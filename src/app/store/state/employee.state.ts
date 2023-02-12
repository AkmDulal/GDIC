import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddEmployee, AddEmployeeSkils } from '../actions/employee.action';
export interface EmployeeModel {
    SetEmployee: any[],
    AddEmployeeSkil: any[]
}
@State<EmployeeModel>({
    name: "Employee",
    defaults: {
        SetEmployee: [],
        AddEmployeeSkil: []
    }
})
@Injectable()
export class EmployeeState {
    @Selector()
    static getEmployySelector(state: EmployeeModel): any {
        return state.SetEmployee
    }
    @Selector()
    static getEmployySkillSelector(state: EmployeeModel): any {
        return state.AddEmployeeSkil
    }

    @Action(AddEmployee)
    getEmployyAction(ctx:StateContext<EmployeeModel>, action: AddEmployee){
        const state = ctx.getState();
        ctx.setState({
            ...state,
            SetEmployee: [
                action.payload
            ]
        })
    }

    @Action(AddEmployeeSkils)
    getSkillEmployyAction(ctx:StateContext<EmployeeModel>, action: AddEmployeeSkils){
        const state = ctx.getState();
        ctx.setState({
            ...state,
            AddEmployeeSkil: [
                action.payload
            ]
        })
    }
}

