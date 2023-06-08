import {Router} from 'express';
import passport from 'passport';
import {HttpStatus} from '../../../common/enums/HttpStatus';

export const configureLoginRoute = (
    router: Router,
    path: string,
) => {
  router.post(path, (req, res, next) => {
    passport.authenticate('local', (err, user, _) => {
      if (err) {
        return next(err);
      }
      if (!user || !user.emailVerified) {
        return res.status(HttpStatus.UNAUTHORIZED).json({login_status: 'FAILURE'});
      }

      req.login(user, (loginError) => {
        if (loginError) {
          return next(loginError);
        }
        return res.status(HttpStatus.OK).json({login_status: 'SUCCESS', username: user.email});
      });
    })(req, res, next);
  });
};
