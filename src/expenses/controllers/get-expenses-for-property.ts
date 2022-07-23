// eslint-disable-next-line max-len
import {GetExpensesForPropertyFunction} from '../types/get-expenses-for-property';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetExpensesForPropertyController = (
    getExpensesForProperty: GetExpensesForPropertyFunction,
): HttpController => {
  return async function getExpensesForPropertyController(
      httpRequest: HttpRequest,
  ) {
    const expenseContainer = await getExpensesForProperty(
        httpRequest.user,
        httpRequest.params.propertyId,
    );
    return {
      httpStatus: expenseContainer.status,
      jsonBody: expenseContainer.data,
    };
  };
};
