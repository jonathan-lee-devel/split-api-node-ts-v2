import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {Property} from '../models/Property';
import {CreatePropertyFunction} from '../types/create-property';
import {InviteToPropertyFunction} from '../invitations/types/invite-to-property';
import {User} from '../../users/main/models/User';
import {HttpStatus} from '../../common/enums/HttpStatus';

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
    logger.info(`<${requestingUser.email}> Create property with ID: ${id}`);
    const createdByEmail = requestingUser.email;
    const property: Property = {
      id,
      title,
      tenantEmails: [], // e-mails get added on invitations
      acceptedTenantEmails: [],
      createdByEmail,
      administratorEmails: [createdByEmail], // single admin at init
    };

    await new PropertyModel(property).save();
    for (const tenantEmail of tenantEmails) {
      await inviteToProperty(id, createdByEmail, tenantEmail);
    }
    return {
      status: HttpStatus.CREATED,
      data: {
        id,
        title,
        tenantEmails,
        acceptedTenantEmails: [],
        createdByEmail,
        administratorEmails: property.administratorEmails,
      },
    };
  };
};
