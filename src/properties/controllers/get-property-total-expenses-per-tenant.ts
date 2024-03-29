import {GetPropertyTotalExpensesPerTenantFunction} from '../types/get-property-total-expenses-per-tenant-function';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetPropertyTotalExpensesPerTenantController = (
    getPropertyTotalExpensesPerTenant
        : GetPropertyTotalExpensesPerTenantFunction,
): HttpController => {
  return async function getPropertyTotalExpensesPerTenantController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await getPropertyTotalExpensesPerTenant(
        httpRequest.user,
        httpRequest.params.propertyId,
        httpRequest.params.month,
        httpRequest.params.year,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
