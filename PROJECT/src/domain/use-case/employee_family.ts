import { Op } from "sequelize"
import { PaginationData } from "../../external"
import { EmployeeFamilyE, PaginationE } from "../entity"
import { ICreateEmployeeFamilyUseCase, IDeleteEmployeeFamilyUseCase, IDetailEmployeeFamilyUseCase, IEmployeeFamilyRepo, IListEmployeeFamilyUseCase, IUpdateEmployeeFamilyUseCase } from "../interfaces"
import MEmployeeFamilyE from "../../data/models/pg/employee_family"

export class ListEmployeeFamilyUseCase implements IListEmployeeFamilyUseCase {
    constructor(private readonly employeeRepo: IEmployeeFamilyRepo) { }

    async execute(paginate: PaginationE, search?: string | undefined): Promise<PaginationData> {
        const mapWhere: Map<string, any> = new Map<string, any>()

        if(search){
            mapWhere.set('where', {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { identifier: { [Op.like]: `%${search}%` } },
                    { job: { [Op.like]: `%${search}%` } },
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

export class DetailEmployeeFamilyUseCase implements IDetailEmployeeFamilyUseCase {
    constructor(private readonly employeeRepo: IEmployeeFamilyRepo) { }

    async execute(id: number): Promise<MEmployeeFamilyE | null> {
        const mapWhere: Map<string, any> = new Map<string, any>()

        mapWhere.set('where', {
            id: id
        })
        const result = await this.employeeRepo.findOne(mapWhere)

        return result
    }
}

export class CreateEmployeeFamilyUseCase implements ICreateEmployeeFamilyUseCase {
    constructor(private readonly employeeRepo: IEmployeeFamilyRepo) { }

    async execute(data: EmployeeFamilyE): Promise<MEmployeeFamilyE> {
        data.created_at = new Date()
        data.updated_at = new Date()
        const res: MEmployeeFamilyE = await this.employeeRepo.create(data)

        return res
    }
}

export class UpdateEmployeeFamilyUseCase implements IUpdateEmployeeFamilyUseCase {
    constructor(private readonly employeeRepo: IEmployeeFamilyRepo) { }

    async execute(id: number, data: EmployeeFamilyE): Promise<any> {
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

export class DeleteEmployeeFamilyUseCase implements IDeleteEmployeeFamilyUseCase {
    constructor(private readonly employeeRepo: IEmployeeFamilyRepo) { }

    async execute(id: number): Promise<any> {
        const mapData: Map<string, any> = new Map<string, any>()

        mapData.set('where', {
            id: id
        })

        const deleted = await this.employeeRepo.delete(mapData)

        return deleted
    }
}