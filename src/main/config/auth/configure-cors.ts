import cors from 'cors';
import bunyan from 'bunyan';

export const configureCors = (logger: bunyan) => {
  logger.info(`Configuring CORS with front-end host URL set to: ${process.env.FRONT_END_URL}`);
  return cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
  });
};
