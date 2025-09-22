import { BacklogClass, EpicClass, StoryClass } from "../../../model/made/BacklogClass";
import { story } from "../../../tests/data/backlog";
import IRender from "../../IRender";
import { NameSpaceSimpleItemRender, NameSpaceSimpleMultStringItemRender, NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";
import MadeTaskRender from "./MadeTaskRender";


export class MadeStoryRender extends NameSpaceRender
{
    public constructor(story: StoryClass)
    {
        super("story", story.identifier, [
            new NameSpaceSimpleStringItemRender("name", story.name),
            new NameSpaceSimpleMultStringItemRender("Criterions", story.criterions),
            new NameSpaceSimpleStringItemRender("observation", story.observations),

            ...story.tasks.map(t => new MadeTaskRender(t)),
        ]);
    }
}


export class MadeEpicRender extends NameSpaceRender
{
    public constructor(epic: EpicClass)
    {
        super("epic", epic.identifier, [
            new NameSpaceSimpleStringItemRender("name", epic.identifier),
            new NameSpaceSimpleItemRender("process", epic.process?.getNameSpaceReference()??"")
        ]);

        epic.stories.forEach(s => this.addStory(s));
    }

    public add(element: IRender)
    {
        this.items.push(element);
    }

    public addStory(story: StoryClass)
    {
        this.items.push(new MadeStoryRender(story))
    }
}


export default class MadeBacklogRender extends NameSpaceRender
{
    public constructor(backlog: BacklogClass)
    {
        super("backlog", backlog.identifier, [
            new NameSpaceSimpleStringItemRender("name", backlog.name),
            new NameSpaceSimpleStringItemRender("description", backlog.description??""),
        ]);

        backlog.epics?.forEach(e => this.items.push(new MadeEpicRender(e)));
    }

    // GAMBIARRA
    public addEpicRender(epic: MadeEpicRender)
    {
        this.items.push(epic);
    }
}

