

export class AddEmployee {
    static readonly type = '[Employee] Add'
    constructor (public payload: any) {}
}
export class AddEmployeeSkils {
    static readonly type = '[Employee] Skill'
    constructor (public payload: any) {}
}
export class GetEmployee {
    static readonly type = '[Employee] Get'
    constructor (public payload: any) {}
}