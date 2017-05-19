import {EmployeeModel, FacultyModel, CouncilModel, UserModel, CouncilInstanceModel} from '../model/model';
import { createEmployees } from '../model/Interfaces/employee';
import {createFaculties} from '../model/Interfaces/faculty';
import {createUsers} from '../model/Interfaces/user';

export function findAllEmployees() {
    return EmployeeModel.findAll()
        .then(createEmployees)
}

export function findAllFaculties(show: string) {
    const bool = (show === 'true');

    return FacultyModel.findAll({
        include: [
            {
                model: CouncilModel,
                include: [
                    {
                        model: CouncilInstanceModel,
                        required: bool,
                        where: {
                            from: {
                                $lt: new Date()
                            },
                            till: {
                               $gt: new Date()
                           }
                        }
                    }
                ]
            }
        ]
    })
        .then(createFaculties)
}

export function findAllUsers() {
    return UserModel.findAll()
        .then(createUsers)
}
