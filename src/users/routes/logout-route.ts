import {Router} from 'express';

export const configureLogoutRoute = (
    router: Router,
    path: string,
) => {
  router.post(path, (req, res, _next) => {
    req.logout((err) => {
      if (err) {
        console.error(`An error has occurred: ${err}`);
        return res.status(500).json({logout_status: 'FAILURE'});
      }
    });
    return res.status(200).json({logout_status: 'SUCCESS'});
  });
};
