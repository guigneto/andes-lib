import IRender from "../IRender";
import MarkdownRender, { alignOptions } from "./MarkdownRender";
import ParagraphRender from "./ParagraphRender";


export default class TableRender extends MarkdownRender
{
    private static enumeration: number = 1;

    private headers: string[];
    private rows: string[][];
    private description: string;
    private author: string;
    private numeration: number;

    public constructor(headers: string[] = [], rows: string[][] = [], description: string = "", align: alignOptions = "left", author: string = "Autoria Própria")
    {
        super(align);
        this.headers = headers;
        this.rows = rows;
        this.description = description ? `: ${description}` : '';
        this.author = author;
        this.numeration = TableRender.enumeration;
        TableRender.enumeration++;
    }

    public addHeader(value: string, defaultValue: string = '')
    {
        this.headers.push(value);
        this.rows.forEach(row => row.push(defaultValue));
    }

    public mdRender(identationStartLevel: number = 0): string
    {
        let description = this.renderDescription();
        let header = `${this.renderRow(this.headers)}\n${this.renderHadderLine()}`;
        let rows = this.rows.map(row => this.renderRow(row)).join('\n');
        let author = this.renderAuthor();

        return `${description}\n\n${header}\n${rows}\n\n${author}`;
    }

    private renderDescription(): string
    {
        let paragraph = new ParagraphRender(`Tabela ${this.numeration}${this.description}`);

        return paragraph.render();
    }

    private renderAuthor(): string
    {
        let paragraph = new ParagraphRender(`Autor: ${this.author}`);

        return paragraph.render();
    }

    private renderRow(values: string[]): string
    {
        return `|${values.join("|")}|`;
    }

    private renderHadderLine(): string
    {
        return `|${'-|'.repeat(this.headers.length)}`;
    }
}

