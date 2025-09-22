import { ProjectModuleType } from "../../../model/andes/ProjectTypes";
import { BacklogClass } from "../../../model/made/BacklogClass";
import MadeBacklogRender from "../../../renders/dsl/made/MadeBacklogRender";
import DefaultEpics from "./DefaultEpics";

export default class DefaultBacklog
{
    static create(module: ProjectModuleType): MadeBacklogRender
    {
        const epics = module.uc.map(uc => DefaultEpics.defaultEpicFromUsecase(uc));
        const backlogClass = new BacklogClass(module.name, module.identifier, module.description, []);
        epics.push(DefaultEpics.createDiagramModel(module.packages, backlogClass));

        const backlog = new MadeBacklogRender(backlogClass);

        epics.forEach(e=>backlog.addEpicRender(e));

        return backlog;
    }
}

