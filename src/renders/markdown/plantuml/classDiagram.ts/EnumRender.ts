import { EnumEntityType } from "../../../../model/spark/EnumTypes";
import { identate } from "../../../Identation";
import IRender from "../../../IRender";


export default class EnumRender implements IRender
{
    private name: string;
    private options: string[];

    public constructor(enumtype: EnumEntityType)
    {
        this.name = enumtype.identifier;
        this.options = enumtype.options;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `\n${identate(identationStartLevel)}enum ${this.name} {${this.renderOptions(identationStartLevel+1)}\n${identate(identationStartLevel)}}`;
    }

    private renderOptions(identation: number): string
    {
        return `\n${identate(identation)}${this.options.join(`\n${identate(identation)}`)}`;
    }
}

