import {makeDeleteExpenseController} from '../delete-expense';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Delete expense controller unit tests', () => {
  it('When makeDeleteExpenseController Then deleteExpenseController',
      async () => {
        const deleteExpenseController = makeDeleteExpenseController(
            // @ts-ignore
            () => {
            },
        );
        expect(deleteExpenseController).not.toBeNull();
        expect(deleteExpenseController).toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When deleteExpenseController called with HttpRequest Then Service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let deletedExpenseId: string;

        const deleteExpenseController = makeDeleteExpenseController(
            // @ts-ignore
            (requestingUser, expenseId) => {
              requestedUser = requestingUser;
              deletedExpenseId = expenseId;
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
            expenseId: 'expenseId',
          },
        };
        await deleteExpenseController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(deletedExpenseId).toStrictEqual('expenseId');
      });
  // eslint-disable-next-line max-len
  it('When deleteExpenseController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};

        const deleteExpenseController = makeDeleteExpenseController(
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
            expenseId: 'expenseId',
          },
        };
        const httpControllerResult = await deleteExpenseController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
