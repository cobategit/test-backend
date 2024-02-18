import MEmployeeEducationE from "../../data/models/pg/employee_education";
import { EmployeeEducationE } from "../entity";
import { ResponseDataE } from "../entity/global";
import { IEmployeeEducationRepo } from "../interfaces";

export class EmployeeEducationRepo implements IEmployeeEducationRepo {
    async create(data?: EmployeeEducationE | undefined): Promise<MEmployeeEducationE> {
        const result = await MEmployeeEducationE.create(data)

        return result
    }
    async findAll(wheres?: Map<string, any> | undefined, limit?: number, offset?: number): Promise<Pick<ResponseDataE<MEmployeeEducationE[]>, "rows" | "count">> {
        const result = await MEmployeeEducationE.findAndCountAll({
            where: wheres!.get('where'),
            limit: limit,
            offset: offset,
            order: [['created_at', 'ASC']],
            logging: console.log
        })

        return result
    }
    async findOne(wheres?: Map<string, any> | undefined): Promise<MEmployeeEducationE | null> {
        const result = await MEmployeeEducationE.findOne({
            where: wheres!.get('where')
        })

        return result ?? null
    }
    async update(map: Map<string, any>): Promise<any> {
        const result = await MEmployeeEducationE.update(map.get('update')!, {
            where: map.get('where')!
        })

        return result
    }
    async delete(map: Map<string, any>): Promise<any> {
        const result = await MEmployeeEducationE.destroy({
            where: map.get('where')!
        })

        return result
    }
    
}