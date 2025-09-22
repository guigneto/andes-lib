import { MilstoneClass, ReleaseClass, RoadmapClass } from "../../../model/made/RoadmapClass";
import { dateToIsoString } from "../../../util/dateUtils";
import IRender from "../../IRender";
import { NameSpaceSimpleItemRender, NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export class MadeReleaseRender extends NameSpaceRender
{
    public constructor(release: ReleaseClass)
    {
        super("release", release.identifier, [
            new NameSpaceSimpleStringItemRender("description", release.description??""),
            new NameSpaceSimpleItemRender("item", release.items.map(i=>i.getNameSpaceReference()).join(', ')),
            new NameSpaceSimpleItemRender("status", release.status),
            new NameSpaceSimpleItemRender("startDate", dateToIsoString(release.startDate)),
            new NameSpaceSimpleItemRender("dueDate", dateToIsoString(release.dueDate)),
            new NameSpaceSimpleStringItemRender("version", release.version),
        ]);
    }
}


export class MadeMileStoneRender extends NameSpaceRender
{
    private releases: MadeReleaseRender[];

    public constructor(milestone: MilstoneClass)
    {
        super("milestone", milestone.identifier, [
            new NameSpaceSimpleStringItemRender("description", milestone.description??""),
            new NameSpaceSimpleItemRender("item", milestone.items.map(i=>i.getNameSpaceReference()).join(', ')),
            new NameSpaceSimpleItemRender("status", milestone.status),
            new NameSpaceSimpleItemRender("startDate", dateToIsoString(milestone.startDate)),
            new NameSpaceSimpleItemRender("dueDate", dateToIsoString(milestone.dueDate)),
            new NameSpaceSimpleStringItemRender("version", milestone.version),
        ])
        this.releases = [];

        milestone.releases.forEach(r=>this.addRelease(r));
    }

    public addRelease(release: ReleaseClass)
    {
        this.releases.push(new MadeReleaseRender(release));
    }

    protected override listAll(): IRender[]
    {
        return [...this.items, ...this.releases];    
    }
}


export default class MadeRoadmapRender extends NameSpaceRender
{
    public constructor(roadmap: RoadmapClass)
    {
        super("roadmap", roadmap.identifier, []);

        roadmap.milesontes.forEach(m=>this.addMilestone(m));
    }

    public addMilestone(milesonte: MilstoneClass)
    {
        this.items.push(new MadeMileStoneRender(milesonte));
    }
}

