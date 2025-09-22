import DefaultBacklog from "../../../application/made/defaults/DefaultBacklog";
import { ProjectModuleType } from "../../../model/andes/ProjectTypes";
import IRender from "../../IRender";
import MadeBacklogRender from "./MadeBacklogRender";
import MadeProcessRender from "./MadeProcessRender";
import MadeProjectRender from "./MadeProjectRender";
import MadeRoadmapRender from "./MadeRoadmapRender";
import MadeTeamRender from "./MadeTeamRender";


export default class MadeFileRender implements IRender
{
    private module: MadeProjectRender;
    private teams: MadeTeamRender[];
    private roadmaps: MadeRoadmapRender[];
    private backlogs: MadeBacklogRender[];
    private process: MadeProcessRender[];

    public constructor(module: ProjectModuleType)
    {
        this.module = new MadeProjectRender(module);
        this.teams = [];  // it is not possible determine teams based only on andes project data
        this.roadmaps = []; // it is not possible determine roadmaps based only on andes project data
        this.backlogs = [DefaultBacklog.create(module)];
        this.process = []; // it is not possible determine process based only on andes project data
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${this.module.render()}${this.renderArray(this.backlogs)}`; // the tow only biuld structs
    }

    private renderArray(arr: IRender[])
    {
        if(arr.length == 0)
            { return ""; }
        return `\n${arr.map(obj=>obj.render()).join("\n")}`
    }
}

