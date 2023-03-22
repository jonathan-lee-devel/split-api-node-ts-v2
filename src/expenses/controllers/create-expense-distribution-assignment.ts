import {CreateExpenseDistributionAssignmentFunction} from '../types/create-expense-distribution-assignment';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeCreateExpenseDistributionAssignmentController = (
    createExpenseDistributionAssignment:
        CreateExpenseDistributionAssignmentFunction,
): HttpController => {
  return async function createExpenseDistributionAssignmentController(
      httpRequest: HttpRequest,
  ) {
    const expenseDistributionAssignmentContainer =
            await createExpenseDistributionAssignment(
                httpRequest.user,
                httpRequest.body.expenseId,
                httpRequest.body.tenantEmail,
                httpRequest.body.amount,
            );
    return {
      httpStatus: expenseDistributionAssignmentContainer.status,
      jsonBody: expenseDistributionAssignmentContainer.data,
    };
  };
};
