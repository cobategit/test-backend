import express from 'express'
import { BaseController } from "./base_controller";
import { CreateEmployeeProfileHandler, DeleteEmployeeProfileHandler, DetailEmployeeProfileHandler, ListEmployeeProfileHandler, UpdateEmployeeProfileHandler } from '../handlers/employee_profile';
import { CreateEmployeeProfileUseCase, DeleteEmployeeProfileUseCase, DetailEmployeeProfileUseCase, EmployeeProfileRepo, ListEmployeeProfileUseCase, UpdateEmployeeProfileUseCase } from '../../domain';

const app = express.Router()

class EmployeeProfileController {
    public routes = (): express.Router => {
        app.route("/employee-profile").get(ListEmployeeProfileHandler(new ListEmployeeProfileUseCase(new EmployeeProfileRepo()))).post(CreateEmployeeProfileHandler(new CreateEmployeeProfileUseCase(new EmployeeProfileRepo())));
        app.route("/employee-profile/:id").get(DetailEmployeeProfileHandler(new DetailEmployeeProfileUseCase(new EmployeeProfileRepo()))).patch(UpdateEmployeeProfileHandler(new UpdateEmployeeProfileUseCase(new EmployeeProfileRepo()))).delete(DeleteEmployeeProfileHandler(new DeleteEmployeeProfileUseCase(new EmployeeProfileRepo)));

        return app;
    }
}

export default new EmployeeProfileController().routes()