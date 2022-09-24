import {makeUpdateExpenseController} from '../update-expense';
import {User} from '../../../users/main/models/User';
import {ExpenseFrequency} from '../../enums/ExpenseFrequency';
import {HttpRequest} from '../../../main/types/http-request';

describe('Update expense controller unit tests', () => {
  it('When makeUpdateExpenseController Then updateExpenseController',
      async () => {
        const updateExpenseController = makeUpdateExpenseController(
            // @ts-ignore
            () => {
            },
        );
        expect(updateExpenseController).not.toBeNull();
        expect(updateExpenseController).toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When updateExpenseController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let updatedExpenseId: string;
        let updatedTitle: string;
        let updatedAmount: string;
        let updatedFrequency: ExpenseFrequency;
        let updatedDate: Date;
        const updateExpenseController = makeUpdateExpenseController(
            // @ts-ignore
            (
                requestingUser,
                expenseId,
                title,
                amount,
                frequency,
                date,
            ) => {
              requestedUser = requestingUser;
              updatedExpenseId = expenseId;
              updatedTitle = title;
              updatedAmount = amount;
              updatedFrequency = frequency;
              updatedDate = date;
              return {
                status: returnedStatus,
                data: returnedBody,
              };
            },
        );
        const currentDate = new Date();
        const httpRequest: HttpRequest = {
          user: {username: 'test'},
          body: {
            title: 'title',
            amount: '€0.00',
            frequency: ExpenseFrequency.BIWEEKLY,
            date: currentDate,
          },
          params: {
            expenseId: 'expenseId',
          },
        };
        await updateExpenseController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(updatedExpenseId).toStrictEqual('expenseId');
        expect(updatedTitle).toStrictEqual('title');
        expect(updatedAmount).toStrictEqual('€0.00');
        expect(updatedFrequency).toStrictEqual(ExpenseFrequency.BIWEEKLY);
        expect(updatedDate).toStrictEqual(currentDate);
      });
  // eslint-disable-next-line max-len
  it('When updateExpenseController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const updateExpenseController = makeUpdateExpenseController(
            // @ts-ignore
            () => {
              return {
                status: returnedStatus,
                data: returnedBody,
              };
            },
        );
        const currentDate = new Date();
        const httpRequest: HttpRequest = {
          user: {username: 'test'},
          body: {
            title: 'title',
            amount: '€0.00',
            frequency: ExpenseFrequency.BIWEEKLY,
            date: currentDate,
          },
          params: {
            expenseId: 'expenseId',
          },
        };
        const httpControllerResult =
                await updateExpenseController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
