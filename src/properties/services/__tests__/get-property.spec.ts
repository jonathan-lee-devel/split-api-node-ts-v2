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
          acceptedTenantEmails: [],
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
  // eslint-disable-next-line max-len
  it('When getProperty and tenantEmails and no administratorEmails then 200 with data',
      async () => {
        const propertyModel: Property = {
          id: 'id',
          title: 'title',
          tenantEmails: ['email'],
          acceptedTenantEmails: [],
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
        expect(result.status).toStrictEqual(200);
        expect(result.data.id).toStrictEqual('id');
        expect(result.data.title).toStrictEqual('title');
        expect(result.data.tenantEmails).toStrictEqual(['email']);
        expect(result.data.acceptedTenantEmails).toStrictEqual(['']);
        expect(result.data.createdByEmail).toStrictEqual('createdByEmail');
        expect(result.data.administratorEmails).toStrictEqual([]);
      });
  // eslint-disable-next-line max-len
  it('When getProperty and administratorEmails and no tenantEmails then 200 with data',
      async () => {
        const propertyModel: Property = {
          id: 'id',
          title: 'title',
          tenantEmails: [],
          acceptedTenantEmails: [],
          createdByEmail: 'createdByEmail',
          administratorEmails: ['email'],
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
        expect(result.status).toStrictEqual(200);
        expect(result.data.id).toStrictEqual('id');
        expect(result.data.title).toStrictEqual('title');
        expect(result.data.tenantEmails).toStrictEqual([]);
        expect(result.data.acceptedTenantEmails).toStrictEqual([]);
        expect(result.data.createdByEmail).toStrictEqual('createdByEmail');
        expect(result.data.administratorEmails).toStrictEqual(['email']);
      });
  // eslint-disable-next-line max-len
  it('When getProperty and administratorEmails and tenantEmails then 200 with data',
      async () => {
        const propertyModel: Property = {
          id: 'id',
          title: 'title',
          tenantEmails: ['email'],
          acceptedTenantEmails: [],
          createdByEmail: 'createdByEmail',
          administratorEmails: ['email'],
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
        expect(result.status).toStrictEqual(200);
        expect(result.data.id).toStrictEqual('id');
        expect(result.data.title).toStrictEqual('title');
        expect(result.data.tenantEmails).toStrictEqual(['email']);
        expect(result.data.acceptedTenantEmails).toStrictEqual([]);
        expect(result.data.createdByEmail).toStrictEqual('createdByEmail');
        expect(result.data.administratorEmails).toStrictEqual(['email']);
      });
  it('When getProperty and throw error Then 500 undefined',
      async () => {
        const getProperty = makeGetProperty(
            // @ts-ignore
            {
              findOne: () => {
                throw Error();
              },
            },
        );

        // @ts-ignore
        const result = await getProperty({}, 'propertyId');
        expect(result.status).toEqual(500);
        expect(result.data).toBeUndefined();
      });
});
