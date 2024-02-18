import express from 'express'
import { BaseController } from "./base_controller";
import { ListEmployeeEducationUseCase, EmployeeEducationRepo, CreateEmployeeEducationUseCase, DetailEmployeeEducationUseCase, UpdateEmployeeEducationUseCase, DeleteEmployeeEducationUseCase } from '../../domain';
import { ListEmployeeEducationHandler, CreateEmployeeEducationHandler, DetailEmployeeEducationHandler, UpdateEmployeeEducationHandler, DeleteEmployeeEducationHandler } from '../handlers/employee_education';

const app = express.Router()

class EmployeeEducationController {
    public routes = (): express.Router => {
        app.route("/employee-education").get(ListEmployeeEducationHandler(new ListEmployeeEducationUseCase(new EmployeeEducationRepo()))).post(CreateEmployeeEducationHandler(new CreateEmployeeEducationUseCase(new EmployeeEducationRepo())));
        app.route("/employee-education/:id").get(DetailEmployeeEducationHandler(new DetailEmployeeEducationUseCase(new EmployeeEducationRepo()))).patch(UpdateEmployeeEducationHandler(new UpdateEmployeeEducationUseCase(new EmployeeEducationRepo()))).delete(DeleteEmployeeEducationHandler(new DeleteEmployeeEducationUseCase(new EmployeeEducationRepo)));

        return app;
    }
}

export default new EmployeeEducationController().routes()