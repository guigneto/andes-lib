import { EnumEntityType } from "../../../model/spark/EnumTypes";
import { identate } from "../../Identation";
import NameSpaceItemRender, { NameSpaceSimpleItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export class SparkEnumAttrRender extends NameSpaceItemRender
{
    public override render(identationStartLevel: number = 0): string
    {
        return `\n${identate(identationStartLevel)}${this.reference.toUpperCase()}`;    
    }
    public renderValue(identationStartLevel?: number): string
    {
        return "";
    }
}


export default class SparkEnumEntityRender extends NameSpaceRender
{
    public constructor(enume: EnumEntityType)
    {
        super("enum", enume.identifier, []);

        enume.options.forEach(o => this.addOption(o));
    }

    public addOption(opt: string)
    {
        this.items.push(new SparkEnumAttrRender(opt));
    }
}