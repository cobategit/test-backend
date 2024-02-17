export type EmployeeProfileE = {
    id?: number,
    employee_id?: number,
    place_of_birth?: string,
    date_of_birth?: Date,
    gender?: Gender,
    is_married?: boolean,
    prof_pict?: string,
    created_by?: string,
    updated_by?: string,
    created_at?: Date,
    updated_at?: Date
}

export enum Gender {
    L = "Laki-Laki",
    P = "Perempuan" 
}