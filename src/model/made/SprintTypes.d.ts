import { BaseSuperType, NameableSuperType } from "../supertypes";
import { TeamMemberType } from "./TeamTypes";


export interface SprintBacklogItemType extends BaseSuperType
{
    member: TeamMemberType;
    dueDate: Date;
    status: string;
}


export interface SprintBacklogType extends BaseSuperType
{
    items: SprintBacklogItemType[];
}


export interface SprintType extends NameableSuperType
{
    startDate: Date;
    dueDate: Date;
    status: string;
    backlog: SprintBacklogType;
}

