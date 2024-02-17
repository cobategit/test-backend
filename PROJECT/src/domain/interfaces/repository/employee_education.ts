import MEmployeeEducationE from "../../../data/models/pg/employee_education";
import {  EmployeeEducationE } from "../../entity";
import { PaginationE, ResponseDataE } from "../../entity/global";

export interface IEmployeeEducationRepo {
    create(data?: EmployeeEducationE): Promise<MEmployeeEducationE>
    findAll(wheres?: Map<string, any>, paginate?: PaginationE): Promise<Pick<ResponseDataE<MEmployeeEducationE[]>, 'rows' |'count'>>
    findOne(wheres?: Map<string, any>): Promise<MEmployeeEducationE | null>
    update(map: Map<string, any>): Promise<any>
    delete(map: Map<string, any>): Promise<any>
}