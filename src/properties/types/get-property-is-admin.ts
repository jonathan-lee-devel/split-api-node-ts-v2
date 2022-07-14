import {User} from '../../users/main/models/User';

export type GetPropertyIsAdminFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<boolean>;
