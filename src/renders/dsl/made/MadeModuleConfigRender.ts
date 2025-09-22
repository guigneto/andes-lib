import { ProjectOverviewType } from "../../../model/andes/ProjectTypes";
import { getTodayInIsoDate } from "../../../util/dateUtils";
import { NameSpaceSimpleItemRender, NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export default class MadeModuleConfigRender extends NameSpaceRender
{
    public constructor(overview: ProjectOverviewType)
    {
        super("project", overview.identifier, [
            new NameSpaceSimpleStringItemRender("name", overview.name),
            new NameSpaceSimpleStringItemRender("description", overview.description??""),
            new NameSpaceSimpleItemRender("startDate", getTodayInIsoDate()),
        ]);
    }
}

