import MEmployee from "../../data/models/pg/employee";
import MEmployeeEducationE from "../../data/models/pg/employee_education";
import MEmployeeFamilyE from "../../data/models/pg/employee_family";
import MEmployeeProfileE from "../../data/models/pg/employee_profile";
import { EmployeeE } from "../entity";
import { ResponseDataE } from "../entity/global";
import { IEmployeeRepo } from "../interfaces";

export class EmployeeRepo implements IEmployeeRepo {
    async create(data?: EmployeeE | undefined): Promise<MEmployee> {
        const result = await MEmployee.create(data)

        return result
    }
    async findAll(wheres?: Map<string, any> | undefined, limit?: number, offset?: number): Promise<Pick<ResponseDataE<MEmployee[]>, "rows" | "count">> {
        const result = await MEmployee.findAll({
            include: [
                {
                    model: MEmployeeProfileE,
                    attributes: ['place_of_birth','date_of_birth','gender','is_married'],
                },
                {
                    model: MEmployeeEducationE,
                    attributes: ['name','level'],
                },
                {
                    model: MEmployeeFamilyE,
                    attributes: ['name','relation_status']
                }
            ],
            where: wheres!.get('where'),
            limit: limit,
            offset: offset,
            order: [['created_at', 'ASC']],
            logging: true
        })

        return {
            rows: result,
            count: result.length
        }
    }
    async findOne(wheres?: Map<string, any> | undefined): Promise<MEmployee | null> {
        const result = await MEmployee.findOne({
            where: wheres!.get('where'),
            include: [
                {
                    model: MEmployeeProfileE,
                    attributes: ['place_of_birth','date_of_birth','gender','is_married'],
                },
                {
                    model: MEmployeeEducationE,
                    attributes: ['name','level'],
                },
                {
                    model: MEmployeeFamilyE,
                    attributes: ['name','relation_status'],
                }
            ],
            logging: true
        })

        return result ?? null
    }
    async update(map: Map<string, any>): Promise<any> {
        const result = await MEmployee.update(map.get('update')!, {
            where: map.get('where')!,
            logging: true
        })

        return result
    }
    async delete(map: Map<string, any>): Promise<any> {
        const result = await MEmployee.destroy({
            where: map.get('where')!,
            logging: true
        })

        return result
    }
    
}