import { identate } from "../../../Identation";
import AttributeRender from "./AttributeRender";
import { VisibilityOptions } from "./VisibilityOptions";

export default class MethodRender extends AttributeRender
{
    private attributes: AttributeRender[];
    public constructor(name: string, attributes: AttributeRender[], returnType: string = "void", visibilityOptions: VisibilityOptions = VisibilityOptions.PUBLIC)
    {
        super(name, returnType, visibilityOptions);
        this.attributes = attributes;
    }

    override render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}${this.visibility}${this._type} ${this.name}(${this.attributes.map(attr => attr.render()).join(', ')})`;
    }
}

