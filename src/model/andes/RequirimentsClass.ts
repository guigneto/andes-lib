import { NameSpacePertencer, NameSpaceStarter } from "../superclasses";
import { NameableSuperType, NameSpaceSuperType } from "../supertypes";


export class RequirimentsBaseClass extends NameSpacePertencer implements NameableSuperType 
{
    name: string;
    priority: string;
    depends: RequirimentsBaseClass[];

    public constructor(identifier: string, name: string, namespaceRef: NameSpaceSuperType, priority: string, description: string = "", depends: RequirimentsBaseClass[] = [])
    {
        super(identifier, namespaceRef, description);
        this.name = name;
        this.priority = priority;
        this.depends = depends;
    }

    public addDependencie(dependicie: RequirimentsBaseClass)
    {
        this.depends.push(dependicie);
    }
}

/**
 * 
 * Atention: Per Base in Andes, FR, NFR and BR are absoluty the same thing
 */
export class FunctionalRequirimentType extends RequirimentsBaseClass
{

}

export class NonFunctionalRequirimentType extends RequirimentsBaseClass
{

}

export class BuisinessRuleType extends RequirimentsBaseClass
{

}


export class RequirimentAgregationClass extends NameSpaceStarter implements NameableSuperType
{
    name: string;
    fr: FunctionalRequirimentType[]
    nfr: NonFunctionalRequirimentType[]
    br: BuisinessRuleType[]

    public constructor(identifier: string, name: string, description: string = "", fr: FunctionalRequirimentType[] = [], nfr: NonFunctionalRequirimentType[] = [], br: BuisinessRuleType[] = [])
    {
        super(identifier, description);
        this.name = name;
        this.fr = fr;
        this.nfr = nfr;
        this.br = br;
    }
}

