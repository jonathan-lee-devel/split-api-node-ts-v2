import bunyan from 'bunyan';

const logger: bunyan = bunyan.createLogger({name: 'split', src: true});
logger.info('Initializing application');

export const loggerConfig = () => {
  return logger;
};
