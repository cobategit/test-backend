import { NextFunction, Request, Response } from "express"
import { ErrorE, ICreateEmployeeUseCase, IDeleteEmployeeUseCase, IDetailEmployeeUseCase, IListEmployeeUseCase, IReportEmployeeUseCase, IUpdateEmployeeUseCase, PaginationE } from "../../domain"
import { Api, AppErrorV1, AppLoggerV1, ManualPagination } from "../../external"
import { BaseController } from "../controllers/base_controller"

export function ListEmployeeHandler(listEmployeeUseCase: IListEmployeeUseCase) {
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

            const employee = await listEmployeeUseCase.execute(paginateE, search as string)

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

export function ReportEmployeeHandler(reportEmployeeUseCase: IReportEmployeeUseCase) {
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

            const employee = await reportEmployeeUseCase.execute(paginateE, search as string)

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
export function DetailEmployeeHandler(detailemployeeUseCase: IDetailEmployeeUseCase) {
    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        BaseController.requestValidator(request)
        try {
            const detailData = await detailemployeeUseCase.execute(parseInt(request.params.id))

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

export function CreateEmployeeHandler(createemployeeUseCase: ICreateEmployeeUseCase) {
    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        BaseController.requestValidator(request)
        try {
            const created = await createemployeeUseCase.execute(request.body)

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

export function UpdateEmployeeHandler(updateemployeeUseCase: IUpdateEmployeeUseCase) {
    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        BaseController.requestValidator(request)
        try {
            const updated = await updateemployeeUseCase.execute(parseInt(request.params.id), request.body)

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

export function DeleteEmployeeHandler(DeleteEmployeeUseCase: IDeleteEmployeeUseCase) {
    const handler = async (request: Request, reply: Response, next: NextFunction) => {
        BaseController.requestValidator(request)
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