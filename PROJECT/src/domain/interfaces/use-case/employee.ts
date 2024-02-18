import MEmployee from "../../../data/models/pg/employee"
import { PaginationData } from "../../../external"
import { EmployeeE, PaginationE } from "../../entity"


export interface ICreateEmployeeUseCase {
  execute(employee: EmployeeE): Promise<MEmployee>
}

export interface IListEmployeeUseCase {
  execute(paginate: PaginationE, search?: string): Promise<PaginationData>
}

export interface IReportEmployeeUseCase {
  execute(paginate: PaginationE, search?: string): Promise<PaginationData>
}

export interface IDetailEmployeeUseCase {
  execute(id: number): Promise<MEmployee | null>
}

export interface IUpdateEmployeeUseCase {
  execute(id: number, data: EmployeeE): Promise<any>
}

export interface IDeleteEmployeeUseCase {
  execute(id: number): Promise<any>
}
