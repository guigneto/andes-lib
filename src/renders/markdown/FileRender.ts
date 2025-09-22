import IRender from "../IRender";
import ParagraphRender from "./ParagraphRender";
import SectionRender from "./SectionRender";
import TableRender from "./TableRender";


export default class MarkdownFileRender implements IRender
{
    private name: string;
    private elements: IRender[];

    public constructor(name: string, elements: IRender[] = [])
    {
        this.name = name;
        this.elements = elements;
    }

    public render(identationStartLevel: number = 0): string
    {
        let metaData = this.renderMetaData(identationStartLevel);
        let elementsData = this.elements.map(element => element.render(0)).join("\n\n");

        return `${metaData}\n${elementsData}`;
    }

    public add(element: IRender)
    {
        this.elements.push(element);
    }

    public addSimpleSection(title: string, paragraphText: string)
    {
        this.elements.push(new SectionRender(title, [new ParagraphRender(paragraphText)]));
    }

    public addSimpleTableSection(title: string, talbe: TableRender)
    {
        this.elements.push(new SectionRender(title, [talbe]));
    }

    private renderMetaData(identationLevel: number): string
    {
        return `---\ntitle: ${this.name}\nsidebar_position ${identationLevel}\n---`;
    }
}

