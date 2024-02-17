import MEmployee from "../../data/models/pg/employee";
import MEmployeeEducationE from "../../data/models/pg/employee_education";
import MEmployeeFamilyE from "../../data/models/pg/employee_family";
import MEmployeeProfileE from "../../data/models/pg/employee_profile";
import { EmployeeE } from "../entity";
import { PaginationE, ResponseDataE } from "../entity/global";
import { IEmployeeRepo } from "../interfaces";

export class EmployeeRepo implements IEmployeeRepo {
    async create(data?: EmployeeE | undefined): Promise<MEmployee> {
        const result = await MEmployee.create(data)

        return result
    }
    async findAll(wheres?: Map<string, any> | undefined, paginate?: PaginationE | undefined): Promise<Pick<ResponseDataE<MEmployee[]>, "rows" | "count">> {
        const result = await MEmployee.findAndCountAll({
            where: wheres!.get('where'),
            limit: paginate?.per_page,
            offset: paginate?.page,
            order: [['created_at', 'ASC']],
            logging: console.log
        })

        return result
    }
    async findOne(wheres?: Map<string, any> | undefined): Promise<MEmployee | null> {
        const result = await MEmployee.findOne({
            where: wheres!.get('where'),
            include: [
                {
                    model: MEmployeeProfileE,
                    required: true,
                },
                {
                    model: MEmployeeEducationE,
                    required: true,
                },
                {
                    model: MEmployeeFamilyE,
                    required: true,
                }
            ]
        })

        return result ?? null
    }
    async update(map: Map<string, any>): Promise<any> {
        const result = await MEmployee.update(map.get('update')!, {
            where: map.get('where')!
        })

        return result
    }
    async delete(map: Map<string, any>): Promise<any> {
        const result = await MEmployee.destroy({
            where: map.get('where')!
        })

        return result
    }
    
}