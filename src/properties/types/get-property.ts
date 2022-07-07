import {PropertyDto} from '../dtos/PropertyDto';

export type GetPropertyFunction = (propertyId: string) => Promise<PropertyDto>;
