import {makeGetProfile} from '../get-profile';
import {User} from '../../../main/models/User';

describe('Profile Service Get Profile Tests', () => {
  it('When makeGetProfile Then getProfile', async () => {
    const getProfile = makeGetProfile(
        // @ts-ignore
        {},
        {},
    );

    expect(getProfile).not.toBeNull();
    expect(getProfile).toBeInstanceOf(Function);
  });
  it('When requesting user email not equal to profile email Then return status forbidden', async () => {
    const getProfile = makeGetProfile(
        // @ts-ignore
        {},
        {},
    );

    const result = await getProfile({
      email: 'test@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      password: 'password',
    }, 'not-test@mail.com');

    expect(result.status).toStrictEqual(403);
    expect(result.data).toBeUndefined();
  });
  it('When user model does not exist for user Then error logged and return internal server error', async () => {
    let isErrorLogged = false;
    const getProfile = makeGetProfile(
        {
          // @ts-ignore
          error: () => {
            isErrorLogged = true;
          },
        },
        {
          findOne: () => undefined,
        },
    );

    const result = await getProfile({
      email: 'test@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      password: 'password',
    }, 'test@mail.com');

    expect(isErrorLogged).toBeTruthy();
    expect(result.status).toStrictEqual(500);
    expect(result.data).toBeUndefined();
  });
  it('When requesting user email matches profile email Then return profile data with status OK', async () => {
    const user: User = {
      email: 'test@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      password: 'password',
    };
    const getProfile = makeGetProfile(
        // @ts-ignore
        {},
        {
          findOne: () => user,
        },
    );
    const result = await getProfile(user, user.email);

    expect(result.status).toStrictEqual(200);
    expect(result.data.email).toStrictEqual(user.email);
    expect(result.data.firstName).toStrictEqual(user.firstName);
    expect(result.data.lastName).toStrictEqual(user.lastName);
  });
});
