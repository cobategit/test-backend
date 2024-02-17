export type EmployeeEducationE = {
    id?: number,
    employee_id?: number,
    name?: string,
    level?: Level,
    description?: string,
    created_by?: string,
    updated_by?: string,
    created_at?: Date,
    updated_at?: Date
}

export enum Level {
    tk = "TK",
    sd = "SD",
    smp = "SMP",
    sma = "SMA",
    strata1 = "Strata 1",
    strata2 = "Strata 2",
    doktor = "Doktor",
    profesor = "Profesor"
}