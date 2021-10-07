import { HttpServer } from '..';
import * as ase from 'aws-serverless-express';

const api = new HttpServer();
const server = ase.createServer(api.app, null);

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return new Promise((resolve, _reject) => {
    ase.proxy(server, event, {
      ...context,
      succeed: resolve
    });
  });
};
