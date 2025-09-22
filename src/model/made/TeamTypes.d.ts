import { NameableSuperType } from "../supertypes";


export interface TeamMemberType extends NameableSuperType
{
    email?: string;
    discord?: string;

    team: TeamType;
}


export interface TeamType extends NameableSuperType
{
    members: TeamMemberType[];
}

