import {makeCreateExpenseController} from '../create-expense';
import {HttpRequest} from '../../../main/types/http-request';
import {ExpenseFrequency} from '../../enums/ExpenseFrequency';
import {User} from '../../../users/main/models/User';

describe('Create expense controller unit tests', () => {
  it('When makeCreateExpenseController Then createExpenseController',
      async () => {
        const createExpenseController = makeCreateExpenseController(
            // @ts-ignore
            () => {
            },
        );
        expect(createExpenseController).not.toBeNull();
        expect(createExpenseController).toBeInstanceOf(Function);
      });
  it('When createExpenseController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let obtainedPropertyId: string;
        let createdTitle: string;
        let createdAmount: number;
        let createdFrequency: ExpenseFrequency;
        let createdDate: Date;
        const date = new Date();
        const createExpenseController = makeCreateExpenseController(
            // @ts-ignore
            (
                requestingUser,
                propertyId,
                title,
                amount,
                frequency,
                date,
            ) => {
              requestedUser = requestingUser;
              obtainedPropertyId = propertyId;
              createdTitle = title;
              createdAmount = amount;
              createdFrequency = frequency;
              createdDate = date;
              return {
                status: returnedStatus,
                data: returnedBody,
              };
            },
        );
        const httpRequest: HttpRequest = {
          user: {username: 'test'},
          body: {
            propertyId: 'propertyId',
            title: 'title',
            amount: -1.00,
            frequency: ExpenseFrequency.YEARLY,
            date,
          },
          params: undefined,
        };
        await createExpenseController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedPropertyId).toStrictEqual('propertyId');
        expect(createdTitle).toStrictEqual('title');
        expect(createdAmount).toStrictEqual(-1.00);
        expect(createdFrequency).toStrictEqual(ExpenseFrequency.YEARLY);
        expect(createdDate).toStrictEqual(date);
      });
  it('When createExpenseController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const createExpenseController = makeCreateExpenseController(
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
            propertyId: 'propertyId',
            title: 'title',
            amount: -1.00,
            frequency: ExpenseFrequency.YEARLY,
            date: new Date(),
          },
          params: undefined,
        };
        const httpControllerResult =
                await createExpenseController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
