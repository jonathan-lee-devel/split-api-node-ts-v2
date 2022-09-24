import {makeGetExpensesForMonthController} from '../get-expenses-for-month';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Get expenses for month controller unit tests', () => {
  // eslint-disable-next-line max-len
  it('When makeGetExpensesForMonthController Then getExpensesForMonthController',
      async () => {
        const getExpensesForMonthController = makeGetExpensesForMonthController(
            // @ts-ignore
            () => {
            },
        );
        expect(getExpensesForMonthController).not.toBeNull();
        expect(getExpensesForMonthController).toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When getExpensesForMonthController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let obtainedPropertyId: string;
        let obtainedMonth: number;
        let obtainedYear: number;
        const getExpensesForMonthController = makeGetExpensesForMonthController(
            // @ts-ignore
            (
                requestingUser,
                propertyId,
                month,
                year,
            ) => {
              requestedUser = requestingUser;
              obtainedPropertyId = propertyId;
              obtainedMonth = month;
              obtainedYear = year;
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
            month: 89317239872139,
            year: 9080980912380,
          },
        };
        await getExpensesForMonthController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedPropertyId).toStrictEqual('propertyId');
        expect(obtainedMonth).toStrictEqual(89317239872139);
        expect(obtainedYear).toStrictEqual(9080980912380);
      });
  // eslint-disable-next-line max-len
  it('When getExpensesForMonthController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const getExpensesForMonthController = makeGetExpensesForMonthController(
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
            month: 89317239872139,
            year: 9080980912380,
          },
        };
        const httpControllerResult =
                await getExpensesForMonthController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
