import {makeGetPropertyController} from '../get-property';
import {HttpRequest} from '../../../main/types/http-request';

describe('Get property controller unit tests', () => {
  it('When makeGetPropertyController Then getPropertyController',
      async () => {
        const getPropertyController = makeGetPropertyController(
            // @ts-ignore
            () => {
            },
        );
        expect(getPropertyController).not.toBeNull();
        expect(getPropertyController).toBeInstanceOf(Function);
      });
  // eslint-disable-next-line max-len
  it('When getPropertyController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser;
        let obtainedPropertyId;
        const getPropertyController = makeGetPropertyController(
            // @ts-ignore
            (requestingUser, propertyId) => {
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
            propertyId: 'test',
          },
        };
        await getPropertyController(httpRequest);
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedPropertyId).toStrictEqual('test');
      });
  // eslint-disable-next-line max-len
  it('When getPropertyController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const getPropertyController = makeGetPropertyController(
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
            propertyId: 'test',
          },
        };
        const httpControllerResult =
                await getPropertyController(httpRequest);
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
