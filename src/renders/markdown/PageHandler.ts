import IRender from "../IRender";
import MarkdownFileRender from "./FileRender";


export default class PageHandler
{
    private files: MarkdownFileRender[];
    private folderName: string;
    private subPages: PageHandler[];

    public constructor(folderName: string, files: MarkdownFileRender[] = [], subPages: PageHandler[])
    {
        this.folderName = folderName;
        this.files = files;
        this.subPages = subPages;
    }

    public renderPages(): string[]
    {
        let identation = 0;

        return this.files.map(file => {
            let f = file.render(identation);
            identation++;
            return f;
        })
    }

    public getFolderName(): string
    {
        return this.folderName;
    }

    public foreachFile(exec: { (file: MarkdownFileRender, index: number): void }): void
    {
        this.files.forEach((file, index)=>{ exec(file, index); });
    }

    public foreachSubPage(exec: {(subpage: PageHandler, index: number): void}): void
    {
        this.subPages.forEach((subPage, index)=>{exec(subPage, index)});
    }
}

