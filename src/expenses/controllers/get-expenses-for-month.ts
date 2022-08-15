import {GetExpensesForMonthFunction} from '../types/get-expenses-for-month';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetExpensesForMonthController = (
    getExpensesForMonth: GetExpensesForMonthFunction,
): HttpController => {
  return async function getExpensesForMonthController(
      httpRequest: HttpRequest,
  ) {
    const expensesContainer = await getExpensesForMonth(
        httpRequest.user,
        httpRequest.body.propertyId,
        httpRequest.body.month,
        httpRequest.body.year,
    );
    return {
      httpStatus: expensesContainer.status,
      jsonBody: expensesContainer.data,
    };
  };
};
