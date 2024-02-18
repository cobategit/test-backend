import { Op } from "sequelize";
import { PaginationData } from "../../external";
import { EmployeeE, EmployeeProfileE, PaginationE } from "../entity";
import { ICreateEmployeeProfileUseCase, IDeleteEmployeeProfileUseCase, IDetailEmployeeProfileUseCase, IEmployeeProfileRepo, IListEmployeeProfileUseCase, IUpdateEmployeeProfileUseCase } from "../interfaces";
import MEmployeeProfileE from "../../data/models/pg/employee_profile";

export class ListEmployeeProfileUseCase implements IListEmployeeProfileUseCase {
    constructor(private readonly employeeRepo: IEmployeeProfileRepo) { }

    async execute(paginate: PaginationE, search?: string | undefined): Promise<PaginationData> {
        const mapWhere: Map<string, any> = new Map<string, any>()

        if (search){
            mapWhere.set('where', {
                [Op.or]: [
                    { gender: { [Op.like]: `%${search}%` } },
                    { place_of_birth: { [Op.like]: `%${search}%` } },
                    { date_of_birth: { [Op.like]: `%${search}%` } }
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

export class DetailEmployeeProfileUseCase implements IDetailEmployeeProfileUseCase {
    constructor(private readonly employeeRepo: IEmployeeProfileRepo) { }

    async execute(id: number): Promise<MEmployeeProfileE | null> {
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

export class CreateEmployeeProfileUseCase implements ICreateEmployeeProfileUseCase {
    constructor(private readonly employeeRepo: IEmployeeProfileRepo) { }

    async execute(data: EmployeeE): Promise<MEmployeeProfileE> {
        data.created_at = new Date()
        data.updated_at = new Date()
        const res: MEmployeeProfileE = await this.employeeRepo.create(data)

        return res
    }
}

export class UpdateEmployeeProfileUseCase implements IUpdateEmployeeProfileUseCase {
    constructor(private readonly employeeRepo: IEmployeeProfileRepo) { }

    async execute(id: number, data: EmployeeProfileE): Promise<any> {
        const mapData: Map<string, any> = new Map<string, any>()

        mapData.set('where', {
            id: id
        })

        mapData.set('update', {
            ...data,
            update_by: data?.updated_by,
            update_at: new Date()
        })

        const existData = await this.employeeRepo.findOne(mapData)
        if (!existData) {
            throw new Error(`Data employee id: ${id} tidak ada`)
        }

        const update = await this.employeeRepo.update(mapData)

        return update
    }
}

export class DeleteEmployeeProfileUseCase implements IDeleteEmployeeProfileUseCase {
    constructor(private readonly employeeRepo: IEmployeeProfileRepo) { }

    async execute(id: number): Promise<any> {
        const mapData: Map<string, any> = new Map<string, any>()

        mapData.set('where', {
            id: id
        })

        const existData = await this.employeeRepo.findOne(mapData)
        if (!existData) {
            throw new Error(`Data employee id: ${id} tidak ada`)
        }

        const deleted = await this.employeeRepo.delete(mapData)

        return deleted
    }
}