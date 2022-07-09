import mongoose from 'mongoose';

const {connect} = mongoose;

export const connectToDatabase = () => {
  connect(process.env.DATABASE_URL)
      .then((_) => {
        console.log(
            `Connected to database: ${process.env.DATABASE_URL}`,
        );
      })
      .catch((err) => {
        console.error(
            // eslint-disable-next-line max-len
            `Could not connect to database: ${process.env.DATABASE_URL} -> ${err}`,
        );
      });
};
