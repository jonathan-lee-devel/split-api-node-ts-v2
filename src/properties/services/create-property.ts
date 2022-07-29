import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {Property} from '../models/Property';
import {CreatePropertyFunction} from '../types/create-property';
// eslint-disable-next-line max-len
import {InviteToPropertyFunction} from '../invitations/types/invite-to-property';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {returnInternalServerError} from '../../common/use-cases/status-data-container';

export const makeCreateProperty = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    PropertyModel: Model<Property>,
    inviteToProperty: InviteToPropertyFunction,
): CreatePropertyFunction => {
  return async function createProperty(
      requestingUser: User,
      title: string,
      tenantEmails: string[],
  ) {
    const id = await generateId(DEFAULT_ID_LENGTH);
    const createdByEmail = requestingUser.email;
    const property: Property = {
      id,
      title,
      tenantEmails: [], // e-mails get added on invitations
      acceptedTenantEmails: [],
      createdByEmail,
      administratorEmails: [createdByEmail], // single admin at init
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
          administratorEmails: property.administratorEmails,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
