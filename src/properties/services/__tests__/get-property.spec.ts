import {makeGetProperty} from '../get-property';
import {Property} from '../../models/Property';

describe('Get property', () => {
  it('When makeGetProperty Then getProperty',
      async () => {
        // @ts-ignore
        const getProperty = makeGetProperty({});
        expect(getProperty).not.toBeNull();
        expect(getProperty).toBeInstanceOf(Function);
      });
  it('When getProperty and no property then Return 404 undefined',
      async () => {
        const getProperty = makeGetProperty(
            // @ts-ignore
            {findOne: () => null},
        );

        // @ts-ignore
        const result = await getProperty({}, 'propertyId');
        expect(result.status).toEqual(404);
        expect(result.data).toBeUndefined();
      });
  // eslint-disable-next-line max-len
  it('When getProperty and no tenantEmails or administratorEmails then 403 undefined',
      async () => {
        const propertyModel: Property = {
          id: 'id',
          title: 'title',
          tenantEmails: [],
          createdByEmail: 'createdByEmail',
          administratorEmails: [],
        };
        const getProperty = makeGetProperty(
            // @ts-ignore
            {findOne: () => propertyModel},
        );
        const requestingUser = {
          email: 'email',
        };
        // @ts-ignore
        const result = await getProperty(requestingUser, 'id');
        expect(result.status).toStrictEqual(403);
        expect(result.data).toBeUndefined();
      });
});
