import { Application } from 'express';
import { RouteErrorCode } from '../config/types';
import { NextFunction, Request, Response } from '../http';
import { ResourceError } from '../lib/errors';
import * as qr from 'health-cards-dev-tools/js/src/qr.js'

/**
 * Installs new route on the provided application.
 * @param app ExpressJS application.
 */
export function inject(app: Application) {
  app.post('/validate', (req: Request, res: Response, next: NextFunction) => {
    resolve(req, res).catch(next);
  });
}

/**
 * A middleware that responds with server information.
 * @param req ExpressJS request object.
 * @param res ExpressJS response object.
 */
export async function resolve(req: Request, res: Response): Promise<void> {

  const { body } = req;

  if (!body.input) {
    throw new ResourceError(RouteErrorCode.INVALID_INPUT);
  }
  let input = body.input;

  if (!input.startsWith('shc:/')) {
    input = 'shc:/' + input;
  }

  const result = await qr.validate([input]);
  if (result.log[0].code == 0) {
    if (result.child[0].child[0].log[0].code == 0) {
      return res.respond(200, {
        valid: true,
        details: JSON.parse(result.child[0].child[0].log[1].message)
      });
    }else {
      return res.respond(200, {
        valid: false,
        details: result.log[0].message
      });
    }
  } else {
    return res.respond(200, {
      valid: false,
      details: result.log[0].message
    });
  }
}