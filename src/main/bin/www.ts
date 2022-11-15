#!/usr/bin/env node

import {app} from '../app';
import http from 'http';
import debug from 'debug';

debug('express-sandbox:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// eslint-disable-next-line require-jsdoc
function normalizePort(val: any) {
  const thisPort = parseInt(val, 10);

  if (isNaN(thisPort)) {
    return val;
  }

  if (thisPort >= 0) {
    return thisPort;
  }

  return false;
}

// eslint-disable-next-line require-jsdoc
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// eslint-disable-next-line require-jsdoc
function onListening() {
  const address = server.address();
  const bind =
        typeof address === 'string' ?
            'pipe ' + address :
            'port ' + address.port;
  debug('Listening on ' + bind);
}
