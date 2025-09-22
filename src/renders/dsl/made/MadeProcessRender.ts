import { AcivityClass, ProcessClass } from "../../../model/made/ProcessClass";
import { NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";
import MadeTaskRender from "./MadeTaskRender";


export class MadeActivityRender extends NameSpaceRender
{
    public constructor(activity: AcivityClass)
    {
        super("acivity", activity.identifier, [
            new NameSpaceSimpleStringItemRender("name", activity.name),
            new NameSpaceSimpleStringItemRender("description", activity.description??""),
            ...activity.tasks.map(t => new MadeTaskRender(t)),
        ]);
    }
}


export default class MadeProcessRender extends NameSpaceRender
{
    public constructor(process: ProcessClass)
    {
        super("process", process.identifier, [
            new NameSpaceSimpleStringItemRender("name", process.name),
            new NameSpaceSimpleStringItemRender("description", process.description??""),
            ...process.activities.map(a => new MadeActivityRender(a)),
        ]);
    }
}

