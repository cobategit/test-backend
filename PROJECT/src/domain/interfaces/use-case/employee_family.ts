import MEmployeeFamilyE from "../../../data/models/pg/employee_family"
import { PaginationData } from "../../../external"
import { EmployeeFamilyE, PaginationE } from "../../entity"


export interface ICreateEmployeeFamilyUseCase {
  execute(employee_family: EmployeeFamilyE): Promise<MEmployeeFamilyE>
}

export interface IListEmployeeFamilyUseCase {
  execute(paginate: PaginationE, search?: string): Promise<PaginationData>
}

export interface IDetailEmployeeFamilyUseCase {
  execute(id: number): Promise<EmployeeFamilyE | null>
}

export interface IUpdateEmployeeFamilyUseCase {
  execute(id: number, data: EmployeeFamilyE): Promise<any>
}

export interface IDeleteEmployeeFamilyUseCase {
  execute(id: number): Promise<any>
}
