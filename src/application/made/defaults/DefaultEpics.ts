import { UseCaseClass } from "../../../model/andes/AnalisysTypes";
import { BacklogClass, EpicClass } from "../../../model/made/BacklogClass";
import { PackageType } from "../../../model/spark/PackageTypes";
import { MadeEpicRender } from "../../../renders/dsl/made/MadeBacklogRender";
import DefaultStories from "./DefaultStories";


export default class DefaultEpics
{
    static createDiagramModel(pkgs: PackageType[], backlog: BacklogClass): MadeEpicRender
    {
        const e = new MadeEpicRender(new EpicClass(
            "domaindiagram",
            "Create Problem Domain Modules",
            backlog,
            "Create Problem Domain Modules",
            null,
            pkgs.map(pkg => DefaultStories.buildDefaultStoryToPackage(pkg, backlog)),
            )
        );

        return e;
    }

    static defaultEpicFromUsecase(uc: UseCaseClass): MadeEpicRender
    {
        const epic = new MadeEpicRender(new EpicClass(
            uc.identifier,
            uc.name,
            uc,
            uc.description,
        ));

        uc.event?.forEach((e, index)=>epic.add(DefaultStories.buildDefaultStoryToEvent(e, uc.identifier, index)));

        return epic; 
    }
}

