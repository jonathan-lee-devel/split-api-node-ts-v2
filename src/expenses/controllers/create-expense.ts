import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {CreateExpenseFunction} from '../types/create-expense';

export const makeCreateExpenseController = (
    createExpense: CreateExpenseFunction,
): HttpController => {
  return async function createExpenseController(httpRequest: HttpRequest) {
    const expenseContainer = await createExpense(
        httpRequest.user,
        httpRequest.body.propertyId,
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
