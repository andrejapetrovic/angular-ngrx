import { Driver } from './driver.model';

export interface Team {
    id?: number;
    name?: string;
    country?: string;
    championshipTitles?: string;
    podiumFinishes?: string;
    loading?: boolean;
    editable?: boolean;
    drivers?: Driver[];
}