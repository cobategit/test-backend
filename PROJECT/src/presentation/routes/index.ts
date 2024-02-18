import express from 'express'
import employeeController from '../controllers/employee'
import employeeProfileController from '../controllers/employee_profile'
import employeeEducationController from '../controllers/employee_education'
import employeeFamilyController from '../controllers/employee_family'

const route = express.Router()

route.use(employeeController)
route.use(employeeProfileController)
route.use(employeeEducationController)
route.use(employeeFamilyController)

export default route