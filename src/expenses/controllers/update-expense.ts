import {UpdateExpenseFunction} from '../types/update-expense';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeUpdateExpenseController = (
    updateExpense: UpdateExpenseFunction,
): HttpController => {
  return async function updateExpenseController(httpRequest: HttpRequest) {
    const expenseContainer = await updateExpense(
        httpRequest.user,
        httpRequest.params.expenseId,
        httpRequest.body.title,
        httpRequest.body.amount,
        httpRequest.body.frequency,
        httpRequest.body.date,
    );
    return {
      httpStatus: expenseContainer.status,
      jsonBody: expenseContainer.data,
    };
  };
};
