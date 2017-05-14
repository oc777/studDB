import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../../utils/DAO'
import * as _ from 'lodash';

class AdminFacultiesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }
  public getFaculties(req: Request, res: Response, next: NextFunction) {
    DAO.getAllFaculties()
        .then((result) => {
      res
          .status(200)
          .render('./admin/faculties', {faculties: result.payload, layout: 'admin'})
    });
  }

  public createFaculty(req: Request, res: Response, next: NextFunction) {
    res
        .status(200)
        .render('./admin/faculty/create', {layout: "admin"})
  };

  public postFaculty(req: Request, res: Response, next: NextFunction) {
    const body = _.pick(req.body, ["name"]);
    DAO.createFaculty(body.name)
        .then((result) => {
          result = JSON.parse(result)
            res
              .status(200)
              .redirect(`/admin/faculties/${result.payload.id}`)
        })
  };

  public getFaculty(req: Request, res: Response, next: NextFunction) {
    DAO.getOneFaculty(req.params.id)
        .then((result) => {
          console.log(JSON.stringify(result, null, 2));
          res
              .status(200)
              .render('./admin/faculty', {faculty: result.payload, layout: "admin"})
        });
  }


  public init() {
    this.router.get('/', this.getFaculties)
    this.router.get('/create', this.createFaculty)
    this.router.post('/create', this.postFaculty)
    this.router.get('/:id', this.getFaculty)
  }
}

export default new AdminFacultiesRouter().router
