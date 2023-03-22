import {
  makeGetExpenseDistributionAssignmentsForPropertyController,
} from '../get-expense-distribution-assignments-for-property';
import {User} from '../../../users/main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Get expense distribution assignment controller unit tests', () => {
  it('When makeGetExpenseDistributionAssignmentsForPropertyController Then getExpenseDistributionAssignmentsForPropertyController',
      async () => {
        const getExpenseDistributionAssignmentsForPropertyController =
                makeGetExpenseDistributionAssignmentsForPropertyController(
                    // @ts-ignore
                    () => {
                    });
        expect(getExpenseDistributionAssignmentsForPropertyController).not
            .toBeNull();
        expect(getExpenseDistributionAssignmentsForPropertyController)
            .toBeInstanceOf(Function);
      });
  it('When getExpenseDistributionAssignmentsForPropertyController called with HttpRequest Then service called with HttpRequest',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        let requestedUser: User;
        let obtainedPropertyId: string;
        const getExpenseDistributionAssignmentsForPropertyController =
                makeGetExpenseDistributionAssignmentsForPropertyController(
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
        await getExpenseDistributionAssignmentsForPropertyController(
            httpRequest,
        );
        expect(requestedUser).toStrictEqual({username: 'test'});
        expect(obtainedPropertyId).toStrictEqual('propertyId');
      });
  it('When getExpenseDistributionAssignmentsForPropertyController called with HttpRequest and service returns status and body Then service called with HttpRequest returns status and body',
      async () => {
        const returnedStatus = 200;
        const returnedBody = {data: 'test'};
        const getExpenseDistributionAssignmentsForPropertyController =
                makeGetExpenseDistributionAssignmentsForPropertyController(
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
                await getExpenseDistributionAssignmentsForPropertyController(
                    httpRequest,
                );
        expect(httpControllerResult.httpStatus).toStrictEqual(returnedStatus);
        expect(httpControllerResult.jsonBody).toStrictEqual(returnedBody);
      });
});
