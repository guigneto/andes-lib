import { NameSpacePertencer, NameSpaceStarter } from "../superclasses";
import { NameableSuperType, NameSpaceSuperType } from "../supertypes";
import { TaskClass } from "./TaskClass";


export class AcivityClass extends NameSpacePertencer implements NameableSuperType
{
    name: string;
    tasks: TaskClass[];
    criterions: string[];

    public constructor(identifier: string, name: string, namespaceRef: NameSpaceSuperType, description: string = "", tasks: TaskClass[] = [], criterions: string[] = [])
    {
        super(identifier, namespaceRef, description);
        this.name = name;
        this.tasks = tasks;
        this.criterions = criterions;
    }
}


export class ProcessClass extends NameSpaceStarter implements NameableSuperType
{
    name: string;
    activities: AcivityClass[]

    public constructor(identifier: string, name: string, description: string = "", activities: AcivityClass[] = [])
    {
        super(identifier, description);
        this.name = name;
        this.activities = activities;
    }
}

