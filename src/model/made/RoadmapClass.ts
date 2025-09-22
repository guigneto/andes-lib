import { NameSpacePertencer, NameSpaceStarter } from "../superclasses";
import { NameableSuperType, NameSpaceSuperType } from "../supertypes";


export class ReleaseClass extends NameSpacePertencer
{
    items: NameSpaceSuperType[];
    status: string;
    startDate: Date;
    dueDate: Date;
    version: string;

    public constructor(identifier: string, namespaceRef: NameSpaceSuperType, description: string = "", status: string, version: string, startDate: Date = new Date(), dueDate: Date = new Date(), items: NameSpaceSuperType[] = [])
    {
        super(identifier, namespaceRef, description);
        this.status = status;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.version = version;
        this.items = items;
    }
}


/**
 * Conceitualmente, esta classe está errada. Uma Milestone não é uma Release, mas como possuem os mesmos atributos comportamento igual, meteve-se elas justas.
 */
export class MilstoneClass extends ReleaseClass implements NameableSuperType
{
    name: string;
    releases: ReleaseClass[];

    public constructor(identifier: string, name: string, namespaceRef: NameSpaceSuperType, description: string = "", status: string, version: string, startDate: Date = new Date(), dueDate: Date = new Date(), items: NameSpaceSuperType[] = [], releases: ReleaseClass[] = [])
    {
        super(identifier, namespaceRef, description, status, version, startDate, dueDate, items);
        this.name = name;
        this.releases = releases;
    }
}


export class RoadmapClass extends NameSpaceStarter
{
    milesontes: MilstoneClass[];
    public constructor(identifier: string, description: string = "", milestones: MilstoneClass[] = [])
    {
        super(identifier, description);
        this.milesontes = milestones;
    }
}

