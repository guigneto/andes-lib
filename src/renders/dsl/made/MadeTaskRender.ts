import { TaskClass } from "../../../model/made/TaskClass";
import { NameSpaceSimpleItemRender, NameSpaceSimpleMultStringItemRender, NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export default class MadeTaskRender extends NameSpaceRender
{
    public constructor(t: TaskClass)
    {
        super("task", t.identifier, [
            new NameSpaceSimpleStringItemRender("name", t.name),
            new NameSpaceSimpleItemRender("description", t.description??""),
            new NameSpaceSimpleMultStringItemRender("Deliverables", t.deliverables),
        ])

        t.depends.forEach(d => this.items.push(new NameSpaceSimpleItemRender("depends", d.getNameSpaceReference())));
    }
}

