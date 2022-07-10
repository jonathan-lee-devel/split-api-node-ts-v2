import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {Property} from '../models/Property';
import {CreatePropertyFunction} from '../types/create-property';
// eslint-disable-next-line max-len
import {InviteToPropertyFunction} from '../invitations/types/invite-to-property';
import {User} from '../../users/models/User';

export const makeCreateProperty = (
    generateId: GenerateIdFunction,
    PropertyModel: Model<Property>,
    inviteToProperty: InviteToPropertyFunction,
): CreatePropertyFunction => {
  return async function createProperty(
      requestingUser: User,
      title: string,
      tenantEmails: string[],
      administratorEmails: string[],
  ) {
    const id = await generateId(DEFAULT_ID_LENGTH);
    const createdByEmail = requestingUser.email;
    const property: Property = {
      id,
      title,
      tenantEmails: [], // e-mails get added on invitations
      acceptedTenantEmails: [],
      createdByEmail,
      administratorEmails,
    };

    try {
      await new PropertyModel(property).save();
      for (const tenantEmail of tenantEmails) {
        await inviteToProperty(id, createdByEmail, tenantEmail);
      }
      return {
        status: 201,
        data: {
          id,
          title,
          tenantEmails,
          acceptedTenantEmails: [],
          createdByEmail,
          administratorEmails,
        },
      };
    } catch (err) {
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
