import {makeUpdateProfile} from '../update-profile';

describe('Profile Service Update Profile Tests', () => {
  it('When makeUpdateProfile Then updateProfile', async () => {
    const updateProfile = makeUpdateProfile(
        // @ts-ignore
        {},
        {},
    );

    expect(updateProfile).not.toBeNull();
    expect(updateProfile).toBeInstanceOf(Function);
  });
  it('When requesting user email not equal to profile email Then return status forbidden', async () => {
    const updateProfile = makeUpdateProfile(
        {
          // @ts-ignore
          info: () => {
          },
        },
        {},
    );

    const result = await updateProfile({
      email: 'test@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      password: 'password',
    }, 'not-test@mail.com', 'John', 'Doe');

    expect(result.status).toStrictEqual(403);
    expect(result.data).toBeUndefined();
  });
  it('When user model does not exist for user Then error logged and return internal server error', async () => {
    let isErrorLogged = false;
    const updateProfile = makeUpdateProfile(
        {
          // @ts-ignore
          info: () => {
          },
          // @ts-ignore
          error: () => {
            isErrorLogged = true;
          },
        },
        {
          findOne: () => undefined,
        },
    );

    const result = await updateProfile({
      email: 'test@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      password: 'password',
    }, 'test@mail.com', 'John', 'Doe');

    expect(isErrorLogged).toBeTruthy();
    expect(result.status).toStrictEqual(500);
    expect(result.data).toBeUndefined();
  });
  it('When requesting user email matches profile email Then user model saved, return profile data with updated values and status OK', async () => {
    let isSaved = false;
    const user = {
      email: 'test@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      password: 'password',
      save: () => {
        isSaved = true;
      },
    };
    const updateProfile = makeUpdateProfile(
        {
          // @ts-ignore
          info: () => {
          },
        },
        {
          findOne: () => user,
        },
    );
    const newFirstName = 'Jeff';
    const newLastName = 'Smith';
    const result = await updateProfile(
        user, user.email, newFirstName, newLastName,
    );

    expect(isSaved).toBeTruthy();
    expect(result.status).toStrictEqual(200);
    expect(result.data.email).toStrictEqual(user.email);
    expect(result.data.firstName).toStrictEqual(newFirstName);
    expect(result.data.lastName).toStrictEqual(newLastName);
  });
});
