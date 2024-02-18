import MEmployeeProfileE from "../../../data/models/pg/employee_profile"
import { PaginationData } from "../../../external"
import { EmployeeProfileE, PaginationE } from "../../entity"


export interface ICreateEmployeeProfileUseCase {
  execute(employee_profile: EmployeeProfileE): Promise<MEmployeeProfileE>
}

export interface IListEmployeeProfileUseCase {
  execute(paginate: PaginationE, search?: string): Promise<PaginationData>
}

export interface IDetailEmployeeProfileUseCase {
  execute(id: number): Promise<EmployeeProfileE | null>
}

export interface IUpdateEmployeeProfileUseCase {
  execute(id: number, data: EmployeeProfileE): Promise<any>
}

export interface IDeleteEmployeeProfileUseCase {
  execute(id: number): Promise<any>
}
