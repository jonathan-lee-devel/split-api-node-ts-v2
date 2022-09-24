// eslint-disable-next-line max-len
import {makeUpdateExpenseDistributionAssignmentController} from '../update-expense-distribution-assignment';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Update expense distribution assignment controller unit tests', () => {
  // eslint-disable-next-line max-len
  it('When makeUpdateExpenseDistributionAssignmentController Then updateExpenseDistributionAssignmentController',
      async () => {
        const updateExpenseDistributionAssignmentController =
                makeUpdateExpenseDistributionAssignmentController(
                    // @ts-ignore
                    () => {
                    },
                );
        expect(updateExpenseDistributionAssignmentController)
            .not.toBeNull();
        expect(updateExpenseDistributionAssignmentController)
            .toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When updateExpenseDistributionAssignmentController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let obtainedExpenseDistributionAssignmentId: string;
        let updatedTenantEmail: string;
        let updatedAmount: string;
        const updateExpenseDistributionAssignmentController =
                makeUpdateExpenseDistributionAssignmentController(
                    // @ts-ignore
                    (
                        requestingUser,
                        expenseDistributionAssignmentId,
                        tenantEmail,
                        amount,
                    ) => {
                      requestedUser = requestingUser;
                      obtainedExpenseDistributionAssignmentId =
                            expenseDistributionAssignmentId;
                      updatedTenantEmail = tenantEmail;
                      updatedAmount = amount;
                      return {
                        status: returnedStatus,
                        data: returnedBody,
                      };
                    },
                );
        const httpRequest: HttpRequest = {
          user: {username: 'test'},
          body: {
            tenantEmail: 'test@mail.com',
            amount: '€0.00',
          },
          params: {
            expenseDistributionAssignmentId:
                        'expenseDistributionAssignmentId',
          },
        };
        await updateExpenseDistributionAssignmentController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedExpenseDistributionAssignmentId)
            .toStrictEqual('expenseDistributionAssignmentId');
        expect(updatedTenantEmail).toStrictEqual('test@mail.com');
        expect(updatedAmount).toStrictEqual('€0.00');
      });
  // eslint-disable-next-line max-len
  it('When updateExpenseDistributionAssignmentController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const updateExpenseDistributionAssignmentController =
                makeUpdateExpenseDistributionAssignmentController(
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
          body: {
            tenantEmail: 'test@mail.com',
            amount: '€0.00',
          },
          params: {
            expenseDistributionAssignmentId:
                        'expenseDistributionAssignmentId',
          },
        };
        const httpControllerResult =
                await updateExpenseDistributionAssignmentController(
                    httpRequest,
                );
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
