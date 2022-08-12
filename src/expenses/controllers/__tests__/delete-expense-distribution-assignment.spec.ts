// eslint-disable-next-line max-len
import {makeDeleteExpenseDistributionAssignmentController} from '../delete-expense-distribution-assignment';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Delete expense distribution assignment controller unit tests', () => {
  // eslint-disable-next-line max-len
  it('When makeDeleteExpenseDistributionAssignmentController Then deleteExpenseDistributionAssignmentController',
      async () => {
        const deleteExpenseDistributionAssignmentController =
                makeDeleteExpenseDistributionAssignmentController(
                    // @ts-ignore
                    () => {
                    },
                );
        expect(deleteExpenseDistributionAssignmentController).not.toBeNull();
        expect(deleteExpenseDistributionAssignmentController)
            .toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When deleteExpenseDistributionAssignmentController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let deletedExpenseDistributionAssignmentId: string;

        const deleteExpenseDistributionAssignmentController =
                makeDeleteExpenseDistributionAssignmentController(
                    // @ts-ignore
                    (
                        requestingUser,
                        expenseDistributionAssignmentId,
                    ) => {
                      requestedUser = requestingUser;
                      deletedExpenseDistributionAssignmentId =
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
            expenseDistributionAssignmentId: 'expenseDistributionAssignmentId',
          },
        };
        await deleteExpenseDistributionAssignmentController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(deletedExpenseDistributionAssignmentId)
            .toStrictEqual('expenseDistributionAssignmentId');
      });
  // eslint-disable-next-line max-len
  it('When deleteExpenseDistributionAssignmentController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};

        const deleteExpenseDistributionAssignmentController =
                makeDeleteExpenseDistributionAssignmentController(
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
            expenseDistributionAssignmentId: 'expenseDistributionAssignmentId',
          },
        };
        const httpControllerResult =
                await deleteExpenseDistributionAssignmentController(
                    httpRequest,
                );
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
