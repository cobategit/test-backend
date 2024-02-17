import MEmployeeFamilyE from "../../../data/models/pg/employee_family";
import {  EmployeeFamilyE } from "../../entity";
import { PaginationE, ResponseDataE } from "../../entity/global";

export interface IEmployeeFamilyRepo {
    create(data?: EmployeeFamilyE): Promise<MEmployeeFamilyE>
    findAll(wheres?: Map<string, any>, paginate?: PaginationE): Promise<Pick<ResponseDataE<MEmployeeFamilyE[]>, 'rows' |'count'>>
    findOne(wheres?: Map<string, any>): Promise<MEmployeeFamilyE | null>
    update(map: Map<string, any>): Promise<any>
    delete(map: Map<string, any>): Promise<any>
}