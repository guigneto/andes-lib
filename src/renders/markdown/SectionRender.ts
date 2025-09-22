import IRender from "../IRender";
import ParagraphRender from "./ParagraphRender";


export default class SectionRender implements IRender
{
    private title: string;
    private elements: IRender[];

    public constructor(title: string, elements: IRender[] = [])
    {
        this.title = title;
        this.elements = elements;
    }

    public addElement(element: IRender)
    {
        this.elements.push(element);
    }

    public addSimpleParagraph(text: string)
    {
        this.elements.push(new ParagraphRender(text));
    }

    public addSimpleSubsection(title: string, content: string): SectionRender
    {
        this.elements.push(new SectionRender(title, [new ParagraphRender(content)]));

        return this;
    }

    public addEnumerablePart(strs: string[])
    {
        this.elements.push(new ParagraphRender(strs.map((s, i) => `${i}. ${s}`).join('\n')));
    }

    public render(identationStartLevel: number = 0): string
    {
        let title = this.renderTitle(identationStartLevel+1);
        let elements = this.elements.map(element => element.render(identationStartLevel+1)).join('\n');
        
        return `\n${title}\n${elements}`;
    }

    private renderTitle(identationLevel: number): string
    {
        return `${'\#'.repeat(identationLevel)} ${this.title}`;
    }
}

