import {StatusDataContainer} from '../../dtos/StatusDataContainer';
import {PropertyDto} from '../dtos/PropertyDto';

export type GetPropertyFunction = (
    propertyId: string
) => Promise<StatusDataContainer<PropertyDto>>;
