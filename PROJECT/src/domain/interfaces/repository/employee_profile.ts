import MEmployeeProfileE from "../../../data/models/pg/employee_profile";
import { EmployeeProfileE } from "../../entity";
import { PaginationE, ResponseDataE } from "../../entity/global";

export interface IEmployeeProfileRepo {
    create(data?: EmployeeProfileE): Promise<MEmployeeProfileE>
    findAll(wheres?: Map<string, any>, paginate?: PaginationE): Promise<Pick<ResponseDataE<MEmployeeProfileE[]>, 'rows' |'count'>>
    findOne(wheres?: Map<string, any>): Promise<MEmployeeProfileE | null>
    update(map: Map<string, any>): Promise<any>
    delete(map: Map<string, any>): Promise<any>
}