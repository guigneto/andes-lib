import { BaseSuperType, NameSpaceSuperType } from "./supertypes";


export class NameSpaceStarter implements BaseSuperType, NameSpaceSuperType
{
    description?: string | undefined;
    identifier: string;

    public constructor(identifier: string, description: string = "")
    {
        this.identifier = identifier;
        this.description = description;
    }

    getNameSpaceReference(): string
    {
        return this.identifier;
    }
}


export class NameSpacePertencer implements BaseSuperType, NameSpaceSuperType
{
    description?: string | undefined;
    identifier: string;
    nameSpaceRef: NameSpaceSuperType;

    public constructor(identifier: string, nameSpaceRef: NameSpaceSuperType, description: string = "")
    {
        this.identifier = identifier;
        this.nameSpaceRef = nameSpaceRef;
        this.description = description;
    }

    getNameSpaceReference(): string
    {
        if(this.identifier.length == 0)
            { return this.nameSpaceRef.getNameSpaceReference(); }
        return `${this.nameSpaceRef.getNameSpaceReference()}.${this.identifier}`;
    }
}