import { identate } from "../../../Identation";
import IRender from "../../../IRender";


export default class ChartTextRender implements IRender
{
    private text: string;

    public constructor(text: string)
    {
        this.text = text;
    }

    public render(identationStartLevel: number = 0): string
    {
        let formatedTextLevel: string[] | string = this.formatText();

        if(formatedTextLevel.length > 1)
        {
            formatedTextLevel = formatedTextLevel.join(`\n${identate(identationStartLevel)}`); 
            return '`' + formatedTextLevel + '`';
        }

        return formatedTextLevel.join('');
    }

    private formatText(): string[]
    {
        return this.text.split("\n");
    }

    public getText(): string
    {
        return this.text;
    }
}
