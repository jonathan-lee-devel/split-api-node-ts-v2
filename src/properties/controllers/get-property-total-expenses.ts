// eslint-disable-next-line max-len
import {GetPropertyTotalExpensesFunction} from '../types/get-property-total-expenses';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetPropertyTotalExpensesController = (
    getPropertyTotalExpenses: GetPropertyTotalExpensesFunction,
): HttpController => {
  return async function getPropertyTotalExpensesController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await getPropertyTotalExpenses(
        httpRequest.user,
        httpRequest.params.propertyId,
        httpRequest.body.month,
        httpRequest.body.year,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
