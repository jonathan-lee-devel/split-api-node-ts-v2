import {makeGetExpenseDistributionAssignmentsController} from '../get-expense-distribution-assignment';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Get expense distribution assignment controller unit tests', () => {
  it('When makeGetExpenseDistributionAssignmentsController Then getExpenseDistributionAssignmentController',
      async () => {
        const getExpenseDistributionAssignmentController =
                makeGetExpenseDistributionAssignmentsController(
                    // @ts-ignore
                    () => {
                    });
        expect(getExpenseDistributionAssignmentController).not.toBeNull();
        expect(getExpenseDistributionAssignmentController)
            .toBeInstanceOf(Function);
      });
  it('When getExpenseDistributionAssignmentsController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let obtainedPropertyId: string;
        let obtainedExpenseDistributionAssignmentId: string;
        const getExpenseDistributionAssignmentController =
                makeGetExpenseDistributionAssignmentsController(
                    // @ts-ignore
                    (
                        requestingUser,
                        propertyId,
                        expenseDistributionAssignmentId,
                    ) => {
                      requestedUser = requestingUser;
                      obtainedPropertyId = propertyId;
                      obtainedExpenseDistributionAssignmentId =
                            expenseDistributionAssignmentId;
                      return {
                        status: returnedStatus,
                        data: returnedBody,
                      };
                    },
                );
        const httpRequest: HttpRequest = {
          user: {username: 'test'},
          body: undefined,
          params: {
            propertyId: 'propertyId',
            expenseDistributionAssignmentId: 'expenseDistributionAssignmentId',
          },
        };
        await getExpenseDistributionAssignmentController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedPropertyId).toStrictEqual('propertyId');
        expect(obtainedExpenseDistributionAssignmentId)
            .toStrictEqual('expenseDistributionAssignmentId');
      });
  it('When getExpenseController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const getExpenseDistributionAssignmentController =
                makeGetExpenseDistributionAssignmentsController(
                    // @ts-ignore
                    () => {
                      return {
                        status: returnedStatus,
                        data: returnedBody,
                      };
                    },
                );
        const httpRequest: HttpRequest = {
          user: {username: 'test'},
          body: undefined,
          params: {
            propertyId: 'propertyId',
            expenseDistributionAssignmentId: 'expenseDistributionAssignmentId',
          },
        };
        const httpControllerResult =
                await getExpenseDistributionAssignmentController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
