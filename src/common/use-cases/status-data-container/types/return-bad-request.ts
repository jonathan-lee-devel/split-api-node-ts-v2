import {StatusDataContainer} from '../../../../main/dtos/StatusDataContainer';
import {ErrorDto} from '../../../../main/dtos/ErrorDto';

export type ReturnBadRequestFunction = (errorMessage: string) => StatusDataContainer<ErrorDto>;
