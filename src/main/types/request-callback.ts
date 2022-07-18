import {NextFunction, Request, Response} from 'express';

export type RequestCallback =
    (req: Request, res: Response, next: NextFunction) => Promise<any>;
