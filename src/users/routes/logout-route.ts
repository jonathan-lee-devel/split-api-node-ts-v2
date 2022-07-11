import {Router} from 'express';

export const configureLogoutRoute = (
    router: Router,
    path: string,
) => {
  router.post(path, (req, res, _next) => {
    req.logout((err) => {
      if (err) throw err;
    });
    res.status(200).json({logout_status: 'SUCCESS'});
  });
};
