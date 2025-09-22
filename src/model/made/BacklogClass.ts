import { NameSpacePertencer, NameSpaceStarter } from "../superclasses";
import { NameableSuperType, NameSpaceSuperType } from "../supertypes";
import { ProcessClass } from "./ProcessClass";
import { TaskClass } from "./TaskClass";


export class StoryClass extends NameSpacePertencer implements NameableSuperType
{
    name: string;
    tasks: TaskClass[];
    criterions: string[];
    observations: string;

    public constructor(identifier: string, name: string, namespaceRef: NameSpaceSuperType, description: string = "", observations: string = "", tasks: TaskClass[] = [], criterions: string[] = [])
    {
        super(identifier, namespaceRef, description);
        this.name = name;
        this.tasks = tasks;
        this.criterions = criterions;
        this.observations = observations;
    }
}


export class EpicClass extends NameSpacePertencer implements NameableSuperType
{
    name: string;
    stories: StoryClass[];
    tastks: TaskClass[];
    process: ProcessClass | null;

    public constructor(identifier: string, name: string, namespaceRef: NameSpaceSuperType, description: string = "", process: ProcessClass | null = null, stories: StoryClass[] = [], tasks: TaskClass[] = [])
    {
        super(identifier, namespaceRef, description);
        this.name = name;
        this.stories = stories;
        this.tastks = tasks;
        this.process = process;
    }
}


export class BacklogClass extends NameSpaceStarter implements NameableSuperType
{
    name: string;
    stories?: StoryClass[];
    tasks?: TaskClass[];
    epics?: EpicClass[];

    public constructor(name: string, identifier: string, description: string = "", epics: EpicClass[] = [], stories: StoryClass[] = [], tasks: TaskClass[] = [])
    {
        super(identifier, description);
        this.name = name;
        this.epics = epics;
        this.stories = stories;
        this.tasks = tasks;
    }
}

