import { ProjectOverviewType } from "../../../model/andes/ProjectTypes";
import NameSpaceItemRender, { NameSpaceSimpleItemRender, NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export default class SparkConfigRender extends NameSpaceRender
{
    public constructor(overview: ProjectOverviewType)
    {
        super("Configuration", "", [
            new NameSpaceSimpleStringItemRender("software_name", overview.name),
            new NameSpaceSimpleStringItemRender("about", overview.description??""),
            new NameSpaceSimpleItemRender("language", overview.architecture),
        ])
    }
}

