import {HttpRequest} from './http-request';
import {HttpControllerResult} from './http-controller-result';

export type HttpController
    = (httpRequest: HttpRequest) => Promise<HttpControllerResult>;
