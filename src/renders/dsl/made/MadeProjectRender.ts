import { ProjectModuleType } from "../../../model/andes/ProjectTypes";
import { dateToIsoString } from "../../../util/dateUtils";
import { NameSpaceSimpleItemRender, NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export default class MadeProjectRender extends NameSpaceRender
{
    public constructor(module: ProjectModuleType)
    {
        super("project", module.identifier, [
            new NameSpaceSimpleStringItemRender("name", module.name),
            new NameSpaceSimpleStringItemRender("description", module.description??""),
            new NameSpaceSimpleItemRender("startDate", dateToIsoString(new Date())),
            new NameSpaceSimpleItemRender("dueDate", dateToIsoString(new Date()))
        ])
    }
}

