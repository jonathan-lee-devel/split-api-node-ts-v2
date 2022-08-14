// eslint-disable-next-line max-len
import {makeCreateExpenseDistributionAssignmentController} from '../create-expense-distribution-assignment';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Create expense distribution assignment controller unit tests', () => {
  // eslint-disable-next-line max-len
  it('When makeCreateExpenseDistributionAssignmentController Then createExpenseDistributionAssignmentController',
      async () => {
        const createExpenseDistributionAssignmentController =
                makeCreateExpenseDistributionAssignmentController(
                    // @ts-ignore
                    () => {

                    },
                );
        expect(createExpenseDistributionAssignmentController).not.toBeNull();
        expect(createExpenseDistributionAssignmentController)
            .toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When createExpenseDistributionAssignment called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let createdExpenseId: string;
        let createdTenantEmail: string;
        let createdAmount: string;
        const createExpenseDistributionAssignmentController =
                makeCreateExpenseDistributionAssignmentController(
                    // @ts-ignore
                    (
                        requestingUser,
                        expenseId,
                        tenantEmail,
                        amount,
                    ) => {
                      requestedUser = requestingUser;
                      createdExpenseId = expenseId;
                      createdTenantEmail = tenantEmail;
                      createdAmount = amount;
                      return {
                        status: returnedStatus,
                        data: returnedBody,
                      };
                    },
                );
        const httpRequest: HttpRequest = {
          user: {username: 'test'},
          body: {
            expenseId: 'expenseId',
            tenantEmail: 'tenantEmail',
            amount: 'amount',
          },
          params: undefined,
        };
        await createExpenseDistributionAssignmentController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(createdExpenseId).toStrictEqual('expenseId');
        expect(createdTenantEmail).toStrictEqual('tenantEmail');
        expect(createdAmount).toStrictEqual('amount');
      });
  // eslint-disable-next-line max-len
  it('When createExpenseDistributionAssignmentController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const expenseDistributionAssignmentController =
                makeCreateExpenseDistributionAssignmentController(
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
            expenseId: 'expenseId',
            tenantEmail: 'tenantEmail',
            amount: 'amount',
          },
          params: undefined,
        };
        const httpControllerResult =
                await expenseDistributionAssignmentController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
