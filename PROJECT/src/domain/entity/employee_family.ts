export type EmployeeFamilyE = {
    id?: number,
    employee_id?: number,
    name?: string,
    identifier?: string,
    job?: string,
    place_of_birth?: string,
    date_of_birth?: Date,
    religion?: Religion,
    is_life?: boolean,
    is_divorced?: boolean,
    relation_status?: RelationStatus,
    created_by?: string,
    updated_by?: string,
    created_at?: Date,
    updated_at?: Date
}

export enum Religion {
    islam = "Islam",
    kristen = "Kristen",
    buda = "Budha",
    Pros = "Protestan",
    Kong = "Konghucu"
}

export enum RelationStatus {
    su = "Suami",
    nak = "Anak",
    is = "Istri",
    nakbung = "Anak Sambung"
}