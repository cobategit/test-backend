import MEmployeeProfileE from "../../data/models/pg/employee_profile";
import { EmployeeProfileE } from "../entity";
import { ResponseDataE } from "../entity/global";
import { IEmployeeProfileRepo } from "../interfaces";

export class EmployeeProfileRepo implements IEmployeeProfileRepo {
    async create(data?: EmployeeProfileE | undefined): Promise<MEmployeeProfileE> {
        const result = await MEmployeeProfileE.create(data)

        return result
    }
    async findAll(wheres?: Map<string, any> | undefined, limit?: number, offset?: number): Promise<Pick<ResponseDataE<MEmployeeProfileE[]>, "rows" | "count">> {
        const result = await MEmployeeProfileE.findAndCountAll({
            where: wheres!.get('where'),
            limit: limit,
            offset: offset,
            order: [['created_at', 'ASC']],
            logging: console.log
        })

        return result
    }
    async findOne(wheres?: Map<string, any> | undefined): Promise<MEmployeeProfileE | null> {
        const result = await MEmployeeProfileE.findOne({
            where: wheres!.get('where')
        })

        return result ?? null
    }
    async update(map: Map<string, any>): Promise<any> {
        const result = await MEmployeeProfileE.update(map.get('update')!, {
            where: map.get('where')!
        })

        return result
    }
    async delete(map: Map<string, any>): Promise<any> {
        const result = await MEmployeeProfileE.destroy({
            where: map.get('where')!
        })

        return result
    }
    
}