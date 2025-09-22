import MarkdownRender, { alignOptions } from "./MarkdownRender";


export default class ParagraphRender extends MarkdownRender
{
    private content: string;

    public constructor(content: string, align: alignOptions = "left")
    {
        super(align);
        this.content = content;
    }

    public mdRender(identationStartLevel: number = 0): string
    {
        return this.content;
    }
}

