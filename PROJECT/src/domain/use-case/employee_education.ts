import { Op } from "sequelize"
import { PaginationData } from "../../external"
import { EmployeeEducationE, PaginationE } from "../entity"
import { ICreateEmployeeEducationUseCase, IDeleteEmployeeEducationUseCase, IDetailEmployeeEducationUseCase, IEmployeeEducationRepo, IListEmployeeEducationUseCase, IUpdateEmployeeEducationUseCase } from "../interfaces"
import MEmployeeEducationE from "../../data/models/pg/employee_education"

export class ListEmployeeEducationUseCase implements IListEmployeeEducationUseCase {
    constructor(private readonly employeeRepo: IEmployeeEducationRepo) { }

    async execute(paginate: PaginationE, search?: string | undefined): Promise<PaginationData> {
        const mapWhere: Map<string, any> = new Map<string, any>()

        if (search) {
            mapWhere.set('where', {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { level: { [Op.like]: `%${search}%` } }
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

export class DetailEmployeeEducationUseCase implements IDetailEmployeeEducationUseCase {
    constructor(private readonly employeeRepo: IEmployeeEducationRepo) { }

    async execute(id: number): Promise<MEmployeeEducationE | null> {
        const mapWhere: Map<string, any> = new Map<string, any>()

        mapWhere.set('where', {
            id: id
        })
        const result = await this.employeeRepo.findOne(mapWhere)

        return result
    }
}

export class CreateEmployeeEducationUseCase implements ICreateEmployeeEducationUseCase {
    constructor(private readonly employeeRepo: IEmployeeEducationRepo) { }

    async execute(data: EmployeeEducationE): Promise<MEmployeeEducationE> {
        data.created_at = new Date()
        data.updated_at = new Date()
        const res: MEmployeeEducationE = await this.employeeRepo.create(data)

        return res
    }
}

export class UpdateEmployeeEducationUseCase implements IUpdateEmployeeEducationUseCase {
    constructor(private readonly employeeRepo: IEmployeeEducationRepo) { }

    async execute(id: number, data: EmployeeEducationE): Promise<any> {
        const mapData: Map<string, any> = new Map<string, any>()

        mapData.set('where', {
            id: id
        })

        mapData.set('update', {
            ...data,
            update_by: data?.updated_by,
            update_at: new Date()
        })

        const update = await this.employeeRepo.update(mapData)

        return update
    }
}

export class DeleteEmployeeEducationUseCase implements IDeleteEmployeeEducationUseCase {
    constructor(private readonly employeeRepo: IEmployeeEducationRepo) { }

    async execute(id: number): Promise<any> {
        const mapData: Map<string, any> = new Map<string, any>()

        mapData.set('where', {
            id: id
        })

        const deleted = await this.employeeRepo.delete(mapData)

        return deleted
    }
}