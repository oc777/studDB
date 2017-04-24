import { EmployeeModel, FacultyModel, CouncilModel, UserModel } from '../model/model';
import { createEmployees } from '../model/employee';
import {createFaculties} from '../model/faculty';
import {createUsers} from '../model/user';

export function findAllEmployees() {
    return EmployeeModel.findAll()
        .then(createEmployees)
}

export function findAllFaculties() {
    return FacultyModel.findAll({
        include: [
            {
                model: CouncilModel
            }
        ]
    })
        .then(createFaculties)
}

export function findAllUsers() {
    return UserModel.findAll()
        .then(createUsers)
}