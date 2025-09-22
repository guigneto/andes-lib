import { PackageType } from "../../../model/spark/PackageTypes";
import { BacklogClass, StoryClass } from "../../../model/made/BacklogClass";
import { TaskClass } from "../../../model/made/TaskClass";
import { NameSpacePertencer } from "../../../model/superclasses";
import { EventType } from "../../../model/andes/AnalisysTypes";
import { MadeStoryRender } from "../../../renders/dsl/made/MadeBacklogRender";


// ISSO AQUI É UMA GAMBIARRA> APAGAR PARA A VERSÃO FINAL
class AuxTemp extends NameSpacePertencer
{
    private hardcodeText: string;

    public constructor(texte: string)
    {
        // @ts-expect-error
        super("", '', "");
        this.hardcodeText = texte;
    }

    public override getNameSpaceReference(): string
    {
        return this.hardcodeText;    
    }
}

export default class DefaultStories
{
    static buildDefaultStoryToPackage(pkg: PackageType, backlog: BacklogClass): StoryClass
    {
        return new StoryClass(
            `createmodule_${pkg.identifier}`,
            `Create database infrastruture to module ${pkg.identifier}`,
            backlog, "", "",
            DefaultStories.buildDefaultTasks(pkg, backlog),
        )
    }

    private static buildDefaultTasks(pkg: PackageType, backlog: BacklogClass): TaskClass[]
    {
        return [
            new TaskClass("create_module", "Implements domain modules", backlog),
            new TaskClass("create_repository", "Implements data repository", backlog, "",
                [new TaskClass("", "", new AuxTemp(`${backlog.identifier}.domaindiagram.createmodule_${pkg.identifier}.create_module`))]
            ),
        ]
    }

    static buildDefaultStoryToEvent(event: EventType, moduleName: string, index: number = 0): MadeStoryRender
    {
        return new MadeStoryRender(new StoryClass(
            `${event.identifier}_${index}`,
            event.name,
            new AuxTemp(`create_module.${moduleName}`),
            event.description,
            )
        )
    }
}

