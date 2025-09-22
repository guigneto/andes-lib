import IRender from "../IRender";

export type alignOptions = "left" | "right" | "center" | "justify" | "start" | "end" | "inherit" | "initial" | "unset";


export default abstract class MarkdownRender implements IRender
{
    private align: alignOptions;

    public constructor(aling: alignOptions)
    {
        this.align = aling;
    }

    public render(identationStartLevel: number = 0): string
    {
        if(this.align == "left")
            { return this.mdRender(identationStartLevel); }

        return `<div align="${this.align}">\n${this.mdRender(identationStartLevel)}\n</div>`;   
    }

    abstract mdRender(identationStartLevel: number): string;
}

