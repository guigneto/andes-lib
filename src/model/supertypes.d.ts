export interface BaseSuperType
{
    description?: string;    
    identifier: string;
}


export interface NameableSuperType extends BaseSuperType
{
    name: string;
}


export interface DependableSuperType<T extends BaseSuperType> extends NameableSuperType
{
    depends?: T[];
}


export interface NameSpaceSuperType
{
    getNameSpaceReference(): string;
}

