import { AttributeType } from "../../../../model/spark/EntityTypes";
import { identate } from "../../../Identation";
import IRender from "../../../IRender";
import { VisibilityOptions } from "./VisibilityOptions";


export default class AttributeRender implements IRender
{
    protected visibility: VisibilityOptions;
    protected name: string;
    protected _type: string;

    public constructor(atribute: AttributeType)
    {
        this.name = atribute.identifier;
        this._type = atribute.type;
        this.visibility = VisibilityOptions.PUBLIC;
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}${this.visibility}${this._type} ${this.name}`;
    }
}

