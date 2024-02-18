import { NextFunction, Request, Response } from "express"
import { ErrorE, ICreateEmployeeProfileUseCase, IDeleteEmployeeProfileUseCase, IDetailEmployeeProfileUseCase, IListEmployeeProfileUseCase, IUpdateEmployeeProfileUseCase, PaginationE } from "../../domain"
import { Api, AppErrorV1, AppLoggerV1, ManualPagination } from "../../external"

export function ListEmployeeProfileHandler(listEmployeeProfileUseCase: IListEmployeeProfileUseCase) {
    const handler = async (request: Request, reply: Response, next: any) => {
        const { page, per_page, search } = request.query

        try {
            const paginateE: PaginationE = ManualPagination.generatePaginationRequest(
                page,
                per_page,
                request.protocol +
                "://" +
                request.hostname +
                request.url
            )

            const employee = await listEmployeeProfileUseCase.execute(paginateE, search as string)

            AppLoggerV1.info('employee-list', {})
            return Api.ok(request, reply, {
                success: true,
                message: 'Data employee tersedia',
                data: employee
            })
        } catch (error) {
            const e: ErrorE = error as ErrorE
            AppLoggerV1.warn('employee-detail', { error })
            next(new AppErrorV1(
                e.statusCode ?? `500`,
                false,
                `${e.message}`,
                '001'
            ))
        }
    }

    return handler
}

export function DetailEmployeeProfileHandler(detailemployeeProfileUseCase: IDetailEmployeeProfileUseCase) {
    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        try {
            const detailData = await detailemployeeProfileUseCase.execute(parseInt(request.params.id))

            AppLoggerV1.info('employee-detail', { detailData })
            return Api.ok(request, reply, {
                success: true,
                message: 'Data employee tersedia',
                data: detailData
            })
        } catch (error) {
            const e: ErrorE = error as ErrorE
            AppLoggerV1.warn('employee-detail', { error })
            next(new AppErrorV1(
                e.statusCode ?? `500`,
                false,
                `${e.message}`,
                '001'
            ))
        }
    }

    return handler
}

export function CreateEmployeeProfileHandler(createemployeeProfileUseCase: ICreateEmployeeProfileUseCase) {
    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        try {
            const created = await createemployeeProfileUseCase.execute(request.body)

            AppLoggerV1.info('employee', { created })
            return Api.created(request, reply, {
                success: true,
                message: 'Data employee berhasil di created',
                data: created
            })
        } catch (error) {
            const e: ErrorE = error as ErrorE
            AppLoggerV1.warn('employee', { error })
            next(new AppErrorV1(
                e.statusCode ?? `500`,
                false,
                `${e.message}`,
                '001'
            ))
        }
    }

    return handler
}

export function UpdateEmployeeProfileHandler(useCase: IUpdateEmployeeProfileUseCase) {

    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        try {
            const updated = await useCase.execute(parseInt(request.params.id), request.body)

            AppLoggerV1.info('employee', { updated })
            return Api.created(request, reply, {
                success: true,
                message: 'Data employee berhasil di updated',
                data: updated
            })
        } catch (error) {
            const e: ErrorE = error as ErrorE
            AppLoggerV1.warn('employee', { error })
            next(new AppErrorV1(
                e.statusCode ?? `500`,
                false,
                `${e.message}`,
                '001'
            ))
        }
    }

    return handler
}

export function DeleteEmployeeProfileHandler(DeleteEmployeeUseCase: IDeleteEmployeeProfileUseCase) {
    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        try {
            const deleted = await DeleteEmployeeUseCase.execute(parseInt(request.params.id))

            AppLoggerV1.info('employee', { deleted })
            return Api.created(request, reply, {
                success: true,
                message: 'Data employee berhasil di deleted',
                data: deleted
            })
        } catch (error) {
            const e: ErrorE = error as ErrorE
            AppLoggerV1.warn('employee', { error })
            next(new AppErrorV1(
                e.statusCode ?? `500`,
                false,
                `${e.message}`,
                '001'
            ))
        }
    }

    return handler
}