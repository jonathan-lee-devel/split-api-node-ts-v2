import {DeleteExpenseFunction} from '../types/delete-expense';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeDeleteExpenseController = (
    deleteExpense: DeleteExpenseFunction,
): HttpController => {
  return async function deleteExpenseController(httpRequest: HttpRequest) {
    const expenseContainer = await deleteExpense(
        httpRequest.user,
        httpRequest.params.expenseId,
    );
    return {
      httpStatus: expenseContainer.status,
      jsonBody: expenseContainer.data,
    };
  };
};
