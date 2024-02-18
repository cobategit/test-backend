import express from 'express'
import { BaseController } from "./base_controller";
import { CreateEmployeeFamilyHandler, DeleteEmployeeFamilyHandler, DetailEmployeeFamilyHandler, ListEmployeeFamilyHandler, UpdateEmployeeFamilyHandler } from '../handlers/employee_family';
import { CreateEmployeeFamilyUseCase, DeleteEmployeeFamilyUseCase, DetailEmployeeFamilyUseCase, EmployeeFamilyRepo, ListEmployeeFamilyUseCase, UpdateEmployeeFamilyUseCase } from '../../domain';

const app = express.Router()

class EmployeeFamilyController {
    public routes = (): express.Router => {
        app.route("/employee-family").get(ListEmployeeFamilyHandler(new ListEmployeeFamilyUseCase(new EmployeeFamilyRepo()))).post(CreateEmployeeFamilyHandler(new CreateEmployeeFamilyUseCase(new EmployeeFamilyRepo())));
        app.route("/employee-family/:id").get(DetailEmployeeFamilyHandler(new DetailEmployeeFamilyUseCase(new EmployeeFamilyRepo()))).patch(UpdateEmployeeFamilyHandler(new UpdateEmployeeFamilyUseCase(new EmployeeFamilyRepo()))).delete(DeleteEmployeeFamilyHandler(new DeleteEmployeeFamilyUseCase(new EmployeeFamilyRepo)));

        return app;
    }
}

export default new EmployeeFamilyController().routes()