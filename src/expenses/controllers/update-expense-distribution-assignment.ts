import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
// eslint-disable-next-line max-len
import {UpdateExpenseDistributionAssignmentFunction} from '../types/update-expense-distribution-assignment';

export const makeUpdateExpenseDistributionAssignmentController = (
    updateExpenseDistributionAssignment:
        UpdateExpenseDistributionAssignmentFunction,
): HttpController => {
  return async function updateExpenseDistributionAssignmentController(
      httpRequest: HttpRequest,
  ) {
    const expenseDistributionAssignmentContainer =
            await updateExpenseDistributionAssignment(
                httpRequest.user,
                httpRequest.params.expenseDistributionAssignmentId,
                httpRequest.body.tenantEmail,
                httpRequest.body.amount,
            );
    return {
      httpStatus: expenseDistributionAssignmentContainer.status,
      jsonBody: expenseDistributionAssignmentContainer.data,
    };
  };
};
