import { Op } from "sequelize";
import { Helper, PaginationData } from "../../external";
import { EmployeeE, PaginationE } from "../entity";
import { ICreateEmployeeUseCase, IDeleteEmployeeUseCase, IDetailEmployeeUseCase, IEmployeeFamilyRepo, IEmployeeRepo, IListEmployeeUseCase, IReportEmployeeUseCase, IUpdateEmployeeUseCase } from "../interfaces";
import MEmployee from "../../data/models/pg/employee";

export class ListEmployeeUseCase implements IListEmployeeUseCase {
    constructor(private readonly employeeRepo: IEmployeeRepo) { }

    async execute(paginate: PaginationE, search?: string | undefined): Promise<PaginationData> {
        const mapWhere: Map<string, any> = new Map<string, any>()

        if (search) {
            mapWhere.set('where', {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { nik: { [Op.like]: `%${search}%` } }
                ]
            })
        }

        const offset = (paginate?.page ?? 1) * paginate?.per_page!
        const limit = paginate?.per_page! ?? 10

        const res = await this.employeeRepo.findAll(mapWhere, limit, offset)

        return new PaginationData().getInstance({
            count: res.count,
            rows: res.rows
        },
            paginate!.link!,
            paginate!.page!,
            paginate!.per_page!
        )
    }
}

export class ReportEmployeeUseCase implements IReportEmployeeUseCase {
    constructor(private readonly employeeRepo: IEmployeeRepo, private readonly employeeFamily: IEmployeeFamilyRepo) { }

    async execute(paginate: PaginationE, search?: string | undefined): Promise<PaginationData> {
        const mapWhere: Map<string, any> = new Map<string, any>()
        const mapWhereFamily: Map<string, any> = new Map<string, any>()

        if (search) {
            mapWhere.set('where', {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { nik: { [Op.like]: `%${search}%` } }
                ]
            })
        }

        const offset = (paginate?.page ?? 1) * paginate?.per_page!
        const limit = paginate?.per_page! ?? 10

        const res = await this.employeeRepo.findAll(mapWhere, limit, offset)

        mapWhereFamily.set('where', {
            employee_id: {
                [Op.in]: res.rows!.map(val => val.id)
            }
        })
        const findFamily = await this.employeeFamily.findAll(mapWhere)



        const data = res.rows!.map((val: MEmployee) => {
            let countPasangan: number = 0
            let countAnak: number = 0
            findFamily.rows!.map((val1) => {
                if (val1.employee_id == val.id && (val1.relation_status == "Istri" || val1.relation_status == "Suami")) {
                    countPasangan++
                }
                if (val1.employee_id == val.id && (val1.relation_status == "Anak" || val1.relation_status == "Anak Sambung")) {
                    countAnak++
                }
            })
            return {
                employee_id: val.id,
                nik: val.nik,
                name: val.name,
                is_active: val.is_active,
                gender: val?.employee_profile?.gender ?? '-',
                age: val?.employee_profile?.date_of_birth ? Helper.calculateAge(new Date(val?.employee_profile?.date_of_birth!)) : '-',
                school_name: val?.employee_education?.name ?? '-',
                level: val?.employee_education?.level ?? '-',
                family_data: countAnak == 0 && countPasangan == 0 ? '-' : `${countPasangan} ${val?.employee_profile?.gender == 'Laki-Laki' ? 'Istri' : 'Suami'} & ${countAnak} Anak`
            }
        })

        return new PaginationData().getInstance({
            count: res.count,
            rows: data
        },
            paginate!.link!,
            paginate!.page!,
            paginate!.per_page!
        )
    }
}

export class DetailEmployeeUseCase implements IDetailEmployeeUseCase {
    constructor(private readonly employeeRepo: IEmployeeRepo) { }

    async execute(id: number): Promise<MEmployee | null> {
        const mapWhere: Map<string, any> = new Map<string, any>()

        mapWhere.set('where', {
            id: id
        })

        const result = await this.employeeRepo.findOne(mapWhere)

        if (!result) {
            throw new Error(`Data employee id: ${id} tidak ada`)
        }

        return result

    }
}

export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {
    constructor(private readonly employeeRepo: IEmployeeRepo) { }

    async execute(data: EmployeeE): Promise<MEmployee> {
        const mapWhere: Map<string, any> = new Map<string, any>()
        data.created_at = new Date()
        data.updated_at = new Date()

        mapWhere.set('where', {
            nik: data.nik
        })
        const checkExistEmp = await this.employeeRepo.findOne(mapWhere)

        if (checkExistEmp) {
            throw new Error(`Data nik: ${data.nik} sudah ada`)
        }

        const res: MEmployee = await this.employeeRepo.create(data)

        return res
    }
}

export class UpdateEmployeeUseCase implements IUpdateEmployeeUseCase {
    constructor(private readonly employeeRepo: IEmployeeRepo) { }

    async execute(id: number, data: EmployeeE): Promise<any> {
        const mapData: Map<string, any> = new Map<string, any>()

        mapData.set('where', {
            id: id
        })

        mapData.set('update', {
            ...data,
            update_by: data?.updated_by,
            update_at: new Date()
        })

        const checkExistEmp = await this.employeeRepo.findOne(mapData)

        if (!checkExistEmp) {
            throw new Error(`Data id: ${id} tidak ada`)
        }

        const update = await this.employeeRepo.update(mapData)

        return update
    }
}

export class DeleteEmployeeUseCase implements IDeleteEmployeeUseCase {
    constructor(private readonly employeeRepo: IEmployeeRepo) { }

    async execute(id: number): Promise<any> {
        const mapData: Map<string, any> = new Map<string, any>()

        mapData.set('where', {
            id: id
        })

        const checkExistEmp = await this.employeeRepo.findOne(mapData)

        if (!checkExistEmp) {
            throw new Error(`Data id: ${id} tidak ada`)
        }

        const deleted = await this.employeeRepo.delete(mapData)

        return deleted
    }

}