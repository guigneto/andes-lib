import IRender from "../../IRender";
import ParagraphRender from "../ParagraphRender";


export default abstract class MermaidRender implements IRender
{
    protected label: string;
    protected description: string;
    protected author: string;
    protected numeration: number;

    public constructor(label: string, description: string = "", author: string, numeration: number)
    {
        this.label = label;
        this.description = description;
        this.author = author;
        this.numeration = numeration;
    }

    abstract mermaidRender(identationStartLevel: number): string;

    public render(identationStartLevel: number = 0): string
    {
        let author = (new ParagraphRender(`Fonte: ${this.author}`, "left")).render();
        let mermaidBody = "```mermaid\n" + this.mermaidRender(identationStartLevel) + "\n```";

        return `${this.renderDescreption()}\n\n${mermaidBody}\n\n${author}`;
    }

    protected renderDescreption(): string
    {
        return (new ParagraphRender(`${this.label} ${this.numeration}: ${this.description}`, "left")).render();
    }
}

