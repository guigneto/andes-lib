import { TeamMemberType, TeamType } from "../../../model/made/TeamTypes";
import NameSpaceItemRender, { NameSpaceSimpleStringItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export class MadeTeammemberRender extends NameSpaceItemRender
{
    private name: string;
    private email: string;
    private discord: string;

    public constructor(member: TeamMemberType)
    {
        super(member.identifier);
        this.name = member.name;
        this.email = member.email ? ` email: "${member.email}"` : "";
        this.discord = member.discord ? ` discord: "${member.discord}"` : "";
    }

    public override render(identationStartLevel: number = 0): string
    {
        return `teammember ${this.reference} {name: "${this.name}"${this.email}${this.discord}}`;
    }

    public renderValue(identationStartLevel?: number): string { return ""}
}


export default class MadeTeamRender extends NameSpaceRender
{
    public constructor(team: TeamType)
    {
        super("team", team.identifier, [
            new NameSpaceSimpleStringItemRender("name", team.name),
            new NameSpaceSimpleStringItemRender("description", team.description??""),
        ]);

        team.members.forEach(m => this.addTeamMember(m));
    }

    public addTeamMember(member: TeamMemberType)
    {
        this.items.push(new MadeTeammemberRender(member));
    }
}

