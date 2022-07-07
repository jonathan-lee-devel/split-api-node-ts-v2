import cors from 'cors';

export const configureCors = () => {
  return cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
  });
};
