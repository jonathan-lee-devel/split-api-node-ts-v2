// eslint-disable-next-line max-len
import {DeleteExpenseDistributionAssignmentFunction} from '../types/delete-expense-distribution-assignment';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeDeleteExpenseDistributionAssignmentController = (
    deleteExpenseDistributionAssignment
        : DeleteExpenseDistributionAssignmentFunction,
): HttpController => {
  return async function deleteExpenseDistributionAssignmentController(
      httpRequest: HttpRequest,
  ) {
    const expenseDistributionAssignmentContainer =
            await deleteExpenseDistributionAssignment(
                httpRequest.user,
                httpRequest.params.expenseDistributionAssignmentId,
            );
    return {
      httpStatus: expenseDistributionAssignmentContainer.status,
      jsonBody: expenseDistributionAssignmentContainer.data,
    };
  };
};
