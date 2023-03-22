import {makeGetExpenseController} from '../get-expense';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Get expense controller unit tests', () => {
  it('When makeGetExpenseController Then getExpenseController',
      async () => {
        const getExpenseController = makeGetExpenseController(
            // @ts-ignore
            () => {
            },
        );
        expect(getExpenseController).not.toBeNull();
        expect(getExpenseController).toBeInstanceOf(Function);
      });
  it('When getExpenseController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let obtainedExpenseId: string;
        const getExpenseController = makeGetExpenseController(
            // @ts-ignore
            (
                requestingUser,
                expenseId,
            ) => {
              requestedUser = requestingUser;
              obtainedExpenseId = expenseId;
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
        await getExpenseController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedExpenseId).toStrictEqual('expenseId');
      });
  it('When getExpenseController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const getExpenseController = makeGetExpenseController(
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
        const httpControllerResult =
                await getExpenseController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
