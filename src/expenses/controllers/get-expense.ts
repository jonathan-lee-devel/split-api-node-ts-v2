import {GetExpenseFunction} from '../types/get-expense';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetExpenseController = (
    getExpense: GetExpenseFunction,
): HttpController => {
  return async function getExpenseController(httpRequest: HttpRequest) {
    const expenseContainer = await getExpense(
        httpRequest.user,
        httpRequest.params.expenseId,
    );
    return {
      httpStatus: expenseContainer.status,
      jsonBody: expenseContainer.data,
    };
  };
};
