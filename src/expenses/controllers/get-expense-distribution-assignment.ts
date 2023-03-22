import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetExpenseDistributionAssignmentFunction} from '../types/get-expense-distribution-assignment';

export const makeGetExpenseDistributionAssignmentsController = (
    getExpenseDistributionAssignment:
        GetExpenseDistributionAssignmentFunction,
): HttpController => {
  return async function getExpenseDistributionAssignmentController(
      httpRequest: HttpRequest,
  ) {
    const expenseDistributionAssignmentContainer = await
    getExpenseDistributionAssignment(
        httpRequest.user,
        httpRequest.params.propertyId,
        httpRequest.params.expenseDistributionAssignmentId,
    );
    return {
      httpStatus: expenseDistributionAssignmentContainer.status,
      jsonBody: expenseDistributionAssignmentContainer.data,
    };
  };
};
