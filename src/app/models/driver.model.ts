import { Team } from './team.model';

export interface Driver {
    id: number;
    name: string;
    country: string;
    points: number;
    editable?: boolean;
    team?: Team;
    loading?: boolean;
}
