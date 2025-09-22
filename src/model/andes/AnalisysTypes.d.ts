import { EntityType } from "../spark/EntityTypes";
import { NameSpaceStarter } from "../superclasses";
import { BaseSuperType, DependableSuperType, NameableSuperType } from "../supertypes";
import { RequirimentsBaseClass } from "./RequirimentsClass";


export interface ActorType extends BaseSuperType
{
    targetType?: EntityType;
}


export interface EventType extends DependableSuperType<EventType>
{
    action?: string[];
    requiriments?: RequirimentsBaseClass[];
    performer?: ActorType[];

    ucRef: UseCaseClass;
}


export class UseCaseClass extends NameSpaceStarter implements DependableSuperType<UseCaseClass>, NameableSuperType
{
    name: string;
    requiriments?: RequirimentsBaseClass[];
    performer?: ActorType[];
    event?: EventType[];
    depends: UseCaseClass[];

    public constructor(identifier: string, name: string, description: string = "", requiriments: RequirimentsBaseClass[] = [], actors: ActorType[] = [], events: EventType[] = [], depends: UseCaseClass[] = [])
    {
        super(identifier, description);
        this.name = name;
        this.requiriments = requiriments;
        this.performer = actors;
        this.event = events;
        this.depends = depends;
    }
}

