import MEmployee from "../../../data/models/pg/employee";
import { EmployeeE } from "../../entity";
import { ResponseDataE } from "../../entity/global";

export interface IEmployeeRepo {
    create(data?: EmployeeE): Promise<MEmployee>
    findAll(wheres?: Map<string, any>, limit?: number, offset?: number): Promise<Pick<ResponseDataE<MEmployee[]>, 'rows' |'count'>>
    findOne(wheres?: Map<string, any>): Promise<MEmployee | null>
    update(map: Map<string, any>): Promise<any>
    delete(map: Map<string, any>): Promise<any>
}