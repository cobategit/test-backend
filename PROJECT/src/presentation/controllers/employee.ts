import express from 'express'
import { CreateEmployeeHandler, DeleteEmployeeHandler, DetailEmployeeHandler, ListEmployeeHandler, ReportEmployeeHandler, UpdateEmployeeHandler } from '../handlers';
import { CreateEmployeeUseCase, DeleteEmployeeUseCase, DetailEmployeeUseCase, EmployeeFamilyRepo, EmployeeRepo, ListEmployeeUseCase, ReportEmployeeUseCase, UpdateEmployeeUseCase } from '../../domain';

const app = express.Router()

class EmployeeController {
    public routes = (): express.Router => {
        app.route("/employee").get(ListEmployeeHandler(new ListEmployeeUseCase(new EmployeeRepo()))).post(CreateEmployeeHandler(new CreateEmployeeUseCase(new EmployeeRepo())));
        app.route("/employee/:id").get(DetailEmployeeHandler(new DetailEmployeeUseCase(new EmployeeRepo()))).patch(UpdateEmployeeHandler(new UpdateEmployeeUseCase(new EmployeeRepo()))).delete(DeleteEmployeeHandler(new DeleteEmployeeUseCase(new EmployeeRepo)));
        app.route("/report-employee").get(ReportEmployeeHandler(new ReportEmployeeUseCase(new EmployeeRepo(), new EmployeeFamilyRepo)))

        return app;
    }
}

export default new EmployeeController().routes()