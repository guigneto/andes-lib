import { AttributeType, EntityType, EnumAttributeType, RelationType } from "../../../model/spark/EntityTypes";
import { identate } from "../../Identation";
import IRender from "../../IRender";
import NameSpaceItemRender, { NameSpaceSimpleItemRender } from "../NameSpaceItemRender";
import NameSpaceRender from "../NameSpaceRender";


export class SparkRelashionshipAttributeRender extends NameSpaceSimpleItemRender
{
    private relationType: string;
    private min: number | null;
    private max: number | null;

    public constructor(attribute: RelationType)
    {
        super(attribute.identifier, attribute.targetObject.identifier);
        this.relationType = attribute.relationType;
        this.max = attribute.max??null;
        this.min = attribute.min??null;
    }

    public getMaxNumeration(): number | null
    {
        return this.max;
    }

    public getMinNumeration(): number | null
    {
        return this.min;
    }

    override render(identationStartLevel?: number): string
    {
        return `\n${identate(identationStartLevel)}${this.reference} ${this.relationType} ${this.renderValue(identationStartLevel)}`;
    }
}

export class SparkSimpleAttributeRender extends NameSpaceSimpleItemRender
{
    public constructor(attr: AttributeType)
    {
        super(attr.identifier, `${attr.type}${SparkSimpleAttributeRender.modifiers(attr)}`);
    }

    private static modifiers(attr: AttributeType): string
    {
        const unique = attr.unique ? " unique " : '';
        const blank = attr.blank ? " blank " : '';
        const max = attr.max ? ` max: ${attr.max}` : '';
        const min = attr.min ? ` min: ${attr.min}` : '';

        return `${max}${min}${unique}${blank}`;
    }
}


export default class SparkEntityRender extends NameSpaceRender
{
    private enums: NameSpaceItemRender[];
    private relashionships: NameSpaceItemRender[];

    public constructor(entity: EntityType)
    {
        super("entity", entity.identifier, []);
        this.enums = [];
        this.relashionships = [];

        entity.attributes?.forEach(a => this.addAttribute(a));
        entity.enums?.forEach(e => this.addEnum(e));
        entity.relationsAttr?.forEach(r => this.addRelashionShip(r));
    }

    public addAttribute(attr: AttributeType)
    {
        this.items.push(new SparkSimpleAttributeRender(attr));
    }

    public addEnum(e: EnumAttributeType)
    {
        const aux: RelationType = {
            identifier: e.identifier,
            description: e.description,
            relationType: "uses",
            targetObject: e.type,
        }
        this.enums.push(new SparkRelashionshipAttributeRender(aux));
    }

    public addRelashionShip(e: RelationType)
    {
        this.relashionships.push(new SparkRelashionshipAttributeRender(e));
    }

    protected override listAll(): IRender[]
    {
        return [...this.items, ...this.enums, ...this.relashionships];    
    }
}

