import { NameSpacePertencer } from "../superclasses";
import { DependableSuperType, NameSpaceSuperType } from "../supertypes";


export class TaskClass extends NameSpacePertencer implements DependableSuperType<TaskClass>
{
    depends: TaskClass[];
    name: string;
    deliverables: string[];

    public constructor(identifier: string, name: string, nameSpaceRef: NameSpaceSuperType, description: string = "", depends: TaskClass[] = [], deliverables: string[] = [])
    {
        super(identifier, nameSpaceRef, description);
        this.name = name;
        this.depends = depends;
        this.deliverables = deliverables;
    }
}

