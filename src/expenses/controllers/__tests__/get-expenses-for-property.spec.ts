// eslint-disable-next-line max-len
import {makeGetExpensesForPropertyController} from '../get-expenses-for-property';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Get expenses for property controller unit tests', () => {
  // eslint-disable-next-line max-len
  it('When makeGetExpensesForPropertyController Then getExpensesForPropertyController',
      async () => {
        const getExpensesForPropertyController =
                makeGetExpensesForPropertyController(
                    // @ts-ignore
                    () => {
                    },
                );
        expect(getExpensesForPropertyController).not.toBeNull();
        expect(getExpensesForPropertyController).toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When getExpensesForPropertyController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let obtainedPropertyId: string;
        const getExpensesForPropertyController =
                makeGetExpensesForPropertyController(
                    // @ts-ignore
                    (
                        requestingUser,
                        propertyId,
                    ) => {
                      requestedUser = requestingUser;
                      obtainedPropertyId = propertyId;
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
          },
        };
        await getExpensesForPropertyController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedPropertyId).toStrictEqual('propertyId');
      });
  // eslint-disable-next-line max-len
  it('When getExpensesForPropertyController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const getExpensesForPropertyController =
                makeGetExpensesForPropertyController(
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
          },
        };
        const httpControllerResult =
                await getExpensesForPropertyController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
