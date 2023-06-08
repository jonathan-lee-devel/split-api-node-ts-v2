import {Router} from 'express';
import {HttpStatus} from '../../../common/enums/HttpStatus';

export const configureLogoutRoute = (
    router: Router,
    path: string,
) => {
  router.post(path, (req, res, _next) => {
    req.logout((err) => {
      if (err) {
        console.error(`An error has occurred: ${err}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({logout_status: 'FAILURE'});
      }
    });
    return res.status(HttpStatus.OK).json({logout_status: 'SUCCESS'});
  });
};
