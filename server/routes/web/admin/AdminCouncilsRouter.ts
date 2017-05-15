import {NextFunction, Request, Response, Router} from 'express'
import DAO from '../../../utils/DAO'

class AdminCouncilRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    public getCouncils(req: Request, res: Response, next: NextFunction) {
        DAO.getAllFaculties()
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/councils', {faculties: result.payload, layout: 'admin'});
            });
    }

    public getCouncil(req: Request, res: Response, next: NextFunction) {
        DAO.getOneCouncil(req.params.id)
            .then((result) => {
                // Calculate free positions
                let i
                const free = {phd: result.payload.phdPositions, stud: result.payload.studentPositions};
                for (i = 0; i < result.payload.CouncilInstances[0].Users.length; i++) {
                    if (result.payload.CouncilInstances[0].Users[i].phd === true) {
                        free.phd--
                    } else {
                        free.stud--
                    }
                }
                console.log(JSON.stringify(result.payload.CouncilInstances[0].Users, null, 2));
                res
                    .status(200)
                    .render('./admin/council', {council: result.payload, free, layout: 'admin'})
            });
    }

    public init() {
        this.router.get('/', this.getCouncils)
        this.router.get('/:id', this.getCouncil)
    }
}

export default new AdminCouncilRouter().router