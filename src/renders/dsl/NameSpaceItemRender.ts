import { identate } from "../Identation";
import IRender from "../IRender";


export default abstract class NameSpaceItemRender implements IRender
{
    protected reference: string;

    public constructor(reference: string)
    {
        this.reference = reference;
    }

    public render(identationStartLevel: number = 0): string
    {
        const value = this.renderValue(identationStartLevel);

        if(value.length == 0)
            { return ""; }
        return `\n${identate(identationStartLevel)}${this.reference}: ${value}`;    
    }

    public abstract renderValue(identationStartLevel?: number): string
}


export class NameSpaceSimpleItemRender extends NameSpaceItemRender
{
    protected value: string;

    public constructor(reference: string, value: string)
    {
        super(reference);
        this.value = value;
    }

    public renderValue(identationStartLevel: number = 0): string
    {
        return this.value;    
    }
}


export class NameSpaceSimpleStringItemRender extends NameSpaceSimpleItemRender
{
    override renderValue(identationStartLevel: number = 0): string
    {
        return `"${super.renderValue(identationStartLevel)}"`;    
    }
}

export class NameSpaceSimpleMultStringItemRender extends NameSpaceItemRender
{
    protected values: string[];

    public constructor(reference: string, values: string[])
    {
        super(reference);
        this.values = values;
    }

    public override renderValue(identationStartLevel?: number): string
    {
        if(this.values.length == 0)
            { return ""; }

        return `${this.values.map(v => `"${v}"`).join(', ')}`
    }
}

