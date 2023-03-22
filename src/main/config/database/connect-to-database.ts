import mongoose from 'mongoose';
import bunyan from 'bunyan';

const {connect} = mongoose;

export const connectToDatabase = (
    logger: bunyan,
) => {
  connect(process.env.DATABASE_URL)
      .then((_) => {
        logger.info(
            `Connected to database: ${process.env.DATABASE_URL}`,
        );
      })
      .catch((err) => {
        logger.error(
            `Could not connect to database: ${process.env.DATABASE_URL} -> ${err}`,
        );
      });
};
