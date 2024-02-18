import MEmployeeEducationE from "../../../data/models/pg/employee_education"
import { PaginationData } from "../../../external"
import { EmployeeEducationE, PaginationE } from "../../entity"


export interface ICreateEmployeeEducationUseCase {
  execute(employee_family: EmployeeEducationE): Promise<MEmployeeEducationE>
}

export interface IListEmployeeEducationUseCase {
  execute(paginate: PaginationE, search?: string): Promise<PaginationData>
}

export interface IDetailEmployeeEducationUseCase {
  execute(id: number): Promise<EmployeeEducationE | null>
}

export interface IUpdateEmployeeEducationUseCase {
  execute(id: number, data: EmployeeEducationE): Promise<any>
}

export interface IDeleteEmployeeEducationUseCase {
  execute(id: number): Promise<any>
}
