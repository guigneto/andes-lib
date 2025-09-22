import { identate } from "../Identation";
import IRender from "../IRender";
import NameSpaceItemRender from "./NameSpaceItemRender";


export default class NameSpaceRender implements IRender
{
    private keyword: string;
    private identifier: string;
    protected items: IRender[];

    public constructor(keyword: string, identifier: string, items: IRender[])
    {
        this.keyword = keyword;
        this.identifier = identifier;
        this.items = items;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `\n${identate(identationStartLevel)}${this.keyword} ${this.identifier} {${this.listAll().map(i=>i.render(identationStartLevel+1)).join("")}\n${identate(identationStartLevel)}}`
    }

    protected listAll(): IRender[]
    {
        return this.items;
    }
}

