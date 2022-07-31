import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {
  GetExpenseDistributionAssignmentsForPropertyFunction,
} from '../types/get-expense-distribution-assignments-for-property';

export const makeGetExpenseDistributionAssignmentsForPropertyController = (
    getExpenseDistributionAssignmentsForProperty:
        GetExpenseDistributionAssignmentsForPropertyFunction,
): HttpController => {
  return async function getExpenseDistributionAssignmentsForPropertyController(
      httpRequest: HttpRequest,
  ) {
    const expenseDistributionAssignmentContainer = await
    getExpenseDistributionAssignmentsForProperty(
        httpRequest.user,
        httpRequest.params.propertyId,
    );
    return {
      httpStatus: expenseDistributionAssignmentContainer.status,
      jsonBody: expenseDistributionAssignmentContainer.data,
    };
  };
};
