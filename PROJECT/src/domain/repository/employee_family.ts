import MEmployeeFamilyE from "../../data/models/pg/employee_family";
import { EmployeeFamilyE } from "../entity";
import { PaginationE, ResponseDataE } from "../entity/global";
import { IEmployeeFamilyRepo } from "../interfaces";

export class EmployeeFamilyRepo implements IEmployeeFamilyRepo {
    async create(data?: EmployeeFamilyE | undefined): Promise<MEmployeeFamilyE> {
        const result = await MEmployeeFamilyE.create(data)

        return result
    }
    async findAll(wheres?: Map<string, any> | undefined, paginate?: PaginationE | undefined): Promise<Pick<ResponseDataE<MEmployeeFamilyE[]>, "rows" | "count">> {
        const result = await MEmployeeFamilyE.findAndCountAll({
            where: wheres!.get('where'),
            limit: paginate?.per_page,
            offset: paginate?.page,
            order: [['created_at', 'ASC']],
            logging: console.log
        })

        return result
    }
    async findOne(wheres?: Map<string, any> | undefined): Promise<MEmployeeFamilyE | null> {
        const result = await MEmployeeFamilyE.findOne({
            where: wheres!.get('where')
        })

        return result ?? null
    }
    async update(map: Map<string, any>): Promise<any> {
        const result = await MEmployeeFamilyE.update(map.get('update')!, {
            where: map.get('where')!
        })

        return result
    }
    async delete(map: Map<string, any>): Promise<any> {
        const result = await MEmployeeFamilyE.destroy({
            where: map.get('where')!
        })

        return result
    }
    
}